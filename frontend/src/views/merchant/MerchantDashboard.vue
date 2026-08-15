<template>
  <div class="merchant-dashboard-layout animate-fade-in">
    <!-- Sidebar Navigation -->
    <MerchantSidebar v-model="activeTab" class="merchant-layout-sidebar" />

    <!-- Main Content Area -->
    <div class="merchant-layout-main">
      <MerchantHeader :activeTab="activeTab" />
      <main class="merchant-views-container">
        <MerchantOverview v-if="activeTab === 'overview'" @switch-tab="activeTab = $event" />
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
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MerchantSidebar from './components/MerchantSidebar.vue';
import MerchantHeader from './components/MerchantHeader.vue';
import MerchantOverview from './views/MerchantOverview.vue';
import OrdersManagement from './views/OrdersManagement.vue';
import SlotManagement from './views/SlotManagement.vue';
import TherapistRoster from './views/TherapistRoster.vue';
import MerchantProfileView from './views/MerchantProfileView.vue';
import TherapistCardModal from '../../components/merchant/TherapistCardModal.vue';

const route = useRoute();
const router = useRouter();
const activeTab = ref('overview');

onMounted(() => {
  if (route.query.tab && ['overview', 'orders', 'slots', 'therapists', 'profile'].includes(route.query.tab)) {
    activeTab.value = route.query.tab;
  }
});

watch(() => route.query.tab, (newTab) => {
  if (newTab && ['overview', 'orders', 'slots', 'therapists', 'profile'].includes(newTab)) {
    activeTab.value = newTab;
  }
});

watch(activeTab, (newTab) => {
  if (route.query.tab !== newTab) {
    router.replace({ query: { ...route.query, tab: newTab } });
  }
});
</script>

<style scoped>
.merchant-dashboard-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.5rem;
  max-width: 1440px;
  margin: 0.5rem auto 2.5rem;
  min-height: 85vh;
}

.merchant-layout-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.merchant-views-container {
  flex: 1;
}

@media (max-width: 900px) {
  .merchant-dashboard-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>

