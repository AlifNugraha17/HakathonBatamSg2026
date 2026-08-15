<template>
  <section class="py-14 bg-white border-t border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>🗺️</span>
            <span>Peta Spasial Lintas Batas</span>
          </div>
          <h2 class="text-2xl font-extrabold text-teal-ink">Eksplorasi Jarak & Lokasi Terminal Feri Batam</h2>
          <p class="text-xs sm:text-sm text-slate-500 mt-0.5">Visualisasi interaktif posisi pelabuhan feri ke lokasi klinik medis, resort, dan pusat belanja.</p>
        </div>
        <div class="flex items-center gap-3 text-xs text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
          <span class="flex items-center gap-1 font-semibold">
            <span class="inline-block w-3 h-3 rounded-full bg-teal-ocean"></span> 
            Terminal Feri
          </span>
          <span class="flex items-center gap-1 font-semibold ml-2">
            <span class="inline-block w-3 h-3 rounded-full bg-emerald-500"></span> 
            Medis & Resort
          </span>
        </div>
      </div>

      <!-- Map Container -->
      <div class="bg-white rounded-3xl p-3 border-2 border-sky-100 shadow-xl overflow-hidden">
        <div id="leaflet-map" class="w-full h-[460px] rounded-2xl bg-slate-100 z-10"></div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, watch } from 'vue'

const props = defineProps({
  places: { type: Array, required: true },
  selectedPlace: { type: Object, default: null }
})

let map = null
let markers = []

const initMap = () => {
  if (typeof window.L === 'undefined') return

  // Batam coordinates center
  const batamCenter = [1.1301, 104.0529]
  map = window.L.map('leaflet-map').setView(batamCenter, 11)

  // Light Carto Voyager Map Tiles (Bright & Crisp Modern Map)
  window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  // Ferry Terminals
  const terminals = [
    { name: 'Harbour Bay Ferry Terminal', lat: 1.1558, lng: 104.0041, desc: 'Akses tercepat ke Nagoya Hill & Pusat Kuliner' },
    { name: 'Batam Centre Ferry Terminal', lat: 1.1311, lng: 104.0531, desc: 'Pusat Pemerintahan & RS Awal Bros' },
    { name: 'Sekupang Ferry Terminal', lat: 1.1189, lng: 103.9238, desc: 'Kawasan Wisata Barat Batam' },
    { name: 'Nongsa Pura Ferry Terminal', lat: 1.1895, lng: 104.1012, desc: 'Kawasan Luxury Resort & Golf' }
  ]

  terminals.forEach(t => {
    const ferryMarker = window.L.circleMarker([t.lat, t.lng], {
      radius: 9,
      fillColor: '#0284C7',
      color: '#FFFFFF',
      weight: 2.5,
      opacity: 1,
      fillOpacity: 0.95
    }).addTo(map)
    
    ferryMarker.bindPopup(`
      <div class="p-1 font-sans">
        <strong class="text-sm font-bold text-sky-800">🚢 ${t.name}</strong>
        <p class="text-xs text-slate-600 mt-0.5">${t.desc}</p>
      </div>
    `)
  })

  // Plot Destination Places
  props.places.forEach(place => {
    if (place.lat && place.lng) {
      const marker = window.L.circleMarker([place.lat, place.lng], {
        radius: 8,
        fillColor: '#10B981',
        color: '#FFFFFF',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(map)

      marker.bindPopup(`
        <div class="p-1 font-sans">
          <strong class="text-sm font-bold text-slate-900">${place.name}</strong>
          <p class="text-xs text-emerald-700 font-bold mt-0.5">S$ ${place.priceSgd} • Hemat ~${place.savingsPercent}%</p>
          <p class="text-[11px] text-slate-600">📍 ${place.nearestTerminal}</p>
        </div>
      `)
      markers.push({ id: place.id, marker, lat: place.lat, lng: place.lng })
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    initMap()
  }, 300)
})

watch(() => props.selectedPlace, (newVal) => {
  if (newVal && map && newVal.lat && newVal.lng) {
    map.setView([newVal.lat, newVal.lng], 14, { animate: true })
    const found = markers.find(m => m.id === newVal.id)
    if (found) {
      found.marker.openPopup()
    }
  }
})
</script>
