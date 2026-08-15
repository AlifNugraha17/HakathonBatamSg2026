<template>
  <aside class="merchant-sidebar">
    <div class="sidebar-brand">
      <span class="brand-chip">Merchant Hub</span>
      <h3 class="brand-name">{{ merchantSalon?.name || 'Martha Heritage Spa' }}</h3>
      <span class="brand-loc">{{ merchantSalon?.landmark || 'Batam Harbour Bay Ferry Terminal' }}</span>
    </div>

    <!-- Navigation Items -->
    <nav class="sidebar-nav">
      <!-- 1. Spa Dashboard -->
      <button 
        class="nav-item" 
        :class="{ active: modelValue === 'overview' }"
        @click="$emit('update:modelValue', 'overview')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span class="nav-text">Spa Dashboard</span>
      </button>

      <!-- 2. Incoming Orders -->
      <button 
        class="nav-item" 
        :class="{ active: modelValue === 'orders' }"
        @click="$emit('update:modelValue', 'orders')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span class="nav-text">Incoming Orders</span>
        <span v-if="pendingCount > 0" class="badge-pending">{{ pendingCount }}</span>
      </button>

      <!-- 3. Flash Slot Broadcast -->
      <button 
        class="nav-item" 
        :class="{ active: modelValue === 'slots' }"
        @click="$emit('update:modelValue', 'slots')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        <span class="nav-text">Flash Slot Broadcast</span>
        <span class="badge-tag">Live</span>
      </button>

      <!-- 4. Therapist Roster -->
      <button 
        class="nav-item" 
        :class="{ active: modelValue === 'therapists' }"
        @click="$emit('update:modelValue', 'therapists')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span class="nav-text">Therapist Roster</span>
      </button>

      <!-- 5. Profile & Hygiene -->
      <button 
        class="nav-item" 
        :class="{ active: modelValue === 'profile' }"
        @click="$emit('update:modelValue', 'profile')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <span class="nav-text">Profile & Hygiene</span>
      </button>
    </nav>

    <!-- Quick Switcher Box -->
    <div class="sidebar-footer">
      <span class="hint-label">Quick Portal Access:</span>
      <div class="hint-btns">
        <button class="hint-btn" @click="quickLogin('admin')">
          Admin
        </button>
        <button class="hint-btn" @click="quickLogin('tourist')">
          Tourist
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useZenturaStore } from '../../../composables/useZenturaStore';
import { useAuth } from '../../../composables/useAuth';

defineProps({
  modelValue: {
    type: String,
    default: 'overview'
  }
});

defineEmits(['update:modelValue']);

const { merchantSalon, merchantBookings } = useZenturaStore();
const { quickLogin } = useAuth();

const pendingCount = computed(() => {
  return (merchantBookings.value || []).filter(b => b.status === 'pending').length;
});
</script>

<style scoped>
.merchant-sidebar {
  width: 260px;
  border-radius: var(--radius-lg);
  padding: 1.5rem 1.15rem;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  flex-shrink: 0;
  gap: 1.25rem;
  box-sizing: border-box;
}

.sidebar-brand {
  padding: 0.25rem 0.5rem 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.brand-chip {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 800;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.35rem;
}

.brand-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.15rem 0;
  letter-spacing: -0.02em;
}

.brand-loc {
  font-size: 0.74rem;
  color: #64748b;
  display: block;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid transparent;
  color: #475569;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  width: 100%;
  box-sizing: border-box;
}

.nav-icon {
  width: 18px;
  height: 18px;
  color: #64748b;
  flex-shrink: 0;
  transition: color 0.15s ease;
}

.nav-item:hover {
  background: #f8fafc;
  color: #1e3a8a;
  border-color: #e2e8f0;
}

.nav-item:hover .nav-icon {
  color: #1e3a8a;
}

.nav-item.active {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
  font-weight: 700;
}

.nav-item.active .nav-icon {
  color: #1d4ed8;
}

.nav-text {
  flex: 1;
}

.badge-pending {
  background: #ef4444;
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.1rem 0.45rem;
  border-radius: 99px;
}

.badge-tag {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
}

.sidebar-footer {
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.hint-label {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 600;
}

.hint-btns {
  display: flex;
  gap: 0.4rem;
}

.hint-btn {
  flex: 1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.35rem 0.5rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s ease;
}

.hint-btn:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e3a8a;
}

@media (max-width: 900px) {
  .merchant-sidebar {
    width: 100%;
    padding: 1rem;
    gap: 0.75rem;
  }
  .sidebar-brand {
    display: none;
  }
  .sidebar-nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 0.4rem;
  }
  .nav-item {
    padding: 0.5rem 0.65rem;
    font-size: 0.78rem;
    justify-content: center;
    text-align: center;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
  }
  .nav-item.active {
    background: #eff6ff;
    border-color: #bfdbfe;
  }
  .sidebar-footer {
    display: none;
  }
}
</style>
