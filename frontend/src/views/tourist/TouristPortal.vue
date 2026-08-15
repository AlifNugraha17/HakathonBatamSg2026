<template>
  <div class="tourist-portal-root animate-fade-in">
    <!-- Header -->
    <TouristHeader />

    <!-- Navigation Tabs -->
    <TouristNav v-model="activeTouristTab" />

    <!-- Sub-views -->
    <main class="tourist-tab-content">
      <DiscoverSalons v-if="activeTouristTab === 'discover'" />
      <SmartMatcher v-else-if="activeTouristTab === 'matcher'" />
      <AiTranslationBridge v-else-if="activeTouristTab === 'translator'" />
      <MyBookings v-else-if="activeTouristTab === 'bookings'" />
      <SavedSalons v-else-if="activeTouristTab === 'saved'" />
    </main>

    <!-- Modals -->
    <SalonDetailModal />
    <AiTranslatorModal />
    <WhatsAppBookingModal />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TouristHeader from './components/TouristHeader.vue';
import TouristNav from './components/TouristNav.vue';
import DiscoverSalons from './views/DiscoverSalons.vue';
import SmartMatcher from './views/SmartMatcher.vue';
import AiTranslationBridge from './views/AiTranslationBridge.vue';
import MyBookings from './views/MyBookings.vue';
import SavedSalons from './views/SavedSalons.vue';
import SalonDetailModal from '../../components/tourist/SalonDetailModal.vue';
import AiTranslatorModal from '../../components/tourist/AiTranslatorModal.vue';
import WhatsAppBookingModal from '../../components/tourist/WhatsAppBookingModal.vue';

const activeTouristTab = ref('discover');
</script>

<style scoped>
.tourist-portal-root {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
}

.tourist-tab-content {
  flex: 1;
}
</style>
