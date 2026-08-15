<template>
  <header class="tourist-header">
    <div class="header-top-row">
      <div class="brand-meta">
        <div class="badge-pill">
          <span>Singapore ⇄ Batam Maritime Concierge</span>
        </div>
        <h2 class="welcome-heading">
          {{ activeRegionObj?.name || 'Batam Harbour Bay Zone' }}
        </h2>
        <p class="welcome-desc">
          Fill your pre-ferry transit window with dynamic wellness bookings, verified 95+ hygiene centers, and AI-structured medical therapist cards.
        </p>
      </div>

      <!-- Region Switcher: Batam Ferry Zones -->
      <div class="region-selector-box">
        <span class="box-label">Select Batam Ferry Terminal Zone:</span>
        <div class="region-chips">
          <button 
            class="region-chip" 
            :class="{ active: currentRegion === 'batam' }"
            @click="currentRegion = 'batam'"
          >
            <span>Harbour Bay</span>
          </button>
          <button 
            class="region-chip" 
            :class="{ active: currentRegion === 'batam_centre' }"
            @click="currentRegion = 'batam_centre'"
          >
            <span>Batam Centre</span>
          </button>
          <button 
            class="region-chip" 
            :class="{ active: currentRegion === 'batam_nongsa' }"
            @click="currentRegion = 'batam_nongsa'"
          >
            <span>Nongsa Pura</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useZenturaStore } from '../../../composables/useZenturaStore';

const { currentRegion, activeRegionObj } = useZenturaStore();
</script>

<style scoped>
.tourist-header {
  padding: 1.5rem 1.75rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  margin-bottom: 1rem;
}

.header-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.brand-meta {
  max-width: 580px;
}

.badge-pill {
  display: inline-flex;
  font-size: 0.74rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-full);
  margin-bottom: 0.5rem;
}

.welcome-heading {
  font-size: 1.45rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.25;
  margin: 0 0 0.3rem 0;
  letter-spacing: -0.02em;
}

.welcome-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

.region-selector-box {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.box-label {
  font-size: 0.74rem;
  color: #1e3a8a;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.region-chips {
  display: flex;
  gap: 0.4rem;
}

.region-chip {
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.region-chip:hover {
  background: #ffffff;
  color: #1e3a8a;
  border-color: #93c5fd;
}

.region-chip.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
  box-shadow: 0 2px 6px rgba(30, 58, 138, 0.2);
}
</style>
