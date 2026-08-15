<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
    <div class="glass-card w-full max-w-2xl rounded-2xl p-6 border border-slate-700/80 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      
      <!-- Close Button -->
      <button @click="$emit('close')" class="absolute top-4 right-4 text-slate-400 hover:text-white text-xl">✕</button>

      <!-- Modal Title -->
      <div class="flex items-center gap-3 mb-6">
        <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl font-bold border border-amber-500/30">
          ✨
        </div>
        <div>
          <h3 class="text-xl font-extrabold text-white">AI Itinerary Generator Lintas Batas</h3>
          <p class="text-xs text-slate-400">Rencanakan trip medis & liburan weekend dari Singapura ke Batam secara otomatis</p>
        </div>
      </div>

      <!-- Generator Options -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">Durasi Perjalanan</label>
          <select v-model="duration" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500">
            <option value="1day">1 Day Getaway (Pagi Datang, Sore Pulang)</option>
            <option value="2d1n">2D1N Weekend Trip (Menginap Resort/Hotel)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1.5">Fokus Utama Trip</label>
          <select v-model="tripType" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500">
            <option value="medical-seafood">🩺 Medical Checkup + Seafood Feast</option>
            <option value="dental-shopping">🦷 Perawatan Gigi + Shopping Nagoya</option>
            <option value="golf-spa">⛳ Golf 18-Hole + Luxury Spa</option>
          </select>
        </div>
      </div>

      <button 
        @click="generateItinerary"
        :disabled="loading"
        class="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-sky-400 text-slate-950 font-extrabold text-sm hover:from-amber-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 mb-6"
      >
        <span v-if="loading" class="animate-spin">🌀</span>
        <span v-else>🚀 Buat Rencana Trip Otomatis</span>
      </button>

      <!-- Generated Timeline Results -->
      <div v-if="generatedItinerary.length > 0" class="mt-6 pt-6 border-t border-slate-800">
        <h4 class="text-sm font-bold text-sky-400 uppercase tracking-wider mb-4">Rekomendasi Rute & Jadwal Trip</h4>
        
        <div class="space-y-4">
          <div 
            v-for="(step, idx) in generatedItinerary" 
            :key="idx"
            class="flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800"
          >
            <span class="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-mono font-bold whitespace-nowrap">
              {{ step.time }}
            </span>
            <div class="flex-1">
              <h5 class="text-sm font-bold text-white">{{ step.title }}</h5>
              <p class="text-xs text-slate-400 mt-0.5">{{ step.description }}</p>
              <div class="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                <span>📍 {{ step.location }}</span>
                <span>•</span>
                <span class="text-emerald-400 font-semibold">Est: S$ {{ step.costSgd }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
          <div>
            <p class="text-xs text-emerald-300 font-bold">Total Estimasi Hemat Trip Ini</p>
            <p class="text-lg font-extrabold text-emerald-400">Hemat S$ 850+ vs Layanan SG</p>
          </div>
          <button @click="$emit('book-all')" class="px-4 py-2 rounded-xl bg-emerald-400 text-slate-950 text-xs font-bold hover:bg-emerald-300 transition-all">
            Pesan Paket Ini
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  show: Boolean
})

defineEmits(['close', 'book-all'])

const duration = ref('1day')
const tripType = ref('medical-seafood')
const loading = ref(false)
const generatedItinerary = ref([])

const generateItinerary = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    if (tripType.value === 'medical-seafood') {
      generatedItinerary.value = [
        { time: '08:00 AM', title: 'Feri dari HarbourFront SG ke Batam Centre', description: 'Naik kapal BatamFast / Majestic (Durasi 45 menit).', location: 'HarbourFront Terminal', costSgd: 35 },
        { time: '09:15 AM', title: 'Penjemputan VIP ke RS Awal Bros Batam', description: 'Layanan penjemputan gratis menuju pusat pemeriksaan kesehatan.', location: 'Batam Centre Terminal', costSgd: 0 },
        { time: '09:45 AM', title: 'Comprehensive Executive Health Screening', description: 'Pemeriksaan darah lengkap, EKG, USG & konsultasi dokter spesialis.', location: 'RS Awal Bros Batam', costSgd: 280 },
        { time: '01:00 PM', title: 'Makan Siang Seafood Kelong Nagoya', description: 'Kepiting lada hitam, udang galah, dan ikan bakar segar.', location: 'Nagoya Seafood Hub', costSgd: 40 },
        { time: '03:00 PM', title: 'Traditional Balinese Body Massage (2 Jam)', description: 'Relaksasi tubuh total di Royal Spa & Wellness.', location: 'Royal Spa Nagoya', costSgd: 45 },
        { time: '06:30 PM', title: 'Feri Kembali ke Singapura', description: 'Kembali dari Harbour Bay Terminal ke HarbourFront SG.', location: 'Harbour Bay Terminal', costSgd: 35 }
      ]
    } else if (tripType.value === 'dental-shopping') {
      generatedItinerary.value = [
        { time: '08:30 AM', title: 'Feri HarbourFront SG ➔ Harbour Bay Batam', description: 'Naik kapal feri kelas privat.', location: 'Harbour Bay Terminal', costSgd: 35 },
        { time: '09:30 AM', title: 'Perawatan Gigi Scaling & Teeth Whitening', description: 'Pembersihan karang gigi & pemutihan laser di Dental Wellness Nagoya.', location: 'Nagoya Dental Hub', costSgd: 180 },
        { time: '01:00 PM', title: 'Makan Siang & Shopping di Grand Batam Mall', description: 'Belanja produk fashion, gadget, dan kue lapis khas Batam.', location: 'Grand Batam Mall', costSgd: 60 },
        { time: '05:00 PM', title: 'Refleksi Kaki 90 Menit', description: 'Pijat refleksi santai sebelum pulang.', location: 'Nagoya Hill Spa', costSgd: 25 },
        { time: '07:30 PM', title: 'Feri Kembali ke Singapura', description: 'Kepulangan ke HarbourFront SG.', location: 'Harbour Bay Terminal', costSgd: 35 }
      ]
    } else {
      generatedItinerary.value = [
        { time: '07:30 AM', title: 'Feri Tanah Merah SG ➔ Nongsa Pura Batam', description: 'Kapal ekspres khusus ke kawasan resort barat.', location: 'Tanah Merah Terminal', costSgd: 35 },
        { time: '08:40 AM', title: '18-Hole Championship Golf Session', description: 'Tee off di Palm Springs Golf & Beach Resort.', location: 'Palm Springs Golf Nongsa', costSgd: 130 },
        { time: '01:30 PM', title: 'Seafood Buffet Lunch & Resort Spa', description: 'Makan siang mewah di tepi pantai dan pemijatan aromaterapi.', location: 'Nongsa Resort', costSgd: 75 },
        { time: '06:00 PM', title: 'Feri Kembali ke Singapura', description: 'Kembali ke Tanah Merah SG.', location: 'Nongsa Pura Terminal', costSgd: 35 }
      ]
    }
  }, 400)
}
</script>
