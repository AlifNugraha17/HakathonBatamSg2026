import { ref, computed } from 'vue';
import { useNotification } from './useNotification';
import { api } from '../services/api';

const currentView = ref('landing'); // 'landing' | 'login' | 'dashboard'
const currentRole = ref('tourist'); // 'admin' | 'merchant' | 'tourist'
const formRole = ref('tourist'); // 'admin' | 'merchant' | 'tourist'
const isAuthenticated = ref(false);
const authError = ref(null);

export const PRESET_CREDENTIALS = {
  admin: {
    email: 'admin@zentura.com',
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

const currentUser = ref(null);

export function useAuth() {
  const { showSuccess, showError, showInfo } = useNotification();

  const isRoleAdmin = computed(() => currentRole.value === 'admin');
  const isRoleMerchant = computed(() => currentRole.value === 'merchant');
  const isRoleTourist = computed(() => currentRole.value === 'tourist');

  const setFormRole = (role) => {
    formRole.value = role;
  };

  const setRole = (role) => {
    currentRole.value = role;
    formRole.value = role;
  };

  // 1-Click Quick Login directly from PostgreSQL database seed
  const quickLogin = async (role) => {
    authError.value = null;
    try {
      const response = await api.quickLogin(role);
      if (response && response.user) {
        currentUser.value = response.user;
        currentRole.value = response.role || role;
        formRole.value = response.role || role;
        isAuthenticated.value = true;
        currentView.value = 'dashboard';
        showSuccess({
          id: `Berhasil masuk sebagai ${role.toUpperCase()} dari database. Selamat datang, ${currentUser.value.name}!`,
          en: `Signed in as ${role.toUpperCase()} directly from database. Welcome, ${currentUser.value.name}!`
        }, {
          id: 'Login Berhasil',
          en: 'Sign In Successful'
        });
        return true;
      }
    } catch (e) {
      console.warn('[Auth] Quick login error:', e.message);
      authError.value = e.message;
      showError({
        id: e.message || 'Gagal masuk akun. Silakan coba kembali.',
        en: e.message || 'Sign in failed. Please try again.'
      }, {
        id: 'Login Gagal',
        en: 'Sign In Failed'
      });
      return false;
    }
  };

  // Live Database Login
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
        showSuccess({
          id: `Selamat datang kembali, ${currentUser.value.name}!`,
          en: `Welcome back, ${currentUser.value.name}!`
        }, {
          id: 'Login Berhasil',
          en: 'Sign In Successful'
        });
        return true;
      } else {
        throw new Error('Respon server tidak valid.');
      }
    } catch (e) {
      const msg = {
        id: e.message || 'Email atau password salah. Periksa kembali akun Anda.',
        en: e.message || 'Invalid email or password. Please verify your credentials.'
      };
      authError.value = msg.id;
      showError(msg, { id: 'Login Gagal', en: 'Sign In Failed' });
      throw e;
    }
  };

  // Live Database Register
  const register = async ({ name, email, password, role, country, phone, spa_name }) => {
    authError.value = null;
    try {
      const response = await api.register({
        name,
        email: email.trim().toLowerCase(),
        password,
        role: role || 'tourist',
        country: country || (role === 'merchant' ? 'Indonesia' : 'Singapore'),
        phone: phone || null,
        spa_name: spa_name || null,
      });

      if (response && response.user) {
        currentUser.value = response.user;
        currentRole.value = response.role || role;
        formRole.value = currentRole.value;
        isAuthenticated.value = true;
        currentView.value = 'dashboard';
        showSuccess({
          id: `Akun berhasil dibuat dan tersimpan di database Supabase! Selamat datang, ${currentUser.value.name}`,
          en: `Account created and stored in Supabase database! Welcome, ${currentUser.value.name}`
        }, {
          id: 'Registrasi Berhasil',
          en: 'Registration Successful'
        });
        return true;
      } else {
        throw new Error('Gagal memproses pendaftaran.');
      }
    } catch (e) {
      const msg = {
        id: e.message || 'Registrasi gagal. Email mungkin sudah terdaftar.',
        en: e.message || 'Registration failed. Email may already be in use.'
      };
      authError.value = msg.id;
      showError(msg, { id: 'Registrasi Gagal', en: 'Registration Failed' });
      throw e;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {
      // ignore
    }
    currentUser.value = null;
    isAuthenticated.value = false;
    currentView.value = 'landing';
    showInfo({
      id: 'Anda telah berhasil keluar dari akun.',
      en: 'You have signed out of your account.'
    }, {
      id: 'Sesi Berakhir',
      en: 'Session Ended'
    });
  };

  const navigateTo = (view, role = null) => {
    currentView.value = view;
    if (role) {
      setRole(role);
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
