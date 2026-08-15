<template>
  <header class="app-header glass-panel">
    <div class="header-top">
      <!-- Logo -->
      <div class="brand-container" @click="goToHome">
        <div class="brand-icon">
          <svg viewBox="0 0 100 100" class="lotus-svg">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f3cf7e" />
                <stop offset="100%" stop-color="#c99839" />
              </linearGradient>
              <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#34d399" />
                <stop offset="100%" stop-color="#059669" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="#081612" stroke="url(#goldGrad)" stroke-width="3"/>
            <path d="M50 20 C35 38, 28 55, 50 80 C72 55, 65 38, 50 20 Z" fill="url(#emeraldGrad)" opacity="0.85"/>
            <circle cx="50" cy="50" r="7" fill="url(#goldGrad)"/>
            <path d="M25 55 C35 48, 45 60, 50 80 C40 75, 30 68, 25 55 Z" fill="url(#emeraldGrad)" opacity="0.6"/>
            <path d="M75 55 C65 48, 55 60, 50 80 C60 75, 70 68, 75 55 Z" fill="url(#emeraldGrad)" opacity="0.6"/>
          </svg>
        </div>
        <div class="brand-text">
          <div class="brand-name">
            LOKABATAM <span class="badge-ai">AI Super-App</span>
          </div>
          <div class="brand-sub">SG ⇄ Batam Cross-Border Hub</div>
        </div>
      </div>

      <!-- Controls Right -->
      <div class="header-controls">
        <!-- Region Dropdown -->
        <div class="select-wrapper">
          <span class="region-flag">{{ activeRegionObj.flag }}</span>
          <select v-model="currentRegion" class="region-select">
            <option v-for="reg in regions" :key="reg.id" :value="reg.id">
              {{ reg.name }}
            </option>
          </select>
        </div>

        <!-- Currency Picker -->
        <div class="currency-pill">
          <button
            v-for="c in availableCurrencies"
            :key="c"
            class="currency-btn"
            :class="{ active: currentCurrency === c }"
            @click="setCurrency(c)"
          >
            {{ c }}
          </button>
        </div>

        <!-- Language Switcher -->
        <button class="lang-toggle-btn" @click="toggleLanguage">
          <span>{{ currentLanguage === 'en' ? '🇬🇧 EN' : '🇮🇩 ID' }}</span>
        </button>

        <!-- Preview Mode Toggle (Device vs Full) -->
        <button
          class="device-toggle-btn"
          :title="previewMode === 'phone' ? 'Switch to Full Screen Layout' : 'Switch to Mobile App Preview'"
          @click="togglePreviewMode"
        >
          <span v-if="previewMode === 'phone'">📱 Mobile App View</span>
          <span v-else>💻 Full Screen View</span>
        </button>
      </div>
    </div>

    <!-- Role Switcher Bar -->
    <div class="role-bar">
      <div class="role-tabs">
        <button
          class="role-tab"
          :class="{ active: currentRole === 'tourist' }"
          @click="currentRole = 'tourist'"
        >
          <span class="role-emoji">✈️</span>
          <span class="role-title">Tourist Concierge</span>
          <span class="role-desc">Medical, Spas & AI Guide</span>
        </button>

        <button
          class="role-tab"
          :class="{ active: currentRole === 'merchant' }"
          @click="currentRole = 'merchant'"
        >
          <span class="role-emoji">🏪</span>
          <span class="role-title">Partner Portal</span>
          <span class="role-desc">Hospitals, Spas, Cafes & Resorts</span>
          <span v-if="pendingOrdersCount > 0" class="badge-notice">{{ pendingOrdersCount }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useLokaBatamStore } from '../../composables/useLokaBatamStore';
import { useCurrency } from '../../composables/useCurrency';
import { MOCK_REGIONS } from '../../data/mockSalons';

const {
  currentRole,
  currentRegion,
  currentLanguage,
  previewMode,
  activeTab,
  activeRegionObj,
  merchantBookings
} = useLokaBatamStore();

const { currentCurrency, setCurrency, availableCurrencies } = useCurrency();

const regions = MOCK_REGIONS;

const pendingOrdersCount = computed(() => {
  return merchantBookings.value.filter(b => b.status === 'pending').length;
});

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'en' ? 'id' : 'en';
};

const togglePreviewMode = () => {
  previewMode.value = previewMode.value === 'phone' ? 'responsive' : 'phone';
};

const goToHome = () => {
  activeTab.value = 'discover';
};
</script>

<style scoped>
.app-header {
  padding: 0.85rem 1.25rem;
  margin-bottom: 1.25rem;
  border-radius: var(--radius-lg);
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.brand-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  filter: drop-shadow(0 0 10px rgba(229, 185, 95, 0.4));
  transition: transform var(--transition-normal);
}

.brand-container:hover .brand-icon {
  transform: rotate(15deg) scale(1.06);
}

.lotus-svg {
  width: 100%;
  height: 100%;
}

.brand-name {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.badge-ai {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  background: linear-gradient(135deg, rgba(229, 185, 95, 0.25) 0%, rgba(16, 185, 129, 0.25) 100%);
  color: var(--color-accent-gold);
  border: 1px solid rgba(229, 185, 95, 0.4);
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-full);
}

.brand-sub {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.select-wrapper {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--color-bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 0.25rem 0.75rem;
  transition: border-color var(--transition-fast);
}

.select-wrapper:hover {
  border-color: var(--border-active);
}

.region-flag {
  font-size: 1.1rem;
}

.region-select {
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  font-size: 0.82rem;
  font-weight: 600;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}

.region-select option {
  background: #0f241e;
  color: #f8faf9;
}

.currency-pill {
  display: flex;
  background: var(--color-bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  padding: 2px;
}

.currency-btn {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.currency-btn.active {
  background: var(--color-accent-gold);
  color: var(--color-text-dark);
}

.lang-toggle-btn, .device-toggle-btn {
  background: var(--color-bg-input);
  border: 1px solid var(--border-subtle);
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.lang-toggle-btn:hover, .device-toggle-btn:hover {
  border-color: var(--border-active);
  color: var(--color-accent-gold);
}

/* Role Switcher */
.role-bar {
  margin-top: 0.9rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.role-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  background: rgba(8, 22, 18, 0.6);
  padding: 4px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
}

.role-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
}

.role-tab.active {
  background: linear-gradient(135deg, rgba(22, 50, 42, 0.95) 0%, rgba(15, 36, 30, 0.95) 100%);
  border-color: var(--border-active);
  color: var(--color-text-primary);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.role-emoji {
  font-size: 1.15rem;
}

.role-title {
  font-weight: 700;
  font-size: 0.88rem;
  color: var(--color-text-primary);
}

.role-desc {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  display: none;
}

.badge-notice {
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 800;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .role-desc {
    display: inline;
  }
}
</style>
