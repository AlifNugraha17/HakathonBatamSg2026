<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm w-full">
    <!-- Top Micro Live Status Bar (Single Line) -->
    <div class="bg-gradient-to-r from-sky-800 via-teal-800 to-emerald-800 text-white py-1 px-3 sm:px-6 text-[10px] sm:text-xs font-medium">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[10px] sm:text-[11px] whitespace-nowrap">
        <div class="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
          <span class="inline-flex items-center gap-1 bg-emerald-400/20 px-1.5 sm:px-2 py-0.5 rounded-full text-emerald-100 border border-emerald-400/30 font-mono">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Batam Centre: <strong>12m</strong></span>
          </span>
          <span class="text-sky-300 hidden sm:inline">•</span>
          <span class="inline-flex items-center gap-1 bg-amber-400/20 px-1.5 sm:px-2 py-0.5 rounded-full text-amber-100 border border-amber-400/30 font-mono hidden sm:inline-flex">
            <span>HarbourFront: <strong>28m</strong></span>
          </span>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button 
            @click="$emit('open-price-check', 'CALCULATOR')" 
            class="text-sky-100 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-bold text-[10px] sm:text-xs"
          >
            <span class="hidden sm:inline">{{ t?.rate_label || 'Kurs Real:' }}</span>
            <strong class="text-emerald-300 font-mono">1 SGD ≈ Rp {{ formatNumber(exchangeRate) }}</strong>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
      <div class="flex items-center justify-between h-14 sm:h-18 gap-2">
        
        <!-- Left: Brand Logo -->
        <div class="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0">
          <div 
            class="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer select-none shrink-0 group" 
            @click="$emit('nav', 'home')"
          >
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-teal-600 to-emerald-600 flex items-center justify-center shadow-md text-white font-black text-sm sm:text-lg tracking-tighter group-hover:scale-105 transition-transform shrink-0">
              LB
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-lg sm:text-xl font-black font-display tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Loka<span class="text-teal-700">Batam</span>
              </span>
              <span class="hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-100 text-sky-900 border border-sky-300 shrink-0">
                SG ⇄ Batam
              </span>
            </div>
          </div>

          <!-- Desktop Nav Links -->
          <nav class="hidden lg:flex items-center space-x-1 sm:space-x-1.5 whitespace-nowrap">
            <a 
              @click.prevent="$emit('nav', 'medical')" 
              href="#" 
              class="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              :class="activeNav === 'medical' 
                ? 'bg-sky-100 text-sky-950 font-black shadow-sm border-2 border-sky-400' 
                : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100 font-bold border-2 border-transparent'"
            >
              <span>🩺</span>
              <span>{{ t?.nav_medical || 'Medis' }}</span>
            </a>

            <a 
              @click.prevent="$emit('nav', 'tourism')" 
              href="#" 
              class="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              :class="activeNav === 'tourism' 
                ? 'bg-amber-100 text-amber-950 font-black shadow-sm border-2 border-amber-400' 
                : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100 font-bold border-2 border-transparent'"
            >
              <span>☕</span>
              <span>{{ t?.nav_tourism || 'Kafe & Wisata' }}</span>
            </a>

            <a 
              @click.prevent="$emit('nav', 'resorts')" 
              href="#" 
              class="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              :class="activeNav === 'resorts' 
                ? 'bg-emerald-100 text-emerald-950 font-black shadow-sm border-2 border-emerald-400' 
                : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100 font-bold border-2 border-transparent'"
            >
              <span>⛳</span>
              <span>{{ t?.nav_resorts || 'Resort' }}</span>
            </a>

            <a 
              @click.prevent="$emit('open-price-check', 'CALCULATOR')" 
              href="#" 
              class="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              :class="activeNav === 'price-check' 
                ? 'bg-sky-100 text-sky-950 font-black shadow-sm border-2 border-sky-400' 
                : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100 font-bold border-2 border-transparent'"
            >
              <span>💰</span>
              <span>{{ t?.nav_pricecheck || 'Price Check' }}</span>
            </a>

            <a 
              @click.prevent="$emit('open-ferry')" 
              href="#" 
              class="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              :class="activeNav === 'ferry' 
                ? 'bg-amber-100 text-amber-950 font-black shadow-sm border-2 border-amber-400' 
                : 'text-slate-800 hover:text-amber-950 hover:bg-amber-50 font-bold border-2 border-transparent'"
            >
              <span>🚢</span>
              <span>{{ t?.nav_ferry || 'Jadwal Feri' }}</span>
            </a>

            <a 
              @click.prevent="$emit('open-ai')" 
              href="#" 
              class="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
              :class="activeNav === 'ai' 
                ? 'bg-purple-100 text-purple-950 font-black shadow-sm border-2 border-purple-400' 
                : 'text-slate-800 hover:text-purple-950 hover:bg-purple-50 font-bold border-2 border-transparent'"
            >
              <span>✨</span>
              <span>{{ t?.nav_ai || 'AI Itinerary' }}</span>
            </a>
          </nav>
        </div>

        <!-- Right Side: Controls & Hamburger Button -->
        <div class="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          
          <!-- Desktop Language Toggle (Hidden on Mobile, available in Mobile Menu) -->
          <div class="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 shadow-xs">
            <button 
              @click="$emit('set-lang', 'id')"
              :class="lang === 'id' 
                ? 'bg-sky-100 text-sky-950 font-black border-2 border-sky-400 shadow-xs' 
                : 'text-slate-700 hover:text-slate-950 font-bold border-2 border-transparent'"
              class="px-2 py-1 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer"
              title="Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button 
              @click="$emit('set-lang', 'en')"
              :class="lang === 'en' 
                ? 'bg-sky-100 text-sky-950 font-black border-2 border-sky-400 shadow-xs' 
                : 'text-slate-700 hover:text-slate-950 font-bold border-2 border-transparent'"
              class="px-2 py-1 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer"
              title="English"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          <!-- Main CTA Button -->
          <button 
            @click="$emit('open-booking')"
            class="inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 hover:from-teal-800 hover:to-emerald-800 transition-all shadow-md active:scale-95 border-2 border-emerald-500 cursor-pointer shrink-0"
          >
            <span>⚡</span>
            <span>{{ t?.nav_cta || 'Book' }}</span>
          </button>

          <!-- Mobile Hamburger Toggle Button (Garis 3 / ✕) -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 focus:outline-none transition-all cursor-pointer flex items-center justify-center w-9 h-9"
            aria-label="Toggle Menu"
          >
            <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div>

      </div>
    </div>

    <!-- Mobile Dropdown Drawer Menu -->
    <div 
      v-if="isMobileMenuOpen" 
      class="lg:hidden bg-white/98 backdrop-blur-xl border-b-2 border-teal-600 shadow-2xl px-4 py-4 transition-all animate-fadeIn"
    >
      <div class="space-y-2">
        
        <!-- Mobile Navigation Item Links -->
        <a 
          @click.prevent="handleMobileNav('medical')" 
          href="#" 
          class="flex items-center justify-between p-2.5 rounded-xl text-sm font-bold transition-all border"
          :class="activeNav === 'medical' ? 'bg-sky-100 text-sky-950 border-sky-400' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-base">🩺</span>
            <span>{{ t?.nav_medical || 'Rumah Sakit & Medis' }}</span>
          </span>
          <span class="text-xs text-sky-600 font-bold">23 Tempat ➔</span>
        </a>

        <a 
          @click.prevent="handleMobileNav('tourism')" 
          href="#" 
          class="flex items-center justify-between p-2.5 rounded-xl text-sm font-bold transition-all border"
          :class="activeNav === 'tourism' ? 'bg-amber-100 text-amber-950 border-amber-400' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-base">☕</span>
            <span>{{ t?.nav_tourism || 'Kafe, Kuliner & Wisata' }}</span>
          </span>
          <span class="text-xs text-amber-600 font-bold">21 Tempat ➔</span>
        </a>

        <a 
          @click.prevent="handleMobileNav('resorts')" 
          href="#" 
          class="flex items-center justify-between p-2.5 rounded-xl text-sm font-bold transition-all border"
          :class="activeNav === 'resorts' ? 'bg-emerald-100 text-emerald-950 border-emerald-400' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-base">⛳</span>
            <span>{{ t?.nav_resorts || 'Golf & Wellness Spa' }}</span>
          </span>
          <span class="text-xs text-emerald-600 font-bold">5 Tempat ➔</span>
        </a>

        <a 
          @click.prevent="handleMobileAction('price-check')" 
          href="#" 
          class="flex items-center justify-between p-2.5 rounded-xl text-sm font-bold bg-sky-50 text-sky-950 border border-sky-200 hover:bg-sky-100 transition-all"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-base">💰</span>
            <span>Price Check & Scanner Struk OCR</span>
          </span>
          <span class="text-[10px] bg-sky-500 text-white font-black px-2 py-0.5 rounded-md">LIVE</span>
        </a>

        <a 
          @click.prevent="handleMobileAction('ferry')" 
          href="#" 
          class="flex items-center justify-between p-2.5 rounded-xl text-sm font-bold bg-amber-50 text-amber-950 border border-amber-200 hover:bg-amber-100 transition-all"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-base">🚢</span>
            <span>{{ t?.nav_ferry || 'Jadwal Feri SG ⇄ Batam' }}</span>
          </span>
          <span class="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-md">45 MIN</span>
        </a>

        <a 
          @click.prevent="handleMobileAction('ai')" 
          href="#" 
          class="flex items-center justify-between p-2.5 rounded-xl text-sm font-bold bg-purple-50 text-purple-950 border border-purple-200 hover:bg-purple-100 transition-all"
        >
          <span class="flex items-center gap-2.5">
            <span class="text-base">✨</span>
            <span>AI Itinerary Cross-Border</span>
          </span>
          <span class="text-[10px] bg-purple-600 text-white font-black px-2 py-0.5 rounded-md">AI ASSIST</span>
        </a>

        <!-- Mobile Language Selector Row -->
        <div class="pt-3 mt-2 border-t border-slate-200 flex items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-600">Pilih Bahasa / Language:</span>
          <div class="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-300">
            <button 
              @click="$emit('set-lang', 'id')"
              :class="lang === 'id' ? 'bg-sky-600 text-white font-black shadow-sm' : 'text-slate-700 font-bold'"
              class="px-3 py-1 rounded-lg text-xs flex items-center gap-1 transition-all"
            >
              <span>🇮🇩</span>
              <span>Indonesia</span>
            </button>
            <button 
              @click="$emit('set-lang', 'en')"
              :class="lang === 'en' ? 'bg-sky-600 text-white font-black shadow-sm' : 'text-slate-700 font-bold'"
              class="px-3 py-1 rounded-lg text-xs flex items-center gap-1 transition-all"
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  currency: { type: String, default: 'SGD' },
  exchangeRate: { type: Number, default: 11850 },
  activeNav: { type: String, default: 'home' },
  lang: { type: String, default: 'id' },
  t: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['nav', 'set-currency', 'set-lang', 'toggle-currency', 'open-ferry', 'open-ai', 'open-booking', 'open-price-check'])

const isMobileMenuOpen = ref(false)

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num)
}

const handleMobileNav = (tab) => {
  isMobileMenuOpen.value = false
  emit('nav', tab)
}

const handleMobileAction = (action) => {
  isMobileMenuOpen.value = false
  if (action === 'ferry') emit('open-ferry')
  else if (action === 'ai') emit('open-ai')
  else if (action === 'price-check') emit('open-price-check', 'CALCULATOR')
}
</script>
