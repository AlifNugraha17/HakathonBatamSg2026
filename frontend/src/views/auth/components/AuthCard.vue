<template>
  <div class="auth-form-card">
    <div class="form-header">
      <h2 class="auth-heading">{{ t('auth_title') }}</h2>
      <p class="auth-sub">{{ t('auth_sub') }}</p>
    </div>

    <!-- Standard Login Form without Role Tabs -->
    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="form-group">
        <label class="form-label" for="email">{{ t('auth_email_label') }}</label>
        <input 
          id="email"
          v-model="email" 
          type="email" 
          class="form-input" 
          placeholder="name@company.com" 
          required 
        />
      </div>

      <div class="form-group">
        <div class="label-row">
          <label class="form-label" for="password">{{ t('auth_pwd_label') }}</label>
          <button type="button" class="forgot-link" @click="handleForgot">
            {{ currentLang === 'id' ? 'Lupa Sandi?' : 'Forgot Password?' }}
          </button>
        </div>
        <div class="input-wrapper">
          <input 
            id="password"
            v-model="password" 
            :type="showPassword ? 'text' : 'password'" 
            class="form-input" 
            placeholder="••••••••" 
            required 
          />
          <button 
            type="button" 
            class="toggle-pwd-btn" 
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? (currentLang === 'id' ? 'Tutup' : 'Hide') : (currentLang === 'id' ? 'Lihat' : 'Show') }}
          </button>
        </div>
      </div>

      <div class="form-options">
        <label class="remember-checkbox">
          <input type="checkbox" v-model="rememberMe" />
          <span>{{ t('auth_remember') }}</span>
        </label>
      </div>

      <button 
        type="submit" 
        class="btn-submit" 
        :disabled="isLoading"
      >
        <span v-if="isLoading">{{ t('loading') }}</span>
        <span v-else>{{ t('auth_signin_btn') }}</span>
      </button>
    </form>

    <!-- Discreet Demo Credentials Quick-Fill Chips -->
    <div class="quick-fill-section">
      <span class="quick-fill-label">{{ t('auth_demo_hint') }}</span>
      <div class="quick-chips">
        <button 
          type="button" 
          class="chip-btn" 
          :class="{ active: email === 'admin@zentura.com' }"
          @click="fillDemo('admin@zentura.com')"
        >
          <span>Admin</span>
        </button>
        <button 
          type="button" 
          class="chip-btn" 
          :class="{ active: email === 'partner@heritage-spa.id' }"
          @click="fillDemo('partner@heritage-spa.id')"
        >
          <span>Merchant</span>
        </button>
        <button 
          type="button" 
          class="chip-btn" 
          :class="{ active: email === 'traveler@singapore.sg' }"
          @click="fillDemo('traveler@singapore.sg')"
        >
          <span>Tourist</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../../composables/useAuth';
import { useLanguage } from '../../../composables/useLanguage';
import { useNotification } from '../../../composables/useNotification';

const { login } = useAuth();
const { currentLang, t } = useLanguage();
const { showToast } = useNotification();

const email = ref('admin@zentura.com');
const password = ref('password123');
const showPassword = ref(false);
const rememberMe = ref(true);
const isLoading = ref(false);

const fillDemo = (demoEmail) => {
  email.value = demoEmail;
  password.value = 'password123';
};

const handleSubmit = async () => {
  isLoading.value = true;
  await login(email.value, password.value);
  isLoading.value = false;
};

const handleForgot = () => {
  showToast(currentLang.value === 'id' ? 'Silakan gunakan kredensial demo untuk pengujian.' : 'Please use demo credentials for evaluation.', 'info');
};
</script>

<style scoped>
.auth-form-card {
  padding: 2.5rem 2.25rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
}

.form-header {
  margin-bottom: 1.5rem;
}

.auth-heading {
  font-size: 1.6rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.35rem 0;
  letter-spacing: -0.02em;
}

.auth-sub {
  font-size: 0.84rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-label {
  font-size: 0.82rem;
  font-weight: 700;
  color: #334155;
}

.forgot-link {
  background: transparent;
  border: none;
  font-size: 0.76rem;
  color: #2563eb;
  cursor: pointer;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 0.7rem 0.95rem;
  border-radius: var(--radius-xs);
  border: 1px solid #cbd5e1;
  font-size: 0.88rem;
  color: #0f172a;
  background: #ffffff;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}

.form-input:focus {
  border-color: #2563eb;
}

.toggle-pwd-btn {
  position: absolute;
  right: 0.85rem;
  background: transparent;
  border: none;
  font-size: 0.74rem;
  color: #64748b;
  cursor: pointer;
  font-weight: 600;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-checkbox {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8rem;
  color: #475569;
  cursor: pointer;
}

.btn-submit {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.92rem;
  font-weight: 800;
  padding: 0.8rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);
  transition: all 0.15s ease;
  margin-top: 0.5rem;
}

.btn-submit:hover {
  background: #0f172a;
  transform: translateY(-1px);
}

.quick-fill-section {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
}

.quick-fill-label {
  font-size: 0.74rem;
  color: #64748b;
  font-weight: 600;
}

.quick-chips {
  display: flex;
  gap: 0.4rem;
}

.chip-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 0.74rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.15s ease;
}

.chip-btn:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e3a8a;
}

.chip-btn.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
}
</style>
