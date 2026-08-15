<template>
  <div v-if="selectedTherapistCardBooking" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Header in English -->
      <div class="therapist-header">
        <div class="header-left">
          <div>
            <h3 class="modal-title">AI Therapist Instruction Card (LokaBatam AI)</h3>
            <p class="modal-sub">Automatically translated & formatted for local practitioner clarity</p>
          </div>
        </div>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>

      <!-- Content -->
      <div class="therapist-body">
        <!-- Tourist Identity Strip -->
        <div class="tourist-strip">
          <div class="strip-left">
            <span class="tourist-name">{{ booking.guest_name || booking.guestName || booking.touristName || 'Maritime Traveler' }}</span>
            <span class="tourist-country">{{ booking.touristCountry || 'Singapore 🇸🇬' }}</span>
          </div>
          <div class="strip-right">
            <span class="booking-id-tag">#{{ booking.booking_code || booking.bookingCode || booking.id }}</span>
            <span class="time-tag">Time: {{ booking.booking_time || booking.appointmentTime || booking.time || '15:00 WIB' }}</span>
          </div>
        </div>

        <!-- Allergy Red Warning Banner -->
        <div
          v-if="booking.allergy_alert || (booking.aiTranslatedCard?.allergyAlerts && booking.aiTranslatedCard.allergyAlerts.length > 0)"
          class="red-alert-card"
        >
          <div class="alert-content">
            <h4 class="alert-title">ALLERGY & DERMATOLOGICAL SAFETY ALERT:</h4>
            <div v-if="booking.allergy_alert" class="alert-text">
              • {{ booking.allergy_alert }}
            </div>
            <div
              v-for="(alert, idx) in (booking.aiTranslatedCard?.allergyAlerts || [])"
              :key="idx"
              class="alert-text"
            >
              • {{ alert }}
            </div>
            <div class="alert-instruction">
              <em>*Wajib gunakan minyak alternatif (VCO / Olive Oil) sesuai instruksi keselamatan di atas.*</em>
            </div>
          </div>
        </div>

        <!-- Pressure & Focus Breakdown -->
        <div class="instruction-grid">
          <!-- Pressure Gauge -->
          <div class="grid-card">
            <div class="card-title-row">
              <h5>Pressure Preference</h5>
            </div>
            <div class="pressure-badge text-blue">
              {{ booking.aiTranslatedCard?.pressure || 'Kuat / Sedang (Firm)' }}
            </div>
            <p class="pressure-note">Konfirmasi kenyamanan tekanan pada 5 menit pertama.</p>
          </div>

          <!-- Focus Areas -->
          <div class="grid-card">
            <div class="card-title-row">
              <h5>Anatomical Focus Areas</h5>
            </div>
            <div class="focus-tags">
              <span
                v-for="(area, idx) in (booking.aiTranslatedCard?.focusAreas || ['Bahu & Leher', 'Punggung Bawah'])"
                :key="idx"
                class="focus-pill"
              >
                {{ area }}
              </span>
            </div>
          </div>
        </div>

        <!-- Etiquette & Communication -->
        <div class="etiquette-section">
          <div class="card-title-row">
            <h5>Ferry Transit Time Guarantee</h5>
          </div>
          <div class="etiquette-list">
            <div class="eti-item">
              <span>•</span>
              <span>Jadwal Feri: {{ booking.ferry_time || '17:00 Ferry to HarbourFront SG' }}</span>
            </div>
            <div class="eti-item">
              <span>•</span>
              <span>Layanan: {{ booking.service_name || booking.serviceName || 'Balinese Massage' }} ({{ booking.duration_minutes || 60 }} mins)</span>
            </div>
          </div>
        </div>

        <!-- Raw Notes Indonesian Full Text -->
        <div class="raw-notes-card">
          <h5 class="notes-header">Complete Indonesian Practitioner Card:</h5>
          <pre class="notes-pre">{{ booking.medical_notes || booking.aiTranslatedCard?.therapistNotesId || booking.touristNotes || 'Instruksi: Pijat relaksasi standar, tekanan sedang, fokus bahu dan leher.' }}</pre>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="therapist-footer">
        <button class="btn-print" @click="handlePrintCard">
          Print Brief Slip
        </button>
        <button class="btn-close" @click="closeModal">
          Close Brief
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLokaBatamStore } from '../../composables/useLokaBatamStore';
import { useNotification } from '../../composables/useNotification';

const { selectedTherapistCardBooking } = useLokaBatamStore();
const { showToast } = useNotification();

const booking = computed(() => selectedTherapistCardBooking.value || {});

const closeModal = () => {
  selectedTherapistCardBooking.value = null;
};

const handlePrintCard = () => {
  window.print();
  showToast('Printing therapist brief slip...', 'info');
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1.5rem;
}

.modal-content {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.therapist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.modal-sub {
  font-size: 0.78rem;
  color: #64748b;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  color: #94a3b8;
  cursor: pointer;
}

.therapist-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.tourist-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.strip-left {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.tourist-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
}

.tourist-country {
  font-size: 0.74rem;
  color: #1e3a8a;
  font-weight: 700;
}

.strip-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.booking-id-tag {
  font-size: 0.74rem;
  font-weight: 700;
  color: #0f172a;
}

.time-tag {
  font-size: 0.74rem;
  color: #64748b;
}

.red-alert-card {
  padding: 1rem 1.15rem;
  border-radius: var(--radius-sm);
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.alert-title {
  font-size: 0.8rem;
  font-weight: 800;
  margin-bottom: 0.35rem;
}

.alert-text {
  font-size: 0.78rem;
  margin-bottom: 0.2rem;
}

.alert-instruction {
  font-size: 0.74rem;
  margin-top: 0.4rem;
  color: #7f1d1d;
}

.instruction-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.grid-card {
  padding: 1.1rem;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.card-title-row h5 {
  font-size: 0.76rem;
  font-weight: 800;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.45rem;
}

.pressure-badge {
  font-size: 0.95rem;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 0.25rem;
}

.pressure-note {
  font-size: 0.72rem;
  color: #64748b;
  margin: 0;
}

.focus-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.focus-pill {
  font-size: 0.72rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.etiquette-section {
  padding: 1.1rem;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.etiquette-section h5 {
  font-size: 0.76rem;
  font-weight: 800;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.45rem;
}

.etiquette-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.eti-item {
  display: flex;
  gap: 0.45rem;
  font-size: 0.78rem;
  color: #334155;
}

.raw-notes-card {
  padding: 1.1rem;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.notes-header {
  font-size: 0.76rem;
  font-weight: 800;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.45rem;
}

.notes-pre {
  font-family: inherit;
  font-size: 0.76rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 0.65rem;
  border-radius: var(--radius-xs);
  color: #0f172a;
  white-space: pre-wrap;
  margin: 0;
  line-height: 1.45;
}

.therapist-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.65rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #f1f5f9;
  background: #ffffff;
}

.btn-print {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #334155;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.55rem 1.15rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s;
}

.btn-print:hover {
  background: #f8fafc;
  color: #0f172a;
}

.btn-close {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.55rem 1.35rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(29, 78, 216, 0.2);
}

.btn-close:hover {
  background: #0f172a;
}
</style>
