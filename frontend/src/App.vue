<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
    
    <!-- Navbar -->
    <Navbar 
      :currency="currency"
      :exchange-rate="exchangeRate"
      @nav="handleNav"
      @toggle-currency="toggleCurrency"
      @open-ferry="showFerryModal = true"
      @open-ai="showAiModal = true"
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

      <!-- Verified Cross-Border Testimonials & Rating System (Singapore Visitors) -->
      <TestimonialsSection 
        :currency="currency"
        :exchange-rate="exchangeRate"
        :places="places"
      />

      <!-- Features & Why Batam Section -->
      <section class="py-16 bg-slate-950 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="text-xs font-semibold uppercase tracking-wider text-emerald-400">Pengalaman Lintas Batas</span>
            <h2 class="text-3xl font-extrabold text-white mt-1">Mengapa Wisatawan Singapura Memilih Batam?</h2>
            <p class="text-sm text-slate-400 mt-2">Kombinasi sempurna antara hemat biaya medis, kemudahan transportasi kapal feri, dan kualitas pelayanan standar internasional.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="glass-card p-6 rounded-2xl border border-slate-800">
              <div class="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-2xl font-bold mb-4">
                🏥
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Fasilitas RS Berstandar Internasional</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Rumah sakit ternama di Batam seperti RS Awal Bros & RS Budi Kemuliaan didukung dokter spesialis berpengalaman dan peralatan diagnostik mutakhir.
              </p>
            </div>

            <div class="glass-card p-6 rounded-2xl border border-slate-800">
              <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold mb-4">
                💰
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Transparansi Biaya SGD / IDR</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Dapatkan perbandingan harga langsung dengan estimasi biaya di Singapura tanpa biaya tersembunyi.
              </p>
            </div>

            <div class="glass-card p-6 rounded-2xl border border-slate-800">
              <div class="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-bold mb-4">
                🚕
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Penjemputan VIP di Pelabuhan</h3>
              <p class="text-xs text-slate-400 leading-relaxed">
                Layanan antar-jemput privat dari pelabuhan feri (Harbour Bay, Batam Centre, Sekupang, Nongsa) langsung ke lokasi klinik atau resort.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="bg-slate-950 border-t border-slate-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <div class="flex items-center space-x-2 mb-4 sm:mb-0">
          <span class="font-bold text-white">BatamPulse</span>
          <span>© 2026 — Platform Lomba Turis Development (SG ⇄ Batam)</span>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-emerald-400 font-mono">Vue 3 • Laravel 11 • PostgreSQL PostGIS</span>
        </div>
      </div>
    </footer>

    <!-- Modals -->
    <AiItineraryModal 
      :show="showAiModal" 
      @close="showAiModal = false" 
      @book-all="openBookingModal(null)"
    />

    <FerryGuideModal 
      :show="showFerryModal" 
      @close="showFerryModal = false" 
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
import MedicalListings from './components/MedicalListings.vue'
import MapView from './components/MapView.vue'
import AiItineraryModal from './components/AiItineraryModal.vue'
import FerryGuideModal from './components/FerryGuideModal.vue'
import BookingModal from './components/BookingModal.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'

// State
const currency = ref('SGD')
const exchangeRate = ref(13920) // Current 2026 baseline rate
const selectedCategory = ref('all')
const selectedTerminal = ref('all')
const showAiModal = ref(false)
const showFerryModal = ref(false)
const showBookingModal = ref(false)
const selectedBookingPlace = ref(null)
const selectedMapPlace = ref(null)

// Realistic Dummy Data for Batam Cross-Border Tourism Places
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
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
    name: 'Marina Bay Sands Medical & Executive Wellness (Singapore)',
    category: 'spa',
    categoryLabel: '🇸🇬 SG Luxury Wellness',
    nearestTerminal: 'HarbourFront Terminal SG (10 mins)',
    terminalKey: 'harbourfront-sg',
    priceSgd: 580,
    savingsPercent: 0,
    rating: 4.9,
    lat: 1.2834,
    lng: 103.8607,
    description: 'Layanan pemeriksaan kesehatan eksekutif premium dan terapi spa relaksasi kelas dunia berlatar pemandangan Marina Bay Singapura.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    name: 'Tanah Merah International Ferry Hub (Singapore)',
    category: 'terminal',
    categoryLabel: '⚓ SG Gateway to Batam & Bintan',
    nearestTerminal: 'Tanah Merah Ferry Terminal (SG)',
    terminalKey: 'tanah-merah-sg',
    priceSgd: 48,
    savingsPercent: 0,
    rating: 4.8,
    lat: 1.3142,
    lng: 103.9882,
    description: 'Terminal feri internasional Singapura penghubung langsung ke Nongsa Pura Luxury Golf Resorts dan Batam Centre.',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 10,
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
    id: 11,
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
    id: 12,
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
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 13,
    name: 'Pelabuhan Feri Internasional Sekupang (Batam)',
    category: 'terminal',
    categoryLabel: '⚓ Batam West Gate Terminal',
    nearestTerminal: 'Sekupang Terminal (Batam)',
    terminalKey: 'sekupang',
    priceSgd: 38,
    savingsPercent: 0,
    rating: 4.7,
    lat: 1.1150,
    lng: 103.9350,
    description: 'Terminal feri internasional kawasan barat Batam penghubung cepat ke HarbourFront Singapura dan pelabuhan antar pulau.',
    image: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 14,
    name: 'Novena Healthcare & Specialist Suites (Singapore)',
    category: 'medical',
    categoryLabel: '🇸🇬 SG Novena Medical Hub',
    nearestTerminal: 'HarbourFront Terminal SG (20 mins)',
    terminalKey: 'harbourfront-sg',
    priceSgd: 750,
    savingsPercent: 0,
    rating: 4.9,
    lat: 1.3204,
    lng: 103.8436,
    description: 'Pusat medis terpadu terbesar Singapura di kawasan Novena dengan lebih dari 100 konsultan dokter spesialis internasional.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 15,
    name: 'Sentosa Golf Club & Serapong Championship Course (Singapore)',
    category: 'golf',
    categoryLabel: '🇸🇬 SG World Top 100 Golf',
    nearestTerminal: 'HarbourFront Terminal SG (5 mins)',
    terminalKey: 'harbourfront-sg',
    priceSgd: 420,
    savingsPercent: 0,
    rating: 5.0,
    lat: 1.2480,
    lng: 103.8290,
    description: 'Salah satu lapangan golf terbaik di dunia tuan rumah SMBC Singapore Open dengan pemandangan megah waterfront & skyline Singapura.',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 16,
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
    image: 'https://images.unsplash.com/photo-1548625361-186a87754d92?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 17,
    name: 'Gardens by the Bay & Waterfront Dining (Singapore)',
    category: 'culinary',
    categoryLabel: '🇸🇬 SG Iconic Waterfront Experience',
    nearestTerminal: 'HarbourFront Terminal SG (12 mins)',
    terminalKey: 'harbourfront-sg',
    priceSgd: 45,
    savingsPercent: 0,
    rating: 4.9,
    lat: 1.2815,
    lng: 103.8636,
    description: 'Taman ekologi ikonik Singapura dengan Supertree Grove, Flower Dome, serta ragam restoran kuliner kelas dunia.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80'
  }
])

// Actions
const toggleCurrency = () => {
  currency.value = currency.value === 'SGD' ? 'IDR' : 'SGD'
}

const handleNav = (target) => {
  if (target === 'medical') {
    selectedCategory.value = 'medical'
    scrollToMedical()
  } else if (target === 'resorts') {
    selectedCategory.value = 'golf'
    scrollToMedical()
  } else if (target === 'reviews') {
    const el = document.getElementById('testimonials-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  } else {
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
  // Refresh exchange rate automatically every 60 seconds
  rateInterval = setInterval(fetchLiveExchangeRate, 60000)
})

onUnmounted(() => {
  if (rateInterval) clearInterval(rateInterval)
})
</script>
