<template>
  <div class="smart-matcher-view animate-fade-in">
    <div class="section-title-box">
      <h2 class="view-heading">Smart Micro-Moment Time Matcher</h2>
      <p class="view-subheading">Instant matching engine dynamically pairing your spare pre-ferry window (30 to 90 mins) with vacant massage chairs.</p>
    </div>

    <!-- Matcher Interactive Filter & Results -->
    <MicroMomentMatcher />
  </div>
</template>

<script setup>
import MicroMomentMatcher from '../../../components/tourist/MicroMomentMatcher.vue';
</script>

<style scoped>
.smart-matcher-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title-box {
  margin-bottom: 0.25rem;
}

.view-heading {
  font-size: 1.3rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.25rem;
  letter-spacing: -0.02em;
}

.view-subheading {
  font-size: 0.84rem;
  color: #64748b;
}
</style>
