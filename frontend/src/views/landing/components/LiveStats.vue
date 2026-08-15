<template>
  <section class="live-stats-bar">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Total Platform GMV</span>
          <span class="trend-pill">Live Database</span>
        </div>
        <div class="stat-val-row">
          <span class="stat-value">SGD {{ (metrics.totalGmvSgd || 0).toLocaleString('en-SG', { minimumFractionDigits: 2 }) }}</span>
          <span class="stat-sub">≈ Rp {{ (metrics.totalGmvIdr || 0).toLocaleString('id-ID') }} (PayNow ⇄ BI-FAST)</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Active Partner Spas</span>
          <span class="trend-pill blue">Supabase Vetted</span>
        </div>
        <div class="stat-val-row">
          <span class="stat-value">{{ salons.length || metrics.activeMerchantsCount || 0 }} Centers</span>
          <span class="stat-sub">{{ metrics.pendingVerificationMerchants || 0 }} Pending KYC Review</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Total Reservations</span>
          <span class="trend-pill">Live Orders</span>
        </div>
        <div class="stat-val-row">
          <span class="stat-value">{{ metrics.totalBookings || bookings.length || 0 }} Bookings</span>
          <span class="stat-sub">Singapore ⇄ Batam Corridor</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-label">Registered Accounts</span>
          <span class="trend-pill blue">PostgreSQL</span>
        </div>
        <div class="stat-val-row">
          <span class="stat-value">{{ metrics.totalUsers || 0 }} Users</span>
          <span class="stat-sub">Tourists, Spa Partners, & Admins</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAdminStore } from '../../../composables/useAdminStore';
import { useZenturaStore } from '../../../composables/useZenturaStore';

const { metrics, loadAdminDataFromApi } = useAdminStore();
const { salons, bookings, loadSalonsFromApi, loadBookingsFromApi } = useZenturaStore();

onMounted(() => {
  // Light background sync only if empty
  if (salons.value.length === 0) loadSalonsFromApi();
  if (bookings.value.length === 0) loadBookingsFromApi();
  if (!metrics.value.totalUsers) loadAdminDataFromApi();
});
</script>

<style scoped>
.live-stats-bar {
  margin-bottom: 2.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-card {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.15s ease;
}

.stat-card:hover {
  border-color: #93c5fd;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(30, 58, 138, 0.08);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: #2563eb;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.stat-label {
  font-size: 0.74rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.trend-pill {
  font-size: 0.68rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  padding: 0.1rem 0.45rem;
  border-radius: var(--radius-xs);
}

.trend-pill.blue {
  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.stat-val-row {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.45rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.stat-sub {
  font-size: 0.72rem;
  color: #64748b;
  margin-top: 0.25rem;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
