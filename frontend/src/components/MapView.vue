<template>
  <section class="py-12 bg-slate-900 border-t border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-sky-400">Peta Spasial PostGIS</span>
          <h2 class="text-2xl font-extrabold text-white">Eksplorasi Lokasi & Terminal Feri Batam</h2>
        </div>
        <div class="flex items-center gap-2 text-xs text-slate-400">
          <span class="inline-block w-3 h-3 rounded-full bg-sky-500"></span> Terminal Feri
          <span class="inline-block w-3 h-3 rounded-full bg-emerald-500 ml-2"></span> Medis & Resort
        </div>
      </div>

      <!-- Map Container -->
      <div class="glass-card rounded-2xl p-2 overflow-hidden border border-slate-700/80 shadow-2xl">
        <div id="leaflet-map" class="w-full h-[450px] rounded-xl bg-slate-950 z-10"></div>
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

  // Dark Map Tiles
  window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  // Ferry Terminals
  const terminals = [
    { name: 'Harbour Bay Ferry Terminal', lat: 1.1558, lng: 104.0041, desc: 'Akses cepat ke Nagoya' },
    { name: 'Batam Centre Ferry Terminal', lat: 1.1311, lng: 104.0531, desc: 'Pusat Kota & RS Awal Bros' },
    { name: 'Sekupang Ferry Terminal', lat: 1.1189, lng: 103.9238, desc: 'Kawasan Barat Batam' },
    { name: 'Nongsa Pura Ferry Terminal', lat: 1.1895, lng: 104.1012, desc: 'Kawasan Luxury Resort & Golf' }
  ]

  terminals.forEach(t => {
    const ferryMarker = window.L.circleMarker([t.lat, t.lng], {
      radius: 9,
      fillColor: '#38bdf8',
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9
    }).addTo(map)
    
    ferryMarker.bindPopup(`
      <div class="p-1 font-sans text-slate-900">
        <strong class="text-sm font-bold text-sky-700">🚢 ${t.name}</strong>
        <p class="text-xs text-slate-600">${t.desc}</p>
      </div>
    `)
  })

  // Plot Destination Places
  props.places.forEach(place => {
    if (place.lat && place.lng) {
      const marker = window.L.circleMarker([place.lat, place.lng], {
        radius: 8,
        fillColor: '#10b981',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map)

      marker.bindPopup(`
        <div class="p-1 font-sans text-slate-900">
          <strong class="text-sm font-bold text-slate-900">${place.name}</strong>
          <p class="text-xs text-emerald-700 font-semibold mt-0.5">S$ ${place.priceSgd} • Hemat ~${place.savingsPercent}%</p>
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
