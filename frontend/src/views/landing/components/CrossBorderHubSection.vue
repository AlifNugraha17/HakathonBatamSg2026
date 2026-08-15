<template>
  <section id="cross-border-hub" class="cross-border-hub-wrapper">
    <!-- Header Banner -->
    <div class="hub-header-banner">
      <div class="hub-badge">
        <span>🚢</span>
        <span>{{ currentLang === 'id' ? 'Katalog 49 Destinasi: 🇮🇩 Batam (29) ⇄ 🇸🇬 Singapura (20)' : '49 Destinations: 🇮🇩 Batam (29) ⇄ 🇸🇬 Singapore (20)' }}</span>
      </div>
      <h2 class="hub-title">
        {{ currentLang === 'id' ? 'Wisata Medis, Spa, Kafe & Resort Lintas Batas' : 'Cross-Border Medical, Spa, Cafe & Resort Hub' }}
      </h2>
      <p class="hub-sub">
        {{ currentLang === 'id' 
          ? 'Bandingkan rumah sakit terkemuka, pusat perawatan gigi, kafe viral, dan championship golf courses dengan transparansi kurs SGD/IDR & penghematan hingga 72%!' 
          : 'Compare premier hospitals, dental centres, viral cafes, and championship golf courses with transparent SGD/IDR rates and up to 72% cost savings!' }}
      </p>

      <!-- Quick Action Buttons -->
      <div class="hub-action-row">
        <button class="btn-hub-action" @click="showFerryModal = true">
          <span>🚢</span>
          <span>{{ currentLang === 'id' ? 'Jadwal Feri SG ⇄ Batam' : 'SG ⇄ Batam Ferry Schedule' }}</span>
        </button>
        <button class="btn-hub-action" @click="showPriceModal = true">
          <span>💰</span>
          <span>{{ currentLang === 'id' ? 'Kalkulator Hemat SGD/IDR' : 'SGD/IDR Savings Calculator' }}</span>
        </button>
        <button class="btn-hub-action highlight" @click="showAiModal = true">
          <span>🤖</span>
          <span>{{ currentLang === 'id' ? 'AI Itinerary 1-Hari / 2-Hari' : '1-Day & 2-Day AI Itinerary' }}</span>
        </button>
        <button class="btn-hub-action" @click="scrollToMap">
          <span>🗺️</span>
          <span>{{ currentLang === 'id' ? 'Peta Interaktif Spasial' : 'Interactive Spatial Map' }}</span>
        </button>
      </div>
    </div>

    <!-- 1. Trending & Viral Destinations Carousel -->
    <div class="carousel-container-box">
      <TrendingCarousel 
        :t="t"
        :lang="currentLang"
        @open-ferry="showFerryModal = true"
        @open-ai="showAiModal = true"
        @open-booking="openBookingModal(null)"
        @scroll-to-listings="scrollToListings"
      />
    </div>

    <!-- 2. 49 Places Medical & Leisure Listings with Live Exchange Rate -->
    <div id="crossborder-listings-anchor" class="listings-container-box">
      <MedicalListings 
        :places="crossborderPlaces"
        :currency="currency"
        :exchange-rate="exchangeRate"
        :selected-category="selectedCategory"
        :selected-terminal="selectedTerminal"
        :selected-country="selectedCountry"
        :t="t"
        :lang="currentLang"
        @update:selected-country="c => selectedCountry = c"
        @set-currency="c => currency = c"
        @select-map="handleSelectMap"
        @book="openBookingModal"
      />
    </div>

    <!-- 3. Leaflet PostGIS Spatial Map Explorer -->
    <div id="crossborder-map-anchor" class="map-container-box">
      <MapView 
        :places="crossborderPlaces"
        :selected-place="selectedMapPlace"
        :t="t"
      />
    </div>

    <!-- 4. Verified Singapore Tourist Testimonials -->
    <div class="testimonials-container-box">
      <TestimonialsSection 
        :currency="currency"
        :exchange-rate="exchangeRate"
        :places="crossborderPlaces"
        :t="t"
      />
    </div>

    <!-- Modals -->
    <PriceCheckModal 
      :show="showPriceModal"
      :exchange-rate="exchangeRate"
      :t="t"
      :lang="currentLang"
      @close="showPriceModal = false"
    />

    <AiItineraryModal 
      :show="showAiModal"
      :t="t"
      :lang="currentLang"
      @close="showAiModal = false"
      @book-all="openBookingModal(null)"
    />

    <FerryGuideModal 
      :show="showFerryModal"
      :t="t"
      :lang="currentLang"
      @close="showFerryModal = false"
    />

    <BookingModal 
      :show="showBookingModal"
      :selected-place="selectedBookingPlace"
      :currency="currency"
      :exchange-rate="exchangeRate"
      :t="t"
      :lang="currentLang"
      @close="showBookingModal = false"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLanguage } from '../../../composables/useLanguage';
import { crossborderPlaces } from '../../../data/crossborderPlaces';
import { translations as cbTranslations } from '../../../data/crossborderTranslations';

// Cross-Border Components
import TrendingCarousel from '../../../components/crossborder/TrendingCarousel.vue';
import MedicalListings from '../../../components/crossborder/MedicalListings.vue';
import MapView from '../../../components/crossborder/MapView.vue';
import TestimonialsSection from '../../../components/crossborder/TestimonialsSection.vue';
import PriceCheckModal from '../../../components/crossborder/PriceCheckModal.vue';
import AiItineraryModal from '../../../components/crossborder/AiItineraryModal.vue';
import FerryGuideModal from '../../../components/crossborder/FerryGuideModal.vue';
import BookingModal from '../../../components/crossborder/BookingModal.vue';

const { currentLang } = useLanguage();
const t = computed(() => cbTranslations[currentLang.value] || cbTranslations.id);

// State
const currency = ref('SGD');
const exchangeRate = ref(13920);
const selectedCategory = ref('all');
const selectedTerminal = ref('all');
const selectedCountry = ref('all');

const showPriceModal = ref(false);
const showAiModal = ref(false);
const showFerryModal = ref(false);
const showBookingModal = ref(false);

const selectedBookingPlace = ref(null);
const selectedMapPlace = ref(null);

const scrollToListings = () => {
  document.getElementById('crossborder-listings-anchor')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToMap = () => {
  document.getElementById('crossborder-map-anchor')?.scrollIntoView({ behavior: 'smooth' });
};

const handleSelectMap = (place) => {
  selectedMapPlace.value = place;
  scrollToMap();
};

const openBookingModal = (place) => {
  selectedBookingPlace.value = place;
  showBookingModal.value = true;
};
</script>

<style scoped>
.cross-border-hub-wrapper {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hub-header-banner {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0369a1 100%);
  border-radius: var(--radius-xl);
  padding: 2.25rem 2rem;
  color: #ffffff;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px -5px rgba(30, 58, 138, 0.3);
}

.hub-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.hub-title {
  font-size: 1.85rem;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 0.75rem 0;
  line-height: 1.25;
}

.hub-sub {
  font-size: 0.95rem;
  color: #bae6fd;
  max-width: 780px;
  margin: 0 auto 1.5rem auto;
  line-height: 1.5;
}

.hub-action-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.btn-hub-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.65rem 1.15rem;
  border-radius: var(--radius-md);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-hub-action:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-2px);
}

.btn-hub-action.highlight {
  background: linear-gradient(135deg, #10b981, #059669);
  border-color: #34d399;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
}

.btn-hub-action.highlight:hover {
  background: linear-gradient(135deg, #059669, #047857);
}

.carousel-container-box,
.listings-container-box,
.map-container-box,
.testimonials-container-box {
  width: 100%;
}
</style>
