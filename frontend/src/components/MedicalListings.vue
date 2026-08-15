<template>
  <section class="py-12 bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800/80 gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-sky-400"></span>
            <span class="text-xs font-bold uppercase tracking-wider text-sky-400">{{ t.list_tag }}</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">{{ t.list_title }}</h2>
          <p class="text-xs text-slate-400 mt-1">{{ t.list_subtitle.replace('{count}', filteredPlaces.length) }}</p>
        </div>
        
        <!-- Controls: Country Filter & Currency Switcher -->
        <div class="flex flex-wrap items-center gap-2">
          
          <!-- Country Filter Pill -->
          <div class="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button 
              @click="$emit('update:selectedCountry', 'all')"
              :class="selectedCountry === 'all' ? 'bg-sky-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'"
              class="px-2.5 py-1 rounded-lg text-xs transition-all font-semibold"
            >
              {{ t.country_all }}
            </button>
            <button 
              @click="$emit('update:selectedCountry', 'batam')"
              :class="selectedCountry === 'batam' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'"
              class="px-2.5 py-1 rounded-lg text-xs transition-all font-semibold"
            >
              {{ t.country_batam }}
            </button>
            <button 
              @click="$emit('update:selectedCountry', 'singapore')"
              :class="selectedCountry === 'singapore' ? 'bg-red-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'"
              class="px-2.5 py-1 rounded-lg text-xs transition-all font-semibold"
            >
              {{ t.country_sg }}
            </button>
          </div>

          <!-- Currency Switcher -->
          <div class="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button 
              @click="$emit('set-currency', 'SGD')"
              :class="currency === 'SGD' ? 'bg-sky-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'"
              class="px-2.5 py-1 rounded-lg text-xs transition-all font-semibold"
            >
              SGD ($)
            </button>
            <button 
              @click="$emit('set-currency', 'IDR')"
              :class="currency === 'IDR' ? 'bg-sky-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'"
              class="px-2.5 py-1 rounded-lg text-xs transition-all font-semibold"
            >
              IDR (Rp)
            </button>
          </div>

        </div>
      </div>

      <!-- Places Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="place in filteredPlaces" 
          :key="place.id"
          class="app-card app-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group"
        >
          <!-- Card Image & Badges -->
          <div class="relative h-52 bg-slate-900 overflow-hidden">
            <img 
              :src="place.image" 
              :alt="place.name"
              loading="lazy"
              @error="(e) => e.target.src = place.category === 'medical' || place.category === 'dental' ? 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80' : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            <!-- Floating Top Badges -->
            <div class="absolute top-3 left-3 flex flex-col gap-1.5">
              <span 
                v-if="place.savingsPercent > 0"
                class="px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-[11px] font-bold text-emerald-400 border border-emerald-500/30 shadow-md"
              >
                {{ t.savings_badge.replace('{percent}', place.savingsPercent) }}
              </span>
              <span 
                v-else
                class="px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-[11px] font-bold text-sky-400 border border-sky-500/30 shadow-md"
              >
                {{ t.benchmark_badge }}
              </span>
            </div>

            <div class="absolute top-3 right-3">
              <span class="px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md text-xs font-bold text-amber-300 border border-amber-500/30 shadow-md flex items-center gap-1">
                <span>★</span>
                <span>{{ place.rating }}</span>
              </span>
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center text-[11px] text-sky-400 font-semibold mb-1.5 gap-1.5">
                <span>{{ place.categoryLabel }}</span>
                <span class="text-slate-600">•</span>
                <span class="text-slate-300">📍 {{ place.nearestTerminal }}</span>
              </div>
              <h3 class="text-base font-bold text-white leading-snug group-hover:text-sky-300 transition-colors">
                {{ place.name }}
              </h3>
              <p class="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {{ place.description }}
              </p>
            </div>

            <!-- Price Comparison Box & Action Buttons -->
            <div class="mt-5 pt-4 border-t border-slate-800/80">
              <div class="flex items-baseline justify-between mb-3.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                <div>
                  <p class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    {{ place.savingsPercent > 0 ? t.price_batam : t.price_treatment }}
                  </p>
                  <p class="text-lg font-black text-emerald-400">
                    {{ formatPrice(place.priceSgd) }}
                  </p>
                </div>
                <div class="text-right" v-if="place.savingsPercent > 0">
                  <p class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{{ t.price_sg_est }}</p>
                  <p class="text-xs font-semibold text-slate-400 line-through">
                    {{ formatPrice(place.priceSgd * (1 + place.savingsPercent / 100)) }}
                  </p>
                </div>
                <div class="text-right" v-else>
                  <span class="text-[10px] font-semibold text-sky-400 uppercase tracking-wider">{{ t.price_sg_bench }}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="grid grid-cols-2 gap-2">
                <button 
                  @click="$emit('select-map', place)"
                  class="py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 text-xs font-semibold text-slate-200 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <svg class="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{{ t.btn_map }}</span>
                </button>
                <button 
                  @click="$emit('book', place)"
                  class="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all text-center shadow-md shadow-sky-600/20 active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{{ t.btn_wa }}</span>
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
  exchangeRate: { type: Number, default: 13920 },
  selectedCategory: { type: String, default: 'all' },
  selectedTerminal: { type: String, default: 'all' },
  selectedCountry: { type: String, default: 'all' },
  t: { type: Object, required: true }
})

defineEmits(['set-currency', 'update:selectedCountry', 'select-map', 'book'])

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

const formatPrice = (sgdVal) => {
  if (props.currency === 'SGD') {
    return 'S$ ' + Math.round(sgdVal).toLocaleString('en-US')
  } else {
    const idrVal = Math.round(sgdVal * props.exchangeRate)
    return 'Rp ' + idrVal.toLocaleString('id-ID')
  }
}
</script>
