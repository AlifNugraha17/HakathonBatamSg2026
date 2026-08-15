import { ref } from 'vue';

const notifications = ref([]);

export function useNotification() {
  const showToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    notifications.value.push({ id, message, type });

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  };

  return {
    notifications,
    showToast,
    removeToast
  };
}
