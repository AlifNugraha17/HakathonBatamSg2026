<template>
  <div class="quick-login-box">
    <div class="quick-header">
      <span class="quick-badge">{{ t('auth_quick_badge') }}</span>
      <h3 class="quick-title">{{ t('auth_quick_title') }}</h3>
      <p class="quick-subtitle">{{ t('auth_quick_sub') }}</p>
    </div>

    <div class="role-quick-cards">
      <!-- Super Admin Option -->
      <button class="role-quick-btn admin-btn" @click="handleQuickSelect('admin')">
        <div class="btn-top-row">
          <div class="role-identity">
            <span class="role-title">{{ currentLang === 'id' ? 'Super Admin HQ' : 'Super Admin HQ' }}</span>
            <span class="role-email">admin@zentura.com</span>
          </div>
          <span class="role-badge-pill admin">{{ currentLang === 'id' ? 'Tata Kelola Penuh' : 'Full Governance' }}</span>
        </div>
        <div class="role-quick-bullets">
          <span>• {{ currentLang === 'id' ? 'Dashboard KPI, Audit KYC Mitra, Log AI Medis & Settlement BI-FAST' : 'Executive KPIs, Merchant KYC Audits, AI Safety Logs & BI-FAST Settlements' }}</span>
        </div>
        <div class="launch-strip">
          <span>{{ currentLang === 'id' ? 'Akses Instan →' : 'Instant Launch →' }}</span>
        </div>
      </button>

      <!-- Merchant Option -->
      <button class="role-quick-btn merchant-btn" @click="handleQuickSelect('merchant')">
        <div class="btn-top-row">
          <div class="role-identity">
            <span class="role-title">{{ currentLang === 'id' ? 'Pemilik Mitra Spa' : 'Spa Partner Owner' }}</span>
            <span class="role-email">partner@heritage-spa.id</span>
          </div>
          <span class="role-badge-pill merchant">Martha Tilaar Batam</span>
        </div>
        <div class="role-quick-bullets">
          <span>• {{ currentLang === 'id' ? 'Siaran Kursi Kosong (Flash), Sinkronisasi WhatsApp & Kartu Terapis AI' : 'Flash Slot Broadcast, WhatsApp Order Sync & AI Therapist Instruction Cards' }}</span>
        </div>
        <div class="launch-strip">
          <span>{{ currentLang === 'id' ? 'Akses Instan →' : 'Instant Launch →' }}</span>
        </div>
      </button>

      <!-- Tourist Option -->
      <button class="role-quick-btn tourist-btn" @click="handleQuickSelect('tourist')">
        <div class="btn-top-row">
          <div class="role-identity">
            <span class="role-title">{{ currentLang === 'id' ? 'Layanan Turis' : 'Tourist Concierge' }}</span>
            <span class="role-email">traveler@singapore.sg</span>
          </div>
          <span class="role-badge-pill tourist">{{ currentLang === 'id' ? 'Wisatawan Singapura' : 'Singapore Traveler' }}</span>
        </div>
        <div class="role-quick-bullets">
          <span>• {{ currentLang === 'id' ? 'Pencocok Waktu Luang, Penerjemah Medis AI & Reservasi 1-Klik WA' : 'Time Gap Matcher, AI Medical Translator & 1-Click WhatsApp Booking' }}</span>
        </div>
        <div class="launch-strip">
          <span>{{ currentLang === 'id' ? 'Akses Instan →' : 'Instant Launch →' }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../../../composables/useAuth';
import { useLanguage } from '../../../composables/useLanguage';

const { quickLogin } = useAuth();
const { currentLang, t } = useLanguage();

const handleQuickSelect = (role) => {
  quickLogin(role);
};
</script>

<style scoped>
.quick-login-box {
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
}

.quick-header {
  margin-bottom: 1.25rem;
}

.quick-badge {
  font-size: 0.68rem;
  font-weight: 800;
  color: #1e3a8a;
  letter-spacing: 0.05em;
  display: inline-block;
  margin-bottom: 0.35rem;
}

.quick-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.01em;
}

.quick-subtitle {
  font-size: 0.8rem;
  color: #64748b;
  margin: 0;
  line-height: 1.4;
}

.role-quick-cards {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.role-quick-btn {
  padding: 1rem 1.15rem;
  border-radius: var(--radius-md);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
}

.role-quick-btn:hover {
  background: #ffffff;
  border-color: #93c5fd;
  box-shadow: 0 6px 16px -2px rgba(30, 58, 138, 0.08);
  transform: translateY(-1px);
}

.btn-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.role-identity {
  display: flex;
  flex-direction: column;
}

.role-title {
  font-size: 0.92rem;
  font-weight: 800;
  color: #0f172a;
}

.role-email {
  font-size: 0.74rem;
  color: #64748b;
}

.role-badge-pill {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.role-badge-pill.admin { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.role-badge-pill.merchant { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.role-badge-pill.tourist { background: #fefce8; color: #854d0e; border: 1px solid #fef08a; }

.role-quick-bullets {
  font-size: 0.74rem;
  color: #475569;
  line-height: 1.4;
}

.launch-strip {
  display: flex;
  justify-content: flex-end;
  font-size: 0.74rem;
  font-weight: 700;
  color: #2563eb;
  padding-top: 0.35rem;
}
</style>
