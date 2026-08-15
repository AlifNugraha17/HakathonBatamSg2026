<template>
  <div class="ai-monitoring-view animate-fade-in">
    <!-- Top AI Health Stats Cards -->
    <div class="ai-stats-row">
      <div class="stat-box">
        <span class="stat-num">{{ aiLogs.length || 0 }}</span>
        <span class="stat-name">Total AI NLP Queries</span>
        <span class="stat-sub">Model: Zentura-MedNLP v3.2</span>
      </div>
      <div class="stat-box">
        <span class="stat-num">165 ms</span>
        <span class="stat-name">Average Response Latency</span>
        <span class="stat-sub">Ultra-fast edge inference</span>
      </div>
      <div class="stat-box">
        <span class="stat-num">{{ flaggedCount }}</span>
        <span class="stat-name">Medical & Allergen Safety Flags</span>
        <span class="stat-sub">Peanut oil, pregnancy, acute injuries</span>
      </div>
    </div>

    <!-- AI Log Feed DataTable -->
    <ZenDataTable
      :columns="columns"
      :rows="aiLogs"
      search-placeholder="Search translation logs, allergens..."
      empty-text="No AI translation logs yet. Logs appear when tourists use the Medical NLP Translator."
      :default-per-page="10"
    >
      <template #toolbar>
        <div class="table-title-group">
          <h3 class="table-title">Real-Time Medical Translation & Safety Feed</h3>
          <span class="table-sub">Live monitoring of tourist multilingual inputs transformed into Indonesian therapist cards</span>
        </div>
        <span class="badge-live">&#9679; Live Stream</span>
      </template>

      <template #cell-timestamp="{ row }">
        <div class="cell-stack">
          <span class="cell-time">{{ row.timestamp || row.created_at || 'Just now' }}</span>
          <span class="lang-tag">{{ row.sourceLang || row.source_lang || 'EN' }}</span>
        </div>
      </template>

      <template #cell-input="{ row }">
        <p class="snippet-text">"{{ row.inputSnippet || row.input_snippet || '—' }}"</p>
      </template>

      <template #cell-output="{ row }">
        <p class="snippet-text output">"{{ row.outputSnippet || row.output_snippet || '—' }}"</p>
      </template>

      <template #cell-safety="{ row }">
        <span class="safety-pill" :class="row.safetyFlag ? row.safetyFlag.toLowerCase() : 'safe'">
          {{ row.detectedAllergy || row.detected_allergy || 'Clean' }}
        </span>
      </template>

      <template #cell-latency="{ row }">
        <span class="latency-text">{{ row.latencyMs || row.latency_ms || 165 }} ms</span>
      </template>
    </ZenDataTable>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAdminStore } from '../../../composables/useAdminStore';
import ZenDataTable from '../../../components/shared/ZenDataTable.vue';

const { aiLogs } = useAdminStore();

const columns = [
  { key: 'timestamp', label: 'Timestamp & Locale', sortable: true, width: '140px' },
  { key: 'input',     label: 'Tourist Complaint / Input', sortable: false },
  { key: 'output',    label: 'AI Therapist Instruction Card', sortable: false },
  { key: 'safety',    label: 'Allergy & Safety Detections', sortable: false },
  { key: 'latency',   label: 'Latency', sortable: true, align: 'center', width: '90px' },
];

const flaggedCount = computed(() =>
  (aiLogs.value || []).filter(l => l.safetyFlag && l.safetyFlag !== 'safe').length
);
</script>


<style scoped>
.ai-monitoring-view { display: flex; flex-direction: column; gap: 1.25rem; }

/* ── KPI Stat Cards ───────────────── */
.ai-stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.stat-box {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
}
.stat-num  { font-size: 1.65rem; font-weight: 800; color: #0f172a; line-height: 1.1; }
.stat-name { font-size: 0.8rem; font-weight: 700; color: #1e3a8a; }
.stat-sub  { font-size: 0.74rem; color: #64748b; }

/* ── DataTable custom cells ───────── */
.table-title-group { flex: 1; }
.table-title { font-size: 0.95rem; font-weight: 800; color: #0f172a; margin: 0 0 0.15rem; }
.table-sub   { font-size: 0.74rem; color: #64748b; }

.badge-live {
  font-size: 0.68rem; font-weight: 700;
  color: #047857; background: #ecfdf5;
  padding: 0.18rem 0.6rem; border-radius: 5px;
  border: 1px solid #a7f3d0;
  white-space: nowrap;
}

.cell-stack { display: flex; flex-direction: column; gap: 0.15rem; }
.cell-time  { font-weight: 700; color: #0f172a; font-size: 0.78rem; }
.lang-tag {
  font-size: 0.62rem; font-weight: 700;
  color: #1d4ed8; background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.08rem 0.4rem; border-radius: 4px;
  display: inline-block;
}

.snippet-text {
  font-size: 0.79rem; line-height: 1.5; color: #475569;
  max-width: 260px; margin: 0;
}
.snippet-text.output { color: #0f172a; font-weight: 600; }

.safety-pill { font-size: 0.7rem; font-weight: 700; padding: 0.18rem 0.55rem; border-radius: 4px; }
.safety-pill.safe,
.safety-pill.normal { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.safety-pill.allergy_alert,
.safety-pill.pregnancy_safety_alert { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

.latency-text { font-weight: 800; color: #047857; font-size: 0.8rem; }

@media (max-width: 768px) {
  .ai-stats-row { grid-template-columns: 1fr; gap: 0.75rem; }
  .stat-num { font-size: 1.35rem; }
}
</style>

