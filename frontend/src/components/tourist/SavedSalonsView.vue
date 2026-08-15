<template>
  <div class="saved-view">
    <div class="view-header">
      <div>
        <h3 class="view-title">Saved Spas & Sanctuaries</h3>
        <p class="view-subtitle">Your bookmarked regional wellness centers for rapid repeat bookings</p>
      </div>
      <span class="count-tag">{{ savedSalonsList.length }} Saved</span>
    </div>

    <!-- Empty State in English -->
    <div v-if="savedSalonsList.length === 0" class="empty-card">
      <h4>No Saved Spas Yet</h4>
      <p>Click the bookmark button on any center in the catalog to add it to your quick-access list.</p>
      <button class="btn-primary" @click="activeTab = 'discover'">
        Browse Curated Spas
      </button>
    </div>

    <!-- Saved List -->
    <div v-else class="saved-grid">
      <div
        v-for="salon in savedSalonsList"
        :key="salon.id"
        class="saved-card"
      >
        <img :src="salon.imageUrl" :alt="salon.name" class="saved-img" />
        
        <div class="saved-content">
          <div class="saved-top">
            <div>
              <h4 class="saved-name">{{ salon.name }}</h4>
              <div class="saved-landmark">{{ salon.landmark }}</div>
            </div>
            <button class="remove-btn" @click="toggleSaveSalon(salon.id)">Remove</button>
          </div>

          <div class="saved-rating">
            ★ {{ salon.rating }} ({{ salon.reviewCount }} reviews) • Hygiene {{ salon.hygieneScore }}%
          </div>

          <div class="saved-footer">
            <div class="saved-price">
              Starts {{ formatPrice(getStartingPrice(salon)) }}
            </div>
            <button class="btn-detail" @click="openSalonDetail(salon)">
              View Menu
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

const { savedSalonsList, toggleSaveSalon, selectedSalonForDetail, activeTab } = useZenturaStore();
const { formatPrice } = useCurrency();

const openSalonDetail = (salon) => {
  selectedSalonForDetail.value = salon;
};

const getStartingPrice = (salon) => {
  if (!salon || !salon.services || salon.services.length === 0) return 150000;
  const prices = salon.services.map(s => Number(s.priceIdr || s.price_idr || 150000)).filter(p => p > 0);
  return prices.length > 0 ? Math.min(...prices) : 150000;
};
</script>

<style scoped>
.saved-view {
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

.count-tag {
  font-size: 0.74rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.25rem 0.65rem;
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

.saved-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;
}

.saved-card {
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  gap: 1rem;
  transition: all 0.15s ease;
}

.saved-card:hover {
  border-color: #93c5fd;
}

.saved-img {
  width: 95px;
  height: 95px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.saved-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.saved-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.saved-name {
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.saved-landmark {
  font-size: 0.74rem;
  color: #64748b;
}

.remove-btn {
  background: transparent;
  border: 1px solid #fecaca;
  color: #991b1b;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.saved-rating {
  font-size: 0.74rem;
  color: #1e3a8a;
  font-weight: 600;
  margin: 0.35rem 0;
}

.saved-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.saved-price {
  font-size: 0.86rem;
  font-weight: 800;
  color: #0f172a;
}

.btn-detail {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.btn-detail:hover {
  background: #0f172a;
}
</style>
