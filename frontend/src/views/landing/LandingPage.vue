<template>
  <div class="landing-page-root animate-fade-in">
    <!-- 1. Hero Showcase Section -->
    <HeroSection />

    <!-- 2. The Batam - Singapore Cross-Border Friction & Solution Section -->
    <BatamSgProblemSolution />

    <!-- 3. Interactive Live Innovation Simulators (Judges Interactive Demo) -->
    <InteractiveFeaturePreview />

    <!-- 4. Key Performance Stats & Ecosystem Metrics -->
    <LiveStats />

    <!-- 5. Role-Based Portals Showcase & Feature Access Matrix -->
    <RoleShowcase />

    <!-- 6. Four Pillars of Innovation -->
    <FeatureGrid />

    <!-- 7. Regional Impact & Ecosystem Velocity -->
    <HackathonPitchCard />

    <!-- 8. Standard Footer -->
    <LandingFooter />
  </div>
</template>

<script setup>
import HeroSection from './components/HeroSection.vue';
import BatamSgProblemSolution from './components/BatamSgProblemSolution.vue';
import InteractiveFeaturePreview from './components/InteractiveFeaturePreview.vue';
import LiveStats from './components/LiveStats.vue';
import RoleShowcase from './components/RoleShowcase.vue';
import FeatureGrid from './components/FeatureGrid.vue';
import HackathonPitchCard from './components/HackathonPitchCard.vue';
import LandingFooter from './components/LandingFooter.vue';
</script>

<style scoped>
.landing-page-root {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}
</style>
