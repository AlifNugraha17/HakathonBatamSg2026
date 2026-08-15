<template>
  <section class="py-16 bg-gradient-to-b from-sky-50/70 via-slate-100/90 to-emerald-50/50 border-t-2 border-slate-200 relative overflow-hidden">
    <!-- Ambient Background Color Accents -->
    <div class="absolute top-1/4 -left-20 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-1/3 -right-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-300 gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-900 text-white text-xs font-extrabold uppercase tracking-wider mb-2 shadow-sm border border-teal-700">
            <span>✨</span>
            <span>{{ isEn ? 'Verified Cross-Border Directory' : (t?.list_tag || 'Rekomendasi Terpopuler Wisatawan SG') }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-teal-ink tracking-tight">
            {{ isEn ? 'Hospitals, Attractions, Cafes & Resorts Directory' : (t?.list_title || 'Pusat Medis, Dental, Spa & Resort Terverifikasi') }}
          </h2>
          <p class="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
            {{ isEn 
              ? `Showing ${paginationInfo.start}–${paginationInfo.end} of ${filteredPlaces.length} verified destinations` 
              : `Menampilkan ${paginationInfo.start}–${paginationInfo.end} dari ${filteredPlaces.length} lokasi terverifikasi` }}
          </p>
        </div>

        <!-- Controls: Country Filter & Currency Switch Controls -->
        <div class="mt-4 md:mt-0 flex flex-wrap items-center gap-2">
          
          <!-- Country Filter Pill -->
          <div class="flex items-center bg-slate-200 border-2 border-slate-300 p-1 rounded-2xl shadow-sm">
            <button 
              @click="$emit('update:selectedCountry', 'all')"
              :class="selectedCountry === 'all' ? 'bg-sky-100 text-sky-950 font-black border-2 border-sky-400 shadow-sm' : 'text-slate-700 hover:text-slate-950 font-bold'"
              class="px-2.5 py-1 rounded-xl text-xs transition-all cursor-pointer"
            >
              {{ t?.country_all || 'Both (49)' }}
            </button>
            <button 
              @click="$emit('update:selectedCountry', 'batam')"
              :class="selectedCountry === 'batam' ? 'bg-emerald-100 text-emerald-950 font-black border-2 border-emerald-400 shadow-sm' : 'text-slate-700 hover:text-slate-950 font-bold'"
              class="px-2.5 py-1 rounded-xl text-xs transition-all cursor-pointer"
            >
              🇮🇩 {{ t?.country_batam || 'Batam (29)' }}
            </button>
            <button 
              @click="$emit('update:selectedCountry', 'singapore')"
              :class="selectedCountry === 'singapore' ? 'bg-rose-100 text-rose-950 font-black border-2 border-rose-400 shadow-sm' : 'text-slate-700 hover:text-slate-950 font-bold'"
              class="px-2.5 py-1 rounded-xl text-xs transition-all cursor-pointer"
            >
              🇸🇬 {{ t?.country_sg || 'Singapore (20)' }}
            </button>
          </div>

          <!-- Currency Switcher -->
          <div class="flex items-center bg-slate-200 p-1 rounded-2xl border-2 border-slate-300 shadow-sm">
            <button 
              @click="$emit('set-currency', 'SGD')"
              :class="currency === 'SGD' ? 'bg-sky-100 text-sky-950 border-2 border-sky-400 font-black shadow-sm' : 'bg-white text-slate-800 font-bold hover:bg-slate-50 border border-slate-300'"
              class="px-3 py-1 rounded-xl text-xs transition-all cursor-pointer"
            >
              SGD ($)
            </button>
            <button 
              @click="$emit('set-currency', 'IDR')"
              :class="currency === 'IDR' ? 'bg-sky-100 text-sky-950 border-2 border-sky-400 font-black shadow-sm' : 'bg-white text-slate-800 font-bold hover:bg-slate-50 border border-slate-300'"
              class="px-3 py-1 rounded-xl text-xs transition-all cursor-pointer"
            >
              IDR (Rp)
            </button>
          </div>

        </div>
      </div>

      <!-- Places Grid (Paginated: 20 Items per page) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="place in paginatedPlaces" 
          :key="place.id"
          class="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md hover:shadow-2xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between group"
        >
          <!-- Card Image & Badges with High-Contrast Dark Backdrop -->
          <div class="relative h-56 bg-slate-900 overflow-hidden">
            <img 
              :src="place.image" 
              :alt="place.name"
              loading="lazy"
              @error="(e) => e.target.src = place.category === 'medical' || place.category === 'dental' ? 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80' : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <!-- Dark contrast gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/50"></div>
            
            <div class="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
              <span 
                v-if="place.savingsPercent > 0"
                class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xl border border-emerald-400/40"
              >
                {{ isEn ? 'Save ~' + place.savingsPercent + '% vs SG' : 'Hemat ~' + place.savingsPercent + '% vs SG' }}
              </span>
              <span 
                v-else
                class="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-black shadow-xl border border-rose-400/40"
              >
                {{ isEn ? 'Singapore Benchmark' : 'Benchmark Singapura' }}
              </span>
            </div>

            <div class="absolute top-3.5 right-3.5 z-10">
              <span class="px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-black shadow-lg border border-white/20 flex items-center gap-1">
                <span>⭐</span>
                <span>{{ place.rating }}</span>
              </span>
            </div>

            <div class="absolute bottom-3.5 left-3.5 right-3.5 z-10">
              <span class="text-[11px] font-extrabold uppercase tracking-wider text-teal-300 drop-shadow">
                {{ getCategoryLabel(place) }}
              </span>
              <h3 class="text-base sm:text-lg font-black text-white leading-tight drop-shadow-md line-clamp-1">
                {{ place.name }}
              </h3>
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            
            <div class="space-y-2.5">
              <p class="text-xs text-slate-700 line-clamp-2 leading-relaxed font-medium">
                {{ place.description }}
              </p>

              <!-- Ferry Terminal & Proximity -->
              <div class="flex items-center gap-2 text-xs font-bold text-slate-800 bg-sky-50 border border-sky-200 px-3 py-2 rounded-xl">
                <span class="text-base">🚢</span>
                <span class="line-clamp-1">{{ place.nearestTerminal }}</span>
              </div>
            </div>

            <!-- Price Breakdown & Actions -->
            <div class="pt-3 border-t border-slate-200 space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                    {{ isEn ? (place.savingsPercent > 0 ? 'Batam Est. Rate' : 'Singapore Rate') : (place.savingsPercent > 0 ? (t?.price_batam || 'Biaya di Batam') : (t?.price_treatment || 'Biaya di SG')) }}
                  </span>
                  <span class="text-lg font-black text-emerald-800 font-mono">
                    {{ formatPrice(place.priceSgd) }}
                  </span>
                </div>

                <div class="text-right" v-if="place.savingsPercent > 0">
                  <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    {{ isEn ? 'Est. SG Equivalent' : (t?.price_sg_est || 'Estimasi SG') }}
                  </span>
                  <span class="text-xs font-bold text-slate-500 line-through font-mono">
                    {{ formatPrice(Math.round(place.priceSgd / (1 - (place.savingsPercent / 100)))) }}
                  </span>
                </div>
                <div class="text-right" v-else>
                  <span class="text-[10px] font-bold text-sky-800 uppercase tracking-wider font-mono">
                    {{ isEn ? 'SG Benchmark' : (t?.price_sg_bench || 'Benchmark SG') }}
                  </span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="grid grid-cols-2 gap-2.5">
                <button 
                  @click="$emit('select-map', place)"
                  class="py-2.5 px-3 rounded-xl bg-sky-100 hover:bg-sky-200 text-teal-950 border-2 border-sky-300 text-xs font-black transition-all text-center cursor-pointer active:scale-95"
                >
                  <span class="mr-1">📍</span>
                  <span>{{ isEn ? 'View Map' : (t?.btn_map || 'Lihat Peta') }}</span>
                </button>
                <button 
                  @click="$emit('book', place)"
                  class="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all text-center shadow-md shadow-emerald-600/30 active:scale-95 flex items-center justify-center gap-1.5 border border-emerald-500 cursor-pointer"
                >
                  <span>⚡</span>
                  <span>{{ isEn ? 'Instant Book' : (t?.btn_wa || 'Instant WA') }}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      <!-- Pagination Navigation Controls (20 per page) -->
      <div v-if="totalPages > 1" class="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-md">
        <div class="text-xs font-bold text-slate-700">
          <span>{{ isEn ? 'Page' : 'Halaman' }} <strong class="text-teal-900">{{ currentPage }}</strong> {{ isEn ? 'of' : 'dari' }} <strong class="text-teal-900">{{ totalPages }}</strong> ({{ filteredPlaces.length }} {{ isEn ? 'destinations' : 'destinasi' }})</span>
        </div>

        <div class="flex items-center gap-1.5">
          <!-- Prev Button -->
          <button 
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3.5 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            :class="currentPage === 1 ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-teal-50 hover:text-teal-900'"
          >
            ← {{ isEn ? 'Prev' : 'Sebelumnya' }}
          </button>

          <!-- Page Number Buttons -->
          <button 
            v-for="p in totalPages" 
            :key="p"
            @click="goToPage(p)"
            class="w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center"
            :class="currentPage === p 
              ? 'bg-gradient-to-r from-teal-800 to-sky-800 text-white shadow-md border-2 border-teal-600' 
              : 'bg-slate-50 text-slate-700 border border-slate-300 hover:bg-slate-100'"
          >
            {{ p }}
          </button>

          <!-- Next Button -->
          <button 
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3.5 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            :class="currentPage === totalPages ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-slate-50 text-slate-800 border-slate-300 hover:bg-teal-50 hover:text-teal-900'"
          >
            {{ isEn ? 'Next' : 'Berikutnya' }} →
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  places: { type: Array, required: true },
  currency: { type: String, default: 'SGD' },
  exchangeRate: { type: Number, default: 13920 },
  selectedCategory: { type: String, default: 'all' },
  selectedTerminal: { type: String, default: 'all' },
  selectedCountry: { type: String, default: 'all' },
  t: { type: Object, default: () => ({}) },
  lang: { type: String, default: 'en' }
})

defineEmits(['set-currency', 'update:selectedCountry', 'select-map', 'book'])

const isEn = computed(() => props.lang === 'en')

const pageSize = 21
const currentPage = ref(1)

const getCategoryLabel = (place) => {
  if (isEn.value) {
    if (place.category === 'medical') return '🩺 Hospital & Medical'
    if (place.category === 'dental') return '🦷 Dental Care'
    if (place.category === 'spa') return '💆‍♀️ Wellness & Spa'
    if (place.category === 'golf') return '⛳ Resorts & Golf'
    if (place.category === 'culinary') return '🦀 Seafood & Dining'
    if (place.category === 'tourism') return '🏖️ Attractions & Cafes'
    return '🌟 Destination'
  }
  return place.categoryLabel || 'Destinasi Terverifikasi'
}

const filteredPlaces = computed(() => {
  return props.places.filter(p => {
    // Category match
    let matchCategory = true
    if (props.selectedCategory === 'medical') {
      matchCategory = p.category === 'medical' || p.category === 'dental'
    } else if (props.selectedCategory === 'tourism') {
      matchCategory = p.category === 'tourism' || p.category === 'culinary'
    } else if (props.selectedCategory === 'resorts' || props.selectedCategory === 'golf') {
      matchCategory = p.category === 'golf' || p.category === 'spa'
    } else if (props.selectedCategory !== 'all') {
      matchCategory = p.category === props.selectedCategory
    }

    // Terminal match
    const matchTerminal = props.selectedTerminal === 'all' || p.terminalKey === props.selectedTerminal

    // Country match
    let matchCountry = true
    const isSingapore = (p.terminalKey && p.terminalKey.endsWith('-sg')) || p.savingsPercent === 0
    if (props.selectedCountry === 'batam') {
      matchCountry = !isSingapore
    } else if (props.selectedCountry === 'singapore') {
      matchCountry = isSingapore
    }

    return matchCategory && matchTerminal && matchCountry
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPlaces.value.length / pageSize)))

const paginatedPlaces = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredPlaces.value.slice(start, start + pageSize)
})

const paginationInfo = computed(() => {
  const total = filteredPlaces.value.length
  if (total === 0) return { start: 0, end: 0 }
  const start = (currentPage.value - 1) * pageSize + 1
  const end = Math.min(currentPage.value * pageSize, total)
  return { start, end }
})

watch([() => props.selectedCategory, () => props.selectedTerminal, () => props.selectedCountry], () => {
  currentPage.value = 1
})

const goToPage = (p) => {
  if (p >= 1 && p <= totalPages.value) {
    currentPage.value = p
    const el = document.getElementById('listings-section')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
}

const formatPrice = (priceSgd) => {
  if (props.currency === 'IDR') {
    const idrVal = Math.round(priceSgd * props.exchangeRate)
    return `Rp ${new Intl.NumberFormat('id-ID').format(idrVal)}`
  }
  return `S$ ${Number(priceSgd).toLocaleString('en-US')}`
}
</script>
