<template>
  <div class="merchant-profile-view animate-fade-in">
    <div class="profile-grid">
      <!-- Left: Spa Information Form -->
      <div class="info-card">
        <div class="card-header">
          <h3 class="card-title">Spa & Wellness Center Profile</h3>
          <span class="card-sub">This public information is displayed directly to cross-border travelers</span>
        </div>

        <form class="profile-form" @submit.prevent="handleSaveProfile">
          <div class="form-group">
            <label>Spa Center Name</label>
            <input v-model="form.name" type="text" class="input-styled" required />
          </div>

          <div class="form-group">
            <label>Promotional Tagline</label>
            <input v-model="form.tagline" type="text" class="input-styled" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>WhatsApp Reservation Hotlines</label>
              <input v-model="form.phone" type="text" class="input-styled" required />
            </div>
            <div class="form-group">
              <label>Ferry Terminal Proximity (Mins Walk)</label>
              <input v-model.number="form.distanceMinutes" type="number" class="input-styled" required />
            </div>
          </div>

          <div class="form-group">
            <label>Full Physical Address</label>
            <textarea v-model="form.address" rows="2" class="input-styled textarea"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Nearest Ferry Landmark</label>
              <input v-model="form.landmark" type="text" class="input-styled" />
            </div>
            <div class="form-group">
              <label>Daily Operating Hours</label>
              <input v-model="form.openHours" type="text" class="input-styled" />
            </div>
          </div>

          <button type="submit" class="btn-save-profile">
            Save Spa Profile
          </button>
        </form>
      </div>

      <!-- Right: Hygiene Audit Checklist -->
      <div class="audit-card">
        <div class="card-header">
          <h3 class="card-title">Hygiene & Sanitation Audit</h3>
          <span class="card-sub">Accreditation status and sanitization compliance</span>
        </div>

        <div class="hygiene-score-banner">
          <div class="score-number">{{ merchantSalon.hygieneScore }}/100</div>
          <div class="score-meta">
            <span class="score-status">Zentura Verified (Grade A)</span>
            <span class="score-audit-date">Audited on August 10, 2026</span>
          </div>
        </div>

        <div class="audit-checklist">
          <div class="check-item">
            <div class="check-info">
              <span class="check-title">Sanitized Fresh Linen & Towels Per Guest</span>
              <span class="check-desc">Disinfected at 70°C high-temperature wash</span>
            </div>
          </div>

          <div class="check-item">
            <div class="check-info">
              <span class="check-title">Medical-Grade Tool & Cup Sterilization</span>
              <span class="check-desc">Autoclave & UV disinfectant cycle</span>
            </div>
          </div>

          <div class="check-item">
            <div class="check-info">
              <span class="check-title">100% BNSP Certified Therapists</span>
              <span class="check-desc">Accredited national standard certification</span>
            </div>
          </div>

          <div class="check-item">
            <div class="check-info">
              <span class="check-title">Hypoallergenic Organic Massage Oils</span>
              <span class="check-desc">Zero nut allergen cross-contamination</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from 'vue';
import { useZenturaStore } from '../../../composables/useZenturaStore';
import { useNotification } from '../../../composables/useNotification';

const { merchantSalon } = useZenturaStore();
const { showToast } = useNotification();

const form = reactive({
  name: merchantSalon.value?.name || 'Martha Heritage Herbal Spa Grand Batam',
  tagline: merchantSalon.value?.tagline || 'Premier Cross-Border Authentic Wellness Center',
  phone: merchantSalon.value?.phone || '+62 812-7788-9900',
  distanceMinutes: merchantSalon.value?.distanceMinutes || merchantSalon.value?.distance_minutes || 5,
  address: merchantSalon.value?.address || 'Komplek Harbour Bay Blok B No. 12-14, Batu Ampar, Batam',
  landmark: merchantSalon.value?.landmark || 'Harbour Bay Ferry Terminal Gate 2 (2 Mins Walk)',
  openHours: merchantSalon.value?.openHours || '10:00 - 22:00 WIB'
});

watchEffect(() => {
  if (merchantSalon.value) {
    if (merchantSalon.value.name) form.name = merchantSalon.value.name;
    if (merchantSalon.value.tagline) form.tagline = merchantSalon.value.tagline;
    if (merchantSalon.value.phone) form.phone = merchantSalon.value.phone;
    if (merchantSalon.value.distanceMinutes || merchantSalon.value.distance_minutes) {
      form.distanceMinutes = merchantSalon.value.distanceMinutes || merchantSalon.value.distance_minutes;
    }
    if (merchantSalon.value.address) form.address = merchantSalon.value.address;
    if (merchantSalon.value.landmark) form.landmark = merchantSalon.value.landmark;
  }
});

const handleSaveProfile = () => {
  if (merchantSalon.value) {
    merchantSalon.value.name = form.name;
    merchantSalon.value.tagline = form.tagline;
    merchantSalon.value.phone = form.phone;
    merchantSalon.value.distanceMinutes = form.distanceMinutes;
    merchantSalon.value.address = form.address;
    merchantSalon.value.landmark = form.landmark;
  }
  showToast('Spa profile saved successfully!', 'success');
};
</script>

<style scoped>
.merchant-profile-view {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1rem;
}

.info-card,
.audit-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
}

.card-header {
  margin-bottom: 1.25rem;
}

.card-title {
  font-size: 1rem;
  color: #0f172a;
  font-weight: 700;
  margin: 0 0 0.15rem 0;
}

.card-sub {
  font-size: 0.76rem;
  color: #64748b;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-size: 0.78rem;
  color: #334155;
  font-weight: 600;
}

.input-styled {
  width: 100%;
  padding: 0.6rem 0.85rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-xs);
  color: #0f172a;
  font-size: 0.84rem;
  outline: none;
  font-family: inherit;
}

.input-styled:focus {
  border-color: #2563eb;
}

.input-styled.textarea {
  resize: vertical;
}

.btn-save-profile {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.84rem;
  padding: 0.6rem 1.4rem;
  border-radius: var(--radius-xs);
  border: none;
  cursor: pointer;
  margin-top: 0.35rem;
  align-self: flex-start;
  box-shadow: 0 2px 8px rgba(29, 78, 216, 0.2);
}

.btn-save-profile:hover {
  background: #0f172a;
}

.hygiene-score-banner {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-sm);
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  margin-bottom: 1.25rem;
}

.score-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1e3a8a;
  line-height: 1;
}

.score-meta {
  display: flex;
  flex-direction: column;
}

.score-status {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
}

.score-audit-date {
  font-size: 0.74rem;
  color: #64748b;
}

.audit-checklist {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.check-item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding-left: 0.25rem;
}

.check-item::before {
  content: "✓";
  color: #047857;
  font-weight: 800;
  font-size: 0.85rem;
  margin-top: 0.1rem;
}

.check-info {
  display: flex;
  flex-direction: column;
}

.check-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #0f172a;
}

.check-desc {
  font-size: 0.74rem;
  color: #64748b;
}

@media (max-width: 800px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
