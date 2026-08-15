<template>
  <header class="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <div class="flex items-center space-x-3 cursor-pointer select-none" @click="$emit('nav', 'home')">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center shadow-md shadow-sky-500/20 ring-1 ring-white/20">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <div class="flex items-center space-x-2">
            <span class="text-xl font-bold tracking-tight text-white">Batam<span class="text-sky-400">Pulse</span></span>
            <span class="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
              SG ⇄ Batam
            </span>
          </div>
          <p class="text-[11px] text-slate-400 font-normal hidden sm:block">{{ t.nav_subtitle }}</p>
        </div>
      </div>

      <!-- Navigation Links (Desktop) -->
      <nav class="hidden lg:flex items-center space-x-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/70">
        <button 
          @click="$emit('nav', 'medical')" 
          :class="activeNav === 'medical' ? 'bg-slate-800 text-sky-400 font-semibold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'"
          class="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
        >
          <span>{{ t.nav_medical }}</span>
        </button>
        <button 
          @click="$emit('nav', 'tourism')" 
          :class="activeNav === 'tourism' ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'"
          class="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
        >
          <span>{{ t.nav_tourism }}</span>
        </button>
        <button 
          @click="$emit('nav', 'resorts')" 
          :class="activeNav === 'resorts' ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'"
          class="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
        >
          <span>{{ t.nav_resorts }}</span>
        </button>
        <button 
          @click="$emit('open-ferry')" 
          class="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-sky-300 hover:bg-slate-800/50 transition-all flex items-center gap-1.5"
        >
          <span>{{ t.nav_ferry }}</span>
        </button>
      </nav>

      <!-- Currency Switcher, Language Switcher & CTA -->
      <div class="flex items-center space-x-2">
        
        <!-- Live Currency Switcher -->
        <div class="flex items-center bg-slate-950/80 rounded-xl border border-slate-800 p-1">
          <div class="hidden sm:flex items-center px-2 py-1 text-[11px] text-slate-400 border-r border-slate-800 mr-1 gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>{{ t.rate_label }} <strong class="text-slate-200 font-mono">Rp {{ formatNumber(exchangeRate) }}</strong></span>
          </div>
          
          <div class="flex items-center space-x-0.5">
            <button 
              @click="$emit('set-currency', 'SGD')"
              :class="currency === 'SGD' ? 'bg-sky-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'"
              class="px-2 py-1 rounded-lg text-[11px] transition-all font-semibold"
            >
              SGD
            </button>
            <button 
              @click="$emit('set-currency', 'IDR')"
              :class="currency === 'IDR' ? 'bg-sky-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'"
              class="px-2 py-1 rounded-lg text-[11px] transition-all font-semibold"
            >
              IDR
            </button>
          </div>
        </div>

        <!-- Language Switcher Toggle (EN / ID) -->
        <div class="flex items-center bg-slate-950/80 rounded-xl border border-slate-800 p-1">
          <button 
            @click="$emit('set-lang', 'en')"
            :class="lang === 'en' ? 'bg-sky-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'"
            class="px-2 py-1 rounded-lg text-[11px] transition-all flex items-center gap-1 font-semibold"
            title="Switch language to English"
          >
            <span>🇬🇧</span>
            <span>EN</span>
          </button>
          <button 
            @click="$emit('set-lang', 'id')"
            :class="lang === 'id' ? 'bg-sky-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'"
            class="px-2 py-1 rounded-lg text-[11px] transition-all flex items-center gap-1 font-semibold"
            title="Ganti bahasa ke Bahasa Indonesia"
          >
            <span>🇮🇩</span>
            <span>ID</span>
          </button>
        </div>

        <!-- Consultation CTA Button -->
        <button 
          @click="$emit('open-booking')"
          class="hidden sm:inline-flex items-center justify-center px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all shadow-md shadow-sky-600/25 active:scale-95 gap-1.5 border border-sky-400/20"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ t.nav_cta }}</span>
        </button>

        <!-- Mobile Menu Toggle Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 focus:outline-none"
        >
          <svg v-if="!mobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>

    </div>

    <!-- Mobile Dropdown Menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-2">
      <button 
        @click="$emit('nav', 'medical'); mobileMenuOpen = false"
        class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center justify-between"
      >
        <span>{{ t.nav_medical }}</span>
        <span class="text-xs text-slate-500">23 RS</span>
      </button>
      <button 
        @click="$emit('nav', 'tourism'); mobileMenuOpen = false"
        class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center justify-between"
      >
        <span>{{ t.nav_tourism }}</span>
        <span class="text-xs text-slate-500">21 Spot</span>
      </button>
      <button 
        @click="$emit('nav', 'resorts'); mobileMenuOpen = false"
        class="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center justify-between"
      >
        <span>{{ t.nav_resorts }}</span>
        <span class="text-xs text-slate-500">5 Resort</span>
      </button>
      <button 
        @click="$emit('open-ferry'); mobileMenuOpen = false"
        class="w-full text-left px-3 py-2 rounded-lg text-sm text-sky-400 hover:bg-slate-800 flex items-center justify-between font-semibold"
      >
        <span>{{ t.nav_ferry }}</span>
        <span class="text-xs">→</span>
      </button>
      
      <div class="pt-2 border-t border-slate-800">
        <button 
          @click="$emit('open-booking'); mobileMenuOpen = false"
          class="w-full py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold text-center shadow"
        >
          📅 {{ t.nav_cta }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  currency: { type: String, default: 'SGD' },
  exchangeRate: { type: Number, default: 13920 },
  activeNav: { type: String, default: 'all' },
  lang: { type: String, default: 'id' },
  t: { type: Object, required: true }
})

defineEmits(['nav', 'set-currency', 'set-lang', 'open-ferry', 'open-booking'])

const mobileMenuOpen = ref(false)

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num)
}
</script>
