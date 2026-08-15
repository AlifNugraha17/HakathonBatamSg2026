<template>
  <section class="py-14 bg-slate-100/70 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-900 text-white text-xs font-extrabold uppercase tracking-wider mb-2 shadow-sm border border-teal-700">
            <span>✨</span>
            <span>Rekomendasi Terpopuler Wisatawan SG</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-teal-ink tracking-tight">
            Pusat Medis, Dental, Spa & Resort Terverifikasi
          </h2>
          <p class="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
            Transparansi estimasi biaya, dokter tersertifikasi, dan perbandingan langsung dengan harga di Singapura.
          </p>
        </div>

        <!-- Currency Switch Controls (Prominent Non-White) -->
        <div class="mt-4 md:mt-0 flex items-center space-x-2 bg-slate-200 p-1.5 rounded-2xl border-2 border-slate-300 shadow-sm">
          <span class="text-xs text-slate-700 font-black pl-2">Mata Uang:</span>
          <button 
            @click="$emit('set-currency', 'SGD')"
            :class="currency === 'SGD' ? 'bg-sky-100 text-sky-950 border-2 border-sky-400 font-black shadow-sm' : 'bg-white text-slate-800 font-bold hover:bg-slate-50 border border-slate-300'"
            class="px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer"
          >
            SGD ($)
          </button>
          <button 
            @click="$emit('set-currency', 'IDR')"
            :class="currency === 'IDR' ? 'bg-sky-100 text-sky-950 border-2 border-sky-400 font-black shadow-sm' : 'bg-white text-slate-800 font-bold hover:bg-slate-50 border border-slate-300'"
            class="px-3.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer"
          >
            IDR (Rp)
          </button>
        </div>
      </div>

      <!-- Places Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="place in filteredPlaces" 
          :key="place.id"
          class="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md hover:shadow-2xl hover:border-teal-400 transition-all duration-300 flex flex-col justify-between group"
        >
          <!-- Card Image & Badges with High-Contrast Dark Backdrop -->
          <div class="relative h-56 bg-slate-900 overflow-hidden">
            <img 
              :src="place.image" 
              :alt="place.name" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <!-- Dark contrast gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/50"></div>
            
            <div class="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
              <span class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xl border border-emerald-400/40">
                Hemat ~{{ place.savingsPercent }}% vs SG
              </span>
            </div>
            <div class="absolute top-3.5 right-3.5 z-10">
              <span class="px-3 py-1.5 rounded-xl bg-slate-950/90 text-amber-400 text-xs font-black shadow-xl border border-white/20 backdrop-blur-md">
                ★ {{ place.rating }}
              </span>
            </div>

            <!-- Solid Dark Location Badge on Image -->
            <div class="absolute bottom-3 left-3.5 z-10">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/85 text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-lg">
                📍 {{ place.nearestTerminal }}
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center text-xs font-black text-teal-ocean mb-1.5 uppercase tracking-wider">
                <span>{{ place.categoryLabel }}</span>
              </div>
              <h3 class="text-base font-black text-teal-ink leading-snug group-hover:text-teal-ocean transition-colors">
                {{ place.name }}
              </h3>
              <p class="text-xs text-slate-600 font-medium mt-2.5 line-clamp-2 leading-relaxed">
                {{ place.description }}
              </p>
            </div>

            <!-- Price Comparison & Action -->
            <div class="mt-5 pt-4 border-t border-slate-200">
              <div class="flex items-baseline justify-between mb-3.5 bg-sky-50 p-3 rounded-2xl border border-sky-200">
                <div>
                  <p class="text-[10px] text-slate-600 uppercase tracking-wider font-bold">Harga Layanan Batam</p>
                  <p class="text-xl font-black text-teal-ocean">
                    {{ formatPrice(place.priceSgd) }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Estimasi Singapura</p>
                  <p class="text-xs font-black text-slate-400 line-through">
                    {{ formatPrice(place.priceSgd * (1 + place.savingsPercent / 100)) }}
                  </p>
                </div>
              </div>

              <!-- Action Buttons with Strong Non-White Styling -->
              <div class="grid grid-cols-2 gap-2.5">
                <button 
                  @click="$emit('select-map', place)"
                  class="py-2.5 px-3 rounded-xl bg-sky-100 hover:bg-sky-200 text-teal-900 border-2 border-sky-300 text-xs font-black transition-all text-center cursor-pointer active:scale-95"
                >
                  📍 Lihat di Peta
                </button>
                <button 
                  @click="$emit('book', place)"
                  class="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all text-center shadow-md shadow-emerald-600/30 active:scale-95 flex items-center justify-center gap-1.5 border border-emerald-500 cursor-pointer"
                >
                  <span>⚡</span>
                  <span>Instant WA</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  places: { type: Array, required: true },
  currency: { type: String, default: 'SGD' },
  exchangeRate: { type: Number, default: 11850 },
  selectedCategory: { type: String, default: 'all' },
  selectedTerminal: { type: String, default: 'all' }
})

defineEmits(['set-currency', 'select-map', 'book'])

const filteredPlaces = computed(() => {
  return props.places.filter(p => {
    const matchCategory = props.selectedCategory === 'all' || p.category === props.selectedCategory
    const matchTerminal = props.selectedTerminal === 'all' || p.terminalKey === props.selectedTerminal
    return matchCategory && matchTerminal
  })
})

const formatPrice = (priceInSgd) => {
  if (props.currency === 'IDR') {
    const idrAmount = Math.round(priceInSgd * props.exchangeRate)
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(idrAmount)
  }
  return 'S$ ' + new Intl.NumberFormat('en-SG', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(priceInSgd)
}
</script>
