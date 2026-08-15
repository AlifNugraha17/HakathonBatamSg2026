<template>
  <div class="min-h-screen bg-slate-50 text-teal-ink flex flex-col font-sans antialiased">
    
    <!-- Navbar -->
    <Navbar 
      :currency="currency"
      :exchange-rate="exchangeRate"
      :active-nav="activeNav"
      @nav="handleNav"
      @toggle-currency="toggleCurrency"
      @open-price-check="openPriceCheck"
      @open-ferry="openFerryGuide"
      @open-ai="openAiItinerary"
      @open-booking="openBookingModal(null)"
    />

    <!-- Main Content Body -->
    <main class="flex-1">
      
      <!-- Hero Section -->
      <HeroSection 
        v-model:selected-category="selectedCategory"
        v-model:selected-terminal="selectedTerminal"
        @search="scrollToMedical"
      />

      <!-- Trending & Viral Batam Destinations Carousel (NEW) -->
      <TrendingCarousel 
        @open-ferry="showFerryModal = true"
        @open-ai="showAiModal = true"
        @open-booking="openBookingModal(null)"
        @scroll-to-listings="scrollToMedical"
      />

      <!-- Medical & Tourism Listings -->
      <div id="listings-section">
        <MedicalListings 
          :places="places"
          :currency="currency"
          :exchange-rate="exchangeRate"
          :selected-category="selectedCategory"
          :selected-terminal="selectedTerminal"
          @set-currency="c => currency = c"
          @select-map="handleSelectMap"
          @book="openBookingModal"
        />
      </div>

      <!-- Map Explorer (PostGIS Spatial Visualizer) -->
      <div id="map-section">
        <MapView 
          :places="places"
          :selected-place="selectedMapPlace"
        />
      </div>

      <!-- Features & Why Batam Section -->
      <section class="py-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="text-xs font-bold uppercase tracking-wider text-teal-ocean">Pengalaman Lintas Batas (SG ⇄ Batam)</span>
            <h2 class="text-3xl font-extrabold text-teal-ink mt-1.5">Mengapa Wisatawan Singapura Memilih Batam?</h2>
            <p class="text-sm text-slate-600 mt-2">Kombinasi sempurna antara hemat biaya medis, kemudahan transportasi kapal feri, dan kualitas pelayanan standar internasional.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-7 rounded-3xl border border-sky-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <div class="w-13 h-13 rounded-2xl bg-sky-100 text-teal-ocean flex items-center justify-center text-3xl font-bold mb-5 shadow-sm">
                🏥
              </div>
              <h3 class="text-lg font-bold text-teal-ink mb-2">Fasilitas RS Berstandar Internasional</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Rumah sakit ternama di Batam seperti RS Awal Bros & RS Budi Kemuliaan didukung dokter spesialis berpengalaman dan peralatan diagnostik mutakhir.
              </p>
            </div>

            <div class="bg-white p-7 rounded-3xl border border-emerald-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <div class="w-13 h-13 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-bold mb-5 shadow-sm">
                💰
              </div>
              <h3 class="text-lg font-bold text-teal-ink mb-2">Transparansi Biaya SGD / IDR</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Dapatkan perbandingan harga langsung dengan estimasi biaya di Singapura tanpa biaya tersembunyi berkat konverter kurs real-time.
              </p>
            </div>

            <div class="bg-white p-7 rounded-3xl border border-amber-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
              <div class="w-13 h-13 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl font-bold mb-5 shadow-sm">
                🚕
              </div>
              <h3 class="text-lg font-bold text-teal-ink mb-2">Penjemputan VIP di Pelabuhan</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Layanan antar-jemput privat dari pelabuhan feri (Harbour Bay, Batam Centre, Sekupang, Nongsa) langsung ke lokasi klinik atau resort.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-200 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div class="flex items-center space-x-2">
          <span class="font-extrabold text-teal-ink text-sm">BatamPulse</span>
          <span>© 2026 — Platform Lomba Turis Development (SG ⇄ Batam)</span>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-emerald-700 font-mono font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">Vue 3 • Laravel 11 • PostgreSQL PostGIS</span>
        </div>
      </div>
    </footer>

    <!-- Modals -->
    <PriceCheckModal 
      :show="showPriceCheckModal"
      :exchange-rate="exchangeRate"
      :default-tab="priceCheckTab"
      @close="closePriceCheck"
    />

    <AiItineraryModal 
      :show="showAiModal" 
      @close="closeAiItinerary" 
      @book-all="openBookingModal(null)"
    />

    <FerryGuideModal 
      :show="showFerryModal" 
      @close="closeFerryGuide" 
    />

    <BookingModal 
      :show="showBookingModal" 
      :selected-place="selectedBookingPlace"
      :exchange-rate="exchangeRate"
      @close="showBookingModal = false" 
    />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import TrendingCarousel from './components/TrendingCarousel.vue'
import MedicalListings from './components/MedicalListings.vue'
import MapView from './components/MapView.vue'
import PriceCheckModal from './components/PriceCheckModal.vue'
import AiItineraryModal from './components/AiItineraryModal.vue'
import FerryGuideModal from './components/FerryGuideModal.vue'
import BookingModal from './components/BookingModal.vue'

// State
const currency = ref('SGD')
const exchangeRate = ref(13920) // Current 2026 baseline rate
const activeNav = ref('home')
const selectedCategory = ref('all')
const selectedTerminal = ref('all')
const showPriceCheckModal = ref(false)
const priceCheckTab = ref('CALCULATOR')
const showAiModal = ref(false)
const showFerryModal = ref(false)
const showBookingModal = ref(false)
const selectedBookingPlace = ref(null)
const selectedMapPlace = ref(null)

// Realistic Data for Batam Cross-Border Tourism Places with Local & High-Res Images
const places = ref([
  {
    id: 1,
    name: 'RS Awal Bros Batam — Executive Health Centre',
    category: 'medical',
    categoryLabel: '🩺 Medical Checkup & Diagnostic',
    nearestTerminal: 'Batam Centre Terminal (7 mins)',
    terminalKey: 'batam-centre',
    priceSgd: 280,
    savingsPercent: 68,
    rating: 4.9,
    lat: 1.1278,
    lng: 104.0412,
    description: 'Pusat layanan kesehatan medis terkemuka di Batam dengan dokter spesialis lulusan luar negeri, paket EKG, MRI, dan konsultasi cepat.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Nagoya Dental Wellness Centre',
    category: 'dental',
    categoryLabel: '🦷 Perawatan & Implan Gigi',
    nearestTerminal: 'Harbour Bay Terminal (5 mins)',
    terminalKey: 'harbour-bay',
    priceSgd: 180,
    savingsPercent: 72,
    rating: 4.8,
    lat: 1.1445,
    lng: 104.0112,
    description: 'Spesialis pembersihan karang gigi, veneer estetik, mahkota gigi (crown), dan pemutihan gigi laser dengan standar kebersihan tertinggi.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Royal Heritage Spa & Wellness Resort',
    category: 'spa',
    categoryLabel: '💆‍♀️ Holistic Spa & Aromatherapy',
    nearestTerminal: 'Harbour Bay Terminal (8 mins)',
    terminalKey: 'harbour-bay',
    priceSgd: 45,
    savingsPercent: 70,
    rating: 4.9,
    lat: 1.1512,
    lng: 104.0090,
    description: 'Pijat tradisional Nusantara, scrub rempah herbal, dan terapi pijat batu hangat selama 120 menit untuk relaksasi tubuh pasca-rutinitas kerja.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Palm Springs Golf & Beach Resort Nongsa',
    category: 'golf',
    categoryLabel: '⛳ 18-Hole Championship Golf',
    nearestTerminal: 'Nongsa Pura Terminal (10 mins)',
    terminalKey: 'nongsa',
    priceSgd: 130,
    savingsPercent: 60,
    rating: 4.9,
    lat: 1.1920,
    lng: 104.1080,
    description: 'Lapangan golf bertaraf internasional dengan pemandangan Selat Singapura, lengkap dengan caddie profesional dan fasilitas clubhouse mewah.',
    image: '/images/viral-beach.jpg'
  },
  {
    id: 5,
    name: 'Aesthetic Seaside Cafe & Sunset Lounge Harbour Bay',
    category: 'culinary',
    categoryLabel: '☕ Cafe Viral & Sunset Waterfront',
    nearestTerminal: 'Harbour Bay Terminal (3 mins)',
    terminalKey: 'harbour-bay',
    priceSgd: 12,
    savingsPercent: 65,
    rating: 4.9,
    lat: 1.1540,
    lng: 104.0050,
    description: 'Spot cafe tepi laut bergaya santorini viral dengan racikan specialty coffee, mocktail tropis, dan sunset memukau ke arah kapal feri.',
    image: '/images/viral-cafe.jpg'
  },
  {
    id: 6,
    name: 'Restoran Seafood Kelong Barelang 168',
    category: 'culinary',
    categoryLabel: '🦀 Culinary & Fresh Seafood',
    nearestTerminal: 'Batam Centre Terminal (20 mins)',
    terminalKey: 'batam-centre',
    priceSgd: 35,
    savingsPercent: 65,
    rating: 4.7,
    lat: 1.0020,
    lng: 104.0410,
    description: 'Santapan laut segar seperti kepiting lada hitam, gonggong khas Batam, dan udang kipas yang dimasak langsung di atas kelong laut.',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    name: 'Aesthetic Skin & Laser Clinic Nagoya',
    category: 'medical',
    categoryLabel: '✨ Klinik Kecantikan & Estetika',
    nearestTerminal: 'Harbour Bay Terminal (6 mins)',
    terminalKey: 'harbour-bay',
    priceSgd: 120,
    savingsPercent: 65,
    rating: 4.8,
    lat: 1.1410,
    lng: 104.0150,
    description: 'Perawatan wajah Botox, Filler, Laser Pico, dan Anti-Aging oleh dokter dermatologi bersertifikasi internasional.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    name: 'RS Budi Kemuliaan Batam — International Eye & Vision Centre',
    category: 'medical',
    categoryLabel: '👁️ Spesialis Mata & LASIK',
    nearestTerminal: 'Batam Centre Terminal (10 mins)',
    terminalKey: 'batam-centre',
    priceSgd: 240,
    savingsPercent: 65,
    rating: 4.8,
    lat: 1.1350,
    lng: 104.0180,
    description: 'Pusat perawatan mata modern untuk terapi katarak, operasi LASIK presisi, dan retina oleh tim dokter spesialis ternama di Batam.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 9,
    name: 'Batam View Oceanfront Beach Spa Nongsa',
    category: 'spa',
    categoryLabel: '🌴 Oceanfront Sea Spa & Resort',
    nearestTerminal: 'Nongsa Pura Terminal (8 mins)',
    terminalKey: 'nongsa',
    priceSgd: 55,
    savingsPercent: 68,
    rating: 4.9,
    lat: 1.1880,
    lng: 104.1150,
    description: 'Terapi spa relaksasi tepi laut dengan pemandangan Selat Singapura, scrub kelapa murni, mandi rempah, dan privat infinity pool.',
    image: '/images/viral-beach.jpg'
  },
  {
    id: 10,
    name: 'Southlinks Country Club & Resort Batam',
    category: 'golf',
    categoryLabel: '⛳ 18-Hole Championship Golf',
    nearestTerminal: 'Sekupang Terminal (12 mins)',
    terminalKey: 'sekupang',
    priceSgd: 110,
    savingsPercent: 62,
    rating: 4.8,
    lat: 1.1080,
    lng: 103.9850,
    description: 'Lapangan golf perbukitan hijau dengan pemandangan danau alami, night golfing, driving range, dan vila resort keluarga.',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 11,
    name: 'Mount Elizabeth Hospital Orchard (Singapore)',
    category: 'medical',
    categoryLabel: '🇸🇬 SG Tertiary Hospital',
    nearestTerminal: 'HarbourFront Terminal SG (15 mins)',
    terminalKey: 'harbourfront-sg',
    priceSgd: 880,
    savingsPercent: 0,
    rating: 4.9,
    lat: 1.3048,
    lng: 103.8354,
    description: 'Rumah sakit spesialis rujukan tersier utama Singapura untuk pemeriksaan kardiologi, onkologi, dan kedokteran presisi.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 12,
    name: 'HarbourFront International Cruise & Ferry Hub (Singapore)',
    category: 'terminal',
    categoryLabel: '⚓ Main SG Ferry Terminal Hub',
    nearestTerminal: 'HarbourFront Centre (SG)',
    terminalKey: 'harbourfront-sg',
    priceSgd: 48,
    savingsPercent: 0,
    rating: 4.9,
    lat: 1.2644,
    lng: 103.8210,
    description: 'Terminal feri internasional tersibuk dan terbesar Singapura penghubung utama menuju pelabuhan Harbour Bay, Batam Centre, & Sekupang.',
    image: '/images/hero-ferry.jpg'
  }
])

// Actions
const toggleCurrency = () => {
  currency.value = currency.value === 'SGD' ? 'IDR' : 'SGD'
}

const openPriceCheck = (tab = 'CALCULATOR') => {
  activeNav.value = 'price-check'
  priceCheckTab.value = tab
  showPriceCheckModal.value = true
}

const closePriceCheck = () => {
  showPriceCheckModal.value = false
  if (activeNav.value === 'price-check') activeNav.value = 'home'
}

const openFerryGuide = () => {
  activeNav.value = 'ferry'
  showFerryModal.value = true
}

const closeFerryGuide = () => {
  showFerryModal.value = false
  if (activeNav.value === 'ferry') activeNav.value = 'home'
}

const openAiItinerary = () => {
  activeNav.value = 'ai'
  showAiModal.value = true
}

const closeAiItinerary = () => {
  showAiModal.value = false
  if (activeNav.value === 'ai') activeNav.value = 'home'
}

const handleNav = (target) => {
  activeNav.value = target
  if (target === 'medical') {
    selectedCategory.value = 'medical'
    scrollToMedical()
  } else if (target === 'resorts') {
    selectedCategory.value = 'golf'
    scrollToMedical()
  } else {
    activeNav.value = 'home'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const scrollToMedical = () => {
  const el = document.getElementById('listings-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const handleSelectMap = (place) => {
  selectedMapPlace.value = place
  const el = document.getElementById('map-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const openBookingModal = (place) => {
  selectedBookingPlace.value = place
  showBookingModal.value = true
}

// Real-Time Exchange Rate Fetcher
let rateInterval = null

const fetchLiveExchangeRate = async () => {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/SGD')
    if (res.ok) {
      const data = await res.json()
      if (data && data.rates && data.rates.IDR) {
        exchangeRate.value = Math.round(data.rates.IDR)
        return
      }
    }
  } catch (err) {
    console.warn('Real-time rate API fetch note:', err)
  }

  // Fallback to backend API
  try {
    const backendRes = await fetch('/api/exchange-rate')
    if (backendRes.ok) {
      const bData = await backendRes.json()
      if (bData && bData.rate) {
        exchangeRate.value = Math.round(bData.rate)
      }
    }
  } catch (err) {
    // Ignore fallback errors
  }
}

const fetchPlacesFromBackend = async () => {
  try {
    const res = await fetch('/api/places')
    if (res.ok) {
      const result = await res.json()
      if (result && result.data && result.data.length > 0) {
        const apiPlaces = result.data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category?.slug || 'medical',
          categoryLabel: item.category ? `🏥 ${item.category.name}` : '🩺 Medical & Tourism',
          nearestTerminal: item.ferry_terminal ? `${item.ferry_terminal.name}` : 'Batam Ferry Terminal',
          terminalKey: item.ferry_terminal?.slug || 'batam-centre',
          priceSgd: item.price_sgd || 100,
          savingsPercent: item.savings_percent || 50,
          rating: item.rating || 4.8,
          lat: item.latitude,
          lng: item.longitude,
          description: item.description,
          image: item.image_url || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80'
        }))

        const existingIds = new Set(apiPlaces.map(p => p.id))
        const remainingFallback = places.value.filter(p => !existingIds.has(p.id))
        places.value = [...apiPlaces, ...remainingFallback]
      }
    }
  } catch (err) {
    console.warn('Backend places fetch note:', err)
  }
}

onMounted(() => {
  fetchPlacesFromBackend()
  fetchLiveExchangeRate()
  rateInterval = setInterval(fetchLiveExchangeRate, 60000)
})

onUnmounted(() => {
  if (rateInterval) clearInterval(rateInterval)
})
</script>
