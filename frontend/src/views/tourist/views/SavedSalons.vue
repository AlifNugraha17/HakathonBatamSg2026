<template>
  <div class="saved-salons-view animate-fade-in">
    <SavedSalonsView />
  </div>
</template>

<script setup>
import SavedSalonsView from '../../../components/tourist/SavedSalonsView.vue';
</script>

<style scoped>
.saved-salons-view {
  display: flex;
  flex-direction: column;
}
</style>
