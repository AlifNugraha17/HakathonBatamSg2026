<template>
  <div class="matcher-card">
    <!-- Header Banner -->
    <div class="matcher-header">
      <div>
        <h3 class="matcher-title">Smart Micro-Moment Time Matcher</h3>
        <p class="matcher-subtitle">Find empty therapist chairs matching your exact free window before ferry departure</p>
      </div>

      <!-- Scan Ferry Ticket Button -->
      <button class="btn-scan-ticket" @click="openCameraScanner">
        <span class="scan-icon">📷</span>
        <span>Scan Ferry QR Ticket</span>
      </button>
    </div>

    <!-- Scanned Ticket Quick Info Banner (If Scanned) -->
    <div v-if="scannedTicket" class="scanned-ticket-banner">
      <div class="ticket-meta-left">
        <span class="ticket-badge">🚢 VERIFIED FERRY BOARDING PASS</span>
        <strong class="ticket-name">{{ scannedTicket.operator }} • {{ scannedTicket.route }}</strong>
        <span class="ticket-time">Departure: <strong>{{ scannedTicket.departureTime }}</strong> (Gate Closes: {{ scannedTicket.gateCloseTime }})</span>
      </div>
      <div class="ticket-meta-right">
        <span class="safe-window-label">Safe Spa Window:</span>
        <span class="safe-window-val">⚡ {{ scannedTicket.safeWindowMinutes }} Mins</span>
      </div>
    </div>

    <!-- Interactive Inputs in English -->
    <div class="matcher-form">
      <div class="form-row">
        <!-- Duration Selector -->
        <div class="form-group">
          <label class="form-label">Available Free Time</label>
          <div class="duration-pills">
            <button
              v-for="dur in [30, 45, 60, 90]"
              :key="dur"
              class="duration-pill"
              :class="{ active: matcherFilter.durationMinutes === dur }"
              @click="matcherFilter.durationMinutes = dur"
            >
              {{ dur }} mins
            </button>
          </div>
        </div>

        <!-- Target Time -->
        <div class="form-group">
          <label class="form-label">Approximate Time</label>
          <input
            type="time"
            v-model="matcherFilter.timeTarget"
            class="time-input"
          />
        </div>
      </div>

      <!-- Distance Radius -->
      <div class="form-group">
        <label class="form-label">Maximum Walking Distance from Terminal</label>
        <div class="distance-selector">
          <button
            v-for="dist in [5, 10, 15]"
            :key="dist"
            class="dist-btn"
            :class="{ active: matcherFilter.maxDistanceMinutes === dist }"
            @click="matcherFilter.maxDistanceMinutes = dist"
          >
            Under {{ dist }} mins walk
          </button>
        </div>
      </div>
    </div>

    <!-- Match Results Summary -->
    <div class="results-bar">
      <span class="match-count-badge">
        <strong>{{ matchedFlashSlots.length }}</strong> Flash Micro-Slots Available Right Now
      </span>
    </div>

    <!-- Matched Flash Slots Horizontal Carousel / List -->
    <div class="flash-slots-container">
      <div
        v-for="slot in matchedFlashSlots"
        :key="slot.id"
        class="slot-card"
      >
        <div class="slot-badge-row">
          <span class="badge-discount">Save {{ slot.discountPercent }}%</span>
          <span class="badge-hygiene">Hygiene {{ slot.hygieneScore }}%</span>
        </div>

        <div class="slot-salon-info">
          <h4 class="slot-salon-name">{{ slot.salonName }}</h4>
          <span class="slot-distance">{{ slot.distanceMinutes }}m from Ferry • {{ slot.salonLandmark }}</span>
        </div>

        <div class="slot-service-info">
          <span class="slot-service-name">{{ slot.serviceName }}</span>
          <span class="slot-time">{{ slot.time }} ({{ slot.durationMinutes }}m) • Therapist: {{ slot.therapistName }}</span>
        </div>

        <div class="slot-price-row">
          <div class="price-stack">
            <span class="curr-price">{{ formatPrice(slot.priceIdr) }}</span>
            <span class="orig-price">{{ formatPrice(slot.originalPriceIdr) }}</span>
          </div>

          <button class="btn-book-slot" @click="handleBookSlot(slot)">
            Book Flash Chair
          </button>
        </div>
      </div>
    </div>

    <!-- Live Camera QR Ferry Ticket Scanner Modal -->
    <div v-if="isQrModalOpen" class="modal-overlay" @click.self="closeCameraScanner">
      <div class="modal-card animate-fade-in">
        <div class="modal-header">
          <div class="header-left">
            <span class="modal-icon">📷</span>
            <div>
              <h3 class="modal-title">Live Camera Boarding Pass Scanner</h3>
              <p class="modal-sub">Scan your ferry QR code / E-ticket to auto-calculate safe transit gap</p>
            </div>
          </div>
          <button class="btn-close" @click="closeCameraScanner">✕</button>
        </div>

        <div class="scanner-viewport">
          <!-- Real Camera Stream Video -->
          <video 
            ref="videoRef" 
            autoplay 
            playsinline 
            muted 
            class="camera-stream-video"
            v-show="hasCameraFeed"
          ></video>

          <!-- Viewfinder Reticle Box Overlay -->
          <div class="viewfinder-box" :class="{ 'is-scanning': isScanning }">
            <div class="laser-line"></div>
            
            <div v-if="!hasCameraFeed" class="ticket-preview-box">
              <span class="barcode-icon">🎟️</span>
              <div class="ticket-dummy-details">
                <span class="dummy-op">MAJESTIC FAST FERRY</span>
                <span class="dummy-route">HARBOUR BAY (BTH) ➔ HARBOURFRONT (SIN)</span>
                <span class="dummy-dep">ETD: 17:30 WIB • SEAT: 14B</span>
              </div>
            </div>
          </div>
        </div>

        <div class="camera-status-bar">
          <span class="cam-dot" :class="{ live: hasCameraFeed }"></span>
          <span class="cam-text">{{ hasCameraFeed ? '● Live Camera Active (Align QR Code in Frame)' : 'Camera standby / Click Demo OCR Scan' }}</span>
        </div>

        <div class="scanner-actions">
          <button class="btn-scan-action" :disabled="isScanning" @click="captureAndAnalyzeTicket">
            <span v-if="isScanning" class="spinner"></span>
            <span>{{ isScanning ? 'Processing OCR & Ferry Time-Gap...' : '⚡ Capture & Verify Ferry Ticket' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useZenturaStore } from '../../composables/useZenturaStore';
import { useCurrency } from '../../composables/useCurrency';
import { useNotification } from '../../composables/useNotification';

const {
  matcherFilter,
  matchedFlashSlots,
  selectedSlotForBooking,
  isWhatsAppModalOpen
} = useZenturaStore();

const { formatPrice } = useCurrency();
const { showToast } = useNotification();

const isQrModalOpen = ref(false);
const isScanning = ref(false);
const hasCameraFeed = ref(false);
const scannedTicket = ref(null);
const videoRef = ref(null);
let mediaStream = null;

const openCameraScanner = async () => {
  isQrModalOpen.value = true;
  hasCameraFeed.value = false;

  if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      if (videoRef.value) {
        videoRef.value.srcObject = mediaStream;
        hasCameraFeed.value = true;
      }
    } catch (err) {
      console.info('[Camera Scanner] Webcam unavailable or permission denied, using visual OCR simulator:', err.message);
      hasCameraFeed.value = false;
    }
  }
};

const closeCameraScanner = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  hasCameraFeed.value = false;
  isQrModalOpen.value = false;
};

const captureAndAnalyzeTicket = () => {
  isScanning.value = true;
  setTimeout(() => {
    isScanning.value = false;
    scannedTicket.value = {
      operator: 'Majestic Fast Ferry',
      route: 'Harbour Bay ➔ HarbourFront SG',
      departureTime: '17:30 WIB',
      gateCloseTime: '17:00 WIB',
      safeWindowMinutes: 45
    };
    
    // Automatically configure matcher filters to safe duration
    matcherFilter.durationMinutes = 45;
    matcherFilter.maxDistanceMinutes = 10;
    
    closeCameraScanner();
    showToast('Ferry Ticket Verified! Safe 45-min spa window matched to departure.', 'success');
  }, 1200);
};

onBeforeUnmount(() => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
  }
});

const handleBookSlot = (slot) => {
  selectedSlotForBooking.value = slot;
  isWhatsAppModalOpen.value = true;
};
</script>

<style scoped>
.matcher-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  margin-bottom: 1.25rem;
}

.matcher-header {
  margin-bottom: 1.25rem;
}

.matcher-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.02em;
}

.matcher-subtitle {
  font-size: 0.82rem;
  color: #64748b;
}

.matcher-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 180px;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #1e3a8a;
}

.duration-pills {
  display: flex;
  gap: 0.4rem;
}

.duration-pill {
  flex: 1;
  padding: 0.45rem 0.65rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.duration-pill:hover {
  background: #ffffff;
  color: #1e3a8a;
  border-color: #93c5fd;
}

.duration-pill.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
  box-shadow: 0 2px 6px rgba(30, 58, 138, 0.2);
}

.time-input {
  width: 100%;
  padding: 0.45rem 0.75rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-xs);
  color: #0f172a;
  font-size: 0.84rem;
  outline: none;
}

.time-input:focus {
  border-color: #2563eb;
}

.distance-selector {
  display: flex;
  gap: 0.4rem;
}

.dist-btn {
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.dist-btn:hover {
  background: #ffffff;
  color: #1e3a8a;
  border-color: #93c5fd;
}

.dist-btn.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
  box-shadow: 0 2px 6px rgba(30, 58, 138, 0.2);
}

.results-bar {
  padding: 0.6rem 0.95rem;
  border-radius: var(--radius-xs);
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  margin-bottom: 1.25rem;
}

.match-count-badge {
  font-size: 0.8rem;
  color: #1e3a8a;
}

.flash-slots-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.slot-card {
  padding: 1.25rem;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.15s ease;
}

.slot-card:hover {
  border-color: #93c5fd;
  box-shadow: 0 8px 16px -4px rgba(30, 58, 138, 0.08);
}

.slot-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge-discount {
  font-size: 0.7rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.badge-hygiene {
  font-size: 0.7rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.slot-salon-info {
  display: flex;
  flex-direction: column;
}

.slot-salon-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.slot-distance {
  font-size: 0.74rem;
  color: #64748b;
}

.slot-service-info {
  display: flex;
  flex-direction: column;
  padding: 0.6rem;
  background: #f8fafc;
  border-radius: var(--radius-xs);
  border: 1px solid #f1f5f9;
}

.slot-service-name {
  font-size: 0.84rem;
  font-weight: 700;
  color: #0f172a;
}

.slot-time {
  font-size: 0.72rem;
  color: #64748b;
}

.slot-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.65rem;
  border-top: 1px solid #f1f5f9;
}

.price-stack {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.curr-price {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
}

.orig-price {
  font-size: 0.74rem;
  color: #94a3b8;
  text-decoration: line-through;
}

.btn-book-slot {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(29, 78, 216, 0.2);
}

.btn-book-slot:hover {
  background: #0f172a;
}

/* =========================================
   QR FERRY TICKET SCANNER STYLES
   ========================================= */
.btn-scan-ticket {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: #ffffff;
  border: none;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.45rem 0.95rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
  transition: all 0.2s ease;
}

.btn-scan-ticket:hover {
  background: #0f172a;
}

.scanned-ticket-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-left: 4px solid #16a34a;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.ticket-meta-left {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ticket-badge {
  font-size: 0.65rem;
  font-weight: 800;
  color: #15803d;
  letter-spacing: 0.04em;
}

.ticket-name {
  font-size: 0.86rem;
  color: #0f172a;
}

.ticket-time {
  font-size: 0.74rem;
  color: #475569;
}

.ticket-meta-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
}

.safe-window-label {
  font-size: 0.68rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
}

.safe-window-val {
  font-size: 1.1rem;
  font-weight: 900;
  color: #047857;
}

/* Modal Viewfinder */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-card {
  background: #ffffff;
  border-radius: 12px;
  max-width: 460px;
  width: 100%;
  padding: 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-left {
  display: flex;
  gap: 0.65rem;
}

.modal-icon {
  font-size: 1.5rem;
}

.modal-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 800;
  color: #0f172a;
}

.modal-sub {
  margin: 0;
  font-size: 0.74rem;
  color: #64748b;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1rem;
  color: #94a3b8;
  cursor: pointer;
}

.scanner-viewport {
  background: #0f172a;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  min-height: 180px;
}

.camera-stream-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-status-bar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.cam-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #94a3b8;
}

.cam-dot.live {
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
  animation: blinkCam 1.2s infinite;
}

@keyframes blinkCam {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.cam-text {
  font-size: 0.72rem;
  font-weight: 600;
  color: #475569;
}

.viewfinder-box {
  position: relative;
  width: 100%;
  height: 150px;
  border: 2px dashed #38bdf8;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(1px);
  z-index: 2;
  overflow: hidden;
}

.laser-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444;
  animation: scanLaser 1.2s infinite ease-in-out;
}

@keyframes scanLaser {
  0% { top: 0; }
  50% { top: 100%; }
  100% { top: 0; }
}

.ticket-preview-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #ffffff;
}

.barcode-icon {
  font-size: 2rem;
}

.ticket-dummy-details {
  display: flex;
  flex-direction: column;
}

.dummy-op {
  font-size: 0.78rem;
  font-weight: 800;
  color: #38bdf8;
}

.dummy-route {
  font-size: 0.68rem;
  color: #cbd5e1;
}

.dummy-dep {
  font-size: 0.74rem;
  font-weight: 700;
  color: #34d399;
}

.btn-scan-action {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: #ffffff;
  border: none;
  font-size: 0.85rem;
  font-weight: 800;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-scan-action:hover {
  background: #0f172a;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
