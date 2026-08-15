<template>
  <div class="orders-management-view animate-fade-in">
    <!-- Header Row in English -->
    <div class="orders-header">
      <div class="filter-group">
        <button 
          class="tab-btn" 
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
        >
          All Orders ({{ merchantBookings.length }})
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeFilter === 'pending' }"
          @click="activeFilter = 'pending'"
        >
          Pending Confirmation ({{ pendingCount }})
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeFilter === 'confirmed' }"
          @click="activeFilter = 'confirmed'"
        >
          Confirmed
        </button>
      </div>

      <div class="whatsapp-sync-indicator">
        <span>WhatsApp Cloud Sync: <strong>Connected (+62 812-7788-9901)</strong></span>
      </div>
    </div>

    <!-- Orders Grid -->
    <div class="orders-grid">
      <div 
        v-for="b in filteredBookings" 
        :key="b.id"
        class="order-card"
      >
        <div class="order-card-header">
          <div class="tourist-id-box">
            <span class="booking-id">#{{ b.id }}</span>
            <span class="created-at">{{ b.createdAt }}</span>
          </div>

          <span class="status-badge" :class="b.status">
            {{ b.status === 'confirmed' ? 'CONFIRMED' : 'PENDING CONFIRMATION' }}
          </span>
        </div>

        <div class="order-card-body">
          <div class="tourist-profile-row">
            <div class="tourist-meta">
              <span class="tourist-name">{{ b.touristName }}</span>
              <span class="tourist-contact">{{ b.touristCountry }} • {{ b.touristPhone }}</span>
            </div>
          </div>

          <div class="service-details-box">
            <div class="svc-name-row">
              <span class="svc-title">{{ b.serviceName }}</span>
              <span class="svc-price">IDR {{ Number(b.priceIdr).toLocaleString('id-ID') }}</span>
            </div>
            <div class="svc-meta-row">
              <span>Time: {{ b.timeSlot }}</span>
              <span>•</span>
              <span>Seat: {{ b.chair || 'VIP Suite 1' }}</span>
              <span>•</span>
              <span>Therapist: {{ b.therapistName }}</span>
            </div>
          </div>

          <!-- Tourist AI Translated Notes -->
          <div v-if="b.touristNotes" class="ai-notes-preview">
            <span class="notes-title">Guest Health & Bodywork Notes (AI Bridge)</span>
            <p class="notes-text">{{ b.touristNotes }}</p>
          </div>
        </div>

        <div class="order-card-footer">
          <button class="btn-card-open" @click="openTherapistCard(b)">
            Inspect AI Therapist Card
          </button>

          <div v-if="b.status === 'pending'" class="action-buttons-group">
            <button class="btn-decline" @click="handleDecline(b.id)">Decline</button>
            <button class="btn-confirm" @click="handleConfirm(b.id)">Accept & Confirm</button>
          </div>
          <div v-else class="confirmed-status-row">
            <span class="confirmed-text">✓ Ready for Guest Arrival</span>
          </div>
        </div>
      </div>

      <div v-if="filteredBookings.length === 0" class="empty-box">
        <span>No reservations found for this filter view.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useZenturaStore } from '../../../composables/useZenturaStore';
import { useNotification } from '../../../composables/useNotification';

const { merchantBookings, confirmBooking, declineBooking, selectedTherapistCardBooking } = useZenturaStore();
const { showToast } = useNotification();

const activeFilter = ref('all');

const pendingCount = computed(() => {
  return merchantBookings.value.filter(b => b.status === 'pending').length;
});

const filteredBookings = computed(() => {
  if (activeFilter.value === 'all') return merchantBookings.value;
  return merchantBookings.value.filter(b => b.status === activeFilter.value);
});

const handleConfirm = (id) => {
  confirmBooking(id);
  showToast(`Reservation #${id} confirmed successfully!`, 'success');
};

const handleDecline = (id) => {
  declineBooking(id);
  showToast(`Reservation #${id} declined.`, 'info');
};

const openTherapistCard = (booking) => {
  selectedTherapistCardBooking.value = booking;
};
</script>

<style scoped>
.orders-management-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.orders-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-group {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.tab-btn:hover {
  background: #ffffff;
  color: #1e3a8a;
  border-color: #93c5fd;
}

.tab-btn.active {
  background: #1e3a8a;
  color: #ffffff;
  font-weight: 700;
  border-color: #1e3a8a;
}

.whatsapp-sync-indicator {
  font-size: 0.76rem;
  color: #64748b;
}

.whatsapp-sync-indicator strong {
  color: #1e3a8a;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.order-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.order-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tourist-id-box {
  display: flex;
  flex-direction: column;
}

.booking-id {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
}

.created-at {
  font-size: 0.72rem;
  color: #64748b;
}

.status-badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.status-badge.pending { background: #fefce8; color: #854d0e; border: 1px solid #fef08a; }
.status-badge.confirmed { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }

.order-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.tourist-meta {
  display: flex;
  flex-direction: column;
}

.tourist-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
}

.tourist-contact {
  font-size: 0.74rem;
  color: #64748b;
}

.service-details-box {
  padding: 0.75rem 0.85rem;
  border-radius: var(--radius-xs);
  background: #f8fafc;
  border: 1px solid #f1f5f9;
}

.svc-name-row {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.svc-title {
  color: #0f172a;
  font-size: 0.86rem;
}

.svc-price {
  color: #1e3a8a;
  font-size: 0.86rem;
}

.svc-meta-row {
  display: flex;
  gap: 0.45rem;
  font-size: 0.74rem;
  color: #64748b;
}

.ai-notes-preview {
  padding: 0.75rem 0.85rem;
  border-radius: var(--radius-xs);
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.notes-title {
  font-size: 0.74rem;
  font-weight: 700;
  color: #1e3a8a;
  display: block;
  margin-bottom: 0.2rem;
}

.notes-text {
  font-size: 0.78rem;
  color: #1e293b;
  line-height: 1.45;
  margin: 0;
}

.order-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn-card-open {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.btn-card-open:hover {
  background: #1e3a8a;
  color: #ffffff;
}

.action-buttons-group {
  display: flex;
  gap: 0.45rem;
}

.btn-decline {
  background: #ffffff;
  border: 1px solid #fecaca;
  color: #991b1b;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.btn-confirm {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  border: none;
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.btn-confirm:hover {
  background: #0f172a;
}

.confirmed-text {
  font-size: 0.76rem;
  color: #047857;
  font-weight: 700;
}

.empty-box {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 0.85rem;
}

@media (max-width: 800px) {
  .orders-grid {
    grid-template-columns: 1fr;
  }
}
</style>
