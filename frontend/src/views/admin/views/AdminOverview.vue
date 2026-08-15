<template>
  <div class="admin-overview-view animate-fade-in">
    <!-- Top KPI Grid in English -->
    <div class="kpi-grid">
      <AdminKpiCard
        title="Total Ecosystem GMV"
        :value="'SGD ' + Number(metrics.totalGmvSgd || 0).toLocaleString()"
        :subtitle="'≈ IDR ' + Number(metrics.totalGmvIdr || 0).toLocaleString('id-ID')"
        trend="Live Sync"
        :trendPositive="true"
      />

      <AdminKpiCard
        title="Verified Spa Partners"
        :value="metrics.activeMerchantsCount || 0"
        :subtitle="(metrics.pendingVerificationMerchants || 0) + ' Pending KYC Review'"
        trend="Active"
        :trendPositive="true"
      />

      <AdminKpiCard
        title="AI Translation Volume"
        :value="Number(metrics.totalAiTranslationsMonth || 0).toLocaleString()"
        :subtitle="(metrics.avgTranslationLatencyMs || 0) + 'ms Avg Latency'"
        trend="Zentura NLP"
        :trendPositive="true"
      />

      <AdminKpiCard
        title="Platform Take-Rate"
        :value="'IDR ' + Number(metrics.totalPlatformCommissionIdr || 0).toLocaleString('id-ID')"
        subtitle="12% Standard Commission"
        trend="Automated"
        :trendPositive="true"
      />
    </div>

    <!-- Charts & Region Breakdown Row -->
    <div class="chart-and-geo-row">
      <!-- Weekly Revenue Chart -->
      <div class="chart-card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Weekly Transaction Volume (IDR)</h3>
            <span class="card-sub">7-Day Gross Merchant Volume Distribution</span>
          </div>
          <span class="badge-pill">Live Sync</span>
        </div>

        <div class="visual-bar-chart">
          <div 
            v-for="item in revenueChartDays" 
            :key="item.day" 
            class="bar-column"
          >
            <div class="bar-track">
              <div 
                class="bar-fill" 
                :style="{ height: (item.idr / 120000000 * 100) + '%' }"
                :title="item.day + ': IDR ' + (item.idr / 1000000).toFixed(1) + 'M (' + item.bookings + ' bookings)'"
              >
                <span class="bar-val-label">{{ (item.idr / 1000000).toFixed(0) }}M</span>
              </div>
            </div>
            <span class="bar-day">{{ item.day }}</span>
          </div>
        </div>
      </div>

      <!-- Regional Distribution -->
      <div class="geo-card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Cross-Border Market Share</h3>
            <span class="card-sub">Transaction volume by economic zone</span>
          </div>
        </div>

        <div class="geo-list">
          <div class="geo-item">
            <div class="geo-header">
              <span class="geo-name">Batam Harbour Bay (Direct HarbourFront SG)</span>
              <span class="geo-pct">58%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 58%"></div>
            </div>
          </div>

          <div class="geo-item">
            <div class="geo-header">
              <span class="geo-name">Batam Centre (Tanah Merah SG)</span>
              <span class="geo-pct">28%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 28%"></div>
            </div>
          </div>

          <div class="geo-item">
            <div class="geo-header">
              <span class="geo-name">Nongsa Pura Coast (Tanah Merah SG)</span>
              <span class="geo-pct">14%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 14%"></div>
            </div>
          </div>
        </div>

        <div class="geo-callout">
          <p class="callout-text">
            Peak booking traffic occurs Friday afternoon to Sunday evening aligning with weekend ferry turnaround schedules.
          </p>
        </div>
      </div>
    </div>

    <!-- Live Stream Activity -->
    <div class="bottom-stream-row">
      <div class="stream-card">
        <div class="card-header">
          <h3 class="card-title">Real-Time Platform Activity</h3>
          <span class="stream-pulse-badge">Live Stream</span>
        </div>

        <div class="stream-items">
          <div class="stream-item">
            <div class="item-text">
              <span class="item-msg"><strong>Alexandre Tan (SG)</strong> completed booking for <em>Martha Tilaar Spa</em> via PayNow</span>
              <span class="item-time">2 mins ago • SGD 32.00</span>
            </div>
          </div>

          <div class="stream-item">
            <div class="item-text">
              <span class="item-msg"><strong>AI Medical Bridge</strong> flagged <em>Peanut Oil Allergy Alert</em> on tourist reservation #ZEN-4102</span>
              <span class="item-time">6 mins ago • Indonesian therapist card updated automatically</span>
            </div>
          </div>

          <div class="stream-item">
            <div class="item-text">
              <span class="item-msg"><strong>Nagoya Hill Reflexology</strong> submitted partner KYC verification documents</span>
              <span class="item-time">14 mins ago • Ready for admin approval</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '../../../composables/useAdminStore';
import AdminKpiCard from '../components/AdminKpiCard.vue';

const { metrics, revenueChartDays } = useAdminStore();
</script>

<style scoped>
.admin-overview-view {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.chart-and-geo-row {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 1rem;
}

.chart-card,
.geo-card,
.stream-card {
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

.badge-pill {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-xs);
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.visual-bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 160px;
  padding-top: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  gap: 0.75rem;
}

.bar-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.bar-track {
  width: 100%;
  max-width: 32px;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.bar-fill {
  width: 100%;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(180deg, #2563eb 0%, #1e3a8a 100%);
  transition: height 0.3s ease;
  position: relative;
  cursor: pointer;
}

.bar-fill:hover {
  background: #1d4ed8;
}

.bar-val-label {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.62rem;
  font-weight: 700;
  color: #1e3a8a;
}

.bar-day {
  font-size: 0.74rem;
  color: #64748b;
  margin-top: 0.4rem;
  font-weight: 600;
}

.geo-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 1rem;
}

.geo-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  margin-bottom: 0.25rem;
}

.geo-name {
  color: #334155;
  font-weight: 600;
}

.geo-pct {
  color: #1e3a8a;
  font-weight: 700;
}

.progress-track {
  width: 100%;
  height: 6px;
  border-radius: 99px;
  background: #f1f5f9;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%);
  border-radius: 99px;
}

.geo-callout {
  padding: 0.75rem 0.95rem;
  border-radius: var(--radius-sm);
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.callout-text {
  font-size: 0.76rem;
  color: #1e3a8a;
  line-height: 1.45;
  margin: 0;
  font-weight: 500;
}

.stream-pulse-badge {
  font-size: 0.68rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-xs);
  border: 1px solid #a7f3d0;
}

.stream-items {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.stream-item {
  padding: 0.85rem;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  border: 1px solid #f1f5f9;
}

.item-text {
  display: flex;
  flex-direction: column;
}

.item-msg {
  font-size: 0.82rem;
  color: #1e293b;
}

.item-time {
  font-size: 0.72rem;
  color: #64748b;
  margin-top: 0.2rem;
}

@media (max-width: 1024px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .chart-and-geo-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
