<template>
  <div class="ai-monitoring-view animate-fade-in">
    <!-- Top AI Health & Safety Stats in English -->
    <div class="ai-stats-row">
      <div class="stat-box">
        <span class="stat-num">18,450</span>
        <span class="stat-name">Total AI NLP Queries</span>
        <span class="stat-sub">Model: Zentura-MedNLP v3.2</span>
      </div>

      <div class="stat-box">
        <span class="stat-num">185 ms</span>
        <span class="stat-name">Average Response Latency</span>
        <span class="stat-sub">Ultra-fast edge inference</span>
      </div>

      <div class="stat-box">
        <span class="stat-num">142</span>
        <span class="stat-name">Medical & Allergen Safety Flags</span>
        <span class="stat-sub">Peanut oil, pregnancy, acute injuries</span>
      </div>
    </div>

    <!-- AI Log Feed Table -->
    <div class="ai-logs-card">
      <div class="card-header">
        <div>
          <h3 class="card-title">Real-Time Medical Translation & Safety Feed</h3>
          <span class="card-sub">Live monitoring of tourist multilingual inputs transformed into Indonesian therapist cards</span>
        </div>
        <span class="badge-live">Live Stream</span>
      </div>

      <div class="table-container">
        <table class="custom-table">
          <thead>
            <tr>
              <th>TIMESTAMP & LOCALE</th>
              <th>TOURIST COMPLAINT / INPUT</th>
              <th>AI THERAPIST INSTRUCTION CARD</th>
              <th>ALLERGY & SAFETY DETECTIONS</th>
              <th>LATENCY</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in aiLogs" :key="log.id" class="table-row">
              <td>
                <div class="time-cell">
                  <span class="time-text">{{ log.timestamp }}</span>
                  <span class="lang-tag">{{ log.sourceLang }}</span>
                </div>
              </td>
              <td>
                <p class="snippet-text">"{{ log.inputSnippet }}"</p>
              </td>
              <td>
                <p class="snippet-text output">"{{ log.outputSnippet }}"</p>
              </td>
              <td>
                <span 
                  class="safety-pill" 
                  :class="log.safetyFlag.toLowerCase()"
                >
                  {{ log.detectedAllergy }}
                </span>
              </td>
              <td>
                <span class="latency-text">{{ log.latencyMs }} ms</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '../../../composables/useAdminStore';

const { aiLogs } = useAdminStore();
</script>

<style scoped>
.ai-monitoring-view {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.ai-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-box {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
}

.stat-num {
  font-size: 1.6rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.stat-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.15rem;
}

.stat-sub {
  font-size: 0.74rem;
  color: #64748b;
}

.ai-logs-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.card-title {
  font-size: 1rem;
  color: #0f172a;
  font-weight: 700;
  margin: 0;
}

.card-sub {
  font-size: 0.76rem;
  color: #64748b;
}

.badge-live {
  font-size: 0.68rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-xs);
  border: 1px solid #a7f3d0;
}

.table-container {
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.custom-table th {
  font-size: 0.72rem;
  font-weight: 800;
  color: #1e3a8a;
  letter-spacing: 0.04em;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.custom-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.82rem;
  vertical-align: middle;
}

.time-cell {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.time-text {
  font-weight: 700;
  color: #0f172a;
  font-size: 0.78rem;
}

.lang-tag {
  font-size: 0.65rem;
  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  display: inline-block;
  font-weight: 700;
}

.snippet-text {
  font-size: 0.8rem;
  line-height: 1.5;
  color: #475569;
  max-width: 280px;
  margin: 0;
}

.snippet-text.output {
  color: #0f172a;
  font-weight: 600;
}

.safety-pill {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.safety-pill.normal {
  background: #f1f5f9;
  color: #64748b;
}

.safety-pill.allergy_alert,
.safety-pill.pregnancy_safety_alert {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.latency-text {
  font-weight: 700;
  color: #047857;
  font-size: 0.78rem;
}

@media (max-width: 900px) {
  .ai-stats-row {
    grid-template-columns: 1fr;
  }
}
</style>
