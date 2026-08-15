<template>
  <div class="login-page-root animate-fade-in">
    <div class="login-centered-card">
      <AuthCard />
    </div>
  </div>
</template>

<script setup>
import AuthCard from './components/AuthCard.vue';
</script>

<style scoped>
.login-page-root {
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1rem;
  max-width: 520px;
  margin: 0 auto;
}

.login-centered-card {
  width: 100%;
}
</style>
