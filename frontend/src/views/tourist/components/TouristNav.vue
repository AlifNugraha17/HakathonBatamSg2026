<template>
  <nav class="tourist-nav-bar">
    <!-- 1. Discover Destinations -->
    <button 
      class="nav-tab-btn" 
      :class="{ active: modelValue === 'discover' }"
      @click="$emit('update:modelValue', 'discover')"
    >
      <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <span class="tab-label">Discover Destinations (49)</span>
    </button>

    <!-- 2. Time Gap Matcher -->
    <button 
      class="nav-tab-btn" 
      :class="{ active: modelValue === 'matcher' }"
      @click="$emit('update:modelValue', 'matcher')"
    >
      <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span class="tab-label">Express Slot Matcher</span>
    </button>

    <!-- 3. AI Smart Concierge & Itinerary -->
    <button 
      class="nav-tab-btn" 
      :class="{ active: modelValue === 'concierge' }"
      @click="$emit('update:modelValue', 'concierge')"
    >
      <span class="tab-emoji-icon">✨</span>
      <span class="tab-label">AI Itinerary & Concierge</span>
    </button>

    <!-- 4. AI Clinical Doctor Translator -->
    <button 
      class="nav-tab-btn" 
      :class="{ active: modelValue === 'translator' }"
      @click="$emit('update:modelValue', 'translator')"
    >
      <span class="tab-emoji-icon">🩺</span>
      <span class="tab-label">AI Doctor Translator</span>
    </button>

    <!-- 5. My Itinerary & Appointments -->
    <button 
      class="nav-tab-btn" 
      :class="{ active: modelValue === 'bookings' }"
      @click="$emit('update:modelValue', 'bookings')"
    >
      <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      <span class="tab-label">My Appointments</span>
      <span v-if="bookings.length > 0" class="badge-count">{{ bookings.length }}</span>
    </button>

    <!-- 6. Saved Favorites -->
    <button 
      class="nav-tab-btn" 
      :class="{ active: modelValue === 'saved' }"
      @click="$emit('update:modelValue', 'saved')"
    >
      <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      <span class="tab-label">Saved Favorites</span>
      <span v-if="savedSalonIds.length > 0" class="badge-count">{{ savedSalonIds.length }}</span>
    </button>

    <!-- Sign Out Button -->
    <button class="nav-tab-btn btn-nav-logout" @click="logout" title="Sign Out">
      <svg class="tab-icon text-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
      <span class="tab-label text-red">Sign Out</span>
    </button>
  </nav>
</template>

<script setup>
import { useLokaBatamStore } from '../../../composables/useLokaBatamStore';
import { useAuth } from '../../../composables/useAuth';

defineProps({
  modelValue: { type: String, default: 'discover' }
});

defineEmits(['update:modelValue']);

const { bookings, savedSalonIds } = useLokaBatamStore();
const { logout } = useAuth();
</script>

<style scoped>
.tourist-nav-bar {
  display: flex;
  gap: 0.35rem;
  padding: 0.35rem;
  border-radius: var(--radius-md);
  background: #f1f5f9;
  margin-bottom: 1.25rem;
  overflow-x: auto;
}

.nav-tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 0.95rem;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: #475569;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.tab-icon {
  width: 16px;
  height: 16px;
  color: #64748b;
  flex-shrink: 0;
  transition: color 0.15s ease;
}

.nav-tab-btn:hover {
  color: #1e3a8a;
}

.nav-tab-btn:hover .tab-icon {
  color: #1e3a8a;
}

.nav-tab-btn.active {
  background: #ffffff;
  color: #1e3a8a;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.nav-tab-btn.active .tab-icon {
  color: #1d4ed8;
}

.badge-count {
  padding: 0.15rem 0.45rem;
  background: #1d4ed8;
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 700;
  border-radius: 99px;
}

.text-red {
  color: #dc2626 !important;
}

.btn-nav-logout:hover {
  background: #fee2e2;
  color: #dc2626;
}
</style>
