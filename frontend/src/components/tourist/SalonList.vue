<template>
  <div class="salons-container">
    <!-- Header Section in English -->
    <div class="section-header">
      <div>
        <h3 class="section-title">Curated Micro-SME Spas & Sanctuaries</h3>
        <p class="section-subtitle">Vetted sanitation standards & accredited master practitioners</p>
      </div>
      <span class="count-tag">{{ filteredSalons.length }} Centers</span>
    </div>

    <!-- Empty State -->
    <div v-if="filteredSalons.length === 0" class="empty-state">
      <p>No verified spas found matching your search filters in this corridor.</p>
    </div>

    <!-- Salons Grid -->
    <div v-else class="salons-grid">
      <div
        v-for="salon in filteredSalons"
        :key="salon.id"
        class="salon-card"
        @click="openSalonDetail(salon)"
      >
        <!-- Image & Badges Banner -->
        <div class="salon-image-wrap">
          <img :src="salon.imageUrl" :alt="salon.name" class="salon-image" loading="lazy" />

          <!-- Top Overlay Badges -->
          <div class="overlay-top">
            <span class="badge-hygiene">
              Hygiene {{ salon.hygieneScore }}%
            </span>
            <button
              class="save-btn"
              :class="{ active: isSalonSaved(salon.id) }"
              @click.stop="toggleSaveSalon(salon.id)"
            >
              {{ isSalonSaved(salon.id) ? 'Saved' : 'Bookmark' }}
            </button>
          </div>

          <!-- Bottom Overlay Tags -->
          <div class="overlay-bottom">
            <span class="distance-pill">
              {{ salon.distanceMinutes }}m from Ferry
            </span>
            <span v-if="getActiveFlashCount(salon) > 0" class="flash-avail-pill">
              {{ getActiveFlashCount(salon) }} Flash Slots
            </span>
          </div>
        </div>

        <!-- Card Content -->
        <div class="salon-content">
          <div class="salon-main-info">
            <div class="title-row">
              <h4 class="salon-name">{{ salon.name }}</h4>
              <span class="rating-badge">
                ★ {{ salon.rating }} ({{ salon.reviewCount }})
              </span>
            </div>
            <p class="salon-tagline">{{ salon.tagline }}</p>
            <p class="salon-landmark">{{ salon.landmark }}</p>
          </div>

          <!-- Hygiene Trust Features Preview -->
          <div class="hygiene-chips">
            <span
              v-for="(badge, idx) in salon.hygieneBadges.slice(0, 2)"
              :key="idx"
              class="hygiene-chip"
            >
              {{ badge }}
            </span>
          </div>

          <!-- Services Preview Price Row -->
          <div class="services-preview-row">
            <div class="price-from-box">
              <span class="price-from-label">Starting From</span>
              <span class="price-from-val">{{ getMinPrice(salon) }}</span>
            </div>

            <button class="btn-detail-view" @click.stop="openSalonDetail(salon)">
              View Menu & Book →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useZenturaStore } from '../../composables/useZenturaStore';
import { useCurrency } from '../../composables/useCurrency';

const {
  filteredSalons,
  selectedSalonForDetail,
  toggleSaveSalon,
  isSalonSaved
} = useZenturaStore();

const { formatPrice } = useCurrency();

const openSalonDetail = (salon) => {
  selectedSalonForDetail.value = salon;
};

const getActiveFlashCount = (salon) => {
  if (!salon.flashSlots) return 0;
  return salon.flashSlots.filter(s => s.isFlashActive).length;
};

const getMinPrice = (salon) => {
  if (!salon.services || salon.services.length === 0) return 'SGD 0';
  const min = Math.min(...salon.services.map(s => s.priceIdr));
  return formatPrice(min);
};
</script>

<style scoped>
.salons-container {
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 0.82rem;
  color: #64748b;
}

.count-tag {
  font-size: 0.76rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-xs);
}

.empty-state {
  padding: 3.5rem;
  text-align: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  color: #64748b;
  font-size: 0.88rem;
}

.salons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.35rem;
}

.salon-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.15s ease;
}

.salon-card:hover {
  border-color: #93c5fd;
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -6px rgba(30, 58, 138, 0.12);
}

.salon-image-wrap {
  position: relative;
  height: 190px;
  width: 100%;
}

.salon-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-top {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge-hygiene {
  font-size: 0.7rem;
  font-weight: 700;
  color: #047857;
  background: rgba(236, 253, 245, 0.95);
  padding: 0.25rem 0.55rem;
  border-radius: 4px;
  border: 1px solid #a7f3d0;
  backdrop-filter: blur(4px);
}

.save-btn {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e2e8f0;
  font-size: 0.74rem;
  font-weight: 700;
  color: #334155;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  cursor: pointer;
  backdrop-filter: blur(4px);
  transition: all 0.15s;
}

.save-btn.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
}

.overlay-bottom {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.distance-pill {
  font-size: 0.7rem;
  font-weight: 700;
  background: rgba(15, 23, 42, 0.85);
  color: #ffffff;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

.flash-avail-pill {
  font-size: 0.7rem;
  font-weight: 700;
  background: #1e3a8a;
  color: #ffffff;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.salon-content {
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
}

.salon-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.01em;
}

.rating-badge {
  font-size: 0.76rem;
  color: #1e3a8a;
  font-weight: 700;
}

.salon-tagline {
  font-size: 0.82rem;
  color: #64748b;
  margin: 0 0 0.25rem 0;
}

.salon-landmark {
  font-size: 0.76rem;
  color: #64748b;
  margin: 0 0 0.85rem 0;
}

.hygiene-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.15rem;
}

.hygiene-chip {
  font-size: 0.7rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.services-preview-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.85rem;
  border-top: 1px solid #f1f5f9;
}

.price-from-box {
  display: flex;
  flex-direction: column;
}

.price-from-label {
  font-size: 0.68rem;
  color: #64748b;
}

.price-from-val {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
}

.btn-detail-view {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(29, 78, 216, 0.2);
}

.btn-detail-view:hover {
  background: #0f172a;
}

@media (max-width: 768px) {
  .salons-grid {
    grid-template-columns: 1fr;
  }
}
</style>
