<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm">
    <!-- Top Micro Live Status Bar (Single Line) -->
    <div class="bg-gradient-to-r from-sky-800 via-teal-800 to-emerald-800 text-white py-1 px-3 sm:px-6 text-xs font-medium">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px] whitespace-nowrap overflow-x-auto no-scrollbar">
        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <span class="inline-flex items-center gap-1 bg-emerald-400/20 px-2 py-0.5 rounded-full text-emerald-100 border border-emerald-400/30 font-mono text-[10px] sm:text-[11px]">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Batam Centre: <strong>12m</strong></span>
          </span>
          <span class="inline-flex items-center gap-1 bg-amber-400/20 px-2 py-0.5 rounded-full text-amber-100 border border-amber-400/30 font-mono text-[10px] sm:text-[11px]">
            <span>HarbourFront: <strong>28m</strong></span>
          </span>
          <span class="text-sky-100 hidden md:inline text-[11px]">
            • Feri: <strong class="text-emerald-300">45 Menit</strong>
          </span>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button 
            @click="$emit('open-price-check', 'CALCULATOR')" 
            class="text-sky-100 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-bold text-[10px] sm:text-[11px]"
          >
            <span class="hidden xs:inline">{{ t?.rate_label || 'Kurs Real:' }}</span>
            <strong class="text-emerald-300 font-mono">1 SGD = Rp {{ formatNumber(exchangeRate) }}</strong>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
      <div class="flex items-center justify-between h-14 sm:h-16 lg:h-18">
        
        <!-- Left Group: Brand Logo & Desktop Nav Links -->
        <div class="flex items-center gap-3 sm:gap-4 lg:gap-6">
          
          <!-- Brand Logo (Crisp & Responsive) -->
          <div 
            class="flex items-center space-x-2 cursor-pointer select-none shrink-0 group" 
            @click="$emit('nav', 'home')"
          >
            <div class="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-teal-600 to-emerald-600 flex items-center justify-center shadow-md text-white font-black text-sm sm:text-base lg:text-lg tracking-tighter group-hover:scale-105 transition-transform">
              LB
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-lg sm:text-xl font-black font-display tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Loka<span class="text-teal-700">Batam</span>
              </span>
              <span class="hidden sm:inline px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 shrink-0 font-mono">
                SG ⇄ Batam
              </span>
            </div>
          </div>

          <!-- Desktop Navigation Links (Visible on lg+) -->
          <nav class="hidden lg:flex items-center space-x-1 sm:space-x-1.5 whitespace-nowrap">
            
            <!-- Medis -->
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

            <!-- Kafe & Wisata -->
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

            <!-- Resort -->
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

            <!-- Price Check -->
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

            <!-- Jadwal Feri -->
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

            <!-- AI Itinerary -->
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

        <!-- Right Side: Language Switcher, CTA Button & Mobile Menu Toggle -->
        <div class="flex items-center space-x-1.5 sm:space-x-2 shrink-0 whitespace-nowrap">
          
          <!-- Language Toggle Pill (ID / EN) -->
          <div class="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-300 shadow-xs">
            <button 
              @click="$emit('set-lang', 'id')"
              :class="lang === 'id' 
                ? 'bg-sky-100 text-sky-950 font-black border-2 border-sky-400 shadow-xs' 
                : 'text-slate-700 hover:text-slate-950 font-bold border-2 border-transparent'"
              class="px-2 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs transition-all flex items-center gap-0.5 sm:gap-1 cursor-pointer"
              title="Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span class="font-mono">ID</span>
            </button>
            <button 
              @click="$emit('set-lang', 'en')"
              :class="lang === 'en' 
                ? 'bg-sky-100 text-sky-950 font-black border-2 border-sky-400 shadow-xs' 
                : 'text-slate-700 hover:text-slate-950 font-bold border-2 border-transparent'"
              class="px-2 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs transition-all flex items-center gap-0.5 sm:gap-1 cursor-pointer"
              title="English"
            >
              <span>🇬🇧</span>
              <span class="font-mono">EN</span>
            </button>
          </div>

          <!-- Portal Login Link -->
          <router-link
            to="/login"
            class="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-300 transition-all cursor-pointer shadow-xs"
          >
            <span>🔐</span>
            <span>Portal Login</span>
          </router-link>

          <!-- Main CTA Button -->
          <button 
            @click="$emit('open-booking')"
            class="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 hover:from-teal-800 hover:to-emerald-800 transition-all shadow-md active:scale-95 border-2 border-emerald-500 cursor-pointer shrink-0"
          >
            <span>⚡</span>
            <span class="hidden xs:inline">{{ t?.nav_cta || 'Janji Layanan' }}</span>
            <span class="xs:hidden">{{ lang === 'en' ? 'Book' : 'Janji' }}</span>
          </button>

          <!-- Mobile Menu Hamburger Button (Visible on < lg) -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden w-9 h-9 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200 flex items-center justify-center text-lg transition-colors cursor-pointer"
            aria-label="Menu"
          >
            <span v-if="!mobileMenuOpen">☰</span>
            <span v-else>✕</span>
          </button>

        </div>

      </div>
    </div>

    <!-- Mobile Slide-Down Menu Drawer (Visible when hamburger clicked on < lg) -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-b-2 border-slate-200 shadow-xl px-4 py-4 space-y-2">
        <div class="grid grid-cols-2 gap-2">
          
          <!-- Medis -->
          <button 
            @click="navigateMobile('medical')"
            class="p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 border transition-all"
            :class="activeNav === 'medical' ? 'bg-sky-100 text-sky-950 border-sky-400 font-black' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'"
          >
            <span class="text-base">🩺</span>
            <span>{{ t?.nav_medical || 'Medis & RS' }}</span>
          </button>

          <!-- Kafe & Wisata -->
          <button 
            @click="navigateMobile('tourism')"
            class="p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 border transition-all"
            :class="activeNav === 'tourism' ? 'bg-amber-100 text-amber-950 border-amber-400 font-black' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'"
          >
            <span class="text-base">☕</span>
            <span>{{ t?.nav_tourism || 'Kafe & Wisata' }}</span>
          </button>

          <!-- Resort & Golf -->
          <button 
            @click="navigateMobile('resorts')"
            class="p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 border transition-all"
            :class="activeNav === 'resorts' ? 'bg-emerald-100 text-emerald-950 border-emerald-400 font-black' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'"
          >
            <span class="text-base">⛳</span>
            <span>{{ t?.nav_resorts || 'Resort & Golf' }}</span>
          </button>

          <!-- Price Check -->
          <button 
            @click="openModalMobile('price-check')"
            class="p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 border transition-all"
            :class="activeNav === 'price-check' ? 'bg-sky-100 text-sky-950 border-sky-400 font-black' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'"
          >
            <span class="text-base">💰</span>
            <span>{{ t?.nav_pricecheck || 'Price Check' }}</span>
          </button>

          <!-- Jadwal Feri -->
          <button 
            @click="openModalMobile('ferry')"
            class="p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 border transition-all"
            :class="activeNav === 'ferry' ? 'bg-amber-100 text-amber-950 border-amber-400 font-black' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'"
          >
            <span class="text-base">🚢</span>
            <span>{{ t?.nav_ferry || 'Jadwal Feri' }}</span>
          </button>

          <!-- AI Itinerary -->
          <button 
            @click="openModalMobile('ai')"
            class="p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 border transition-all"
            :class="activeNav === 'ai' ? 'bg-purple-100 text-purple-950 border-purple-400 font-black' : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'"
          >
            <span class="text-base">✨</span>
            <span>{{ t?.nav_ai || 'AI Itinerary' }}</span>
          </button>

          <!-- Portal Login Link for Mobile -->
          <router-link 
            to="/login"
            class="p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 border bg-teal-50 text-teal-950 border-teal-300 transition-all col-span-2 shadow-xs"
          >
            <span class="text-base">🔐</span>
            <span>Portal Login (Admin / Merchant / Tourist)</span>
          </router-link>

        </div>
      </div>
    </transition>

    <!-- Mobile Bottom App Dock / Navigation Bar (Fixed for Mobile Touch Experience) -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t-2 border-slate-200 shadow-2xl px-2 py-1.5 flex justify-around items-center">
      
      <!-- Home -->
      <button 
        @click="$emit('nav', 'home')"
        class="flex flex-col items-center justify-center p-1 rounded-xl transition-all cursor-pointer min-w-[56px]"
        :class="activeNav === 'home' ? 'text-teal-700 font-black' : 'text-slate-500 font-medium'"
      >
        <span class="text-base sm:text-lg">🏠</span>
        <span class="text-[10px] mt-0.5">Home</span>
      </button>

      <!-- Medis -->
      <button 
        @click="$emit('nav', 'medical')"
        class="flex flex-col items-center justify-center p-1 rounded-xl transition-all cursor-pointer min-w-[56px]"
        :class="activeNav === 'medical' ? 'text-teal-700 font-black' : 'text-slate-500 font-medium'"
      >
        <span class="text-base sm:text-lg">🩺</span>
        <span class="text-[10px] mt-0.5">{{ t?.nav_medical || 'Medis' }}</span>
      </button>

      <!-- Kafe -->
      <button 
        @click="$emit('nav', 'tourism')"
        class="flex flex-col items-center justify-center p-1 rounded-xl transition-all cursor-pointer min-w-[56px]"
        :class="activeNav === 'tourism' ? 'text-amber-700 font-black' : 'text-slate-500 font-medium'"
      >
        <span class="text-base sm:text-lg">☕</span>
        <span class="text-[10px] mt-0.5">{{ lang === 'en' ? 'Tours' : 'Kafe' }}</span>
      </button>

      <!-- Price Check / OCR -->
      <button 
        @click="$emit('open-price-check', 'CALCULATOR')"
        class="flex flex-col items-center justify-center p-1 rounded-xl transition-all cursor-pointer min-w-[56px]"
        :class="activeNav === 'price-check' ? 'text-sky-700 font-black' : 'text-slate-500 font-medium'"
      >
        <span class="text-base sm:text-lg">💰</span>
        <span class="text-[10px] mt-0.5">{{ lang === 'en' ? 'Rates' : 'Harga' }}</span>
      </button>

      <!-- Feri -->
      <button 
        @click="$emit('open-ferry')"
        class="flex flex-col items-center justify-center p-1 rounded-xl transition-all cursor-pointer min-w-[56px]"
        :class="activeNav === 'ferry' ? 'text-amber-700 font-black' : 'text-slate-500 font-medium'"
      >
        <span class="text-base sm:text-lg">🚢</span>
        <span class="text-[10px] mt-0.5">{{ t?.nav_ferry || 'Feri' }}</span>
      </button>

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

const mobileMenuOpen = ref(false)

const navigateMobile = (target) => {
  mobileMenuOpen.value = false
  emit('nav', target)
}

const openModalMobile = (type) => {
  mobileMenuOpen.value = false
  if (type === 'price-check') {
    emit('open-price-check', 'CALCULATOR')
  } else if (type === 'ferry') {
    emit('open-ferry')
  } else if (type === 'ai') {
    emit('open-ai')
  }
}

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num)
}
</script>
