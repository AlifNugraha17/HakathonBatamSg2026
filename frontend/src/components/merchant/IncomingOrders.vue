<template>
  <div class="orders-section glass-panel">
    <div class="section-header">
      <div>
        <h3 class="section-title">📥 Pesanan Masuk Wisatawan Lintas Batas</h3>
        <p class="section-sub">Permintaan khusus telah diterjemahkan otomatis ke bahasa Indonesia</p>
      </div>
      <span class="badge badge-flash">{{ pendingOrders.length }} Menunggu Konfirmasi</span>
    </div>

    <!-- Empty State -->
    <div v-if="merchantBookings.length === 0" class="empty-orders glass-card">
      <span class="icon">📬</span>
      <p>Belum ada pesanan masuk saat ini. Buka slot kilat untuk menarik wisatawan!</p>
    </div>

    <!-- Orders List -->
    <div v-else class="orders-list">
      <div
        v-for="order in merchantBookings"
        :key="order.id"
        class="order-card glass-card"
        :class="{ pending: order.status === 'pending', confirmed: order.status === 'confirmed' }"
      >
        <!-- Top Row -->
        <div class="order-top">
          <div class="tourist-info">
            <span class="tourist-name">{{ order.touristName }}</span>
            <span class="tourist-flag">{{ order.touristCountry }}</span>
            <span class="order-id">#{{ order.id }}</span>
          </div>

          <div class="status-indicator">
            <span v-if="order.status === 'confirmed'" class="badge badge-verified">
              ✓ Diterima & Slot Terkunci
            </span>
            <span v-else class="badge badge-gold">
              ⏳ Butuh Konfirmasi
            </span>
          </div>
        </div>

        <!-- Order Body -->
        <div class="order-body">
          <div class="service-details">
            <h4 class="service-title">{{ order.serviceName }}</h4>
            <div class="time-meta">
              <span>⏰ {{ order.appointmentTime }}</span>
              <span>•</span>
              <span>💆 Terapis: {{ order.therapistName }}</span>
            </div>
            <div v-if="order.ferryDepartureTime" class="ferry-tag">
              🚢 <strong>Jadwal Ferry Tamu:</strong> {{ order.ferryDepartureTime }}
            </div>
          </div>

          <!-- AI Translated Therapist Trigger -->
          <div class="therapist-preview-strip" @click="openTherapistCard(order)">
            <div class="strip-left">
              <span class="badge-ai-id">🤖 KARTU TERAPIS AI</span>
              <div class="strip-summary">
                <span>Tekanan: <strong>{{ order.aiTranslatedCard?.pressure }}</strong></span>
                <span>•</span>
                <span>Fokus: {{ order.aiTranslatedCard?.focusAreas?.join(', ') }}</span>
              </div>
            </div>
            <button class="btn btn-ghost btn-sm">
              Lihat Detail Instruksi 👁️
            </button>
          </div>

          <!-- Red Alert Alert Banner on Order Card -->
          <div
            v-if="order.aiTranslatedCard?.allergyAlerts && order.aiTranslatedCard.allergyAlerts.length > 0"
            class="allergy-strip"
          >
            🚨 <strong>Peringatan Alergi:</strong> {{ order.aiTranslatedCard.allergyAlerts[0] }}
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="order-footer">
          <div class="price-val">
            Rp {{ Number(order.priceIdr).toLocaleString('id-ID') }}
          </div>

          <div class="actions-group">
            <button
              v-if="order.status === 'pending'"
              class="btn btn-ghost btn-sm text-coral"
              @click="declineBooking(order.id)"
            >
              Tolak
            </button>
            <button
              v-if="order.status === 'pending'"
              class="btn btn-emerald btn-sm"
              @click="confirmBooking(order.id)"
            >
              ✓ Terima & Kunci Kursi
            </button>
            <a
              :href="`https://wa.me/${cleanPhone(order.touristPhone)}`"
              target="_blank"
              class="btn btn-ghost btn-sm"
            >
              💬 Hubungi Tamu (WA)
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

const {
  merchantBookings,
  confirmBooking,
  declineBooking,
  selectedTherapistCardBooking
} = useLokaBatamStore();

const pendingOrders = computed(() => {
  return merchantBookings.value.filter(b => b.status === 'pending');
});

const cleanPhone = (phone) => {
  return (phone || '+6591234567').replace(/[^0-9]/g, '');
};

const openTherapistCard = (order) => {
  selectedTherapistCardBooking.value = order;
};
</script>

<style scoped>
.orders-section {
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.section-title {
  font-size: 1.1rem;
  color: var(--color-accent-gold);
}

.section-sub {
  font-size: 0.76rem;
  color: var(--color-text-muted);
}

.empty-orders {
  text-align: center;
  padding: 2.5rem 1.5rem;
  color: var(--color-text-muted);
}

.empty-orders .icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card {
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  transition: all var(--transition-fast);
}

.order-card.pending {
  border-left: 4px solid var(--color-accent-gold);
  background: rgba(229, 185, 95, 0.04);
}

.order-card.confirmed {
  border-left: 4px solid var(--color-accent-emerald);
}

.order-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
}

.tourist-info {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.tourist-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.tourist-flag {
  font-size: 0.85rem;
}

.order-id {
  font-size: 0.72rem;
  color: var(--color-accent-gold);
  margin-left: 0.35rem;
}

.service-title {
  font-size: 0.95rem;
  color: var(--color-text-primary);
  margin-bottom: 0.2rem;
}

.time-meta {
  display: flex;
  gap: 0.4rem;
  font-size: 0.74rem;
  color: var(--color-text-muted);
  margin-bottom: 0.4rem;
}

.ferry-tag {
  font-size: 0.72rem;
  color: #7dd3fc;
  background: rgba(14, 165, 233, 0.12);
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-xs);
  display: inline-block;
  margin-bottom: 0.65rem;
}

.therapist-preview-strip {
  background: rgba(8, 22, 18, 0.75);
  border: 1px dashed var(--color-accent-gold);
  border-radius: var(--radius-sm);
  padding: 0.65rem 0.85rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.65rem;
  transition: all var(--transition-fast);
}

.therapist-preview-strip:hover {
  background: rgba(22, 50, 42, 0.85);
  border-style: solid;
}

.badge-ai-id {
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--color-accent-gold);
  display: block;
  margin-bottom: 0.15rem;
}

.strip-summary {
  font-size: 0.72rem;
  color: var(--color-text-secondary);
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.allergy-strip {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.45);
  color: #fca5a5;
  font-size: 0.72rem;
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-xs);
  margin-bottom: 0.65rem;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.65rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.price-val {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--color-accent-gold);
}

.actions-group {
  display: flex;
  gap: 0.4rem;
}

.text-coral {
  color: #fb7185;
}
</style>
