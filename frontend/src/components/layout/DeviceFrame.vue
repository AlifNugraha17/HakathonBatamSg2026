<template>
  <div class="frame-wrapper" :class="{ 'phone-mode': previewMode === 'phone', 'full-mode': previewMode === 'responsive' }">
    <!-- Phone Bezel Container (Only when phone mode is active) -->
    <div v-if="previewMode === 'phone'" class="mockup-phone">
      <!-- Status Bar -->
      <div class="phone-statusbar">
        <span class="status-time">{{ currentTimeFormatted }}</span>
        <div class="dynamic-island">
          <div class="island-camera"></div>
          <div class="island-sensor"></div>
        </div>
        <div class="status-icons">
          <span class="status-icon">5G</span>
          <span class="status-icon">100% 🔋</span>
        </div>
      </div>

      <!-- Scrollable App Viewport -->
      <div class="phone-viewport" id="phone-viewport-container">
        <slot />
      </div>

      <!-- Home Indicator Bar -->
      <div class="home-indicator"></div>
    </div>

    <!-- Responsive Desktop Container -->
    <div v-else class="responsive-container">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useLokaBatamStore } from '../../composables/useLokaBatamStore';

const { previewMode } = useLokaBatamStore();
const currentTimeFormatted = ref('14:25');

let intervalId = null;

onMounted(() => {
  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    currentTimeFormatted.value = `${hours}:${mins}`;
  };
  updateClock();
  intervalId = setInterval(updateClock, 30000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.frame-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: all var(--transition-smooth);
}

/* Phone Mockup Frame */
.mockup-phone {
  width: 100%;
  max-width: 440px;
  min-height: 880px;
  background: var(--color-bg-primary);
  border: 10px solid #1c2e28;
  border-radius: 46px;
  box-shadow: 
    0 0 0 2px rgba(229, 185, 95, 0.3),
    0 25px 60px rgba(0, 0, 0, 0.75),
    0 0 40px rgba(16, 185, 129, 0.15);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  margin: 1rem auto 5rem;
}

.phone-statusbar {
  height: 38px;
  background: #081612;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.dynamic-island {
  width: 92px;
  height: 22px;
  background: #000000;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

.island-camera {
  width: 9px;
  height: 9px;
  background: #0c1a17;
  border-radius: 50%;
  border: 1px solid #1e3830;
}

.island-sensor {
  width: 6px;
  height: 6px;
  background: #091714;
  border-radius: 50%;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
}

.phone-viewport {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1rem 5.5rem;
  position: relative;
}

.home-indicator {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 130px;
  height: 4px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  z-index: 95;
  pointer-events: none;
}

/* Full Responsive Desktop Mode */
.responsive-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem 5rem;
}
</style>
