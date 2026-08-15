<template>
  <div class="discover-salons-view animate-fade-in">
    <!-- Top Micro-Moment Matcher Banner -->
    <MicroMomentMatcher />

    <!-- Category Pills -->
    <CategoryPills />

    <!-- Salons List -->
    <SalonList />
  </div>
</template>

<script setup>
import MicroMomentMatcher from '../../../components/tourist/MicroMomentMatcher.vue';
import CategoryPills from '../../../components/tourist/CategoryPills.vue';
import SalonList from '../../../components/tourist/SalonList.vue';
</script>

<style scoped>
.discover-salons-view {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>
