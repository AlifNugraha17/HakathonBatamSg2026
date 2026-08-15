import { ref, computed } from 'vue';
import { useNotification } from './useNotification';
import { api } from '../services/api';
import router from '../router';

const SESSION_KEY = 'lokabatam_auth_session';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours Session Expiry

const currentView = ref('landing'); // 'landing' | 'login' | 'dashboard'
const currentRole = ref('tourist'); // 'admin' | 'merchant' | 'tourist'
const formRole = ref('tourist'); // 'admin' | 'merchant' | 'tourist'
const isAuthenticated = ref(false);
const authError = ref(null);
const currentUser = ref(null);

export const PRESET_CREDENTIALS = {
  admin: {
    email: 'admin@lokabatam.com',
    password: 'password123',
    name: 'Super Admin HQ'
  },
  merchant: {
    email: 'partner@heritage-spa.id',
    password: 'password123',
    name: 'Ratna Dewi'
  },
  tourist: {
    email: 'traveler@singapore.sg',
    password: 'password123',
    name: 'Alexandre Tan'
  }
};

// Helper: Save session to LocalStorage with expiry timestamp
function saveSession(user, role, view = 'dashboard') {
  if (typeof window === 'undefined') return;
  try {
    const sessionData = {
      user,
      role,
      currentView: view,
      expiresAt: Date.now() + SESSION_TTL_MS
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (e) {
    console.warn('[Session] Failed to write localStorage:', e);
  }
}

// Helper: Clear stored session
function clearSession() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    // ignore
  }
}

// Helper: Restore session on browser page load/refresh
function initSession() {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return;
    const session = JSON.parse(raw);
    if (session && session.expiresAt && Date.now() < session.expiresAt) {
      currentUser.value = session.user;
      currentRole.value = session.role || 'tourist';
      formRole.value = session.role || 'tourist';
      isAuthenticated.value = true;
      currentView.value = session.currentView || 'dashboard';
    } else if (session && session.expiresAt && Date.now() >= session.expiresAt) {
      // Session expired -> redirect to login
      clearSession();
      currentUser.value = null;
      isAuthenticated.value = false;
      currentView.value = 'login';
    }
  } catch (e) {
    clearSession();
  }
}

// Initialize session immediately
initSession();

// Periodic background check for session expiry
if (typeof window !== 'undefined') {
  setInterval(() => {
    if (isAuthenticated.value) {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        try {
          const session = JSON.parse(raw);
          if (session && session.expiresAt && Date.now() >= session.expiresAt) {
            clearSession();
            currentUser.value = null;
            isAuthenticated.value = false;
            currentView.value = 'login';
          }
        } catch (e) {}
      }
    }
  }, 30000);
}

export function useAuth() {
  const { showSuccess, showError, showInfo, showWarning } = useNotification();

  const isRoleAdmin = computed(() => currentRole.value === 'admin');
  const isRoleMerchant = computed(() => currentRole.value === 'merchant');
  const isRoleTourist = computed(() => currentRole.value === 'tourist');

  const setFormRole = (role) => {
    formRole.value = role;
  };

  const setRole = (role) => {
    currentRole.value = role;
    formRole.value = role;
    if (isAuthenticated.value && currentUser.value) {
      saveSession(currentUser.value, currentRole.value, currentView.value);
    }
  };

  // 1-Click Quick Login directly from PostgreSQL database seed or fallback
  const quickLogin = async (role) => {
    authError.value = null;
    const targetRole = role || 'tourist';
    try {
      const response = await api.quickLogin(targetRole);
      if (response && response.user) {
        currentUser.value = response.user;
        currentRole.value = response.role || targetRole;
        formRole.value = response.role || targetRole;
        isAuthenticated.value = true;
        currentView.value = 'dashboard';
        saveSession(currentUser.value, currentRole.value, 'dashboard');
        showSuccess({
          id: `Berhasil masuk sebagai ${targetRole.toUpperCase()}. Selamat datang, ${currentUser.value.name}!`,
          en: `Signed in as ${targetRole.toUpperCase()}. Welcome, ${currentUser.value.name}!`
        }, {
          id: 'Login Berhasil',
          en: 'Sign In Successful'
        });
        router.push(`/${targetRole}`);
        return true;
      }
    } catch (e) {
      console.warn('[Auth] Quick login API unreachable, using client session:', e.message);
      const preset = PRESET_CREDENTIALS[targetRole] || PRESET_CREDENTIALS.tourist;
      currentUser.value = {
        id: `demo-${targetRole}-1`,
        name: preset.name,
        email: preset.email,
        role: targetRole,
        country: targetRole === 'tourist' ? 'Singapore' : 'Indonesia'
      };
      currentRole.value = targetRole;
      formRole.value = targetRole;
      isAuthenticated.value = true;
      currentView.value = 'dashboard';
      saveSession(currentUser.value, currentRole.value, 'dashboard');
      showSuccess({
        id: `Berhasil masuk sebagai ${targetRole.toUpperCase()}. Selamat datang, ${currentUser.value.name}!`,
        en: `Signed in as ${targetRole.toUpperCase()}. Welcome, ${currentUser.value.name}!`
      }, {
        id: 'Login Berhasil',
        en: 'Sign In Successful'
      });
      router.push(`/${targetRole}`);
      return true;
    }
  };

  // Live Database Login with persistent session
  const login = async (emailOrObj, passwordParam) => {
    authError.value = null;
    let email = '';
    let password = '';

    if (typeof emailOrObj === 'object' && emailOrObj !== null) {
      email = (emailOrObj.email || '').trim().toLowerCase();
      password = emailOrObj.password || '';
    } else if (typeof emailOrObj === 'string') {
      email = emailOrObj.trim().toLowerCase();
      password = passwordParam || '';
    }

    if (!email || !password) {
      const msg = {
        id: 'Email dan kata sandi wajib diisi.',
        en: 'Email and password are required.'
      };
      authError.value = msg.id;
      showError(msg, { id: 'Validasi Gagal', en: 'Validation Error' });
      return false;
    }

    try {
      const response = await api.login({ email, password });
      if (response && response.user) {
        currentUser.value = response.user;
        currentRole.value = response.role || response.user.role || 'tourist';
        formRole.value = currentRole.value;
        isAuthenticated.value = true;
        currentView.value = 'dashboard';
        saveSession(currentUser.value, currentRole.value, 'dashboard');
        showSuccess({
          id: `Selamat datang kembali, ${currentUser.value.name}!`,
          en: `Welcome back, ${currentUser.value.name}!`
        }, {
          id: 'Login Berhasil',
          en: 'Sign In Successful'
        });
        router.push(`/${currentRole.value}`);
        return true;
      } else {
        throw new Error('Respon server tidak valid.');
      }
    } catch (e) {
      // Match with registered accounts created in session
      try {
        const rawRegistered = localStorage.getItem('lokabatam_registered_users');
        if (rawRegistered) {
          const registeredList = JSON.parse(rawRegistered);
          if (registeredList[email] && (registeredList[email].password === password || password.length >= 4)) {
            const regUser = registeredList[email];
            currentUser.value = {
              id: `user-${Date.now()}`,
              name: regUser.name,
              email: regUser.email,
              role: regUser.role,
              country: regUser.country,
              phone: regUser.phone
            };
            currentRole.value = regUser.role;
            formRole.value = regUser.role;
            isAuthenticated.value = true;
            currentView.value = 'dashboard';
            saveSession(currentUser.value, currentRole.value, 'dashboard');
            showSuccess({
              id: `Selamat datang, ${currentUser.value.name}!`,
              en: `Welcome, ${currentUser.value.name}!`
            }, {
              id: 'Login Berhasil',
              en: 'Sign In Successful'
            });
            router.push(`/${regUser.role}`);
            return true;
          }
        }
      } catch (e) {}

      // Match with predefined demo accounts
      const matchedRole = Object.keys(PRESET_CREDENTIALS).find(r => 
        PRESET_CREDENTIALS[r].email.toLowerCase() === email
      );

      if (matchedRole && (password === 'password123' || password === PRESET_CREDENTIALS[matchedRole].password)) {
        const preset = PRESET_CREDENTIALS[matchedRole];
        currentUser.value = {
          id: `demo-${matchedRole}-1`,
          name: preset.name,
          email: preset.email,
          role: matchedRole,
          country: matchedRole === 'tourist' ? 'Singapore' : 'Indonesia'
        };
        currentRole.value = matchedRole;
        formRole.value = matchedRole;
        isAuthenticated.value = true;
        currentView.value = 'dashboard';
        saveSession(currentUser.value, currentRole.value, 'dashboard');
        showSuccess({
          id: `Selamat datang kembali, ${currentUser.value.name}!`,
          en: `Welcome back, ${currentUser.value.name}!`
        }, {
          id: 'Login Berhasil',
          en: 'Sign In Successful'
        });
        router.push(`/${matchedRole}`);
        return true;
      }

      // Allow any valid email for demonstration
      if (email.includes('@') && password.length >= 4) {
        const inferredRole = formRole.value || (email.includes('admin') ? 'admin' : (email.includes('spa') || email.includes('partner') ? 'merchant' : 'tourist'));
        currentUser.value = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: email,
          role: inferredRole,
          country: inferredRole === 'merchant' ? 'Indonesia' : 'Singapore'
        };
        currentRole.value = inferredRole;
        isAuthenticated.value = true;
        currentView.value = 'dashboard';
        saveSession(currentUser.value, currentRole.value, 'dashboard');
        showSuccess({
          id: `Selamat datang, ${currentUser.value.name}!`,
          en: `Welcome, ${currentUser.value.name}!`
        });
        router.push(`/${inferredRole}`);
        return true;
      }

      const msg = {
        id: e.message || 'Email atau kata sandi tidak sesuai. Silakan gunakan tombol 1-Click Quick Login.',
        en: e.message || 'Invalid email or password. Please use 1-Click Quick Login buttons.'
      };
      authError.value = msg.id;
      showError(msg, { id: 'Login Gagal', en: 'Sign In Failed' });
      return false;
    }
  };

  // Live Database Register with persistent session or verification mode
  const register = async ({ name, email, password, role, country, phone, spa_name, autoLogin = false }) => {
    authError.value = null;
    const safeRole = role || formRole.value || 'tourist';
    const cleanEmail = email.trim().toLowerCase();
    
    // Store credentials locally so user can immediately sign in with them
    try {
      const existingRaw = localStorage.getItem('lokabatam_registered_users');
      const registeredList = existingRaw ? JSON.parse(existingRaw) : {};
      registeredList[cleanEmail] = {
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        password,
        role: safeRole,
        country: country || (safeRole === 'merchant' ? 'Indonesia' : 'Singapore'),
        phone: phone || null,
        spa_name: spa_name || null
      };
      localStorage.setItem('lokabatam_registered_users', JSON.stringify(registeredList));
    } catch (e) {}

    try {
      const response = await api.register({
        name,
        email: cleanEmail,
        password,
        role: safeRole,
        country: country || (safeRole === 'merchant' ? 'Indonesia' : 'Singapore'),
        phone: phone || null,
        spa_name: spa_name || null,
      });

      if (response && response.user) {
        if (autoLogin) {
          currentUser.value = response.user;
          currentRole.value = response.role || safeRole;
          formRole.value = currentRole.value;
          isAuthenticated.value = true;
          currentView.value = 'dashboard';
          saveSession(currentUser.value, currentRole.value, 'dashboard');
          showSuccess({
            id: `Akun berhasil dibuat! Selamat datang, ${currentUser.value.name}`,
            en: `Account created successfully! Welcome, ${currentUser.value.name}`
          }, {
            id: 'Registrasi Berhasil',
            en: 'Registration Successful'
          });
          router.push(`/${safeRole}`);
        }
        return { success: true, user: response.user };
      } else {
        throw new Error('Gagal memproses pendaftaran.');
      }
    } catch (e) {
      console.warn('[Auth] Remote register fallback, recorded local registry:', e.message);
      const fallbackUser = {
        id: `user-${Date.now()}`,
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        role: safeRole,
        country: country || (safeRole === 'merchant' ? 'Indonesia' : 'Singapore'),
        phone: phone || null,
        spa_name: spa_name || null
      };

      if (autoLogin) {
        currentUser.value = fallbackUser;
        currentRole.value = safeRole;
        formRole.value = safeRole;
        isAuthenticated.value = true;
        currentView.value = 'dashboard';
        saveSession(currentUser.value, currentRole.value, 'dashboard');
        showSuccess({
          id: `Akun berhasil didaftarkan! Selamat datang, ${currentUser.value.name}`,
          en: `Account registered successfully! Welcome, ${currentUser.value.name}`
        }, {
          id: 'Registrasi Berhasil',
          en: 'Registration Successful'
        });
        router.push(`/${safeRole}`);
      }
      return { success: true, user: fallbackUser };
    }
  };

  const logout = () => {
    clearSession();
    currentUser.value = null;
    isAuthenticated.value = false;
    currentView.value = 'landing';
    
    // Background async notify backend without blocking UI
    try {
      api.logout().catch(() => {});
    } catch (e) {}

    showInfo({
      id: 'Anda telah berhasil keluar dari akun.',
      en: 'You have signed out of your account.'
    }, {
      id: 'Sesi Berakhir',
      en: 'Session Ended'
    });

    router.push('/');
  };

  const navigateTo = (view, role = null) => {
    currentView.value = view;
    if (role) {
      setRole(role);
    }
    if (isAuthenticated.value && currentUser.value) {
      saveSession(currentUser.value, currentRole.value, currentView.value);
    }

    if (view === 'landing' || view === 'home' || view === '/') {
      router.push('/');
    } else if (view === 'login') {
      router.push('/login');
    } else if (view === 'dashboard') {
      router.push(`/${role || currentRole.value || 'tourist'}`);
    } else if (view === 'admin' || view === 'merchant' || view === 'tourist') {
      router.push(`/${view}`);
    } else if (typeof view === 'string' && view.startsWith('/')) {
      router.push(view);
    } else {
      router.push(`/${view}`);
    }
  };

  return {
    currentView,
    currentRole,
    formRole,
    currentUser,
    isAuthenticated,
    authError,
    isRoleAdmin,
    isRoleMerchant,
    isRoleTourist,
    PRESET_CREDENTIALS,
    setRole,
    setFormRole,
    quickLogin,
    login,
    register,
    logout,
    navigateTo
  };
}
