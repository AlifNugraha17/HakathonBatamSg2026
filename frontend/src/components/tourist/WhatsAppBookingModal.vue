<template>
  <div v-if="isWhatsAppModalOpen" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Header -->
      <div class="wa-header">
        <div class="header-title-box">
          <div>
            <h3 class="modal-title">1-Click WhatsApp Direct Reservation</h3>
            <p class="modal-sub">Formatted booking message dispatch to verified partner owner</p>
          </div>
        </div>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>

      <!-- Content in English -->
      <div class="wa-body">
        <!-- Salon Contact Banner -->
        <div class="contact-card">
          <div class="contact-avatar">{{ payload.salonName?.charAt(0) || 'S' }}</div>
          <div class="contact-info">
            <div class="contact-name">{{ payload.salonName }}</div>
            <div class="contact-number">{{ payload.salonPhone }} (Direct Partner WhatsApp)</div>
          </div>
          <span class="badge-verified">Verified Partner</span>
        </div>

        <!-- Simulated WhatsApp Chat Preview -->
        <div class="chat-mockup">
          <div class="chat-bubble">
            <div class="bubble-header">
              <span class="bubble-tag">LOKABATAM CONCIERGE DISPATCH</span>
            </div>
            <div class="bubble-text" v-html="formattedHtmlMessage"></div>
            <div class="bubble-time">
              <span>Just now</span>
              <span class="check-marks">✓✓</span>
            </div>
          </div>
        </div>

        <!-- Booking Actions & Copy -->
        <div class="action-strip">
          <button class="btn-copy" @click="copyMessage">
            <span>{{ copied ? '✓ Copied to Clipboard!' : 'Copy Text' }}</span>
          </button>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-send-wa"
            @click="handleSendWhatsApp"
          >
            Launch WhatsApp & Confirm →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLokaBatamStore } from '../../composables/useLokaBatamStore';
import { useAiTranslator } from '../../composables/useAiTranslator';
import { useNotification } from '../../composables/useNotification';

const {
  isWhatsAppModalOpen,
  selectedSlotForBooking,
  selectedSalonForDetail,
  currentBookingPayload,
  addBooking
} = useLokaBatamStore();

const { showToast } = useNotification();
const copied = ref(false);

const payload = computed(() => {
  const slot = selectedSlotForBooking.value || {};
  return {
    salonName: slot.salonName || 'LokaBatam Destination Partner',
    salonPhone: '+62 812-7788-9901',
    serviceName: slot.serviceName || 'Destination Experience',
    durationMinutes: slot.durationMinutes || 45,
    priceIdr: slot.priceIdr || 280000,
    time: slot.time || '14:30',
    therapistName: slot.therapistName || 'Lead Specialist'
  };
});

const rawMessage = computed(() => {
  const p = payload.value;
  return `*LOKABATAM CONCIERGE RESERVATION*\n\n` +
    `Hello *${p.salonName}*,\n` +
    `I would like to confirm my booking via LokaBatam Platform:\n\n` +
    `• Service: *${p.serviceName}* (${p.durationMinutes} mins)\n` +
    `• Time Window: *${p.time}*\n` +
    `• Specialist / Staff: *${p.therapistName}*\n` +
    `• Total Rate: *IDR ${Number(p.priceIdr).toLocaleString('id-ID')}*\n` +
    `• Guest Name: Alexandre Tan (Singapore Ferry Traveler)\n\n` +
    `Please confirm slot availability. Thank you!`;
});

const formattedHtmlMessage = computed(() => {
  return rawMessage.value
    .replace(/\n/g, '<br>')
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>');
});

const whatsappUrl = computed(() => {
  const phone = payload.value.salonPhone.replace(/[^0-9]/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(rawMessage.value)}`;
});

const closeModal = () => {
  isWhatsAppModalOpen.value = false;
};

const copyMessage = () => {
  navigator.clipboard.writeText(rawMessage.value);
  copied.value = true;
  showToast('Booking message copied to clipboard!', 'info');
  setTimeout(() => (copied.value = false), 2000);
};

const handleSendWhatsApp = () => {
  createBookingFromSlot(selectedSlotForBooking.value);
  showToast('Booking created and added to your itinerary!', 'success');
  closeModal();
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1.5rem;
}

.modal-content {
  width: 100%;
  max-width: 540px;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.wa-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.modal-sub {
  font-size: 0.78rem;
  color: #64748b;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  color: #94a3b8;
  cursor: pointer;
}

.wa-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.contact-card {
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.contact-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #1e3a8a;
  color: #ffffff;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.contact-info {
  flex: 1;
}

.contact-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a;
}

.contact-number {
  font-size: 0.74rem;
  color: #64748b;
}

.badge-verified {
  font-size: 0.68rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.chat-mockup {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.chat-bubble {
  padding: 1rem 1.15rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.bubble-header {
  margin-bottom: 0.5rem;
}

.bubble-tag {
  font-size: 0.65rem;
  font-weight: 800;
  color: #1e3a8a;
  letter-spacing: 0.05em;
}

.bubble-text {
  font-size: 0.82rem;
  color: #1e293b;
  line-height: 1.5;
}

.bubble-time {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.68rem;
  color: #94a3b8;
  margin-top: 0.5rem;
}

.check-marks {
  color: #2563eb;
  font-weight: 700;
}

.action-strip {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.65rem;
}

.btn-copy {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #475569;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.6rem 1.15rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s;
}

.btn-copy:hover {
  background: #f8fafc;
  color: #0f172a;
}

.btn-send-wa {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.84rem;
  font-weight: 700;
  padding: 0.6rem 1.4rem;
  border-radius: var(--radius-xs);
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(29, 78, 216, 0.2);
  transition: all 0.15s;
}

.btn-send-wa:hover {
  background: #0f172a;
}
</style>
