<template>
  <div class="admin-dashboard-layout animate-fade-in">
    <!-- Sidebar Navigation -->
    <AdminSidebar class="admin-layout-sidebar" />

    <!-- Main Content Area -->
    <div class="admin-layout-main">
      <AdminHeader />

      <!-- Active Tab Views -->
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
import { useAdminStore } from '../../composables/useAdminStore';
import AdminSidebar from './components/AdminSidebar.vue';
import AdminHeader from './components/AdminHeader.vue';
import AdminOverview from './views/AdminOverview.vue';
import MerchantManagement from './views/MerchantManagement.vue';
import UserManagement from './views/UserManagement.vue';
import AiMonitoring from './views/AiMonitoring.vue';
import FinanceRevenue from './views/FinanceRevenue.vue';
import SystemSettings from './views/SystemSettings.vue';

const { activeAdminTab } = useAdminStore();
</script>

<style scoped>
.admin-dashboard-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.25rem;
  max-width: 1400px;
  margin: 0 auto;
}

.admin-layout-main {
  display: flex;
  flex-direction: column;
}

.admin-views-container {
  flex: 1;
}

@media (max-width: 900px) {
  .admin-dashboard-layout {
    grid-template-columns: 1fr;
  }
}
</style>
