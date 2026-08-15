<template>
  <section id="live-demo" class="interactive-preview-section">
    <div class="section-header">
      <span class="section-badge">{{ t('sim_badge') }}</span>
      <h2 class="section-title">{{ t('sim_title') }}</h2>
      <p class="section-desc">
        {{ t('sim_desc') }}
      </p>
    </div>

    <!-- Tab Selector with i18n -->
    <div class="simulator-tabs">
      <button 
        class="sim-tab" 
        :class="{ active: activeSimTab === 'ai' }"
        @click="activeSimTab = 'ai'"
      >
        <span>{{ t('sim_tab_ai') }}</span>
      </button>

      <button 
        class="sim-tab" 
        :class="{ active: activeSimTab === 'matcher' }"
        @click="activeSimTab = 'matcher'"
      >
        <span>{{ t('sim_tab_matcher') }}</span>
      </button>

      <button 
        class="sim-tab" 
        :class="{ active: activeSimTab === 'fx' }"
        @click="activeSimTab = 'fx'"
      >
        <span>{{ t('sim_tab_fx') }}</span>
      </button>
    </div>

    <!-- Tab 1: AI Medical Translation Simulator -->
    <div v-if="activeSimTab === 'ai'" class="sim-card animate-fade-in">
      <div class="sim-split">
        <div class="sim-input-col">
          <label class="col-label">{{ currentLang === 'id' ? 'Input Tamu (Bahasa Inggris / Asing):' : 'Tourist Input (English / Multilingual):' }}</label>
          <textarea 
            v-model="simTextEn"
            rows="3"
            class="sim-textarea"
            :placeholder="currentLang === 'id' ? 'Ketik permintaan tamu dengan riwayat alergi atau keluhan...' : 'Type any guest request with allergy or injury...'"
            @input="runSimAi"
          ></textarea>

          <div class="sample-chips-row">
            <span class="chips-label">{{ currentLang === 'id' ? 'Contoh Template:' : 'Sample Presets:' }}</span>
            <button class="preset-pill" @click="loadSample('shoulder')">{{ currentLang === 'id' ? 'Pegal Bahu + Tanpa Minyak Kacang' : 'Shoulder Knots + No Peanut Oil' }}</button>
            <button class="preset-pill" @click="loadSample('pregnancy')">{{ currentLang === 'id' ? 'Ibu Hamil 16 Minggu (Lembut)' : 'Pregnancy 16 Wks (Gentle)' }}</button>
            <button class="preset-pill" @click="loadSample('ferry')">{{ currentLang === 'id' ? 'Refleksi Kilat 30m Sebelum Feri 16:30' : 'Express 30m Before 16:30 Ferry' }}</button>
          </div>
        </div>

        <div class="sim-output-col">
          <div class="output-header-row">
            <label class="col-label">{{ currentLang === 'id' ? 'Output AI: Kartu Instruksi Terapis Indonesia' : 'AI Output: Indonesian Therapist Brief Card' }}</label>
            <span class="latency-pill">Latency: {{ simLatency }}ms</span>
          </div>

          <div class="therapist-box-preview">
            <div v-if="simAiResult.allergy" class="allergy-flag-box">
              <strong>PERHATIAN MEDIS:</strong> {{ simAiResult.allergy }}
            </div>
            <div class="spec-row">
              <span><strong>Tekanan:</strong> {{ simAiResult.pressure }}</span>
              <span><strong>Fokus:</strong> {{ simAiResult.focus }}</span>
            </div>
            <div class="brief-text-box">
              <pre>{{ simAiResult.indonesianText }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 2: Dynamic Gap Matcher Simulator -->
    <div v-else-if="activeSimTab === 'matcher'" class="sim-card animate-fade-in">
      <div class="matcher-sim-container">
        <div class="sim-controls-row">
          <div class="control-box">
            <label class="control-label">{{ currentLang === 'id' ? 'Jendela Waktu Transit Anda:' : 'Your Free Transit Window:' }}</label>
            <div class="duration-selector">
              <button 
                v-for="dur in [30, 45, 60, 90]" 
                :key="dur"
                class="dur-btn"
                :class="{ active: simDuration === dur }"
                @click="simDuration = dur"
              >
                {{ dur }} {{ currentLang === 'id' ? 'menit' : 'mins' }}
              </button>
            </div>
          </div>

          <div class="control-box">
            <label class="control-label">{{ currentLang === 'id' ? 'Terminal Keberangkatan Feri:' : 'Ferry Departure Terminal:' }}</label>
            <select v-model="simTerminal" class="select-styled">
              <option value="harbour_bay">{{ currentLang === 'id' ? 'Batam Harbour Bay (Feri Langsung dari HarbourFront SG)' : 'Batam Harbour Bay (Direct from HarbourFront SG)' }}</option>
              <option value="batam_centre">{{ currentLang === 'id' ? 'Batam Centre (Feri Langsung dari Tanah Merah SG)' : 'Batam Centre (Direct from Tanah Merah SG)' }}</option>
              <option value="nongsa">{{ currentLang === 'id' ? 'Nongsa Pura (Feri Langsung dari Tanah Merah SG)' : 'Nongsa Pura (Direct from Tanah Merah SG)' }}</option>
            </select>
          </div>
        </div>

        <!-- Matched Flash Slots Grid -->
        <div class="matched-slots-row">
          <div class="slot-preview-card">
            <div class="card-head">
              <span class="chair-tag">{{ currentLang === 'id' ? 'Kursi 2 (Ruang VIP)' : 'Chair 2 (VIP Room)' }}</span>
              <span class="discount-badge">{{ currentLang === 'id' ? 'Hemat 25% Flash' : 'Save 25% Flash' }}</span>
            </div>
            <h4 class="slot-name">Martha Tilaar Spa Grand Batam</h4>
            <span class="slot-service">{{ currentLang === 'id' ? 'Relaksasi Ketegangan Punggung' : 'Balinese Express Tension Relief' }} ({{ simDuration }}m)</span>
            <div class="slot-footer">
              <div class="price-calc">
                <strong>SGD {{ (simDuration * 0.75).toFixed(2) }}</strong>
                <span class="strike">SGD {{ (simDuration * 1.0).toFixed(2) }}</span>
              </div>
              <button class="btn-fast-test" @click="quickLogin('tourist')">
                {{ currentLang === 'id' ? 'Uji Alur Reservasi →' : 'Test Booking Flow →' }}
              </button>
            </div>
          </div>

          <div class="slot-preview-card">
            <div class="card-head">
              <span class="chair-tag">{{ currentLang === 'id' ? 'Kursi 4' : 'Chair 4' }}</span>
              <span class="discount-badge">{{ currentLang === 'id' ? 'Hemat 20% Flash' : 'Save 20% Flash' }}</span>
            </div>
            <h4 class="slot-name">Eska Wellness Spa Harbour Bay</h4>
            <span class="slot-service">{{ currentLang === 'id' ? 'Refleksi Kaki & Akupresur' : 'Foot Reflexology & Acupressure' }} ({{ simDuration }}m)</span>
            <div class="slot-footer">
              <div class="price-calc">
                <strong>SGD {{ (simDuration * 0.65).toFixed(2) }}</strong>
                <span class="strike">SGD {{ (simDuration * 0.85).toFixed(2) }}</span>
              </div>
              <button class="btn-fast-test" @click="quickLogin('tourist')">
                {{ currentLang === 'id' ? 'Uji Alur Reservasi →' : 'Test Booking Flow →' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 3: FX & Treasury Simulator -->
    <div v-else-if="activeSimTab === 'fx'" class="sim-card animate-fade-in">
      <div class="fx-sim-container">
        <div class="fx-input-row">
          <div class="fx-input-box">
            <label class="control-label">{{ currentLang === 'id' ? 'Turis Membayar dalam Dolar Singapura (PayNow / QRIS):' : 'Tourist Pays in Singapore Dollars (PayNow / QRIS):' }}</label>
            <div class="currency-input-wrap">
              <span class="curr-symbol">SGD</span>
              <input v-model.number="simSgdAmount" type="number" class="curr-input" />
            </div>
          </div>
        </div>

        <div class="fx-breakdown-card">
          <div class="breakdown-item">
            <span class="b-label">{{ currentLang === 'id' ? 'Nilai Bruto Dikonversi (1 SGD = Rp 11.850):' : 'Converted Gross Value (1 SGD = Rp 11,850):' }}</span>
            <strong class="b-val">IDR {{ (simSgdAmount * 11850).toLocaleString('id-ID') }}</strong>
          </div>
          <div class="breakdown-item">
            <span class="b-label">{{ currentLang === 'id' ? 'Komisi Platform (Bagi Hasil 12,0%):' : 'Platform Take-Rate (12.0% Commission):' }}</span>
            <span class="b-fee">- IDR {{ (simSgdAmount * 11850 * 0.12).toLocaleString('id-ID') }}</span>
          </div>
          <div class="breakdown-item total">
            <span class="b-label">{{ currentLang === 'id' ? 'Pencairan Otomatis ke Bank Mitra (BI-FAST IDR):' : 'Automated Merchant BI-FAST Payout (IDR Direct):' }}</span>
            <strong class="b-payout">IDR {{ (simSgdAmount * 11850 * 0.88).toLocaleString('id-ID') }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../../composables/useAuth';
import { useLanguage } from '../../../composables/useLanguage';

const { quickLogin } = useAuth();
const { currentLang, t } = useLanguage();

const activeSimTab = ref('ai');

// AI Sim States
const simTextEn = ref('Chronic neck and shoulder stiffness, please avoid peanut massage oil due to skin allergy, prefer firm pressure.');
const simLatency = ref(182);
const simAiResult = ref({
  pressure: 'Kuat (Firm - Tekanan Dalam)',
  focus: 'Leher, Pundak & Belikat',
  allergy: 'DILARANG menggunakan minyak kacang. Wajib gunakan VCO murni.',
  indonesianText: 'Catatan Terapis Zentura AI:\n• Keluhan: Pegal leher & bahu kronis\n• Tekanan: Kuat\n• Minyak: VCO Murni\n• ⚠️ Peringatan: Pasien alergi minyak kacang'
});

const loadSample = (type) => {
  if (type === 'shoulder') {
    simTextEn.value = 'Chronic neck and shoulder stiffness, please avoid peanut massage oil due to skin allergy, prefer firm pressure.';
    simAiResult.value = {
      pressure: 'Kuat (Firm - Tekanan Dalam)',
      focus: 'Leher, Pundak & Belikat',
      allergy: 'DILARANG menggunakan minyak kacang. Wajib gunakan VCO murni.',
      indonesianText: 'Catatan Terapis Zentura AI:\n• Keluhan: Pegal leher & bahu kronis\n• Tekanan: Kuat\n• Minyak: VCO Murni\n• ⚠️ Peringatan: Pasien alergi minyak kacang'
    };
  } else if (type === 'pregnancy') {
    simTextEn.value = 'Guest is 16 weeks pregnant, gentle relaxing foot and leg relief only.';
    simAiResult.value = {
      pressure: 'Sangat Lembut (Gentle)',
      focus: 'Kaki & Betis (Hindari titik akupresur)',
      allergy: 'Kehamilan 16 Minggu! Hindari titik Sanyinjiao & Kunlun.',
      indonesianText: 'Catatan Terapis Zentura AI:\n• Kondisi: Tamu Hamil 16 Minggu\n• Tekanan: Sangat Lembut\n• ⚠️ Peringatan: Dilarang menekan titik induksi pergelangan kaki'
    };
  } else {
    simTextEn.value = 'Quick express 30 min reflexology, need to catch the 16:30 ferry back to Tanah Merah.';
    simAiResult.value = {
      pressure: 'Sedang (Moderate)',
      focus: 'Refleksi Telapak Kaki',
      allergy: 'None',
      indonesianText: 'Catatan Terapis Zentura AI:\n• Layanan: Refleksi Kilat 30 Menit\n• Target Selesai: Maksimal 15:45 WIB\n• Status Ferry: Terhubung'
    };
  }
};

const runSimAi = () => {
  simLatency.value = Math.floor(Math.random() * 40) + 160;
};

// Matcher Sim States
const simDuration = ref(45);
const simTerminal = ref('harbour_bay');

// FX Sim States
const simSgdAmount = ref(45);
</script>

<style scoped>
.interactive-preview-section {
  margin-bottom: 3rem;
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 2rem;
}

.section-badge {
  display: inline-block;
  font-size: 0.74rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  margin-bottom: 0.6rem;
}

.section-title {
  font-size: 1.85rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.section-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
}

.simulator-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.sim-tab {
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}

.sim-tab:hover {
  background: #eff6ff;
  color: #1e3a8a;
  border-color: #bfdbfe;
}

.sim-tab.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.25);
}

.sim-card {
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 24px -4px rgba(30, 58, 138, 0.08);
}

.sim-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.sim-input-col, .sim-output-col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.col-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.sim-textarea {
  width: 100%;
  padding: 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid #cbd5e1;
  font-family: inherit;
  font-size: 0.85rem;
  color: #0f172a;
  outline: none;
  line-height: 1.5;
}

.sim-textarea:focus {
  border-color: #2563eb;
}

.sample-chips-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
}

.chips-label {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 600;
}

.preset-pill {
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #1e3a8a;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.preset-pill:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.output-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.latency-pill {
  font-size: 0.7rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.therapist-box-preview {
  padding: 1.25rem;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.allergy-flag-box {
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-xs);
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  font-size: 0.78rem;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #334155;
}

.brief-text-box pre {
  font-family: inherit;
  font-size: 0.78rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  border-radius: var(--radius-xs);
  color: #0f172a;
  white-space: pre-wrap;
  margin: 0;
  line-height: 1.45;
}

/* Matcher Sim Styles */
.matcher-sim-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sim-controls-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.control-box {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.control-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1e3a8a;
}

.duration-selector {
  display: flex;
  gap: 0.4rem;
}

.dur-btn {
  flex: 1;
  padding: 0.55rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
}

.dur-btn.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
}

.select-styled {
  padding: 0.55rem 0.85rem;
  border-radius: var(--radius-xs);
  border: 1px solid #cbd5e1;
  font-size: 0.84rem;
  color: #0f172a;
  outline: none;
}

.matched-slots-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.slot-preview-card {
  padding: 1.35rem;
  border-radius: var(--radius-md);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chair-tag {
  font-size: 0.72rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.discount-badge {
  font-size: 0.7rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.slot-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.slot-service {
  font-size: 0.78rem;
  color: #64748b;
}

.slot-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.65rem;
  border-top: 1px solid #e2e8f0;
}

.price-calc {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.price-calc strong {
  font-size: 1.1rem;
  color: #0f172a;
}

.price-calc .strike {
  font-size: 0.74rem;
  color: #94a3b8;
  text-decoration: line-through;
}

.btn-fast-test {
  background: #1e3a8a;
  color: #ffffff;
  border: none;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.btn-fast-test:hover {
  background: #0f172a;
}

/* FX Sim Styles */
.fx-sim-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 680px;
  margin: 0 auto;
}

.currency-input-wrap {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-xs);
  overflow: hidden;
  margin-top: 0.35rem;
}

.curr-symbol {
  padding: 0.6rem 0.85rem;
  background: #f1f5f9;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e3a8a;
}

.curr-input {
  width: 100%;
  padding: 0.6rem 0.85rem;
  border: none;
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
  outline: none;
}

.fx-breakdown-card {
  padding: 1.5rem;
  border-radius: var(--radius-md);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.84rem;
}

.b-label {
  color: #475569;
}

.b-val {
  font-weight: 700;
  color: #0f172a;
}

.b-fee {
  font-weight: 700;
  color: #64748b;
}

.breakdown-item.total {
  padding-top: 0.85rem;
  border-top: 1px solid #e2e8f0;
}

.b-payout {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1e3a8a;
}

@media (max-width: 860px) {
  .sim-split {
    grid-template-columns: 1fr;
  }
  .sim-controls-row {
    grid-template-columns: 1fr;
  }
  .matched-slots-row {
    grid-template-columns: 1fr;
  }
}
</style>
