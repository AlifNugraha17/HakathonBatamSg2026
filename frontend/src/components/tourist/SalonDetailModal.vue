<template>
  <div v-if="selectedSalonForDetail" class="modal-backdrop" @click="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Close Button -->
      <button class="close-btn" @click="closeModal">✕</button>

      <!-- Hero Gallery -->
      <div class="modal-gallery">
        <img
          :src="currentImage || selectedSalonForDetail.imageUrl"
          :alt="selectedSalonForDetail.name"
          class="gallery-main-img"
        />
        <div class="gallery-thumbs">
          <img
            v-for="(img, idx) in selectedSalonForDetail.gallery"
            :key="idx"
            :src="img"
            class="gallery-thumb"
            :class="{ active: currentImage === img }"
            @click="currentImage = img"
          />
        </div>
      </div>

      <!-- Detail Info Body in English -->
      <div class="modal-body">
        <div class="header-info">
          <div class="title-row">
            <h2 class="modal-title">{{ selectedSalonForDetail.name }}</h2>
            <span class="badge-hygiene">
              Hygiene {{ selectedSalonForDetail.hygieneScore }}%
            </span>
          </div>
          <p class="modal-tagline">{{ selectedSalonForDetail.tagline }}</p>
          <div class="meta-row">
            <span>{{ selectedSalonForDetail.address }}</span>
            <span>•</span>
            <span class="text-blue">{{ selectedSalonForDetail.distanceMinutes }} mins walk from ferry</span>
            <span>•</span>
            <span>★ {{ selectedSalonForDetail.rating }} ({{ selectedSalonForDetail.reviewCount }} reviews)</span>
          </div>
        </div>

        <!-- Hygiene Checklist Guarantee -->
        <div class="hygiene-audit-box">
          <h4 class="box-title">LokaBatam Verified Quality & Hygiene Standards</h4>
          <div class="hygiene-grid">
            <div
              v-for="(badge, idx) in (selectedSalonForDetail.hygieneBadges || ['UV Sanitized Linens', 'Disposable Headrest Covers', 'Grade A Autoclave Tools'])"
              :key="idx"
              class="audit-item"
            >
              <span class="check-icon">✓</span>
              <span>{{ badge }}</span>
            </div>
          </div>
        </div>

        <!-- Therapists Roster -->
        <div class="therapists-box">
          <h4 class="box-title">Certified Master Practitioners</h4>
          <div class="therapists-list">
            <div
              v-for="(th, idx) in (selectedSalonForDetail.therapists || [])"
              :key="idx"
              class="therapist-card"
            >
              <div class="th-avatar">{{ (th.name || 'T').charAt(0) }}</div>
              <div class="th-info">
                <div class="th-name">{{ th.name || 'Senior Therapist' }} <span class="th-exp">({{ th.experience || th.experienceYears || '5+ Yrs' }})</span></div>
                <div class="th-spec">{{ th.specialty || 'Balinese Bodywork' }}</div>
              </div>
              <div class="th-rating">★ {{ th.rating || '4.9' }}</div>
            </div>
          </div>
        </div>

        <!-- Service Menu Catalog -->
        <div class="services-box">
          <h4 class="box-title">Service Menu & Micro-Moment Treatments</h4>
          <div class="services-list">
            <div
              v-for="service in (selectedSalonForDetail.services || [])"
              :key="service.id"
              class="service-item"
            >
              <div class="srv-left">
                <div class="srv-name-row">
                  <h5 class="srv-name">{{ service.name }}</h5>
                  <span v-if="service.popular" class="badge-pop">POPULAR</span>
                </div>
                <p class="srv-desc">{{ service.desc || 'Premium therapeutic treatment with organic herbal oils.' }}</p>
                <div class="srv-meta">
                  <span>{{ service.durationMinutes || service.duration_minutes || 60 }} Minutes</span>
                </div>
              </div>

              <div class="srv-right">
                <div class="srv-price">{{ formatPrice(service.priceIdr || service.price_idr || 250000) }}</div>
                <button
                  class="btn-book-service"
                  @click="handleSelectService(service)"
                >
                  Book with AI Brief →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLokaBatamStore } from '../../composables/useLokaBatamStore';
import { useCurrency } from '../../composables/useCurrency';

const {
  selectedSalonForDetail,
  selectedSlotForBooking,
  isAiTranslatorOpen,
  toggleSaveSalon,
  isSalonSaved
} = useLokaBatamStore();

const { formatPrice } = useCurrency();
const currentImage = ref('');

const closeModal = () => {
  selectedSalonForDetail.value = null;
  currentImage.value = '';
};

const handleSelectService = (service) => {
  const salon = selectedSalonForDetail.value;
  selectedSlotForBooking.value = {
    salonId: salon.id,
    salonName: salon.name,
    salonLandmark: salon.landmark,
    serviceId: service.id,
    serviceName: service.name,
    durationMinutes: service.durationMinutes,
    priceIdr: service.priceIdr,
    time: '14:30',
    therapistName: salon.therapists[0]?.name || 'Master Practitioner'
  };
  closeModal();
  isAiTranslatorOpen.value = true;
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
  max-width: 680px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.modal-gallery {
  position: relative;
  height: 220px;
  background: #0f172a;
}

.gallery-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-thumbs {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 0.35rem;
}

.gallery-thumb {
  width: 44px;
  height: 32px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
}

.gallery-thumb.active {
  border-color: #2563eb;
}

.modal-body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
}

.modal-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.badge-hygiene {
  font-size: 0.72rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.modal-tagline {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.35rem;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.76rem;
  color: #64748b;
}

.text-blue {
  color: #1e3a8a;
  font-weight: 700;
}

.hygiene-audit-box {
  padding: 1.15rem;
  border-radius: var(--radius-md);
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.box-title {
  font-size: 0.84rem;
  font-weight: 800;
  color: #1e3a8a;
  margin: 0 0 0.65rem 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.hygiene-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.audit-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: #1e293b;
  font-weight: 600;
}

.check-icon {
  color: #047857;
  font-weight: 800;
}

.therapists-box, .services-box {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.therapists-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.therapist-card {
  padding: 0.85rem;
  border-radius: var(--radius-sm);
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.th-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1e3a8a;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.th-info {
  flex: 1;
}

.th-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #0f172a;
}

.th-exp {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: normal;
}

.th-spec {
  font-size: 0.72rem;
  color: #64748b;
}

.th-rating {
  font-size: 0.74rem;
  font-weight: 700;
  color: #1e3a8a;
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.service-item {
  padding: 1.15rem;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.service-item:hover {
  border-color: #93c5fd;
}

.srv-left {
  flex: 1;
}

.srv-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
}

.srv-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.badge-pop {
  font-size: 0.65rem;
  font-weight: 800;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.srv-desc {
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.4;
  margin-bottom: 0.25rem;
}

.srv-meta {
  font-size: 0.72rem;
  color: #64748b;
}

.srv-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.45rem;
}

.srv-price {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
}

.btn-book-service {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(29, 78, 216, 0.2);
}

.btn-book-service:hover {
  background: #0f172a;
}
</style>
