import { ref } from 'vue';
import { useLanguage } from './useLanguage';

const notifications = ref([]);

export function useNotification() {
  const { currentLang } = useLanguage();

  const getLocalizedText = (textOrObj) => {
    if (!textOrObj) return '';
    if (typeof textOrObj === 'object' && textOrObj !== null) {
      const lang = currentLang?.value || 'en';
      return textOrObj[lang] || textOrObj.en || textOrObj.id || textOrObj.message || '';
    }
    return String(textOrObj || '');
  };

  const showToast = (messageOrObj, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    
    let title = '';
    let message = '';
    let toastType = type;

    const isId = currentLang?.value === 'id';

    if (typeof messageOrObj === 'object' && messageOrObj !== null) {
      if (messageOrObj.title || messageOrObj.message) {
        title = getLocalizedText(messageOrObj.title);
        message = getLocalizedText(messageOrObj.message);
        toastType = messageOrObj.type || type;
        if (messageOrObj.duration) duration = messageOrObj.duration;
      } else {
        message = getLocalizedText(messageOrObj);
      }
    } else {
      message = getLocalizedText(messageOrObj);
    }

    if (!title) {
      if (toastType === 'success') title = isId ? 'Berhasil' : 'Success';
      else if (toastType === 'error' || toastType === 'failed') {
        title = isId ? 'Gagal' : 'Failed';
        toastType = 'error';
      }
      else if (toastType === 'warning') title = isId ? 'Peringatan' : 'Warning';
      else title = isId ? 'Informasi' : 'Notice';
    }

    const toastItem = {
      id,
      title,
      message,
      type: toastType,
      duration,
      createdAt: Date.now()
    };

    notifications.value.unshift(toastItem);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const showSuccess = (message, title) => {
    const isId = currentLang.value === 'id';
    return showToast({
      title: title || (isId ? 'Berhasil' : 'Success'),
      message,
      type: 'success'
    });
  };

  const showError = (message, title) => {
    const isId = currentLang.value === 'id';
    return showToast({
      title: title || (isId ? 'Gagal' : 'Error'),
      message,
      type: 'error'
    });
  };

  const showInfo = (message, title) => {
    const isId = currentLang.value === 'id';
    return showToast({
      title: title || (isId ? 'Informasi' : 'Information'),
      message,
      type: 'info'
    });
  };

  const showWarning = (message, title) => {
    const isId = currentLang.value === 'id';
    return showToast({
      title: title || (isId ? 'Peringatan' : 'Warning'),
      message,
      type: 'warning'
    });
  };

  const removeToast = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  };

  return {
    notifications,
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
    getLocalizedText
  };
}
