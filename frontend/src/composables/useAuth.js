import { ref, computed } from 'vue';
import { useNotification } from './useNotification';

const currentView = ref('landing'); // 'landing' | 'login' | 'dashboard'
const currentRole = ref('admin'); // 'admin' | 'merchant' | 'tourist'
const formRole = ref('admin'); // 'admin' | 'merchant' | 'tourist'
const isAuthenticated = ref(false);

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

const currentUser = ref({
  id: 'usr-admin',
  name: 'Admin HQ',
  email: 'admin@zentura.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  title: 'Platform Master Admin'
});

export function useAuth() {
  const { showToast } = useNotification();

  const isRoleAdmin = computed(() => currentRole.value === 'admin');
  const isRoleMerchant = computed(() => currentRole.value === 'merchant');
  const isRoleTourist = computed(() => currentRole.value === 'tourist');

  const setFormRole = (role) => {
    formRole.value = role;
  };

  const setRole = (role) => {
    currentRole.value = role;
    formRole.value = role;
    if (role === 'admin') {
      currentUser.value = {
        id: 'usr-admin',
        name: 'Super Admin HQ',
        email: 'admin@zentura.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        title: 'Platform Master Admin'
      };
    } else if (role === 'merchant') {
      currentUser.value = {
        id: 'usr-merch',
        name: 'Ratna Dewi',
        email: 'partner@heritage-spa.id',
        role: 'merchant',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
        title: 'Owner — Martha Tilaar Spa'
      };
    } else {
      currentUser.value = {
        id: 'usr-tourist',
        name: 'Alexandre Tan',
        email: 'traveler@singapore.sg',
        role: 'tourist',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        title: 'Cross-Border Traveler'
      };
    }
  };

  const quickLogin = (role) => {
    setRole(role);
    isAuthenticated.value = true;
    currentView.value = 'dashboard';
    showToast(`Signed in as ${role.toUpperCase()}. Welcome, ${currentUser.value.name}!`, 'success');
  };

  // Dynamic login that infers role directly from email
  const login = (emailOrObj, passwordParam, roleParam) => {
    let email = '';
    let role = '';

    if (typeof emailOrObj === 'object' && emailOrObj !== null) {
      email = (emailOrObj.email || '').toLowerCase();
      role = emailOrObj.role;
    } else if (typeof emailOrObj === 'string') {
      email = emailOrObj.toLowerCase();
      role = roleParam;
    }

    // Infer role dynamically from email if not explicitly provided
    if (!role) {
      if (email.includes('admin') || email === 'admin@zentura.com') {
        role = 'admin';
      } else if (email.includes('partner') || email.includes('merchant') || email.includes('spa') || email === 'partner@heritage-spa.id') {
        role = 'merchant';
      } else {
        role = 'tourist';
      }
    }

    setRole(role);
    isAuthenticated.value = true;
    currentView.value = 'dashboard';
    showToast(`Welcome back, ${currentUser.value.name}!`, 'success');
    return true;
  };

  const logout = () => {
    isAuthenticated.value = false;
    currentView.value = 'landing';
    showToast('You have signed out safely.', 'info');
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
    isRoleAdmin,
    isRoleMerchant,
    isRoleTourist,
    PRESET_CREDENTIALS,
    setRole,
    setFormRole,
    quickLogin,
    login,
    logout,
    navigateTo
  };
}
