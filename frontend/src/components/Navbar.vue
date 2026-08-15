<template>
  <header class="sticky top-0 z-50 glass-card border-b border-slate-800/80 backdrop-blur-md bg-slate-950/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Brand Logo -->
      <div class="flex items-center space-x-3 cursor-pointer" @click="$emit('nav', 'home')">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <span class="text-slate-950 font-black text-xl tracking-tighter">BP</span>
        </div>
        <div>
          <div class="flex items-center space-x-2">
            <span class="text-xl font-bold tracking-tight text-white">Batam<span class="text-sky-400">Pulse</span></span>
            <span class="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">SG ⇄ Batam</span>
          </div>
          <p class="text-xs text-slate-400 font-medium hidden sm:block">Cross-Border Medical & Leisure Tourism Hub</p>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center space-x-8">
        <a @click.prevent="$emit('nav', 'medical')" href="#" class="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-1.5">
          <span>🩺 Wisata Medis & Spa</span>
        </a>
        <a @click.prevent="$emit('nav', 'resorts')" href="#" class="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors flex items-center gap-1.5">
          <span>⛳ Golf & Resorts</span>
        </a>
        <a @click.prevent="$emit('nav', 'reviews')" href="#" class="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
          <span>⭐ Ulasan Pasien SG</span>
        </a>
        <a @click.prevent="$emit('open-ferry')" href="#" class="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5">
          <span>🚢 Feri & Transit</span>
        </a>
        <a @click.prevent="$emit('open-ai')" href="#" class="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5">
          <span>✨ AI Itinerary</span>
        </a>
      </nav>

      <!-- Currency Switcher & CTA -->
      <div class="flex items-center space-x-3">
        <!-- Live Currency Pill -->
        <button 
          @click="$emit('toggle-currency')"
          class="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-semibold hover:border-sky-500/50 transition-all group relative"
          title="Klik untuk ubah tampilan SGD / IDR"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="text-slate-400">Kurs Live:</span>
          <span class="text-emerald-400 font-mono font-bold">1 SGD = Rp {{ formatNumber(exchangeRate) }}</span>
          <span class="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] uppercase font-bold">{{ currency }}</span>
        </button>

        <!-- CTA Button -->
        <button 
          @click="$emit('open-booking')"
          class="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-sky-400 to-emerald-400 hover:from-sky-300 hover:to-emerald-300 transition-all shadow-md shadow-sky-500/20 active:scale-95"
        >
          Konsultasi & Janji
        </button>
      </div>

    </div>
  </header>
</template>

<script setup>
defineProps({
  currency: { type: String, default: 'SGD' },
  exchangeRate: { type: Number, default: 11850 }
})

defineEmits(['nav', 'toggle-currency', 'open-ferry', 'open-ai', 'open-booking'])

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num)
}
</script>
