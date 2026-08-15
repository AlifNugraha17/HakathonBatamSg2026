<template>
  <div class="bookings-view">
    <div class="view-header">
      <div>
        <h3 class="view-title">My Wellness Itinerary</h3>
        <p class="view-subtitle">Synchronized with cross-border ferry schedules and transit windows</p>
      </div>
      <span class="active-badge">{{ activeBookings.length }} Active</span>
    </div>

    <!-- Empty State -->
    <div v-if="bookings.length === 0" class="empty-card">
      <h4>No Active Reservations</h4>
      <p>Select a dynamic flash slot or explore our curated directory to start your relaxation itinerary.</p>
      <button class="btn-primary" @click="activeTab = 'discover'">
        Discover Curated Spas
      </button>
    </div>

    <!-- Bookings List in English -->
    <div v-else class="bookings-list">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="booking-card"
        :class="{ confirmed: booking.status === 'confirmed', pending: booking.status === 'pending' }"
      >
        <!-- Top Status Bar -->
        <div class="card-header-bar">
          <div class="code-block">
            <span class="booking-code">#{{ booking.booking_code || booking.bookingCode || booking.id }}</span>
            <span class="booking-date">{{ booking.createdAt || booking.appointmentDate || 'Today' }}</span>
          </div>

          <div class="status-pill-wrap">
            <span v-if="booking.status === 'confirmed'" class="badge-confirmed">
              ✓ Confirmed by Partner
            </span>
            <span v-else class="badge-pending">
              Awaiting Partner Confirmation
            </span>
          </div>
        </div>

        <!-- Ferry Departure Sync Notice -->
        <div v-if="booking.ferry_time || booking.ferryDepartureTime" class="ferry-sync-notice">
          <strong>Ferry Departure Sync:</strong> {{ booking.ferry_time || booking.ferryDepartureTime }}
        </div>

        <!-- Service & Salon Details -->
        <div class="booking-body">
          <h4 class="service-title">{{ booking.service_name || booking.serviceName }}</h4>
          <div class="salon-name-row">
            <span><strong>{{ booking.spa_name || booking.salonName }}</strong></span>
          </div>
          <div class="meta-tags">
            <span class="meta-tag">Time: {{ booking.booking_time || booking.appointmentTime || booking.time || '14:30 WIB' }}</span>
            <span class="meta-tag">Duration: {{ booking.duration_minutes || booking.durationMinutes || 60 }} mins</span>
            <span class="meta-tag">Practitioner: {{ booking.therapist_name || booking.therapistName || 'Senior Therapist' }}</span>
          </div>

          <!-- Medical / Allergy brief notice if present -->
          <div v-if="booking.allergy_alert || booking.medical_notes" class="ai-card-trigger" @click="openTherapistCard(booking)">
            <div class="ai-trigger-left">
              <span class="ai-badge-sm">AI Therapist Instruction</span>
              <span class="ai-summary-text">
                {{ booking.allergy_alert || booking.medical_notes }}
              </span>
            </div>
            <span class="view-card-btn">View Card →</span>
          </div>
        </div>

        <!-- Bottom Action Bar -->
        <div class="booking-footer">
          <div class="price-box">
            <span class="price-val">{{ formatPrice(booking.price_idr || booking.totalPriceIdr || booking.priceIdr || 200000) }}</span>
            <span class="payment-method">Settlement: PayNow SGD / BI-FAST IDR</span>
          </div>

          <div class="footer-actions">
            <a
              :href="getWhatsAppLink(booking)"
              target="_blank"
              class="btn-whatsapp-chat"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLokaBatamStore } from '../../composables/useLokaBatamStore';
import { useCurrency } from '../../composables/useCurrency';

const { bookings, activeTab, selectedTherapistCardBooking } = useLokaBatamStore();
const { formatPrice } = useCurrency();

const activeBookings = computed(() => {
  return bookings.value.filter(b => b.status === 'confirmed' || b.status === 'pending');
});

const openTherapistCard = (booking) => {
  selectedTherapistCardBooking.value = booking;
};

const getWhatsAppLink = (booking) => {
  const phone = '6281277889901';
  const salon = booking.spa_name || booking.salonName || 'LokaBatam Destination Partner';
  const id = booking.booking_code || booking.bookingCode || booking.id;
  const srv = booking.service_name || booking.serviceName || 'Massage';
  const time = booking.booking_time || booking.appointmentTime || booking.time || '15:00';
  const text = encodeURIComponent(`Hello ${salon}, I am inquiring regarding my LokaBatam booking #${id} (${srv}) scheduled for ${time}.`);
  return `https://wa.me/${phone}?text=${text}`;
};
</script>

<style scoped>
.bookings-view {
  margin-bottom: 2rem;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.view-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.view-subtitle {
  font-size: 0.82rem;
  color: #64748b;
}

.active-badge {
  font-size: 0.74rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-xs);
}

.empty-card {
  text-align: center;
  padding: 3.5rem 1.5rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
}

.empty-card h4 {
  font-size: 1.05rem;
  color: #0f172a;
  font-weight: 800;
  margin-bottom: 0.35rem;
}

.empty-card p {
  font-size: 0.84rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.86rem;
  font-weight: 700;
  padding: 0.6rem 1.4rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(29, 78, 216, 0.2);
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.card-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.booking-code {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
  margin-right: 0.5rem;
}

.booking-date {
  font-size: 0.76rem;
  color: #64748b;
}

.badge-confirmed {
  font-size: 0.7rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.badge-pending {
  font-size: 0.7rem;
  font-weight: 700;
  color: #854d0e;
  background: #fefce8;
  border: 1px solid #fef08a;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.ferry-sync-notice {
  font-size: 0.76rem;
  color: #1e3a8a;
  background: #eff6ff;
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-xs);
  border: 1px solid #bfdbfe;
}

.service-title {
  font-size: 1rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.2rem 0;
}

.salon-name-row {
  font-size: 0.84rem;
  color: #334155;
  margin-bottom: 0.45rem;
}

.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.75rem;
}

.meta-tag {
  font-size: 0.74rem;
  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.ai-card-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 0.85rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s;
}

.ai-card-trigger:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.ai-badge-sm {
  font-size: 0.7rem;
  font-weight: 800;
  color: #1e3a8a;
  display: block;
}

.ai-summary-text {
  font-size: 0.76rem;
  color: #64748b;
}

.view-card-btn {
  font-size: 0.76rem;
  font-weight: 700;
  color: #2563eb;
}

.booking-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.85rem;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.price-box {
  display: flex;
  flex-direction: column;
}

.price-val {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
}

.payment-method {
  font-size: 0.7rem;
  color: #64748b;
}

.btn-whatsapp-chat {
  display: inline-block;
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-xs);
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(29, 78, 216, 0.2);
}

.btn-whatsapp-chat:hover {
  background: #0f172a;
}
</style>
