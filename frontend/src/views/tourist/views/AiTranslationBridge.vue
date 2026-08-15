<template>
  <div class="ai-bridge-view animate-fade-in">
    <!-- Header -->
    <div class="section-title-box">
      <div class="title-with-badge">
        <h2 class="view-heading">AI Medical & Multilingual Translation Studio</h2>
        <span class="badge-ai-model">Zentura-MedNLP v3.2</span>
      </div>
      <p class="view-subheading">
        Translate your health conditions, muscle soreness, and allergen risks from English, Mandarin, or Korean into verified Indonesian therapist cards with clinical safety alerts.
      </p>
    </div>

    <!-- Quick Preset Scenario Buttons -->
    <div class="quick-scenarios-strip">
      <span class="scenario-label">Try 1-Click Clinical Scenarios:</span>
      <div class="scenario-btns">
        <button class="btn-scenario" @click="loadScenario('allergy')">
          🚨 Peanut Allergy & Lower Back
        </button>
        <button class="btn-scenario" @click="loadScenario('mandarin')">
          🇨🇳 肩颈酸痛 / Mandarin Neck Strain
        </button>
        <button class="btn-scenario" @click="loadScenario('pregnancy')">
          🤰 Pregnancy & Gentle Lymphatic
        </button>
        <button class="btn-scenario" @click="loadScenario('deep_tissue')">
          💪 Deep Tissue Runners Leg Fatigue
        </button>
      </div>
    </div>

    <!-- Interactive Workbench Split Grid -->
    <div class="workbench-grid">
      <!-- Left Panel: Tourist Input Section -->
      <div class="workbench-card input-card">
        <div class="card-top">
          <div class="card-title-group">
            <span class="step-num">1</span>
            <h3 class="card-title">Tourist Health & Bodywork Input</h3>
          </div>
          <span class="lang-indicator">Multi-Language Input (EN/ZH/KO/MS)</span>
        </div>

        <!-- Free Text Area -->
        <div class="textarea-wrap">
          <textarea
            v-model="inputText"
            class="input-textarea"
            rows="4"
            placeholder="Describe your muscle knots, pain points, or medical conditions in plain English, Mandarin (e.g. 肩颈酸痛), or Korean..."
            @input="handleInput"
          ></textarea>
        </div>

        <!-- Quick Sensitivity & Body Tags -->
        <div class="preset-section">
          <label class="section-micro-label">Quick Health & Preference Tags:</label>
          <div class="tags-cloud">
            <button
              v-for="tag in presetTags"
              :key="tag.id"
              class="tag-pill"
              :class="{
                active: selectedTags.includes(tag.id),
                hazard: tag.isHazard
              }"
              @click="toggleTag(tag.id)"
            >
              <span v-if="tag.isHazard" class="hazard-icon">⚠️</span>
              <span>{{ tag.labelEn }}</span>
            </button>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="input-actions">
          <button class="btn-translate-now" :disabled="isTranslating" @click="executeTranslation">
            <span v-if="isTranslating" class="spinner"></span>
            <span>{{ isTranslating ? 'Analyzing Medical NLP...' : '⚡ Translate with AI' }}</span>
          </button>
          <button class="btn-clear" @click="clearInput">Reset</button>
        </div>
      </div>

      <!-- Right Panel: Live AI Therapist Card Output -->
      <div class="workbench-card output-card">
        <div class="card-top">
          <div class="card-title-group">
            <span class="step-num step-green">2</span>
            <h3 class="card-title">Generated Indonesian Therapist Card</h3>
          </div>
          <span class="badge-status-live" :class="{ translating: isTranslating }">
            {{ isTranslating ? 'Processing NLP...' : '● Live Translated' }}
          </span>
        </div>

        <!-- Output Content -->
        <div class="output-content">
          <!-- Allergy & Medical Alerts Banner -->
          <div v-if="aiResult.allergyAlerts && aiResult.allergyAlerts.length > 0" class="allergy-alert-box animate-shake">
            <div class="alert-header">
              <span class="alert-icon">🚨</span>
              <strong>PERINGATAN KESELAMATAN MEDIS / ALERGI:</strong>
            </div>
            <ul class="alert-list">
              <li v-for="(alert, i) in aiResult.allergyAlerts" :key="i">{{ alert }}</li>
            </ul>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="spec-grid">
            <div class="spec-card">
              <span class="spec-title">Tingkat Tekanan</span>
              <strong class="spec-val text-primary">{{ aiResult.pressure || 'Sedang (Medium)' }}</strong>
            </div>
            <div class="spec-card">
              <span class="spec-title">Fokus Area Anatomi</span>
              <strong class="spec-val">{{ aiResult.focusAreas?.join(', ') || 'Seluruh Tubuh' }}</strong>
            </div>
          </div>

          <!-- AI Text-to-Speech Voice Player for Indonesian Therapist -->
          <div class="tts-voice-box" :class="{ 'is-speaking': isSpeaking }">
            <div class="tts-left">
              <div class="tts-avatar-circle" :class="{ pulse: isSpeaking }">
                <span class="tts-icon">{{ isSpeaking ? '🔊' : '🎙️' }}</span>
              </div>
              <div class="tts-meta">
                <div class="tts-title-row">
                  <h4 class="tts-title">AI Voice Synthesizer (Bahasa Indonesia)</h4>
                  <span class="badge-tts-lang">id-ID Natural Audio</span>
                </div>
                <p class="tts-desc">
                  {{ isSpeaking ? 'Sedang membacakan instruksi medis & preferensi terapis...' : 'Putar audio instruksi medis agar didengarkan langsung oleh terapis di ruang spa' }}
                </p>
              </div>
            </div>

            <div class="tts-controls">
              <!-- Visual Equalizer -->
              <div v-if="isSpeaking" class="audio-equalizer">
                <span class="bar bar-1"></span>
                <span class="bar bar-2"></span>
                <span class="bar bar-3"></span>
                <span class="bar bar-4"></span>
                <span class="bar bar-5"></span>
              </div>

              <button class="btn-tts-action" :class="{ active: isSpeaking }" @click="toggleSpeech">
                <span class="btn-tts-icon">{{ isSpeaking ? '⏹️' : '▶️' }}</span>
                <span>{{ isSpeaking ? 'Hentikan Suara' : 'Dengarkan Instruksi Suara' }}</span>
              </button>
            </div>
          </div>

          <!-- Raw Therapist Notes Formatted Box -->
          <div class="therapist-brief-box">
            <div class="brief-header">
              <span class="brief-title">Salinan Kartu Instruksi Terapis:</span>
              <button class="btn-copy-brief" @click="copyBrief">
                {{ copied ? '✓ Tersalin!' : '📋 Salin Teks' }}
              </button>
            </div>
            <pre class="brief-pre">{{ aiResult.therapistNotesId }}</pre>
          </div>

          <!-- Actions: Direct WhatsApp Booking Trigger -->
          <div class="output-actions">
            <button class="btn-book-with-card" @click="bookWithThisCard">
              <span>Book Spa With This Medical Card →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAiTranslator } from '../../../composables/useAiTranslator';
import { useZenturaStore } from '../../../composables/useZenturaStore';
import { useNotification } from '../../../composables/useNotification';
import { AI_PRESET_TAGS } from '../../../data/translations';

const { isTranslating, translateAndFormatRequest } = useAiTranslator();
const { isAiTranslatorOpen, isWhatsAppModalOpen, selectedSlotForBooking } = useZenturaStore();
const { showToast } = useNotification();

const presetTags = AI_PRESET_TAGS;

const inputText = ref('Chronic lower back stiffness and shoulder knots. Allergic to peanut and lemongrass oil (please use virgin coconut oil only), prefer silent session.');
const selectedTags = ref(['shoulder_knots', 'firm_pressure', 'no_lemongrass', 'silent_session']);
const copied = ref(false);

const aiResult = ref({
  category: 'Sesi Relaksasi Terpadu',
  pressure: 'Kuat (Firm - Tekanan Dalam untuk Otot Kaku)',
  focusAreas: ['Bahu, Tengkuk & Belikat', 'Pinggang & Punggung Bawah'],
  allergyAlerts: [
    'PERINGATAN ALERGI KRITIS: DILARANG menggunakan minyak kacang / almond. Gunakan minyak zaitun / VCO murni.',
    'PERINGATAN ALERGI: DILARANG menggunakan minyak serai / lemongrass. Gunakan minyak kelapa murni (VCO).'
  ],
  etiquette: ['Sesi Hening (Tamu ingin istirahat total, mohon tidak mengajak mengobrol)'],
  therapistNotesId: '====================================\n📌 KARTU INSTRUKSI TERAPIS (ZENTURA AI)\n====================================\n• Layanan : Balinese Deep Tissue & Reflexology\n• Tekanan : Kuat (Firm - Tekanan Dalam untuk Otot Kaku)\n• Titik Fokus : Bahu, Tengkuk & Belikat, Pinggang & Punggung Bawah\n\n🚨 PERHATIAN MEDIS / ALERGI:\n  • PERINGATAN ALERGI KRITIS: DILARANG menggunakan minyak kacang / almond. Gunakan VCO murni.\n  • PERINGATAN ALERGI: DILARANG menggunakan minyak serai.\n\n🌿 SUASANA: Sesi Hening\n\n💬 Catatan Asli Tamu: "Chronic lower back stiffness and shoulder knots. Allergic to peanut and lemongrass oil..."'
});

let debounceTimer = null;

const handleInput = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    executeTranslation();
  }, 400);
};

const toggleTag = (tagId) => {
  if (selectedTags.value.includes(tagId)) {
    selectedTags.value = selectedTags.value.filter(id => id !== tagId);
  } else {
    selectedTags.value.push(tagId);
  }
  executeTranslation();
};

const executeTranslation = async () => {
  const res = await translateAndFormatRequest({
    freeTextEn: inputText.value,
    selectedTags: selectedTags.value,
    serviceName: 'Balinese Herbal Reflexology'
  });
  if (res) {
    aiResult.value = res;
  }
};

const loadScenario = (type) => {
  if (type === 'allergy') {
    inputText.value = 'Severe peanut oil anaphylaxis allergy! Lower back stiffness from long flight. Need firm pressure on lumbar.';
    selectedTags.value = ['lower_back', 'firm_pressure', 'no_peanuts'];
  } else if (type === 'mandarin') {
    inputText.value = '肩颈非常酸痛，工作压力大，力度要中等，千万不要按脊椎骨。';
    selectedTags.value = ['shoulder_knots', 'medium_pressure', 'silent_session'];
  } else if (type === 'pregnancy') {
    inputText.value = '1st trimester pregnancy. Gentle foot swelling relief and light neck massage only. Avoid abdominal pressure.';
    selectedTags.value = ['gentle_pressure', 'pregnant_safe'];
  } else if (type === 'deep_tissue') {
    inputText.value = 'Marathon runner with tight calves and glutes. Extra firm pressure, no artificial fragrance.';
    selectedTags.value = ['firm_pressure', 'feet_reflexology'];
  }
  executeTranslation();
  showToast('Loaded clinical scenario!', 'info');
};

const clearInput = () => {
  inputText.value = '';
  selectedTags.value = [];
  executeTranslation();
};

const copyBrief = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(aiResult.value.therapistNotesId);
    copied.value = true;
    showToast('Therapist instruction card copied to clipboard!', 'success');
    setTimeout(() => { copied.value = false; }, 2500);
  }
};

const isSpeaking = ref(false);
const speechRate = ref(1.0);

const toggleSpeech = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    showToast('Browser Anda tidak mendukung Web Speech Synthesis API.', 'warning');
    return;
  }

  if (isSpeaking.value) {
    window.speechSynthesis.cancel();
    isSpeaking.value = false;
    showToast('Audio dihentikan.', 'info');
    return;
  }

  // Format natural, polite spoken brief in Indonesian
  let text = 'Halo terapis. Berikut adalah instruksi perawatan khusus untuk tamu ini. ';
  
  if (aiResult.value.allergyAlerts && aiResult.value.allergyAlerts.length > 0) {
    text += 'Peringatan medis dan alergi sangat penting! ' + aiResult.value.allergyAlerts.join('. ') + '. ';
  }
  
  text += 'Tingkat tekanan yang diinginkan adalah ' + (aiResult.value.pressure || 'sedang') + '. ';
  
  if (aiResult.value.focusAreas && aiResult.value.focusAreas.length > 0) {
    text += 'Fokuskan pijatan pada area ' + aiResult.value.focusAreas.join(', ') + '. ';
  }
  
  if (aiResult.value.etiquette && aiResult.value.etiquette.length > 0) {
    text += 'Catatan suasana: ' + aiResult.value.etiquette.join('. ') + '. ';
  }
  
  text += 'Terima kasih dan selamat melayani tamu dengan baik.';

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = speechRate.value;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const idVoice = voices.find(v => v.lang === 'id-ID' || v.lang.startsWith('id') || v.name.toLowerCase().includes('indonesia'));
  if (idVoice) {
    utterance.voice = idVoice;
  }

  utterance.onstart = () => {
    isSpeaking.value = true;
    showToast('Memutar suara instruksi terapis (Bahasa Indonesia)...', 'success');
  };

  utterance.onend = () => {
    isSpeaking.value = false;
  };

  utterance.onerror = (e) => {
    console.warn('[TTS] Speech error:', e);
    isSpeaking.value = false;
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const bookWithThisCard = () => {
  selectedSlotForBooking.value = {
    salonName: 'Martha Heritage Spa (Harbour Bay)',
    serviceName: 'Customized AI-Guided Bodywork',
    priceIdr: 250000,
    time: '15:00 - 16:30',
    therapistName: 'Certified Senior Therapist'
  };
  isWhatsAppModalOpen.value = true;
};

onMounted(() => {
  executeTranslation();
});
</script>

<style scoped>
.ai-bridge-view {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-title-box {
  margin-bottom: 0.25rem;
}

.title-with-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.view-heading {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.02em;
}

.badge-ai-model {
  font-size: 0.68rem;
  font-weight: 800;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
}

.view-subheading {
  font-size: 0.84rem;
  color: #64748b;
  line-height: 1.55;
  margin: 0;
}

/* Quick Scenarios */
.quick-scenarios-strip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
}

.scenario-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #475569;
  white-space: nowrap;
}

.scenario-btns {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.btn-scenario {
  padding: 0.3rem 0.65rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #1e293b;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-scenario:hover {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #1d4ed8;
}

/* Workbench Grid */
.workbench-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.workbench-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.75rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.card-title-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #1e3a8a;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-num.step-green {
  background: #047857;
}

.card-title {
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.lang-indicator {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 600;
}

.badge-status-live {
  font-size: 0.7rem;
  font-weight: 800;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
}

.badge-status-live.translating {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

/* Input Card Content */
.textarea-wrap {
  display: flex;
  flex-direction: column;
}

.input-textarea {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  font-size: 0.84rem;
  color: #0f172a;
  line-height: 1.5;
  resize: vertical;
  outline: none;
  box-sizing: border-box;
  transition: all 0.15s ease;
}

.input-textarea:focus {
  background: #ffffff;
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1);
}

.section-micro-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.4rem;
  display: block;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag-pill {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tag-pill:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.tag-pill.active {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
  font-weight: 700;
}

.tag-pill.hazard {
  border-color: #fecaca;
  color: #b91c1c;
}

.tag-pill.hazard.active {
  background: #fef2f2;
  border-color: #f87171;
  color: #991b1b;
}

.hazard-icon {
  font-size: 0.75rem;
}

.input-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.btn-translate-now {
  flex: 1;
  padding: 0.65rem 1.25rem;
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 700;
  border-radius: var(--radius-xs);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: opacity 0.15s ease;
}

.btn-translate-now:hover:not(:disabled) {
  opacity: 0.92;
}

.btn-translate-now:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.btn-clear {
  padding: 0.65rem 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.btn-clear:hover {
  background: #f1f5f9;
  color: #0f172a;
}

/* Output Card Content */
.output-content {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.allergy-alert-box {
  background: #fef2f2;
  border: 1px solid #f87171;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.76rem;
  color: #991b1b;
  margin-bottom: 0.35rem;
}

.alert-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.78rem;
  color: #b91c1c;
  font-weight: 600;
}

.spec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.spec-card {
  padding: 0.65rem 0.85rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.spec-title {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #64748b;
}

.spec-val {
  font-size: 0.82rem;
  color: #0f172a;
  font-weight: 700;
}

.text-primary {
  color: #1d4ed8;
}

.therapist-brief-box {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #0f172a;
  overflow: hidden;
}

.brief-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.85rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brief-title {
  font-size: 0.72rem;
  font-weight: 700;
  color: #93c5fd;
}

.btn-copy-brief {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-copy-brief:hover {
  background: #1d4ed8;
}

.brief-pre {
  margin: 0;
  padding: 0.85rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.78rem;
  line-height: 1.5;
  color: #e2e8f0;
  white-space: pre-wrap;
  max-height: 220px;
  overflow-y: auto;
}

.output-actions {
  margin-top: 0.25rem;
}

.btn-book-with-card {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #047857 0%, #059669 100%);
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 800;
  border-radius: var(--radius-xs);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(4, 120, 87, 0.25);
  transition: all 0.15s ease;
}

.btn-book-with-card:hover {
  opacity: 0.92;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* =========================================
   TEXT-TO-SPEECH VOICE SYNTHESIZER STYLES
   ========================================= */
.tts-voice-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(59, 130, 246, 0.12) 100%);
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: var(--radius-sm);
  transition: all 0.25s ease;
}

.tts-voice-box.is-speaking {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.18) 0%, rgba(16, 185, 129, 0.15) 100%);
  border-color: rgba(56, 189, 248, 0.7);
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.25);
}

.tts-left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex: 1;
}

.tts-avatar-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(14, 165, 233, 0.15);
  border: 1.5px solid rgba(56, 189, 248, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.tts-avatar-circle.pulse {
  animation: pulse-ring 1.4s infinite ease-in-out;
  background: rgba(14, 165, 233, 0.3);
  border-color: #38bdf8;
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.6); }
  70% { box-shadow: 0 0 0 10px rgba(56, 189, 248, 0); }
  100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
}

.tts-meta {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.tts-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tts-title {
  margin: 0;
  font-size: 0.86rem;
  font-weight: 800;
  color: #f0fdf4;
}

.badge-tts-lang {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.15rem 0.45rem;
  background: rgba(56, 189, 248, 0.2);
  color: #38bdf8;
  border-radius: 9999px;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.tts-desc {
  margin: 0;
  font-size: 0.72rem;
  color: #94a3b8;
  line-height: 1.35;
}

.tts-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

/* Equalizer Bars */
.audio-equalizer {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 20px;
  padding: 0 0.25rem;
}

.audio-equalizer .bar {
  width: 3px;
  background: #38bdf8;
  border-radius: 2px;
  animation: equalize 1s infinite ease-in-out;
}

.audio-equalizer .bar-1 { height: 16px; animation-delay: 0.1s; }
.audio-equalizer .bar-2 { height: 10px; animation-delay: 0.3s; }
.audio-equalizer .bar-3 { height: 22px; animation-delay: 0.15s; }
.audio-equalizer .bar-4 { height: 14px; animation-delay: 0.4s; }
.audio-equalizer .bar-5 { height: 8px; animation-delay: 0.2s; }

@keyframes equalize {
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1.2); }
}

.btn-tts-action {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.95rem;
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: var(--radius-xs);
  border: 1px solid rgba(56, 189, 248, 0.4);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-tts-action:hover {
  background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
  transform: translateY(-1px);
}

.btn-tts-action.active {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border-color: rgba(248, 113, 113, 0.5);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.35);
}

@media (max-width: 900px) {
  .workbench-grid {
    grid-template-columns: 1fr;
  }
}
</style>
