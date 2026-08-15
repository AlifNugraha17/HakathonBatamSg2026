<template>
  <section class="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
    <!-- Ambient Glow BG -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute top-1/3 right-10 w-[400px] h-[250px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      
      <!-- Top Badge -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full gradient-badge mb-6">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-xs font-medium text-sky-200">Hanya 45 Menit Naik Feri dari Singapura ke Batam</span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
        Layanan Medis Kelas Dunia & <br/>
        <span class="gradient-text">Wisata Getaway Hemat Hingga 70%</span>
      </h1>

      <p class="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
        Nikmati pemeriksaan kesehatan komprehensif, perawatan gigi & estetika, spa mewah, hingga golf 18-hole di Batam dengan transparansi harga SGD/IDR dan penjemputan dari pelabuhan feri.
      </p>

      <!-- Search & Filter Bar -->
      <div class="mt-10 max-w-3xl mx-auto glass-card p-4 rounded-2xl shadow-2xl border border-slate-700/80">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <!-- Category Selector -->
          <div class="text-left">
            <label class="block text-xs font-semibold text-slate-400 mb-1">Kategori Layanan</label>
            <select 
              :value="selectedCategory" 
              @change="$emit('update:selectedCategory', $event.target.value)"
              class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            >
              <option value="all">Semua Kategori</option>
              <option value="medical">🩺 Rumah Sakit & Checkup</option>
              <option value="dental">🦷 Perawatan Gigi (Dental)</option>
              <option value="spa">💆‍♀️ Wellness & Spa</option>
              <option value="golf">⛳ Resort & Golf Course</option>
              <option value="culinary">🦀 Seafood & Culinary</option>
            </select>
          </div>

          <!-- Ferry Terminal Proximity -->
          <div class="text-left">
            <label class="block text-xs font-semibold text-slate-400 mb-1">Dekat Pelabuhan Feri</label>
            <select 
              :value="selectedTerminal" 
              @change="$emit('update:selectedTerminal', $event.target.value)"
              class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            >
              <option value="all">Semua Terminal Feri (SG ⇄ Batam)</option>
              <option value="harbourfront-sg">🇸🇬 HarbourFront Terminal (SG)</option>
              <option value="tanah-merah-sg">🇸🇬 Tanah Merah Terminal (SG)</option>
              <option value="harbour-bay">🇮🇩 Harbour Bay (Nagoya)</option>
              <option value="batam-centre">🇮🇩 Batam Centre (Pusat Kota)</option>
              <option value="sekupang">🇮🇩 Sekupang Terminal</option>
              <option value="nongsa">🇮🇩 Nongsa Pura (Resort)</option>
            </select>
          </div>

          <!-- Action Button -->
          <div class="flex items-end">
            <button 
              @click="$emit('search')"
              class="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
            >
              🔍 Cari Destinasi
            </button>
          </div>

        </div>
      </div>

      <!-- Quick Stats Bar -->
      <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div class="glass-card p-4 rounded-xl text-center">
          <p class="text-2xl sm:text-3xl font-extrabold text-sky-400">70%</p>
          <p class="text-xs text-slate-400 mt-1">Estimasi Hemat vs Singapura</p>
        </div>
        <div class="glass-card p-4 rounded-xl text-center">
          <p class="text-2xl sm:text-3xl font-extrabold text-emerald-400">45 Min</p>
          <p class="text-xs text-slate-400 mt-1">Perjalanan Kapal Feri</p>
        </div>
        <div class="glass-card p-4 rounded-xl text-center">
          <p class="text-2xl sm:text-3xl font-extrabold text-amber-400">50+</p>
          <p class="text-xs text-slate-400 mt-1">Mitra Medis & Resort Terverifikasi</p>
        </div>
        <div class="glass-card p-4 rounded-xl text-center">
          <p class="text-2xl sm:text-3xl font-extrabold text-purple-400">4.9 ★</p>
          <p class="text-xs text-slate-400 mt-1">Kepuasan Turis SG & Int'l</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  selectedCategory: { type: String, default: 'all' },
  selectedTerminal: { type: String, default: 'all' }
})

defineEmits(['update:selectedCategory', 'update:selectedTerminal', 'search'])
</script>
