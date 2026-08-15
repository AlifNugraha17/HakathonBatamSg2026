<template>
  <div class="merchant-overview-view animate-fade-in">
    <!-- Performance KPI Row from Live Database -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <span class="kpi-label">Total Revenue</span>
        <span class="kpi-val">IDR {{ totalRevenueIdr.toLocaleString('id-ID') }}</span>
        <span class="kpi-sub">≈ SGD {{ totalRevenueSgd.toFixed(2) }} (PayNow ⇄ BI-FAST)</span>
      </div>

      <div class="kpi-card">
        <span class="kpi-label">Total Bookings</span>
        <span class="kpi-val">{{ merchantBookings.length }} Orders</span>
        <span class="kpi-sub">{{ pendingBookings.length }} Pending Confirmation</span>
      </div>

      <div class="kpi-card">
        <span class="kpi-label">Active Flash Chairs</span>
        <span class="kpi-val">{{ activeFlashCount }} Chairs</span>
        <span class="kpi-sub">Broadcasted to Ferry Corridor</span>
      </div>

      <div class="kpi-card">
        <span class="kpi-label">Hygiene Audit Score</span>
        <span class="kpi-val">{{ merchantSalon.hygieneScore || merchantSalon.hygiene_score || 99 }}/100</span>
        <span class="kpi-sub">Zentura Verified Grade A</span>
      </div>
    </div>

    <!-- Active Flash Chairs and Pending Orders Summary -->
    <div class="split-overview-row">
      <!-- Flash Chairs Status -->
      <div class="overview-box">
        <div class="box-header">
          <h3 class="box-title">Active Flash Chairs</h3>
          <button class="link-btn" @click="$emit('switch-tab', 'slots')">Manage Broadcasts →</button>
        </div>

        <div v-if="merchantSalon.flashSlots && merchantSalon.flashSlots.length > 0" class="slots-list">
          <div 
            v-for="slot in merchantSalon.flashSlots" 
            :key="slot.id" 
            class="slot-item-mini"
            :class="{ active: slot.isFlashActive || slot.is_flash_active }"
          >
            <div class="slot-mini-left">
              <span class="chair-tag">{{ slot.chair }}</span>
              <div class="slot-mini-info">
                <span class="srv-name">{{ slot.serviceName || slot.service_name }} ({{ slot.durationMinutes || slot.duration_minutes }}m)</span>
                <span class="srv-therapist">Therapist: {{ slot.therapistName || slot.therapist_name }} • {{ slot.time || slot.time_window }}</span>
              </div>
            </div>
            <div class="slot-mini-right">
              <span class="slot-price">IDR {{ Number(slot.priceIdr || slot.price_idr).toLocaleString('id-ID') }}</span>
              <button 
                class="btn-toggle-slot"
                :class="(slot.isFlashActive || slot.is_flash_active) ? 'live' : 'off'"
                @click="toggleFlashSlot(slot.id)"
              >
                {{ (slot.isFlashActive || slot.is_flash_active) ? 'LIVE' : 'OFF' }}
              </button>
            </div>
          </div>
        </div>
        <div v-else class="empty-box-placeholder">
          <p>Belum ada broadcast kursi kosong. Klik "Manage Broadcasts" untuk membuat slot baru.</p>
        </div>
      </div>

      <!-- Pending Orders List -->
      <div class="overview-box">
        <div class="box-header">
          <h3 class="box-title">Reservations Awaiting Confirmation</h3>
          <button class="link-btn" @click="$emit('switch-tab', 'orders')">View All Orders →</button>
        </div>

        <div v-if="pendingBookings.length > 0" class="orders-list">
          <div v-for="b in pendingBookings" :key="b.id" class="order-item-mini">
            <div class="order-mini-top">
              <span class="order-id">#{{ b.booking_code || b.bookingCode || b.id }}</span>
              <span class="tourist-name">{{ b.guest_name || b.guestName || 'Traveler' }} ({{ b.guest_phone || b.guestPhone }})</span>
            </div>
            <div class="order-mini-service">
              <span>{{ b.service_name || b.serviceName }} • {{ b.booking_time || b.time || '14:30 WIB' }}</span>
            </div>
            <div class="order-mini-actions">
              <button class="btn-confirm-mini" @click="confirmBooking(b.id)">Accept & Confirm</button>
              <button class="btn-card-mini" @click="openTherapistCard(b)">AI Card</button>
            </div>
          </div>
        </div>

        <div v-else class="all-caught-up">
          <p>Semua pesanan tamu telah dikonfirmasi atau belum ada pesanan baru.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useZenturaStore } from '../../../composables/useZenturaStore';

defineEmits(['switch-tab']);

const { 
  merchantSalon, 
  merchantBookings, 
  toggleFlashSlot, 
  confirmBooking, 
  selectedTherapistCardBooking 
} = useZenturaStore();

const pendingBookings = computed(() => {
  return merchantBookings.value.filter(b => b.status === 'pending');
});

const totalRevenueIdr = computed(() => {
  return merchantBookings.value.reduce((acc, b) => acc + (Number(b.priceIdr || b.price_idr) || 0), 0);
});

const totalRevenueSgd = computed(() => {
  return totalRevenueIdr.value / 11850;
});

const activeFlashCount = computed(() => {
  if (!merchantSalon.value || !merchantSalon.value.flashSlots) return 0;
  return merchantSalon.value.flashSlots.filter(s => s.isFlashActive || s.is_flash_active).length;
});

const openTherapistCard = (booking) => {
  selectedTherapistCardBooking.value = booking;
};
</script>

<style scoped>
.merchant-overview-view {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.kpi-card {
  padding: 1.35rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
  transition: all 0.15s ease;
}

.kpi-card:hover {
  border-color: #93c5fd;
}

.kpi-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.4rem;
}

.kpi-val {
  font-size: 1.45rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.kpi-sub {
  font-size: 0.74rem;
  color: #64748b;
  margin-top: 0.35rem;
}

.split-overview-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.overview-box {
  background: #ffffff;
  border-radius: var(--radius-lg);
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.box-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.link-btn {
  background: transparent;
  border: none;
  color: #2563eb;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
}

.slots-list, .orders-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.slot-item-mini {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem;
  border-radius: var(--radius-md);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
}

.slot-item-mini.active {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.slot-mini-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chair-tag {
  font-size: 0.72rem;
  font-weight: 800;
  background: #1e3a8a;
  color: #ffffff;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-xs);
}

.slot-mini-info {
  display: flex;
  flex-direction: column;
}

.srv-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
}

.srv-therapist {
  font-size: 0.72rem;
  color: #64748b;
}

.slot-mini-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.slot-price {
  font-size: 0.88rem;
  font-weight: 800;
  color: #059669;
}

.btn-toggle-slot {
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-xs);
  border: none;
  cursor: pointer;
}

.btn-toggle-slot.live {
  background: #059669;
  color: #ffffff;
}

.btn-toggle-slot.off {
  background: #e2e8f0;
  color: #64748b;
}

.order-item-mini {
  padding: 0.85rem;
  border-radius: var(--radius-md);
  border: 1px solid #fed7aa;
  background: #fffbeb;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.order-mini-top {
  display: flex;
  justify-content: space-between;
}

.order-id {
  font-size: 0.74rem;
  font-weight: 800;
  color: #d97706;
}

.tourist-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #0f172a;
}

.order-mini-service {
  font-size: 0.78rem;
  color: #475569;
}

.order-mini-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.4rem;
}

.btn-confirm-mini {
  background: #059669;
  color: #ffffff;
  border: none;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.btn-card-mini {
  background: #1e3a8a;
  color: #ffffff;
  border: none;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.all-caught-up, .empty-box-placeholder {
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 0.85rem;
  background: #f8fafc;
  border-radius: var(--radius-md);
  border: 1px dashed #cbd5e1;
}

@media (max-width: 1024px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .split-overview-row {
    grid-template-columns: 1fr;
  }
}
</style>
