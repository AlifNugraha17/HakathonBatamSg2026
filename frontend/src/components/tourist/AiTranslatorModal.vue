<template>
  <div v-if="isAiTranslatorOpen" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Header -->
      <div class="ai-modal-header">
        <div class="header-left">
          <div>
            <h3 class="modal-title">Zentura AI Medical & Language Bridge</h3>
            <p class="modal-subtitle">Translates tourist requests into structured polite Indonesian therapist cards</p>
          </div>
        </div>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>

      <!-- Service Context Summary in English -->
      <div class="service-context-banner">
        <div class="context-item">
          <span class="label">Spa Center:</span>
          <strong>{{ bookingContext.salonName }}</strong>
        </div>
        <div class="context-item">
          <span class="label">Service:</span>
          <span class="text-blue">{{ bookingContext.serviceName }}</span>
        </div>
        <div class="context-item">
          <span class="label">Slot:</span>
          <span>{{ bookingContext.time }}</span>
        </div>
      </div>

      <!-- Main Input & AI Output Split Grid -->
      <div class="bridge-grid">
        <!-- Left: Tourist Input Section (English) -->
        <div class="input-panel">
          <div class="panel-header">
            <h4 class="panel-title">Your Health Notes & Bodywork Preferences</h4>
          </div>

          <!-- Free Text Area -->
          <div class="textarea-wrap">
            <textarea
              v-model="freeTextEn"
              class="input-custom ai-textarea"
              rows="3"
              placeholder="e.g. Chronic shoulder stiffness, no lemongrass oil due to eczema, prefer silent relaxing session..."
              @input="triggerAutoTranslate"
            ></textarea>
          </div>

          <!-- Quick Preset Chips -->
          <div class="preset-section">
            <span class="preset-label">Quick Selection Tags:</span>
            <div class="preset-chips">
              <button
                v-for="tag in presetTags"
                :key="tag.id"
                class="tag-chip"
                :class="{
                  active: selectedTags.includes(tag.id),
                  hazard: tag.isHazard
                }"
                @click="toggleTag(tag.id)"
              >
                <span v-if="tag.isHazard">!</span>
                <span>{{ tag.labelEn }}</span>
              </button>
            </div>
          </div>

          <!-- Tourist Details (Name & Ferry Schedule) -->
          <div class="tourist-meta-form">
            <div class="meta-field">
              <label class="field-label">Your Name</label>
              <input
                type="text"
                v-model="touristName"
                class="input-custom"
                placeholder="e.g. Marcus Lim (SG)"
              />
            </div>
            <div class="meta-field">
              <label class="field-label">Ferry Departure Schedule</label>
              <input
                type="text"
                v-model="ferryTime"
                class="input-custom"
                placeholder="e.g. 17:30 to HarbourFront"
              />
            </div>
          </div>
        </div>

        <!-- Right: AI Localized Output (Bahasa Indonesia for local therapist) -->
        <div class="output-panel">
          <div class="panel-header">
            <div class="header-flag-title">
              <h4 class="panel-title">AI Therapist Instruction Card (Localized)</h4>
            </div>
            <span v-if="isTranslating" class="ai-status-badge">Processing NLP...</span>
            <span v-else class="ai-status-badge active">Live Translated</span>
          </div>

          <!-- Localized Therapist Card Preview -->
          <div class="therapist-preview-card">
            <!-- Allergy Red Warning (if any) -->
            <div v-if="aiResult.allergyAlerts && aiResult.allergyAlerts.length > 0" class="allergy-banner">
              <div class="allergy-text">
                <strong>PERHATIAN ALERGI / MEDIS:</strong>
                <div v-for="(alert, idx) in aiResult.allergyAlerts" :key="idx" class="alert-line">
                  • {{ alert }}
                </div>
              </div>
            </div>

            <!-- Focus & Pressure Specs -->
            <div class="card-spec-grid">
              <div class="spec-block">
                <span class="spec-label">Tingkat Tekanan</span>
                <div class="spec-value text-blue">
                  {{ aiResult.pressure }}
                </div>
              </div>

              <div class="spec-block">
                <span class="spec-label">Fokus Titik Pijat</span>
                <div class="spec-value">
                  {{ aiResult.focusAreas?.join(', ') || 'Seluruh Tubuh' }}
                </div>
              </div>
            </div>

            <!-- Etiquette / Special Requests -->
            <div v-if="aiResult.etiquette && aiResult.etiquette.length > 0" class="etiquette-block">
              <span class="spec-label">Suasana & Komunikasi</span>
              <div class="etiquette-tags">
                <span v-for="(eti, idx) in aiResult.etiquette" :key="idx" class="eti-pill">
                  {{ eti }}
                </span>
              </div>
            </div>

            <!-- Formatted Therapist Summary -->
            <div class="raw-notes-box">
              <span class="spec-label">Pratinjau Teks Lengkap Terapis:</span>
              <pre class="notes-pre">{{ aiResult.therapistNotesId }}</pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="ai-modal-footer">
        <div class="price-summary">
          <span class="price-sub">Total Rate:</span>
          <strong class="price-main">{{ formatPrice(bookingContext.priceIdr) }}</strong>
        </div>

        <div class="footer-buttons">
          <button class="btn-cancel" @click="closeModal">Cancel</button>
          <button class="btn-proceed" @click="proceedToWhatsApp">
            <span>Proceed to 1-Click WhatsApp Reservation →</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useZenturaStore } from '../../composables/useZenturaStore';
import { useCurrency } from '../../composables/useCurrency';
import { useAiTranslator } from '../../composables/useAiTranslator';
import { AI_PRESET_TAGS } from '../../data/translations';

const {
  isAiTranslatorOpen,
  selectedSlotForBooking,
  isWhatsAppModalOpen
} = useZenturaStore();

const { formatPrice } = useCurrency();
const { isTranslating, translateAndFormatRequest } = useAiTranslator();

const presetTags = AI_PRESET_TAGS;

const freeTextEn = ref('Firm pressure on shoulders and neck knots, allergic to lemongrass oil (use plain coconut oil), prefer quiet treatment to relax.');
const selectedTags = ref(['shoulder_knots', 'firm_pressure', 'no_lemongrass', 'silent_session']);
const touristName = ref('Marcus Lim');
const ferryTime = ref('17:30 WIB (Batam Fast)');

const aiResult = ref({
  category: 'Pijat Tradisional',
  pressure: 'Kuat (Firm - Tekanan Dalam)',
  focusAreas: ['Bahu, Tengkuk & Belikat'],
  allergyAlerts: ['PERINGATAN ALERGI: DILARANG menggunakan minyak serai / lemongrass. Gunakan virgin coconut oil (VCO).'],
  etiquette: ['Sesi Hening (Tamu ingin tidur/istirahat, mohon tidak mengajak mengobrol)'],
  therapistNotesId: 'Catatan Terapis Zentura AI:\n• Layanan: Relaksasi\n• Tingkat Tekanan: Kuat\n• Fokus: Bahu & Leher\n• ⚠️ Alergi Minyak Serai'
});

const bookingContext = computed(() => {
  return selectedSlotForBooking.value || {
    salonId: 'salon-1',
    salonName: 'Martha Heritage Herbal Spa',
    salonLandmark: '3 mins from Harbour Bay Ferry',
    salonPhone: '+6281270088990',
    serviceName: 'Balinese Herbal Oil Deep Tissue',
    priceIdr: 200000,
    time: '14:30 - 15:30',
    therapistName: 'Ibu Ratna'
  };
});

let debounceTimer = null;

const triggerAutoTranslate = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    runTranslation();
  }, 400);
};

const toggleTag = (tagId) => {
  if (selectedTags.value.includes(tagId)) {
    selectedTags.value = selectedTags.value.filter(id => id !== tagId);
  } else {
    selectedTags.value.push(tagId);
  }
  runTranslation();
};

const runTranslation = () => {
  const res = translateAndFormatRequest({
    textEn: freeTextEn.value,
    selectedTagIds: selectedTags.value,
    serviceName: bookingContext.value.serviceName
  });
  aiResult.value = res;
};

const closeModal = () => {
  isAiTranslatorOpen.value = false;
};

const proceedToWhatsApp = () => {
  isAiTranslatorOpen.value = false;
  isWhatsAppModalOpen.value = true;
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
  max-width: 820px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.ai-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.75rem;
  border-bottom: 1px solid #f1f5f9;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.modal-subtitle {
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

.service-context-banner {
  display: flex;
  gap: 1.5rem;
  padding: 0.75rem 1.75rem;
  background: #eff6ff;
  border-bottom: 1px solid #bfdbfe;
  flex-wrap: wrap;
}

.context-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: #334155;
}

.context-item .label {
  color: #1e3a8a;
  font-weight: 700;
}

.text-blue {
  color: #1e3a8a;
  font-weight: 700;
}

.bridge-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  padding: 1.5rem 1.75rem;
}

.input-panel, .output-panel {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  font-size: 0.86rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.ai-textarea {
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid #cbd5e1;
  font-family: inherit;
  font-size: 0.82rem;
  color: #0f172a;
  outline: none;
}

.ai-textarea:focus {
  border-color: #2563eb;
}

.preset-section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.preset-label {
  font-size: 0.74rem;
  font-weight: 700;
  color: #1e3a8a;
}

.preset-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag-chip {
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.tag-chip:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e3a8a;
}

.tag-chip.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
}

.tag-chip.hazard.active {
  background: #991b1b;
  border-color: #991b1b;
}

.tourist-meta-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.35rem;
}

.meta-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field-label {
  font-size: 0.74rem;
  font-weight: 600;
  color: #334155;
}

.ai-status-badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.ai-status-badge.active {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
}

.therapist-preview-card {
  padding: 1.15rem;
  border-radius: var(--radius-md);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.allergy-banner {
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-xs);
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  font-size: 0.76rem;
  line-height: 1.4;
}

.card-spec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.spec-block {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 0.15rem;
}

.spec-value {
  font-size: 0.82rem;
  font-weight: 700;
  color: #0f172a;
}

.etiquette-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.2rem;
}

.eti-pill {
  font-size: 0.72rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #334155;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.raw-notes-box {
  display: flex;
  flex-direction: column;
}

.notes-pre {
  font-family: inherit;
  font-size: 0.74rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 0.6rem;
  border-radius: var(--radius-xs);
  color: #0f172a;
  white-space: pre-wrap;
  margin: 0.25rem 0 0 0;
}

.ai-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.75rem;
  border-top: 1px solid #f1f5f9;
  background: #ffffff;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.price-summary {
  display: flex;
  flex-direction: column;
}

.price-sub {
  font-size: 0.7rem;
  color: #64748b;
}

.price-main {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
}

.footer-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.55rem 1rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.btn-proceed {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 700;
  padding: 0.55rem 1.35rem;
  border-radius: var(--radius-xs);
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(29, 78, 216, 0.2);
}

.btn-proceed:hover {
  background: #0f172a;
}

@media (max-width: 768px) {
  .bridge-grid {
    grid-template-columns: 1fr;
  }
}
</style>
