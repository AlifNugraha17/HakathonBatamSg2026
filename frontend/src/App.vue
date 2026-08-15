<template>
  <div class="app-wrapper">
    <!-- Top Global Role & Navigation Bar -->
    <TopRoleBar />

    <!-- Main Content Routed View -->
    <main class="main-content-view">
      <router-view v-slot="{ Component }">
        <transition name="fade-view" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Global Interactive Toast Notification System -->
    <ToastNotification />
  </div>
</template>

<script setup>
import TopRoleBar from './components/common/TopRoleBar.vue';
import ToastNotification from './components/common/ToastNotification.vue';
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  padding: 0.75rem 1.5rem 3rem;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
}

.main-content-view {
  margin-top: 1.25rem;
}

@media (max-width: 768px) {
  .app-wrapper {
    padding: 0.5rem 0.75rem 2rem;
  }
}
</style>
