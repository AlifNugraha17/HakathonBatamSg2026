<template>
  <div class="toast-container">
    <TransitionGroup name="toast-fade">
      <div 
        v-for="toast in notifications" 
        :key="toast.id" 
        class="toast-item"
        :class="'toast-' + toast.type"
      >
        <div class="toast-content">
          <p class="toast-message">{{ toast.message }}</p>
        </div>
        <button class="toast-close" @click="removeToast(toast.id)">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useNotification } from '../../composables/useNotification';

const { notifications, removeToast } = useNotification();
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 360px;
  pointer-events: none;
}

.toast-item {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: #0f172a;
  color: #ffffff;
  font-size: 0.84rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #1e293b;
}

.toast-success {
  background: #0f172a;
  border-left: 3px solid #10b981;
}

.toast-error {
  background: #0f172a;
  border-left: 3px solid #ef4444;
}

.toast-info {
  background: #0f172a;
  border-left: 3px solid #3b82f6;
}

.toast-content {
  flex: 1;
}

.toast-message {
  margin: 0;
  line-height: 1.4;
  font-weight: 500;
}

.toast-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 2px 4px;
  line-height: 1;
}

.toast-close:hover {
  color: #ffffff;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.2s ease;
}

.toast-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.toast-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
