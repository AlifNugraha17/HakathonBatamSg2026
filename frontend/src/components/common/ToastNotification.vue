<template>
  <div class="toast-container" aria-live="polite" aria-atomic="true">
    <TransitionGroup name="toast-slide">
      <div 
        v-for="toast in notifications" 
        :key="toast.id" 
        class="toast-card"
        :class="'toast-' + toast.type"
      >
        <!-- Status Icon Column -->
        <div class="toast-icon-wrap">
          <span v-if="toast.type === 'success'" class="icon-sym success-sym">✓</span>
          <span v-else-if="toast.type === 'error'" class="icon-sym error-sym">✕</span>
          <span v-else-if="toast.type === 'warning'" class="icon-sym warning-sym">⚠️</span>
          <span v-else class="icon-sym info-sym">ℹ</span>
        </div>

        <!-- Content Column -->
        <div class="toast-body">
          <div v-if="toast.title" class="toast-title">
            {{ toast.title }}
          </div>
          <p class="toast-msg">{{ toast.message }}</p>
        </div>

        <!-- Dismiss Close Button -->
        <button 
          class="toast-close-btn" 
          aria-label="Tutup notifikasi"
          @click="removeToast(toast.id)"
        >
          ✕
        </button>

        <!-- Progress timer line -->
        <div class="toast-timer-bar"></div>
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
  top: 24px;
  right: 24px;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px;
  pointer-events: none;
}

.toast-card {
  pointer-events: auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  backdrop-filter: blur(8px);
}

/* Success Card */
.toast-success {
  border-left: 5px solid #10b981;
  background: #f0fdf4;
}
.toast-success .success-sym {
  background: #10b981;
  color: #ffffff;
}
.toast-success .toast-title {
  color: #065f46;
}
.toast-success .toast-msg {
  color: #047857;
}

/* Error / Failed Card */
.toast-error {
  border-left: 5px solid #ef4444;
  background: #fef2f2;
}
.toast-error .error-sym {
  background: #ef4444;
  color: #ffffff;
}
.toast-error .toast-title {
  color: #991b1b;
}
.toast-error .toast-msg {
  color: #b91c1c;
}

/* Warning Card */
.toast-warning {
  border-left: 5px solid #f59e0b;
  background: #fffbeb;
}
.toast-warning .warning-sym {
  background: #f59e0b;
  color: #ffffff;
}
.toast-warning .toast-title {
  color: #92400e;
}
.toast-warning .toast-msg {
  color: #b45309;
}

/* Info Card */
.toast-info {
  border-left: 5px solid #2563eb;
  background: #eff6ff;
}
.toast-info .info-sym {
  background: #2563eb;
  color: #ffffff;
}
.toast-info .toast-title {
  color: #1e3a8a;
}
.toast-info .toast-msg {
  color: #1d4ed8;
}

.toast-icon-wrap {
  flex-shrink: 0;
  margin-top: 1px;
}

.icon-sym {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 0.76rem;
  font-weight: 900;
}

.toast-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toast-title {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: -0.01em;
}

.toast-msg {
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.4;
  font-weight: 500;
  word-break: break-word;
}

.toast-close-btn {
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 2px 4px;
  line-height: 1;
  transition: color 0.15s;
  border-radius: 4px;
}

.toast-close-btn:hover {
  color: #0f172a;
  background: rgba(0, 0, 0, 0.05);
}

.toast-timer-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: currentColor;
  opacity: 0.25;
  animation: toastTimer 4s linear forwards;
}

@keyframes toastTimer {
  from { width: 100%; }
  to { width: 0%; }
}

/* Animations */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(60px) scale(0.9);
}

@media (max-width: 600px) {
  .toast-container {
    top: 12px;
    right: 12px;
    left: 12px;
    max-width: calc(100% - 24px);
  }
}
</style>
