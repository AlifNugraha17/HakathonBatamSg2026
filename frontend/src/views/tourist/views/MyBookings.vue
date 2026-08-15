<template>
  <div class="my-bookings-view animate-fade-in">
    <MyBookingsView />
  </div>
</template>

<script setup>
import MyBookingsView from '../../../components/tourist/MyBookingsView.vue';
</script>

<style scoped>
.my-bookings-view {
  display: flex;
  flex-direction: column;
}
</style>
