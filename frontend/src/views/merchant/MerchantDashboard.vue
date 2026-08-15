<template>
  <div class="merchant-dashboard-layout animate-fade-in">
    <!-- Sidebar Navigation -->
    <MerchantSidebar v-model="activeTab" class="merchant-layout-sidebar" />

    <!-- Main Content Area -->
    <div class="merchant-layout-main">
      <MerchantHeader :activeTab="activeTab" />

      <!-- Active Tab Views -->
      <main class="merchant-views-container">
        <MerchantOverview 
          v-if="activeTab === 'overview'" 
          @switch-tab="activeTab = $event" 
        />
        <OrdersManagement v-else-if="activeTab === 'orders'" />
        <SlotManagement v-else-if="activeTab === 'slots'" />
        <TherapistRoster v-else-if="activeTab === 'therapists'" />
        <MerchantProfileView v-else-if="activeTab === 'profile'" />
      </main>
    </div>

    <!-- Modals -->
    <TherapistCardModal />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MerchantSidebar from './components/MerchantSidebar.vue';
import MerchantHeader from './components/MerchantHeader.vue';
import MerchantOverview from './views/MerchantOverview.vue';
import OrdersManagement from './views/OrdersManagement.vue';
import SlotManagement from './views/SlotManagement.vue';
import TherapistRoster from './views/TherapistRoster.vue';
import MerchantProfileView from './views/MerchantProfileView.vue';
import TherapistCardModal from '../../components/merchant/TherapistCardModal.vue';

const activeTab = ref('overview');
</script>

<style scoped>
.merchant-dashboard-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.25rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 85vh;
}

.merchant-layout-main {
  display: flex;
  flex-direction: column;
}

.merchant-views-container {
  flex: 1;
}

@media (max-width: 960px) {
  .merchant-dashboard-layout {
    grid-template-columns: 1fr;
  }
}
</style>
