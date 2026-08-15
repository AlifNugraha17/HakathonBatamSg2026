<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
    <div class="glass-card w-full max-w-4xl rounded-2xl p-6 border border-slate-700/80 shadow-2xl relative max-h-[92vh] overflow-y-auto">
      
      <button @click="$emit('close')" class="absolute top-4 right-4 text-slate-400 hover:text-white text-xl z-10">✕</button>

      <!-- Header & Real-time Live Badge -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center text-xl font-bold border border-sky-500/30">
            🚢
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-xl font-extrabold text-white">Jadwal Keberangkatan Feri Real-Time</h3>
              <span class="flex h-2 w-2 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p class="text-xs text-slate-400">Rute Singapura (HarbourFront / Tanah Merah) ↔ Batam (Harbour Bay / Batam Centre / Nongsa / Sekupang)</p>
          </div>
        </div>

        <div class="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <span class="text-xs text-slate-400">Waktu Real-Time:</span>
          <span class="text-xs font-mono font-bold text-emerald-400">{{ currentTimeString }}</span>
        </div>
      </div>

      <!-- Route Selector Filter Tabs -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button 
          v-for="tab in routeTabs" 
          :key="tab.id"
          @click="activeRoute = tab.id"
          :class="activeRoute === tab.id ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'"
          class="px-3.5 py-1.5 rounded-xl text-xs transition-all border border-slate-700/60"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Active Route Real-Time Schedules Grid -->
      <div class="space-y-4 mb-6">
        <div 
          v-for="(trip, idx) in activeSchedules" 
          :key="idx"
          class="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <!-- Trip Operator & Route Info -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-lg">
              🚢
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-white">{{ trip.operator }}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase" :class="trip.badgeColor">
                  {{ trip.tag }}
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Rute: {{ trip.route }}</p>
            </div>
          </div>

          <!-- Times: Departure -> Arrival -->
          <div class="flex items-center gap-6 font-mono">
            <div>
              <p class="text-[10px] text-slate-500 uppercase">Berangkat (SGT)</p>
              <p class="text-base font-extrabold text-sky-400">{{ trip.departureTime }}</p>
            </div>
            <div class="text-center">
              <span class="text-xs text-slate-500 font-sans">⏱️ {{ trip.duration }}m</span>
              <div class="w-16 h-0.5 bg-slate-700 my-1"></div>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 uppercase">Estimasi Tiba (WIB)</p>
              <p class="text-base font-extrabold text-emerald-400">{{ trip.arrivalTime }}</p>
            </div>
          </div>

          <!-- Live Trip Status Badge & Countdown -->
          <div class="text-right">
            <span class="px-2.5 py-1 rounded-lg text-xs font-bold font-mono inline-flex items-center gap-1.5" :class="trip.statusClass">
              <span v-if="trip.status === 'BOARDING'" class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {{ trip.statusText }}
            </span>
            <p v-if="trip.countdown" class="text-[10px] text-amber-300 font-mono mt-1">⏳ {{ trip.countdown }}</p>
          </div>
        </div>
      </div>

      <!-- Immigration & Customs Travel Guide -->
      <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
        <h4 class="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">📋 Catatan Imigrasi & e-VoA Masuk Batam</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          <div class="flex items-start gap-2">
            <span>✅</span>
            <span><strong>WNA Singapore</strong>: Free Visa Wisata 30 Hari (Tanpa Biaya Visa).</span>
          </div>
          <div class="flex items-start gap-2">
            <span>🛂</span>
            <span><strong>Paspor Non-ASEAN</strong>: e-VoA online (Rp 500.000 / ~S$ 36) bayar di pelabuhan.</span>
          </div>
          <div class="flex items-start gap-2">
            <span>📱</span>
            <span><strong>e-CD (Customs Declaration)</strong>: Pengisian deklarasi bea cukai online gratis sebelum mendarat.</span>
          </div>
          <div class="flex items-start gap-2">
            <span>⏰</span>
            <span><strong>Perbedaan Waktu</strong>: Batam 1 Jam Lebih Lambat dari Singapore (SGT = WIB + 1 Jam).</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineProps({ show: Boolean })
defineEmits(['close'])

const activeRoute = ref('harbour-bay')
const now = ref(new Date())
let timer = null

const currentTimeString = computed(() => {
  return now.value.toLocaleTimeString('en-US', { hour12: false }) + ' SGT'
})

const routeTabs = [
  { id: 'harbour-bay', label: 'HarbourFront ➔ Harbour Bay' },
  { id: 'batam-centre', label: 'HarbourFront ➔ Batam Centre' },
  { id: 'nongsa', label: 'Tanah Merah ➔ Nongsa Pura' },
  { id: 'sekupang', label: 'HarbourFront ➔ Sekupang' }
]

const baseSchedules = {
  'harbour-bay': [
    { operator: 'Horizon Fast Ferry', route: 'HarbourFront ➔ Harbour Bay', dep: '08:00', duration: 45, tag: 'Terdekat Nagoya', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { operator: 'Horizon Fast Ferry', route: 'HarbourFront ➔ Harbour Bay', dep: '09:30', duration: 45, tag: 'Terdekat Nagoya', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { operator: 'Horizon Fast Ferry', route: 'HarbourFront ➔ Harbour Bay', dep: '11:15', duration: 45, tag: 'Terdekat Nagoya', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { operator: 'Horizon Fast Ferry', route: 'HarbourFront ➔ Harbour Bay', dep: '14:00', duration: 45, tag: 'Terdekat Nagoya', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { operator: 'Horizon Fast Ferry', route: 'HarbourFront ➔ Harbour Bay', dep: '16:30', duration: 45, tag: 'Terdekat Nagoya', badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { operator: 'Horizon Fast Ferry', route: 'HarbourFront ➔ Harbour Bay', dep: '19:00', duration: 45, tag: 'Terdekat Nagoya', badgeColor: 'bg-emerald-500/20 text-emerald-300' }
  ],
  'batam-centre': [
    { operator: 'BatamFast', route: 'HarbourFront ➔ Batam Centre', dep: '07:40', duration: 60, tag: 'Terdekat RS Awal Bros', badgeColor: 'bg-sky-500/20 text-sky-300' },
    { operator: 'Majestic Fast Ferry', route: 'HarbourFront ➔ Batam Centre', dep: '08:45', duration: 60, tag: 'Terdekat RS Awal Bros', badgeColor: 'bg-sky-500/20 text-sky-300' },
    { operator: 'Sindo Ferry', route: 'HarbourFront ➔ Batam Centre', dep: '10:20', duration: 60, tag: 'Terdekat RS Awal Bros', badgeColor: 'bg-sky-500/20 text-sky-300' },
    { operator: 'BatamFast', route: 'HarbourFront ➔ Batam Centre', dep: '12:50', duration: 60, tag: 'Terdekat RS Awal Bros', badgeColor: 'bg-sky-500/20 text-sky-300' },
    { operator: 'Majestic Fast Ferry', route: 'HarbourFront ➔ Batam Centre', dep: '15:20', duration: 60, tag: 'Terdekat RS Awal Bros', badgeColor: 'bg-sky-500/20 text-sky-300' },
    { operator: 'BatamFast', route: 'HarbourFront ➔ Batam Centre', dep: '18:10', duration: 60, tag: 'Terdekat RS Awal Bros', badgeColor: 'bg-sky-500/20 text-sky-300' }
  ],
  'nongsa': [
    { operator: 'BatamFast', route: 'Tanah Merah ➔ Nongsa Pura', dep: '08:00', duration: 45, tag: 'Kawasan Luxury Golf', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { operator: 'BatamFast', route: 'Tanah Merah ➔ Nongsa Pura', dep: '12:00', duration: 45, tag: 'Kawasan Luxury Golf', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { operator: 'BatamFast', route: 'Tanah Merah ➔ Nongsa Pura', dep: '15:30', duration: 45, tag: 'Kawasan Luxury Golf', badgeColor: 'bg-purple-500/20 text-purple-300' },
    { operator: 'BatamFast', route: 'Tanah Merah ➔ Nongsa Pura', dep: '18:20', duration: 45, tag: 'Kawasan Luxury Golf', badgeColor: 'bg-purple-500/20 text-purple-300' }
  ],
  'sekupang': [
    { operator: 'Majestic Fast Ferry', route: 'HarbourFront ➔ Sekupang', dep: '08:40', duration: 45, tag: 'Kawasan Barat', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { operator: 'Sindo Ferry', route: 'HarbourFront ➔ Sekupang', dep: '11:20', duration: 45, tag: 'Kawasan Barat', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { operator: 'Majestic Fast Ferry', route: 'HarbourFront ➔ Sekupang', dep: '14:10', duration: 45, tag: 'Kawasan Barat', badgeColor: 'bg-amber-500/20 text-amber-300' },
    { operator: 'Sindo Ferry', route: 'HarbourFront ➔ Sekupang', dep: '17:30', duration: 45, tag: 'Kawasan Barat', badgeColor: 'bg-amber-500/20 text-amber-300' }
  ]
}

const activeSchedules = computed(() => {
  const currentMinutes = now.value.getHours() * 60 + now.value.getMinutes()

  return (baseSchedules[activeRoute.value] || []).map(item => {
    const [h, m] = item.dep.split(':').map(Number)
    const depMinutes = h * 60 + m
    
    // Arrival time in WIB (SGT - 1hr + duration)
    // SGT -> WIB = h - 1. Add duration
    const arrTotalMinutes = (depMinutes - 60 + item.duration + 1440) % 1440
    const arrH = Math.floor(arrTotalMinutes / 60).toString().padStart(2, '0')
    const arrM = (arrTotalMinutes % 60).toString().padStart(2, '0')
    const arrivalTimeStr = `${arrH}:${arrM}`

    let status = 'SCHEDULED'
    let statusText = '⚪ SCHEDULED'
    let statusClass = 'bg-slate-800 text-slate-400 border border-slate-700'
    let countdown = null

    const diff = depMinutes - currentMinutes

    if (diff > 0 && diff <= 30) {
      status = 'BOARDING'
      statusText = '🟢 BOARDING NOW'
      statusClass = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
      countdown = `Keberangkatan dalam ${diff} menit`
    } else if (diff > 30 && diff <= 120) {
      status = 'UPCOMING'
      statusText = '🟡 UPCOMING'
      statusClass = 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
      const hrs = Math.floor(diff / 60)
      const mins = diff % 60
      countdown = hrs > 0 ? `Dalam ${hrs}j ${mins}m` : `Dalam ${mins}m`
    } else if (diff <= 0 && diff >= -item.duration) {
      status = 'TRANSIT'
      statusText = '🔵 IN TRANSIT'
      statusClass = 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
      countdown = `Estimasi tiba dalam ${item.duration + diff}m`
    } else if (diff < -item.duration) {
      status = 'DEPARTED'
      statusText = '⚪ DEPARTED'
      statusClass = 'bg-slate-900 text-slate-500 border border-slate-800'
    }

    return {
      ...item,
      departureTime: item.dep + ' SGT',
      arrivalTime: arrivalTimeStr + ' WIB',
      status,
      statusText,
      statusClass,
      countdown
    }
  })
})

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
