<template>
  <div class="merchant-dashboard">
    <!-- Owner Overview Hero Banner -->
    <div class="owner-hero glass-panel">
      <div class="hero-top">
        <div class="owner-meta">
          <span class="badge badge-gold">🏪 PORTAL PEMILIK SALON (UMKM)</span>
          <h2 class="salon-title">{{ merchantSalon.name }}</h2>
          <p class="salon-sub">📍 {{ merchantSalon.address }} ({{ merchantSalon.distanceMinutes }}m dari Ferry Harbour Bay)</p>
        </div>

        <div class="hero-actions">
          <button
            class="btn btn-emerald btn-sm"
            @click="activeMerchantTab = 'slots'"
          >
            ⚡ Siarkan Kursi Kosong
          </button>
        </div>
      </div>

      <!-- Quick Metrics Stats Row -->
      <div class="metrics-grid">
        <div class="metric-card glass-card">
          <span class="metric-label">Pendapatan Hari Ini</span>
          <div class="metric-val text-gold">Rp 1.450.000</div>
          <span class="metric-trend text-emerald">↑ +24% dari Flash Micro-Slots</span>
        </div>

        <div class="metric-card glass-card">
          <span class="metric-label">Tingkat Okupansi Kursi</span>
          <div class="metric-val text-emerald">85%</div>
          <span class="metric-trend">4/5 Kursi Terisi</span>
        </div>

        <div class="metric-card glass-card">
          <span class="metric-label">Wisatawan Masuk</span>
          <div class="metric-val">12 Tamu</div>
          <span class="metric-trend">🇸🇬 SG (8), 🇲🇾 MY (3), 🇦🇺 AU (1)</span>
        </div>

        <div class="metric-card glass-card">
          <span class="metric-label">Skor Higienitas</span>
          <div class="metric-val text-gold">99%</div>
          <span class="metric-trend text-emerald">🛡️ Zentura Verified</span>
        </div>
      </div>
    </div>

    <!-- Merchant Navigation Sub-Tabs -->
    <div class="merchant-nav-tabs">
      <button
        class="nav-tab"
        :class="{ active: activeMerchantTab === 'orders' }"
        @click="activeMerchantTab = 'orders'"
      >
        <span class="tab-icon">📥</span>
        <span>Pesanan Masuk</span>
        <span v-if="pendingCount > 0" class="badge-count">{{ pendingCount }}</span>
      </button>

      <button
        class="nav-tab"
        :class="{ active: activeMerchantTab === 'slots' }"
        @click="activeMerchantTab = 'slots'"
      >
        <span class="tab-icon">⚡</span>
        <span>Kontrol Slot Kilat</span>
      </button>

      <button
        class="nav-tab"
        :class="{ active: activeMerchantTab === 'profile' }"
        @click="activeMerchantTab = 'profile'"
      >
        <span class="tab-icon">🏢</span>
        <span>Profil & Higienitas</span>
      </button>
    </div>

    <!-- Active Sub-View Component -->
    <div class="merchant-view-content">
      <IncomingOrders v-if="activeMerchantTab === 'orders'" />
      <LiveSlotManager v-else-if="activeMerchantTab === 'slots'" />
      <MerchantProfile v-else-if="activeMerchantTab === 'profile'" />
    </div>

    <!-- Therapist Card Modal -->
    <TherapistCardModal />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useZenturaStore } from '../../composables/useZenturaStore';
import LiveSlotManager from './LiveSlotManager.vue';
import IncomingOrders from './IncomingOrders.vue';
import MerchantProfile from './MerchantProfile.vue';
import TherapistCardModal from './TherapistCardModal.vue';

const { merchantSalon, merchantBookings } = useZenturaStore();
const activeMerchantTab = ref('orders');

const pendingCount = computed(() => {
  return merchantBookings.value.filter(b => b.status === 'pending').length;
});
</script>

<style scoped>
.merchant-dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.owner-hero {
  padding: 1.25rem;
}

.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.salon-title {
  font-size: 1.3rem;
  color: var(--color-text-primary);
  margin: 0.35rem 0 0.2rem;
}

.salon-sub {
  font-size: 0.78rem;
  color: var(--color-text-muted);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
}

.metric-card {
  padding: 0.85rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
}

.metric-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  display: block;
  margin-bottom: 0.2rem;
}

.metric-val {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text-primary);
  margin-bottom: 0.2rem;
}

.metric-trend {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  display: block;
}

.merchant-nav-tabs {
  display: flex;
  gap: 0.5rem;
  background: rgba(8, 22, 18, 0.75);
  padding: 4px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
}

.nav-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 0.75rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
}

.nav-tab.active {
  background: rgba(22, 50, 42, 0.95);
  border-color: var(--border-active);
  color: var(--color-accent-gold);
}

.badge-count {
  background: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 99px;
}
</style>
