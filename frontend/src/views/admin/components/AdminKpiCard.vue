<template>
  <div class="admin-kpi-card">
    <div class="kpi-top">
      <span class="kpi-title">{{ title }}</span>
      <span v-if="trend" class="kpi-trend" :class="trendPositive ? 'positive' : 'negative'">
        {{ trend }}
      </span>
    </div>
    <div class="kpi-body">
      <span class="kpi-value">{{ value }}</span>
      <span v-if="subtitle" class="kpi-subtitle">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  subtitle: { type: String, default: '' },
  trend: { type: String, default: '' },
  trendPositive: { type: Boolean, default: true }
});
</script>

<style scoped>
.admin-kpi-card {
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.15s ease;
}

.admin-kpi-card:hover {
  border-color: #93c5fd;
  box-shadow: 0 8px 16px -4px rgba(30, 58, 138, 0.08);
}

.kpi-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.65rem;
}

.kpi-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.kpi-trend {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.12rem 0.45rem;
  border-radius: var(--radius-xs);
}

.kpi-trend.positive {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.kpi-trend.negative {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.kpi-body {
  display: flex;
  flex-direction: column;
}

.kpi-value {
  font-size: 1.55rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.kpi-subtitle {
  font-size: 0.74rem;
  color: #64748b;
  margin-top: 0.25rem;
}
</style>
