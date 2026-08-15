<template>
  <div class="matcher-card">
    <!-- Header Banner -->
    <div class="matcher-header">
      <div>
        <h3 class="matcher-title">Smart Micro-Moment Time Matcher</h3>
        <p class="matcher-subtitle">Find empty therapist chairs matching your exact free window before ferry departure</p>
      </div>
    </div>

    <!-- Interactive Inputs in English -->
    <div class="matcher-form">
      <div class="form-row">
        <!-- Duration Selector -->
        <div class="form-group">
          <label class="form-label">Available Free Time</label>
          <div class="duration-pills">
            <button
              v-for="dur in [30, 45, 60, 90]"
              :key="dur"
              class="duration-pill"
              :class="{ active: matcherFilter.durationMinutes === dur }"
              @click="matcherFilter.durationMinutes = dur"
            >
              {{ dur }} mins
            </button>
          </div>
        </div>

        <!-- Target Time -->
        <div class="form-group">
          <label class="form-label">Approximate Time</label>
          <input
            type="time"
            v-model="matcherFilter.timeTarget"
            class="time-input"
          />
        </div>
      </div>

      <!-- Distance Radius -->
      <div class="form-group">
        <label class="form-label">Maximum Walking Distance from Terminal</label>
        <div class="distance-selector">
          <button
            v-for="dist in [5, 10, 15]"
            :key="dist"
            class="dist-btn"
            :class="{ active: matcherFilter.maxDistanceMinutes === dist }"
            @click="matcherFilter.maxDistanceMinutes = dist"
          >
            Under {{ dist }} mins walk
          </button>
        </div>
      </div>
    </div>

    <!-- Match Results Summary -->
    <div class="results-bar">
      <span class="match-count-badge">
        <strong>{{ matchedFlashSlots.length }}</strong> Flash Micro-Slots Available Right Now
      </span>
    </div>

    <!-- Matched Flash Slots Horizontal Carousel / List -->
    <div class="flash-slots-container">
      <div
        v-for="slot in matchedFlashSlots"
        :key="slot.id"
        class="slot-card"
      >
        <div class="slot-badge-row">
          <span class="badge-discount">Save {{ slot.discountPercent }}%</span>
          <span class="badge-hygiene">Hygiene {{ slot.hygieneScore }}%</span>
        </div>

        <div class="slot-salon-info">
          <h4 class="slot-salon-name">{{ slot.salonName }}</h4>
          <span class="slot-distance">{{ slot.distanceMinutes }}m from Ferry • {{ slot.salonLandmark }}</span>
        </div>

        <div class="slot-service-info">
          <span class="slot-service-name">{{ slot.serviceName }}</span>
          <span class="slot-time">{{ slot.time }} ({{ slot.durationMinutes }}m) • Therapist: {{ slot.therapistName }}</span>
        </div>

        <div class="slot-price-row">
          <div class="price-stack">
            <span class="curr-price">{{ formatPrice(slot.priceIdr) }}</span>
            <span class="orig-price">{{ formatPrice(slot.originalPriceIdr) }}</span>
          </div>

          <button class="btn-book-slot" @click="handleBookSlot(slot)">
            Book Flash Chair
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useZenturaStore } from '../../composables/useZenturaStore';
import { useCurrency } from '../../composables/useCurrency';

const {
  matcherFilter,
  matchedFlashSlots,
  selectedSlotForBooking,
  isWhatsAppModalOpen
} = useZenturaStore();

const { formatPrice } = useCurrency();

const handleBookSlot = (slot) => {
  selectedSlotForBooking.value = slot;
  isWhatsAppModalOpen.value = true;
};
</script>

<style scoped>
.matcher-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  margin-bottom: 1.25rem;
}

.matcher-header {
  margin-bottom: 1.25rem;
}

.matcher-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.02em;
}

.matcher-subtitle {
  font-size: 0.82rem;
  color: #64748b;
}

.matcher-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 180px;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #1e3a8a;
}

.duration-pills {
  display: flex;
  gap: 0.4rem;
}

.duration-pill {
  flex: 1;
  padding: 0.45rem 0.65rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.duration-pill:hover {
  background: #ffffff;
  color: #1e3a8a;
  border-color: #93c5fd;
}

.duration-pill.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
  box-shadow: 0 2px 6px rgba(30, 58, 138, 0.2);
}

.time-input {
  width: 100%;
  padding: 0.45rem 0.75rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-xs);
  color: #0f172a;
  font-size: 0.84rem;
  outline: none;
}

.time-input:focus {
  border-color: #2563eb;
}

.distance-selector {
  display: flex;
  gap: 0.4rem;
}

.dist-btn {
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.dist-btn:hover {
  background: #ffffff;
  color: #1e3a8a;
  border-color: #93c5fd;
}

.dist-btn.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
  box-shadow: 0 2px 6px rgba(30, 58, 138, 0.2);
}

.results-bar {
  padding: 0.6rem 0.95rem;
  border-radius: var(--radius-xs);
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  margin-bottom: 1.25rem;
}

.match-count-badge {
  font-size: 0.8rem;
  color: #1e3a8a;
}

.flash-slots-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.slot-card {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.15s ease;
}

.slot-card:hover {
  border-color: #93c5fd;
  box-shadow: 0 8px 16px -4px rgba(30, 58, 138, 0.08);
}

.slot-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge-discount {
  font-size: 0.7rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.badge-hygiene {
  font-size: 0.7rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.slot-salon-info {
  display: flex;
  flex-direction: column;
}

.slot-salon-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.slot-distance {
  font-size: 0.74rem;
  color: #64748b;
}

.slot-service-info {
  display: flex;
  flex-direction: column;
  padding: 0.6rem;
  background: #f8fafc;
  border-radius: var(--radius-xs);
  border: 1px solid #f1f5f9;
}

.slot-service-name {
  font-size: 0.84rem;
  font-weight: 700;
  color: #0f172a;
}

.slot-time {
  font-size: 0.72rem;
  color: #64748b;
}

.slot-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.65rem;
  border-top: 1px solid #f1f5f9;
}

.price-stack {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.curr-price {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
}

.orig-price {
  font-size: 0.74rem;
  color: #94a3b8;
  text-decoration: line-through;
}

.btn-book-slot {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(29, 78, 216, 0.2);
}

.btn-book-slot:hover {
  background: #0f172a;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
