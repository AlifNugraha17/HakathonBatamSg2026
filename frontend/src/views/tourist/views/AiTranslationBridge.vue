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

        <!-- Voice Input Microphone Control Bar -->
        <div class="mic-control-bar">
          <div class="mic-lang-select">
            <span class="mic-label">🎤 Bahasa Suara:</span>
            <select v-model="spokenLang" class="select-mic-lang">
              <option value="zh-CN">🇨🇳 Mandarin (中文)</option>
              <option value="en-US">🇬🇧 English (Singapore/Global)</option>
              <option value="id-ID">🇮🇩 Bahasa Indonesia</option>
            </select>
          </div>

          <button 
            type="button" 
            class="btn-mic-record" 
            :class="{ 'is-recording': isRecording }"
            @click="toggleVoiceRecording"
          >
            <span class="mic-icon">{{ isRecording ? '🔴' : '🎙️' }}</span>
            <span>{{ isRecording ? 'Mendengarkan... (Klik untuk Selesai)' : 'Bicara Lewat Mic' }}</span>
          </button>
        </div>

        <!-- Free Text Area -->
        <div class="textarea-wrap" :class="{ 'recording-active': isRecording }">
          <textarea
            v-model="inputText"
            class="input-textarea"
            rows="4"
            placeholder="Describe your muscle knots, pain points, or medical conditions in plain English, Mandarin (e.g. 肩颈酸痛), or click 'Bicara Lewat Mic' to speak..."
            @input="handleInput"
          ></textarea>
          <div v-if="isRecording" class="recording-indicator-badge">
            <span class="rec-dot"></span>
            <span>AI Mic Mendengarkan Suara Anda...</span>
          </div>
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

          <!-- Structured Luxury Clinical Card for Indonesian Therapist -->
          <div class="luxury-therapist-card">
            <!-- Card Header -->
            <div class="card-clinical-header">
              <div class="header-emblem-wrap">
                <span class="emblem-icon">📋</span>
                <div>
                  <h4 class="clinical-card-title">KARTU INSTRUKSI TERAPIS</h4>
                  <span class="clinical-card-sub">Protokol Medis & Relaksasi Zentura AI</span>
                </div>
              </div>
              <button class="btn-copy-clinical" @click="copyBrief">
                {{ copied ? '✓ Tersalin!' : '📋 Salin Format WhatsApp' }}
              </button>
            </div>

            <!-- Card Body Grid -->
            <div class="clinical-card-body">
              <!-- Row 1: Original Request / Permintaan Tamu -->
              <div class="clinical-row">
                <div class="row-label">
                  <span class="row-icon">💬</span>
                  <span>Catatan Asli Wisatawan (Bahasa Asal / Input):</span>
                </div>
                <div class="guest-quote-box">
                  <p class="guest-quote-text">"{{ inputText || 'Standard wellness relaxation request.' }}"</p>
                </div>
              </div>

              <!-- Row 1.5: Explicit Indonesian Translation Box -->
              <div class="clinical-row">
                <div class="row-label text-indo-label">
                  <span class="row-icon">🇮🇩</span>
                  <span>Hasil Terjemahan Instruksi AI (Bahasa Indonesia):</span>
                </div>
                <div class="indo-translation-box">
                  <p class="indo-translation-text">
                    {{ aiResult.translatedNarrative || 'Tamu meminta sesi perawatan pijat relaksasi tubuh secara menyeluruh dengan tekanan sedang seimbang.' }}
                  </p>
                </div>
              </div>

              <!-- Row 2: Pressure & Focus Specs -->
              <div class="clinical-specs-row">
                <div class="spec-cell">
                  <div class="spec-cell-label">⚡ Tingkat Tekanan Pijat:</div>
                  <div class="spec-cell-badge badge-pressure">
                    {{ aiResult.pressure || 'Sedang (Moderate)' }}
                  </div>
                </div>

                <div class="spec-cell">
                  <div class="spec-cell-label">🎯 Titik Fokus Pijatan:</div>
                  <div class="focus-pill-container">
                    <span v-for="(area, idx) in (aiResult.focusAreas || ['Seluruh Tubuh'])" :key="idx" class="focus-area-tag">
                      📍 {{ area }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Row 3: Oil / Minyak & Suasana -->
              <div class="clinical-specs-row">
                <div class="spec-cell">
                  <div class="spec-cell-label">🌿 Rekomendasi Minyak:</div>
                  <div class="spec-cell-badge badge-oil">
                    {{ (aiResult.allergyAlerts && aiResult.allergyAlerts.length > 0) ? 'Virgin Coconut Oil (VCO Murni Bebas Alergi)' : 'Minyak Herbal Alami Batam' }}
                  </div>
                </div>

                <div class="spec-cell">
                  <div class="spec-cell-label">🤫 Suasana Perawatan:</div>
                  <div class="spec-cell-badge badge-etiquette">
                    {{ aiResult.etiquette?.[0] || 'Sesi Hening (Relaksasi Penuh)' }}
                  </div>
                </div>
              </div>

              <!-- Row 4: Medical Safety Guardrails (If Any) -->
              <div v-if="aiResult.allergyAlerts && aiResult.allergyAlerts.length > 0" class="clinical-danger-row">
                <div class="danger-title">
                  <span>🚨 PERINGATAN KESELAMATAN & ALERGI MEDIS:</span>
                </div>
                <div class="danger-alerts-list">
                  <div v-for="(alert, idx) in aiResult.allergyAlerts" :key="idx" class="danger-item">
                    ⚠️ {{ alert }}
                  </div>
                </div>
              </div>
            </div>
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

const isRecording = ref(false);
const spokenLang = ref('zh-CN');
let recognitionInstance = null;

const toggleVoiceRecording = () => {
  if (typeof window === 'undefined') return;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    showToast('Browser Anda belum mendukung input suara SpeechRecognition. Gunakan Google Chrome / Edge.', 'warning');
    return;
  }

  if (isRecording.value) {
    if (recognitionInstance) recognitionInstance.stop();
    isRecording.value = false;
    return;
  }

  try {
    recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = spokenLang.value;
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;

    recognitionInstance.onstart = () => {
      isRecording.value = true;
      const langName = spokenLang.value === 'zh-CN' ? 'Bahasa Mandarin' : (spokenLang.value === 'en-US' ? 'Bahasa Inggris' : 'Bahasa Indonesia');
      showToast(`Mikrofon aktif! Silakan berbicara dalam ${langName}...`, 'info');
    };

    recognitionInstance.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      if (transcript) {
        inputText.value = transcript;
      }
    };

    recognitionInstance.onend = () => {
      isRecording.value = false;
      if (inputText.value.trim().length > 0) {
        executeTranslation();
        showToast('Suara berhasil ditangkap & diterjemahkan otomatis!', 'success');
      }
    };

    recognitionInstance.onerror = (e) => {
      console.warn('[SpeechRec Error]:', e);
      isRecording.value = false;
    };

    recognitionInstance.start();
  } catch (err) {
    console.warn('[SpeechRec Init Error]:', err);
    isRecording.value = false;
    showToast('Gagal mengaktifkan mikrofon.', 'warning');
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

/* Voice Input Control Bar */
.mic-control-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f1f5f9;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.mic-lang-select {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.mic-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #334155;
}

.select-mic-lang {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #0f172a;
  outline: none;
  cursor: pointer;
}

.btn-mic-record {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  background: #1e293b;
  color: #ffffff;
  font-size: 0.74rem;
  font-weight: 700;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-mic-record:hover {
  background: #0f172a;
}

.btn-mic-record.is-recording {
  background: #dc2626;
  animation: pulse-red 1.2s infinite ease-in-out;
  box-shadow: 0 0 12px rgba(220, 38, 38, 0.4);
}

@keyframes pulse-red {
  0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
  70% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); }
  100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
}

.textarea-wrap {
  display: flex;
  flex-direction: column;
  position: relative;
}

.textarea-wrap.recording-active textarea {
  border-color: #ef4444;
  background: #fff5f5;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.recording-indicator-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.5rem;
  background: rgba(220, 38, 38, 0.9);
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 700;
  border-radius: 4px;
  pointer-events: none;
  animation: fadeIn 0.2s ease;
}

.rec-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
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

/* =========================================
   LUXURY CLINICAL THERAPIST CARD STYLES
   ========================================= */
.luxury-therapist-card {
  border-radius: var(--radius-sm);
  background: #ffffff;
  border: 1px solid #cbd5e1;
  box-shadow: 0 4px 15px rgba(15, 23, 42, 0.05);
  overflow: hidden;
}

.card-clinical-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #ffffff;
  border-bottom: 2px solid #0284c7;
}

.header-emblem-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.emblem-icon {
  font-size: 1.2rem;
}

.clinical-card-title {
  margin: 0;
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: #ffffff;
}

.clinical-card-sub {
  font-size: 0.65rem;
  color: #94a3b8;
  display: block;
}

.btn-copy-clinical {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-copy-clinical:hover {
  background: #0284c7;
  border-color: #38bdf8;
}

.clinical-card-body {
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #f8fafc;
}

.clinical-row {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.row-label {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.guest-quote-box {
  background: #ffffff;
  border-left: 3px solid #64748b;
  padding: 0.5rem 0.75rem;
  border-radius: 0 6px 6px 0;
  border: 1px solid #e2e8f0;
  border-left-width: 3px;
}

.guest-quote-text {
  margin: 0;
  font-size: 0.8rem;
  color: #475569;
  font-style: italic;
  line-height: 1.4;
}

.text-indo-label {
  color: #047857 !important;
}

.indo-translation-box {
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-left: 4px solid #059669;
  padding: 0.65rem 0.85rem;
  border-radius: 0 6px 6px 0;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.08);
}

.indo-translation-text {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: #065f46;
  line-height: 1.5;
}

.clinical-specs-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

@media (max-width: 600px) {
  .clinical-specs-row {
    grid-template-columns: 1fr;
  }
}

.spec-cell {
  background: #ffffff;
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.spec-cell-label {
  font-size: 0.68rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
}

.spec-cell-badge {
  font-size: 0.78rem;
  font-weight: 700;
  color: #0f172a;
}

.badge-pressure {
  color: #0284c7;
}

.badge-oil {
  color: #047857;
}

.badge-etiquette {
  color: #6366f1;
}

.focus-pill-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.focus-area-tag {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  border-radius: 4px;
}

.clinical-danger-row {
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-left: 4px solid #e11d48;
  border-radius: 4px;
  padding: 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.danger-title {
  font-size: 0.72rem;
  font-weight: 800;
  color: #be123c;
}

.danger-alerts-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.danger-item {
  font-size: 0.75rem;
  font-weight: 700;
  color: #9f1239;
  line-height: 1.35;
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
