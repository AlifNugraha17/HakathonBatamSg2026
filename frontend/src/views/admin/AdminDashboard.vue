<template>
  <div class="admin-dashboard-layout animate-fade-in">
    <!-- Sidebar Navigation -->
    <AdminSidebar class="admin-layout-sidebar" />

    <!-- Main Content Area -->
    <div class="admin-layout-main">
      <AdminHeader />
      <main class="admin-views-container">
        <AdminOverview v-if="activeAdminTab === 'overview'" />
        <MerchantManagement v-else-if="activeAdminTab === 'merchants'" />
        <UserManagement v-else-if="activeAdminTab === 'users'" />
        <AiMonitoring v-else-if="activeAdminTab === 'ai'" />
        <FinanceRevenue v-else-if="activeAdminTab === 'finance'" />
        <SystemSettings v-else-if="activeAdminTab === 'settings'" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAdminStore } from '../../composables/useAdminStore';
import AdminSidebar from './components/AdminSidebar.vue';
import AdminHeader from './components/AdminHeader.vue';
import AdminOverview from './views/AdminOverview.vue';
import MerchantManagement from './views/MerchantManagement.vue';
import UserManagement from './views/UserManagement.vue';
import AiMonitoring from './views/AiMonitoring.vue';
import FinanceRevenue from './views/FinanceRevenue.vue';
import SystemSettings from './views/SystemSettings.vue';

const route = useRoute();
const router = useRouter();
const { activeAdminTab } = useAdminStore();

onMounted(() => {
  if (route.query.tab && ['overview', 'merchants', 'users', 'ai', 'finance', 'settings'].includes(route.query.tab)) {
    activeAdminTab.value = route.query.tab;
  }
});

watch(() => route.query.tab, (newTab) => {
  if (newTab && ['overview', 'merchants', 'users', 'ai', 'finance', 'settings'].includes(newTab)) {
    activeAdminTab.value = newTab;
  }
});

watch(activeAdminTab, (newTab) => {
  if (route.query.tab !== newTab) {
    router.replace({ query: { ...route.query, tab: newTab } });
  }
});
</script>

<style scoped>
.admin-dashboard-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.5rem;
  max-width: 1440px;
  margin: 0.5rem auto 2.5rem;
}

.admin-layout-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.admin-views-container {
  flex: 1;
}

@media (max-width: 900px) {
  .admin-dashboard-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>


