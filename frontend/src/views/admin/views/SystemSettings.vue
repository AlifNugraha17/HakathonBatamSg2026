<template>
  <div class="system-settings-view animate-fade-in">
    <div class="settings-grid">
      <!-- 1. Currency Exchange Rates Config -->
      <div class="settings-card">
        <div class="card-header">
          <h3 class="card-title">Foreign Exchange Rates (Live FX)</h3>
          <span class="card-sub">Automatic real-time cross-currency conversion for Singapore & Malaysia tourists</span>
        </div>

        <div class="form-body">
          <div class="form-group">
            <label>1 SGD to IDR</label>
            <div class="input-addon-wrap">
              <span class="addon">Rp</span>
              <input v-model.number="form.exchangeRates.SGD_TO_IDR" type="number" class="input-styled" />
            </div>
          </div>

          <div class="form-group">
            <label>1 MYR to IDR</label>
            <div class="input-addon-wrap">
              <span class="addon">Rp</span>
              <input v-model.number="form.exchangeRates.MYR_TO_IDR" type="number" class="input-styled" />
            </div>
          </div>

          <div class="form-group">
            <label>1 USD to IDR</label>
            <div class="input-addon-wrap">
              <span class="addon">Rp</span>
              <input v-model.number="form.exchangeRates.USD_TO_IDR" type="number" class="input-styled" />
            </div>
          </div>
        </div>
      </div>

      <!-- 2. AI Engine & Safety Settings -->
      <div class="settings-card">
        <div class="card-header">
          <h3 class="card-title">AI Engine & Integration Hub</h3>
          <span class="card-sub">NLP model parameters, automated WhatsApp webhooks, and default commissions</span>
        </div>

        <div class="form-body">
          <div class="form-group">
            <label>Active Medical NLP Model</label>
            <select v-model="form.aiModel" class="input-styled select">
              <option value="LokaBatam-MedNLP-v3.2">LokaBatam-MedNLP v3.2 (Production - Verified)</option>
              <option value="LokaBatam-MedNLP-v3.3-Beta">LokaBatam-MedNLP v3.3-Beta (Multi-Dialect)</option>
              <option value="GPT-4o-Mini">GPT-4o-Mini (Cloud Fallback)</option>
            </select>
          </div>

          <div class="form-group">
            <label>Standard Platform Take-Rate (%)</label>
            <div class="input-addon-wrap">
              <input v-model.number="form.platformCommissionPercent" type="number" class="input-styled" />
              <span class="addon">%</span>
            </div>
          </div>

          <div class="toggle-group">
            <label class="toggle-label">
              <input type="checkbox" v-model="form.enableWhatsAppBridge" />
              <div class="toggle-text">
                <span class="toggle-title">WhatsApp Cloud API Gateway</span>
                <span class="toggle-desc">Dispatch instant booking alerts directly to registered spa owners</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Bar in English -->
    <div class="save-bar">
      <span class="save-info">System configuration updates propagate immediately across all active cluster nodes.</span>
      <button class="btn-save-settings" @click="handleSave">
        Save Global Settings
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useAdminStore } from '../../../composables/useAdminStore';

const { systemSettings, saveSettings } = useAdminStore();

const form = reactive({
  exchangeRates: { ...systemSettings.value.exchangeRates },
  aiModel: systemSettings.value.aiModel,
  platformCommissionPercent: systemSettings.value.platformCommissionPercent,
  enableWhatsAppBridge: systemSettings.value.enableWhatsAppBridge
});

const handleSave = () => {
  saveSettings(form);
};
</script>

<style scoped>
.system-settings-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.settings-card {
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

.form-body {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
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

.input-addon-wrap {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-xs);
  overflow: hidden;
}

.input-addon-wrap:focus-within {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.addon {
  padding: 0.55rem 0.85rem;
  background: #f1f5f9;
  color: #1e3a8a;
  font-size: 0.8rem;
  font-weight: 700;
}

.input-styled {
  width: 100%;
  padding: 0.55rem 0.85rem;
  background: transparent;
  border: none;
  color: #0f172a;
  font-size: 0.84rem;
  outline: none;
}

.input-styled.select {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-xs);
}

.toggle-group {
  padding: 0.85rem;
  background: #eff6ff;
  border-radius: var(--radius-xs);
  border: 1px solid #bfdbfe;
  margin-top: 0.35rem;
}

.toggle-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}

.toggle-text {
  display: flex;
  flex-direction: column;
}

.toggle-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1e3a8a;
}

.toggle-desc {
  font-size: 0.74rem;
  color: #64748b;
}

.save-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.save-info {
  font-size: 0.8rem;
  color: #64748b;
}

.btn-save-settings {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.84rem;
  padding: 0.55rem 1.4rem;
  border-radius: var(--radius-xs);
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(29, 78, 216, 0.2);
  transition: all 0.15s;
}

.btn-save-settings:hover {
  background: #0f172a;
}

@media (max-width: 800px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
