<template>
  <section class="py-12 bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-sky-400">Pilihan Terpopuler Wisatawan SG</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">Destinasi Wisata Medis, Spa & Resort</h2>
        </div>
        <div class="mt-4 md:mt-0 flex items-center space-x-2">
          <span class="text-xs text-slate-400">Tampilkan Harga dalam:</span>
          <button 
            @click="$emit('set-currency', 'SGD')"
            :class="currency === 'SGD' ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'"
            class="px-3 py-1 rounded-lg text-xs transition-all"
          >
            SGD ($)
          </button>
          <button 
            @click="$emit('set-currency', 'IDR')"
            :class="currency === 'IDR' ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'"
            class="px-3 py-1 rounded-lg text-xs transition-all"
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
          class="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
        >
          <!-- Card Image & Badges -->
          <div class="relative h-48 bg-slate-800 overflow-hidden">
            <img 
              :src="place.image" 
              :alt="place.name" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-3 left-3 flex flex-col gap-1.5">
              <span class="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                Hemat ~{{ place.savingsPercent }}% vs SG
              </span>
            </div>
            <div class="absolute top-3 right-3">
              <span class="px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-xs font-bold text-amber-300 border border-amber-500/30">
                ★ {{ place.rating }}
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center text-xs text-sky-400 font-semibold mb-1">
                <span>{{ place.categoryLabel }}</span>
                <span class="mx-2 text-slate-600">•</span>
                <span>📍 {{ place.nearestTerminal }}</span>
              </div>
              <h3 class="text-lg font-bold text-white leading-snug">{{ place.name }}</h3>
              <p class="text-xs text-slate-400 mt-2 line-clamp-2">{{ place.description }}</p>
            </div>

            <!-- Price Comparison & Booking -->
            <div class="mt-5 pt-4 border-t border-slate-800">
              <div class="flex items-baseline justify-between mb-3">
                <div>
                  <p class="text-[10px] text-slate-400 uppercase tracking-wider">Harga Layanan Batam</p>
                  <p class="text-xl font-extrabold text-emerald-400">
                    {{ formatPrice(place.priceSgd) }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-slate-400 uppercase tracking-wider">Estimasi SG</p>
                  <p class="text-xs font-semibold text-slate-400 line-through">
                    {{ formatPrice(place.priceSgd * (1 + place.savingsPercent / 100)) }}
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <button 
                  @click="$emit('select-map', place)"
                  class="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-xs font-semibold text-slate-200 transition-all text-center"
                >
                  📍 Lihat di Peta
                </button>
                <button 
                  @click="$emit('book', place)"
                  class="py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all text-center shadow-md shadow-sky-500/20"
                >
                  ⚡ Instant WA Send
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
