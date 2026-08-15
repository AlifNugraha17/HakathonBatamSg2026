<template>
  <div class="app-wrapper">
    <!-- Top Global Role & Navigation Bar -->
    <TopRoleBar />

    <!-- Main View Switcher -->
    <main class="main-content-view">
      <!-- 1. LANDING PAGE (1280px Standard SaaS Layout) -->
      <LandingPage v-if="currentView === 'landing'" />

      <!-- 2. LOGIN PAGE -->
      <LoginPage v-else-if="currentView === 'login'" />

      <!-- 3. ROLE-BASED DASHBOARD FITUR -->
      <template v-else-if="currentView === 'dashboard'">
        <!-- Super Admin Role -->
        <AdminDashboard v-if="currentRole === 'admin'" />

        <!-- Merchant / Partner Role -->
        <MerchantDashboard v-else-if="currentRole === 'merchant'" />

        <!-- Tourist / Customer Role -->
        <TouristPortal v-else-if="currentRole === 'tourist'" />
      </template>
    </main>

    <!-- Global Interactive Toast Notification System -->
    <ToastNotification />
  </div>
</template>

<script setup>
import { useAuth } from './composables/useAuth';
import TopRoleBar from './components/common/TopRoleBar.vue';
import ToastNotification from './components/common/ToastNotification.vue';
import LandingPage from './views/landing/LandingPage.vue';
import LoginPage from './views/auth/LoginPage.vue';
import AdminDashboard from './views/admin/AdminDashboard.vue';
import MerchantDashboard from './views/merchant/MerchantDashboard.vue';
import TouristPortal from './views/tourist/TouristPortal.vue';

const { currentView, currentRole } = useAuth();
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  padding: 0.75rem 1.25rem 3rem;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

.main-content-view {
  margin-top: 0.85rem;
}

@media (max-width: 768px) {
  .app-wrapper {
    padding: 0.5rem 0.75rem 2rem;
  }
}
</style>
