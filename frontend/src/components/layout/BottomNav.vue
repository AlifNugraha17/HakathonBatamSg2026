<template>
  <nav class="bottom-nav glass-panel">
    <button
      class="nav-item"
      :class="{ active: activeTab === 'discover' }"
      @click="activeTab = 'discover'"
    >
      <span class="nav-icon">✨</span>
      <span class="nav-label">Discover</span>
    </button>

    <button
      class="nav-item"
      :class="{ active: activeTab === 'matcher' }"
      @click="activeTab = 'matcher'"
    >
      <span class="nav-icon">⚡</span>
      <span class="nav-label">Smart Match</span>
    </button>

    <button
      class="nav-item nav-item-highlight"
      :class="{ active: activeTab === 'translator' }"
      @click="activeTab = 'translator'"
    >
      <div class="ai-circle">
        <span class="nav-icon">🤖</span>
      </div>
      <span class="nav-label">AI Bridge</span>
    </button>

    <button
      class="nav-item"
      :class="{ active: activeTab === 'bookings' }"
      @click="activeTab = 'bookings'"
    >
      <span class="nav-icon">📅</span>
      <span class="nav-label">Bookings</span>
      <span v-if="activeBookingsCount > 0" class="nav-dot"></span>
    </button>

    <button
      class="nav-item"
      :class="{ active: activeTab === 'saved' }"
      @click="activeTab = 'saved'"
    >
      <span class="nav-icon">💖</span>
      <span class="nav-label">Saved</span>
      <span v-if="savedCount > 0" class="nav-counter">{{ savedCount }}</span>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useLokaBatamStore } from '../../composables/useLokaBatamStore';

const { activeTab, bookings, savedSalonIds } = useLokaBatamStore();

const activeBookingsCount = computed(() => {
  return bookings.value.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
});

const savedCount = computed(() => savedSalonIds.value.length);
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 1.5rem);
  max-width: 480px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.4rem 0.6rem;
  z-index: 90;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-active);
  background: rgba(10, 24, 19, 0.92);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), var(--shadow-gold);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0.35rem 0.5rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
}

.nav-icon {
  font-size: 1.15rem;
}

.nav-label {
  font-size: 0.68rem;
  font-weight: 600;
}

.nav-item.active {
  color: var(--color-accent-gold);
}

.nav-item-highlight .ai-circle {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent-gold) 0%, #10b981 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(229, 185, 95, 0.5);
  margin-top: -14px;
}

.nav-item-highlight .nav-icon {
  font-size: 1.1rem;
}

.nav-item-highlight.active .ai-circle {
  transform: scale(1.08);
  box-shadow: 0 0 18px rgba(16, 185, 129, 0.8);
}

.nav-dot {
  position: absolute;
  top: 4px;
  right: 12px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.nav-counter {
  position: absolute;
  top: 2px;
  right: 8px;
  background: var(--color-accent-gold);
  color: var(--color-text-dark);
  font-size: 0.62rem;
  font-weight: 800;
  padding: 1px 4px;
  border-radius: 99px;
}
</style>
