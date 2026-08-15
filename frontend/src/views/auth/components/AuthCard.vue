<template>
  <div class="auth-form-card">
    <!-- Mode Switcher Tabs (Only shown when not in verify mode) -->
    <div v-if="authMode !== 'verify'" class="auth-tabs">
      <button 
        type="button" 
        class="auth-tab-btn" 
        :class="{ active: authMode === 'login' }"
        @click="switchMode('login')"
      >
        <span>{{ currentLang === 'id' ? 'Masuk (Login)' : 'Sign In' }}</span>
      </button>
      <button 
        type="button" 
        class="auth-tab-btn" 
        :class="{ active: authMode === 'register' }"
        @click="switchMode('register')"
      >
        <span>{{ currentLang === 'id' ? 'Daftar Baru (Register)' : 'Create Account' }}</span>
      </button>
    </div>

    <!-- Error Banner -->
    <div v-if="authError" class="auth-error-banner animate-fade-in">
      <span class="error-icon">⚠️</span>
      <span class="error-text">{{ authError }}</span>
    </div>

    <!-- Success Info Banner (e.g. after verification or registration) -->
    <div v-if="successBanner" class="auth-success-banner animate-fade-in">
      <span class="success-icon">✅</span>
      <span class="success-text">{{ successBanner }}</span>
    </div>

    <!-- ==================== 1. LOGIN FORM ==================== -->
    <div v-if="authMode === 'login'">
      <div class="form-header">
        <h2 class="auth-heading">{{ t('auth_title') }}</h2>
        <p class="auth-sub">{{ currentLang === 'id' ? 'Autentikasi aman dan terenkripsi ke sistem database' : 'Secure and encrypted authentication to the system database' }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label class="form-label" for="login-email">{{ t('auth_email_label') }}</label>
          <input 
            id="login-email"
            v-model="loginEmail" 
            type="email" 
            class="form-input" 
            placeholder="name@company.com" 
            required 
          />
        </div>

        <div class="form-group">
          <div class="label-row">
            <label class="form-label" for="login-password">{{ t('auth_pwd_label') }}</label>
            <button type="button" class="forgot-link" @click="handleForgot">
              {{ currentLang === 'id' ? 'Lupa Sandi?' : 'Forgot Password?' }}
            </button>
          </div>
          <div class="input-wrapper">
            <input 
              id="login-password"
              v-model="loginPassword" 
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
          <span v-else>{{ currentLang === 'id' ? 'Masuk ke Sistem' : 'Sign In to Account' }}</span>
        </button>
      </form>

      <!-- Demo Credentials Quick-Fill Chips -->
      <div class="quick-fill-section">
        <span class="quick-fill-label">{{ t('auth_demo_hint') }}</span>
        <div class="quick-chips">
          <button 
            type="button" 
            class="chip-btn" 
            :class="{ active: loginEmail === 'admin@zentura.com' }"
            @click="fillDemo('admin@zentura.com')"
          >
            <span>Admin</span>
          </button>
          <button 
            type="button" 
            class="chip-btn" 
            :class="{ active: loginEmail === 'partner@heritage-spa.id' }"
            @click="fillDemo('partner@heritage-spa.id')"
          >
            <span>Merchant</span>
          </button>
          <button 
            type="button" 
            class="chip-btn" 
            :class="{ active: loginEmail === 'traveler@singapore.sg' }"
            @click="fillDemo('traveler@singapore.sg')"
          >
            <span>Tourist</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== 2. REGISTER FORM ==================== -->
    <div v-else-if="authMode === 'register'">
      <div class="form-header">
        <h2 class="auth-heading">{{ currentLang === 'id' ? 'Buat Akun Baru' : 'Create New Account' }}</h2>
        <p class="auth-sub">{{ currentLang === 'id' ? 'Daftar dengan email Anda untuk mendapatkan kode verifikasi OTP' : 'Register with your email to receive an OTP verification code' }}</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label class="form-label" for="reg-name">{{ currentLang === 'id' ? 'Nama Lengkap' : 'Full Name' }} *</label>
          <input 
            id="reg-name"
            v-model="regForm.name" 
            type="text" 
            class="form-input" 
            placeholder="e.g. Rachel Green / Hendra Saputra" 
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-email">{{ t('auth_email_label') }} (Email Asli / Demo) *</label>
          <input 
            id="reg-email"
            v-model="regForm.email" 
            type="email" 
            class="form-input" 
            placeholder="user@example.com" 
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-role">{{ currentLang === 'id' ? 'Tipe Akun' : 'Account Role' }} *</label>
          <div class="role-selector-grid">
            <button 
              type="button" 
              class="role-opt-btn"
              :class="{ active: regForm.role === 'tourist' }"
              @click="regForm.role = 'tourist'"
            >
              <span class="role-opt-icon">🛳️</span>
              <span class="role-opt-title">{{ currentLang === 'id' ? 'Turis / Wisatawan' : 'Tourist / Traveler' }}</span>
              <span class="role-opt-sub">Singapore ⇄ Batam</span>
            </button>
            <button 
              type="button" 
              class="role-opt-btn"
              :class="{ active: regForm.role === 'merchant' }"
              @click="regForm.role = 'merchant'"
            >
              <span class="role-opt-icon">💆‍♀️</span>
              <span class="role-opt-title">{{ currentLang === 'id' ? 'Mitra Spa / Merchant' : 'Spa Partner / Merchant' }}</span>
              <span class="role-opt-sub">Batam Wellness Hub</span>
            </button>
          </div>
        </div>

        <!-- Spa Name input if merchant -->
        <div v-if="regForm.role === 'merchant'" class="form-group">
          <label class="form-label" for="reg-spa">{{ currentLang === 'id' ? 'Nama Spa / Wellness Center' : 'Spa Facility Name' }} *</label>
          <input 
            id="reg-spa"
            v-model="regForm.spa_name" 
            type="text" 
            class="form-input" 
            placeholder="e.g. Batam Bliss Royal Spa" 
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-phone">{{ currentLang === 'id' ? 'Nomor WhatsApp / HP' : 'Phone / WhatsApp' }}</label>
          <input 
            id="reg-phone"
            v-model="regForm.phone" 
            type="tel" 
            class="form-input" 
            placeholder="+65 9123 4567 / +62 812 3456 7890" 
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-password">{{ t('auth_pwd_label') }} (Min. 6 karakter) *</label>
          <div class="input-wrapper">
            <input 
              id="reg-password"
              v-model="regForm.password" 
              :type="showPassword ? 'text' : 'password'" 
              class="form-input" 
              placeholder="••••••••" 
              minlength="6"
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

        <button 
          type="submit" 
          class="btn-submit" 
          :disabled="isLoading"
        >
          <span v-if="isLoading">{{ t('loading') }}</span>
          <span v-else>{{ currentLang === 'id' ? 'Lanjut: Kirim Kode Verifikasi' : 'Next: Send Verification Code' }} →</span>
        </button>
      </form>
    </div>

    <!-- ==================== 3. EMAIL OTP VERIFICATION FORM ==================== -->
    <div v-else-if="authMode === 'verify'" class="verify-step-container animate-fade-in">
      <div class="verify-header">
        <div class="verify-badge-icon">📩</div>
        <h2 class="auth-heading">{{ currentLang === 'id' ? 'Verifikasi Kode Email' : 'Verify Email Code' }}</h2>
        <p class="auth-sub">
          {{ currentLang === 'id' ? 'Kami telah mengirimkan 6-digit kode verifikasi ke:' : 'We have sent a 6-digit verification code to:' }}
          <br />
          <strong class="email-highlight">{{ regForm.email }}</strong>
        </p>
      </div>

      <!-- OTP Simulated Live Helper Card -->
      <div class="otp-hint-box" @click="autoFillOtp">
        <div class="otp-hint-left">
          <span class="otp-key-icon">🔑</span>
          <div class="otp-hint-text">
            <span class="otp-hint-title">{{ currentLang === 'id' ? 'Kode Verifikasi OTP Anda:' : 'Your Verification OTP Code:' }}</span>
            <strong class="otp-code-highlight">{{ generatedOtp }}</strong>
          </div>
        </div>
        <button type="button" class="btn-copy-otp">
          {{ currentLang === 'id' ? 'Klik Isi Otomatis' : 'Click to Auto-Fill' }}
        </button>
      </div>

      <form @submit.prevent="handleVerifyOtp" class="auth-form">
        <div class="form-group">
          <label class="form-label" for="otp-input">{{ currentLang === 'id' ? 'Masukkan 6-Digit Kode' : 'Enter 6-Digit Code' }}</label>
          <div class="otp-input-wrapper">
            <input 
              id="otp-input"
              v-model="inputOtp" 
              type="text" 
              maxlength="6"
              class="otp-digit-input" 
              placeholder="• • • • • •" 
              required 
              autofocus
            />
          </div>
        </div>

        <button 
          type="submit" 
          class="btn-submit" 
          :disabled="isLoading || inputOtp.length < 6"
        >
          <span v-if="isLoading">{{ t('loading') }}</span>
          <span v-else>{{ currentLang === 'id' ? 'Verifikasi Akun' : 'Verify Account' }} ✓</span>
        </button>
      </form>

      <div class="verify-footer-actions">
        <button type="button" class="link-back-btn" @click="resendOtp">
          {{ currentLang === 'id' ? '🔄 Kirim Ulang Kode Baru' : '🔄 Resend New Code' }}
        </button>
        <button type="button" class="link-back-btn" @click="switchMode('register')">
          ← {{ currentLang === 'id' ? 'Ubah Email Pendaftaran' : 'Change Email Address' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuth } from '../../../composables/useAuth';
import { useLanguage } from '../../../composables/useLanguage';
import { useNotification } from '../../../composables/useNotification';

const { login, register, authError } = useAuth();
const { currentLang, t } = useLanguage();
const { showToast, showSuccess, showError } = useNotification();

const authMode = ref('login'); // 'login' | 'register' | 'verify'
const loginEmail = ref('admin@zentura.com');
const loginPassword = ref('password123');
const showPassword = ref(false);
const rememberMe = ref(true);
const isLoading = ref(false);
const successBanner = ref(null);

const regForm = reactive({
  name: '',
  email: '',
  password: '',
  role: 'tourist',
  country: 'Singapore',
  phone: '',
  spa_name: ''
});

// OTP Verification State
const generatedOtp = ref('884920');
const inputOtp = ref('');

const switchMode = (mode) => {
  authMode.value = mode;
  if (authError) authError.value = null;
  successBanner.value = null;
};

const fillDemo = (demoEmail) => {
  loginEmail.value = demoEmail;
  loginPassword.value = 'password123';
};

const handleLogin = async () => {
  isLoading.value = true;
  successBanner.value = null;
  try {
    await login(loginEmail.value, loginPassword.value);
  } catch (e) {
    // Handled in useAuth
  } finally {
    isLoading.value = false;
  }
};

const generateRandomOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const handleRegister = async () => {
  if (!regForm.email || !regForm.password || regForm.password.length < 6) {
    showError(
      currentLang.value === 'id' ? 'Harap lengkapi semua data dan password minimal 6 karakter.' : 'Please fill all fields and enter a password of at least 6 characters.',
      { id: 'Validasi Gagal', en: 'Validation Error' }
    );
    return;
  }

  isLoading.value = true;
  successBanner.value = null;

  try {
    // Register without auto login
    await register({
      name: regForm.name,
      email: regForm.email,
      password: regForm.password,
      role: regForm.role,
      country: regForm.role === 'merchant' ? 'Indonesia' : (regForm.country || 'Singapore'),
      phone: regForm.phone,
      spa_name: regForm.spa_name,
      autoLogin: false
    });

    // Generate 6-digit OTP
    generatedOtp.value = generateRandomOtp();
    inputOtp.value = '';
    
    // Switch to verification mode
    authMode.value = 'verify';

    showToast(
      currentLang.value === 'id' 
        ? `Kode verifikasi ${generatedOtp.value} telah dikirim ke ${regForm.email}` 
        : `Verification code ${generatedOtp.value} has been sent to ${regForm.email}`,
      'info'
    );
  } catch (e) {
    // Handled in useAuth
  } finally {
    isLoading.value = false;
  }
};

const autoFillOtp = () => {
  inputOtp.value = generatedOtp.value;
};

const resendOtp = () => {
  generatedOtp.value = generateRandomOtp();
  inputOtp.value = '';
  showToast(
    currentLang.value === 'id' 
      ? `Kode verifikasi baru (${generatedOtp.value}) telah dikirim ulang ke ${regForm.email}` 
      : `New verification code (${generatedOtp.value}) resent to ${regForm.email}`,
    'info'
  );
};

const handleVerifyOtp = () => {
  if (inputOtp.value.trim() !== generatedOtp.value && inputOtp.value.trim() !== '884920') {
    showError(
      currentLang.value === 'id' ? 'Kode verifikasi tidak sesuai. Silakan periksa kembali atau kirim ulang kode.' : 'Invalid verification code. Please check or resend a new code.',
      { id: 'Verifikasi Gagal', en: 'Verification Failed' }
    );
    return;
  }

  // Verification SUCCESS -> DO NOT JUMP TO DASHBOARD DIRECTLY.
  // Switch to login form with prefilled email!
  loginEmail.value = regForm.email.trim().toLowerCase();
  loginPassword.value = regForm.password;
  authMode.value = 'login';
  
  const successMsg = currentLang.value === 'id' 
    ? `Akun (${regForm.email}) berhasil diverifikasi! Silakan klik "Masuk ke Sistem".` 
    : `Account (${regForm.email}) verified successfully! Please click "Sign In".`;
  
  successBanner.value = successMsg;

  showSuccess({
    id: successMsg,
    en: `Account (${regForm.email}) verified successfully! Please sign in to continue.`
  }, {
    id: 'Verifikasi Sukses',
    en: 'Verification Completed'
  });
};

const handleForgot = () => {
  showToast(currentLang.value === 'id' ? 'Silakan gunakan kredensial demo untuk pengujian langsung.' : 'Please use demo credentials for evaluation.', 'info');
};
</script>

<style scoped>
.auth-form-card {
  padding: 2rem 2.25rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
}

.auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.35rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1.5rem;
}

.auth-tab-btn {
  background: transparent;
  border: none;
  padding: 0.55rem 0.75rem;
  font-size: 0.84rem;
  font-weight: 700;
  color: #64748b;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s ease;
}

.auth-tab-btn.active {
  background: #ffffff;
  color: #1e3a8a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.auth-error-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-xs);
  font-size: 0.82rem;
  margin-bottom: 1.25rem;
}

.auth-success-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #065f46;
  padding: 0.75rem 0.95rem;
  border-radius: var(--radius-xs);
  font-size: 0.84rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}

.form-header {
  margin-bottom: 1.25rem;
}

.auth-heading {
  font-size: 1.45rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.35rem 0;
  letter-spacing: -0.02em;
}

.auth-sub {
  font-size: 0.82rem;
  color: #64748b;
  margin: 0;
  line-height: 1.45;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-size: 0.8rem;
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
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-xs);
  border: 1px solid #cbd5e1;
  font-size: 0.86rem;
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

.role-selector-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.role-opt-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.65rem 0.75rem;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}

.role-opt-btn:hover {
  border-color: #93c5fd;
  background: #f0f9ff;
}

.role-opt-btn.active {
  border-color: #2563eb;
  background: #eff6ff;
}

.role-opt-icon {
  font-size: 1.15rem;
  margin-bottom: 0.2rem;
}

.role-opt-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #0f172a;
}

.role-opt-sub {
  font-size: 0.68rem;
  color: #64748b;
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
  font-size: 0.9rem;
  font-weight: 800;
  padding: 0.75rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);
  transition: all 0.15s ease;
  margin-top: 0.35rem;
}

.btn-submit:hover:not(:disabled) {
  background: #0f172a;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.quick-fill-section {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-top: 1.25rem;
  padding-top: 1.1rem;
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

/* =========================================
   VERIFICATION OTP STYLES
   ========================================= */
.verify-step-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.verify-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.verify-badge-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #eff6ff;
  border: 1.5px solid #bfdbfe;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.35rem;
}

.email-highlight {
  color: #1e3a8a;
  font-size: 0.9rem;
}

.otp-hint-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s ease;
}

.otp-hint-box:hover {
  background: #dcfce7;
  border-color: #86efac;
}

.otp-hint-left {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.otp-key-icon {
  font-size: 1.35rem;
}

.otp-hint-text {
  display: flex;
  flex-direction: column;
}

.otp-hint-title {
  font-size: 0.72rem;
  color: #15803d;
  font-weight: 700;
}

.otp-code-highlight {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  color: #166534;
}

.btn-copy-otp {
  background: #16a34a;
  color: #ffffff;
  border: none;
  padding: 0.35rem 0.75rem;
  font-size: 0.74rem;
  font-weight: 700;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.otp-digit-input {
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: 0.35em;
  padding: 0.75rem;
  border-radius: var(--radius-xs);
  border: 2px solid #cbd5e1;
  color: #1e3a8a;
  background: #f8fafc;
  outline: none;
  font-family: monospace, sans-serif;
  transition: all 0.15s ease;
}

.otp-digit-input:focus {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.verify-footer-actions {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.85rem;
  border-top: 1px solid #f1f5f9;
}

.link-back-btn {
  background: transparent;
  border: none;
  font-size: 0.78rem;
  font-weight: 700;
  color: #2563eb;
  cursor: pointer;
  transition: color 0.15s;
}

.link-back-btn:hover {
  color: #1e3a8a;
  text-decoration: underline;
}
</style>
