<template>
  <section class="relative py-12 lg:py-16 bg-slate-950 border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      
      <!-- Top Trust Badge -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-6 shadow-sm">
        <span class="w-2 h-2 rounded-full bg-teal-400"></span>
        <span>{{ t.hero_badge }}</span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
        {{ t.hero_title_1 }} <br class="hidden sm:inline" />
        <span class="text-sky-400">{{ t.hero_title_2 }}</span>
      </h1>

      <p class="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
        {{ t.hero_desc }}
      </p>

      <!-- Country Switcher Tabs -->
      <div class="mt-7 flex items-center justify-center gap-2 max-w-md mx-auto bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
        <button
          @click="$emit('update:selectedCountry', 'all'); $emit('search')"
          :class="selectedCountry === 'all' ? 'bg-sky-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'"
          class="flex-1 py-2 px-3 rounded-xl text-xs transition-all font-semibold"
        >
          {{ t.country_all }}
        </button>
        <button
          @click="$emit('update:selectedCountry', 'batam'); $emit('search')"
          :class="selectedCountry === 'batam' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'"
          class="flex-1 py-2 px-3 rounded-xl text-xs transition-all font-semibold"
        >
          {{ t.country_batam }}
        </button>
        <button
          @click="$emit('update:selectedCountry', 'singapore'); $emit('search')"
          :class="selectedCountry === 'singapore' ? 'bg-red-500 text-white font-bold shadow' : 'text-slate-400 hover:text-white'"
          class="flex-1 py-2 px-3 rounded-xl text-xs transition-all font-semibold"
        >
          {{ t.country_sg }}
        </button>
      </div>

      <!-- Category Filter Chips -->
      <div class="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="$emit('update:selectedCategory', cat.id); $emit('search')"
          :class="selectedCategory === cat.id ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20' : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'"
          class="px-3.5 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5"
        >
          <span>{{ cat.label }}</span>
        </button>
      </div>

      <!-- Search & Filter Card -->
      <div class="mt-8 max-w-3xl mx-auto bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-xl">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <!-- Category Selector -->
          <div class="text-left">
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">{{ t.label_select_cat }}</label>
            <select 
              :value="selectedCategory" 
              @change="$emit('update:selectedCategory', $event.target.value)"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="all">{{ t.cat_all }}</option>
              <option value="medical">{{ t.cat_medical }}</option>
              <option value="tourism">{{ t.cat_tourism }}</option>
              <option value="dental">{{ t.cat_dental }}</option>
              <option value="spa">{{ t.cat_spa }}</option>
              <option value="golf">{{ t.cat_golf }}</option>
            </select>
          </div>

          <!-- Ferry Terminal Proximity -->
          <div class="text-left">
            <label class="block text-[11px] font-semibold text-slate-400 mb-1">{{ t.label_select_port }}</label>
            <select 
              :value="selectedTerminal" 
              @change="$emit('update:selectedTerminal', $event.target.value)"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="all">{{ t.all_ports }}</option>
              <option value="harbourfront-sg">🇸🇬 HarbourFront Terminal (SG)</option>
              <option value="tanah-merah-sg">🇸🇬 Tanah Merah Terminal (SG)</option>
              <option value="harbour-bay">🇮🇩 Harbour Bay (Nagoya/Downtown)</option>
              <option value="batam-centre">🇮🇩 Batam Centre (Pusat Kota)</option>
              <option value="sekupang">🇮🇩 Sekupang Terminal</option>
              <option value="nongsa">🇮🇩 Nongsa Pura (Resort Area)</option>
            </select>
          </div>

          <!-- Search Action Button -->
          <div class="flex items-end">
            <button 
              @click="$emit('search')"
              class="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>{{ t.btn_search }}</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Key Metrics Bar -->
      <div class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
        <div class="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-center">
          <p class="text-xl sm:text-2xl font-black text-emerald-400">{{ t.metric_dest }}</p>
          <p class="text-[11px] text-slate-400 mt-0.5 font-medium">{{ t.metric_batam }}</p>
        </div>
        <div class="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-center">
          <p class="text-xl sm:text-2xl font-black text-sky-400">{{ t.metric_dest_sg }}</p>
          <p class="text-[11px] text-slate-400 mt-0.5 font-medium">{{ t.metric_sg }}</p>
        </div>
        <div class="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-center">
          <p class="text-xl sm:text-2xl font-black text-amber-400">{{ t.metric_time }}</p>
          <p class="text-[11px] text-slate-400 mt-0.5 font-medium">{{ t.metric_ferry }}</p>
        </div>
        <div class="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-center">
          <p class="text-xl sm:text-2xl font-black text-purple-400">{{ t.metric_complete }}</p>
          <p class="text-[11px] text-slate-400 mt-0.5 font-medium">{{ t.metric_complete_sub }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  selectedCategory: { type: String, default: 'all' },
  selectedTerminal: { type: String, default: 'all' },
  selectedCountry: { type: String, default: 'all' },
  t: { type: Object, required: true }
})

defineEmits(['update:selectedCategory', 'update:selectedTerminal', 'update:selectedCountry', 'search'])

const categories = computed(() => [
  { id: 'all', label: props.t.cat_all },
  { id: 'medical', label: props.t.cat_medical },
  { id: 'tourism', label: props.t.cat_tourism },
  { id: 'dental', label: props.t.cat_dental },
  { id: 'spa', label: props.t.cat_spa },
  { id: 'golf', label: props.t.cat_golf }
])
</script>
