<template>
  <div class="ai-smart-concierge-view animate-fade-in">
    <!-- Header Banner -->
    <div class="concierge-header-banner bg-gradient-to-r from-sky-900 via-teal-900 to-emerald-900 text-white p-6 rounded-3xl shadow-xl border border-teal-700/50 relative overflow-hidden mb-6">
      <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-400/30 font-mono">
            <span>✨</span>
            <span>AI Tourist Intelligence System (Singapore ⇄ Batam)</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            AI Smart Concierge & Itinerary Generator
          </h2>
          <p class="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl font-medium">
            Perencana perjalanan lintas batas cerdas bertenaga AI untuk wisatawan Singapura: jadwal medis, spa relaksasi, rute kapal feri cepat, dan konsultasi asisten perjalanan real-time.
          </p>
        </div>

        <!-- Mode Toggle Pill -->
        <div class="flex items-center bg-slate-950/60 p-1 rounded-2xl border border-white/20 shrink-0">
          <button 
            @click="activeSubMode = 'itinerary'"
            :class="activeSubMode === 'itinerary' ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white font-black shadow-md' : 'text-slate-300 hover:text-white font-bold'"
            class="px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🗺️</span>
            <span>Generator Jadwal AI</span>
          </button>
          <button 
            @click="activeSubMode = 'chat'"
            :class="activeSubMode === 'chat' ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-black shadow-md' : 'text-slate-300 hover:text-white font-bold'"
            class="px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🤖</span>
            <span>Asisten Chat AI</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== 1. AI ITINERARY GENERATOR ==================== -->
    <div v-if="activeSubMode === 'itinerary'" class="space-y-6">
      
      <!-- Input Controls Panel -->
      <div class="bg-white p-5 sm:p-7 rounded-3xl border-2 border-sky-100 shadow-md">
        <h3 class="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 mb-4">
          <span class="w-7 h-7 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-sm font-black">1</span>
          <span>Kustomisasi Rencana Perjalanan Wisata Medis & Liburan</span>
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Duration -->
          <div>
            <label class="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">Durasi Wisata</label>
            <select v-model="formItinerary.days" class="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-500">
              <option :value="1">⚡ 1 Hari (Day Trip Express)</option>
              <option :value="2">🌴 2 Hari 1 Malam (Weekend Escape)</option>
              <option :value="3">🏖️ 3 Hari 2 Malam (Full Medical & Resort)</option>
            </select>
          </div>

          <!-- Travel Style -->
          <div>
            <label class="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">Tujuan Utama</label>
            <select v-model="formItinerary.travel_style" class="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-500">
              <option value="medical_wellness">🩺 Medical Screening + Spa Relaksasi</option>
              <option value="leisure_beach">🏖️ Wisata Pantai, Kafe & Seafood Kelong</option>
              <option value="golf">⛳ 18-Hole Championship Golf & Resort</option>
            </select>
          </div>

          <!-- Port Preference -->
          <div>
            <label class="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">Pelabuhan Asal (SG)</label>
            <select v-model="formItinerary.port" class="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-500">
              <option value="harbourfront-sg">🇸🇬 HarbourFront Terminal SG</option>
              <option value="tanah-merah-sg">🇸🇬 Tanah Merah Terminal SG</option>
            </select>
          </div>

          <!-- Passengers -->
          <div>
            <label class="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">Jumlah Wisatawan</label>
            <select v-model="formItinerary.passengers" class="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-teal-500">
              <option :value="1">👤 1 Orang (Solo Traveler)</option>
              <option :value="2">👥 2 Orang (Couple / Pasangan)</option>
              <option :value="4">👨‍👩‍👧‍👦 4 Orang (Family / Keluarga)</option>
            </select>
          </div>
        </div>

        <div class="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div class="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>💡 Kurs acuan terintegrasi:</span>
            <strong class="text-emerald-700 font-mono font-black">1 SGD ≈ Rp 13.920 IDR</strong>
          </div>

          <button 
            @click="generateItinerary" 
            :disabled="isGenerating"
            class="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span v-if="isGenerating" class="animate-spin">⏳</span>
            <span v-else>⚡</span>
            <span>{{ isGenerating ? 'AI Sedang Mengoptimasi Jadwal...' : 'Buat Rencana Jadwal dengan AI' }}</span>
          </button>
        </div>
      </div>

      <!-- Generated Itinerary Result Card -->
      <div v-if="itineraryResult" class="bg-white rounded-3xl border-2 border-teal-200 shadow-xl overflow-hidden animate-fade-in">
        
        <!-- Summary Strip -->
        <div class="bg-gradient-to-r from-teal-50 via-sky-50 to-emerald-50 p-6 border-b border-teal-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span class="text-xs font-black uppercase tracking-wider text-teal-800">Ringkasan Biaya & Penghematan AI</span>
            <h4 class="text-xl font-black text-slate-900 mt-0.5">
              Estimasi Biaya: <span class="text-teal-700">${{ formatCurrency(itineraryResult.financial_summary?.total_estimated_sgd) }} SGD</span>
              <span class="text-xs text-slate-500 font-medium ml-1.5">(Rp {{ formatNumber(itineraryResult.financial_summary?.total_estimated_idr) }})</span>
            </h4>
          </div>

          <div class="flex items-center gap-3">
            <div class="bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-2 rounded-2xl text-center">
              <p class="text-[10px] font-black uppercase">Hemat vs Singapura</p>
              <p class="text-base sm:text-lg font-black text-emerald-800">
                ~${{ formatCurrency(itineraryResult.financial_summary?.total_savings_sgd) }} SGD ({{ itineraryResult.financial_summary?.savings_percentage }}%)
              </p>
            </div>
            
            <button 
              @click="shareWhatsAppItinerary"
              class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>📲</span>
              <span>Kirim ke WhatsApp</span>
            </button>
          </div>
        </div>

        <!-- Days Breakdown -->
        <div class="p-6 sm:p-8 space-y-8">
          <div v-for="day in itineraryResult.days" :key="day.day" class="space-y-4">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-xl bg-teal-800 text-white text-xs font-black font-mono">HARI {{ day.day }}</span>
              <h5 class="text-base font-black text-slate-900">{{ day.title }}</h5>
            </div>

            <div class="grid grid-cols-1 gap-3 relative before:absolute before:top-3 before:bottom-3 before:left-5 before:w-0.5 before:bg-slate-200 pl-2">
              <div 
                v-for="(item, idx) in day.activities" 
                :key="idx"
                class="relative pl-8 bg-slate-50 hover:bg-white p-4 rounded-2xl border border-slate-200 transition-all hover:shadow-md hover:border-teal-400 group"
              >
                <!-- Dot Marker -->
                <div class="absolute left-2.5 top-4.5 w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-black shadow-xs -translate-x-1/2 group-hover:scale-110 transition-transform">
                  {{ idx + 1 }}
                </div>

                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 font-mono text-[11px] font-bold">{{ item.time }}</span>
                    <h6 class="text-sm font-bold text-slate-900">{{ item.title }}</h6>
                  </div>
                  <div class="text-right">
                    <span class="text-xs font-black text-teal-700 font-mono">${{ item.cost_sgd }} SGD</span>
                  </div>
                </div>

                <p class="text-xs text-slate-600 mt-1 leading-relaxed">{{ item.description }}</p>
                <div class="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <span class="text-slate-500 font-bold">📍 {{ item.location }}</span>
                  <span v-if="item.tips" class="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-medium">💡 {{ item.tips }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Tips Footer -->
        <div class="bg-slate-50 p-5 border-t border-slate-200 text-xs text-slate-600 space-y-1 font-medium">
          <p>ℹ️ <strong>Tips Lintas Batas:</strong> {{ itineraryResult.ai_insights?.ferry_safety }}</p>
          <p>💳 <strong>Pembayaran:</strong> {{ itineraryResult.ai_insights?.currency_tip }}</p>
        </div>

      </div>

    </div>

    <!-- ==================== 2. AI TOURIST ASSISTANT CHAT ==================== -->
    <div v-else class="bg-white rounded-3xl border-2 border-sky-100 shadow-xl overflow-hidden flex flex-col h-[620px]">
      
      <!-- Chat Header -->
      <div class="bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-teal-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
            🤖
          </div>
          <div>
            <h4 class="text-sm font-black">LokaBatam Cross-Border Travel Advisor</h4>
            <p class="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Online • Terintegrasi Regulasi SG-Batam 2026</span>
            </p>
          </div>
        </div>

        <button 
          @click="resetChat" 
          class="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl transition-colors font-bold cursor-pointer"
        >
          Reset Percakapan
        </button>
      </div>

      <!-- Chat Messages Container -->
      <div ref="chatContainer" class="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        <div 
          v-for="(msg, index) in chatMessages" 
          :key="index"
          :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'"
        >
          <div 
            :class="msg.role === 'user' 
              ? 'bg-gradient-to-r from-teal-700 to-sky-700 text-white rounded-2xl rounded-tr-none p-3.5 max-w-[85%] sm:max-w-[70%] shadow-md text-xs sm:text-sm' 
              : 'bg-white border border-slate-200 text-slate-900 rounded-2xl rounded-tl-none p-4 max-w-[90%] sm:max-w-[80%] shadow-sm text-xs sm:text-sm leading-relaxed'"
          >
            <div class="whitespace-pre-line">{{ msg.text }}</div>
            
            <!-- Action Chips for bot answers -->
            <div v-if="msg.action_chips && msg.action_chips.length > 0" class="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
              <button 
                v-for="(chip, cIdx) in msg.action_chips" 
                :key="cIdx"
                @click="sendQuery(chip)"
                class="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold border border-teal-200 transition-colors cursor-pointer"
              >
                {{ chip }}
              </button>
            </div>

            <div class="text-[10px] text-right mt-1 opacity-60 font-mono">
              {{ msg.time }}
            </div>
          </div>
        </div>

        <div v-if="isChatLoading" class="flex justify-start">
          <div class="bg-white border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-500 flex items-center gap-2 shadow-xs">
            <span class="animate-spin">🤖</span>
            <span>Asisten AI sedang menyusun jawaban terbaik...</span>
          </div>
        </div>
      </div>

      <!-- Quick Suggestion Buttons -->
      <div class="p-2.5 px-4 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span class="text-[11px] font-black text-slate-500 shrink-0 uppercase">Pertanyaan Cepat:</span>
        <button 
          v-for="(prompt, pIdx) in promptPresets" 
          :key="pIdx"
          @click="sendQuery(prompt)"
          class="px-3 py-1 rounded-full bg-slate-100 hover:bg-teal-100 text-slate-700 hover:text-teal-900 text-xs font-bold whitespace-nowrap transition-colors border border-slate-200 shrink-0 cursor-pointer"
        >
          {{ prompt }}
        </button>
      </div>

      <!-- Chat Input Field -->
      <form @submit.prevent="handleSendMessage" class="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input 
          v-model="chatInput" 
          type="text" 
          placeholder="Tanyakan jadwal kapal, rekomendasi MRI / rumah sakit, bea cukai, atau cara bayar PayNow..." 
          class="flex-1 bg-slate-50 border-2 border-slate-200 focus:border-teal-600 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white transition-all"
        />
        <button 
          type="submit" 
          :disabled="!chatInput.trim() || isChatLoading"
          class="px-5 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs sm:text-sm transition-all shadow-md active:scale-95 disabled:opacity-40 cursor-pointer shrink-0"
        >
          Kirim 🚀
        </button>
      </form>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { api } from '../../../services/api'
import { useNotification } from '../../../composables/useNotification'

const { showSuccess, showError } = useNotification()

const activeSubMode = ref('itinerary')
const isGenerating = ref(false)
const itineraryResult = ref(null)

const formItinerary = ref({
  days: 1,
  travel_style: 'medical_wellness',
  port: 'harbourfront-sg',
  target_port: 'harbour-bay',
  passengers: 2,
  budget_sgd: 400
})

const promptPresets = [
  'Berapa biaya Medical Checkup di Batam vs SG?',
  'Apakah orang Singapura butuh visa ke Batam?',
  'Bisa bayar pakai PayNow / QRIS di Batam?',
  'Jadwal feri dari HarbourFront ke Harbour Bay',
  'Batas bebas bea rokok & alkohol ke Singapura'
]

const chatInput = ref('')
const isChatLoading = ref(false)
const chatContainer = ref(null)

const chatMessages = ref([
  {
    role: 'bot',
    text: "👋 Halo! Saya **Asisten AI LokaBatam Concierge**.\n\nSaya siap membantu pertanyaan seputar:\n• Rekomendasi RS rujukan, MRI, dan Dokter Spesialis di Batam\n• Jadwal Feri, Auto-Gate, dan Transportasi Pelabuhan\n• Transparansi Kurs & Penghematan Biaya Medis (hingga 70% vs RS Singapura)\n• Panduan Imigrasi & Bea Cukai SG-Batam",
    action_chips: ['Cek Jadwal Feri', 'Berapa Biaya MRI Batam?', 'Apakah Butuh Visa?'],
    time: 'Baru saja'
  }
])

const generateItinerary = async () => {
  isGenerating.value = true
  try {
    const res = await api.generateAiItinerary(formItinerary.value)
    if (res) {
      itineraryResult.value = res
      showSuccess({
        id: 'Jadwal AI berhasil dibuat berdasarkan estimasi rute feri & klinik medis!',
        en: 'AI itinerary successfully generated matching ferry & medical schedules!'
      }, {
        id: 'AI Sukses',
        en: 'AI Generated'
      })
    }
  } catch (err) {
    showError({
      id: 'Gagal menghasilkan jadwal AI. Menggunakan cadangan lokal.',
      en: 'Failed to generate AI itinerary. Using fallback.'
    })
  } finally {
    isGenerating.value = false
  }
}

const sendQuery = (queryText) => {
  chatInput.value = queryText
  handleSendMessage()
}

const handleSendMessage = async () => {
  const text = chatInput.value.trim()
  if (!text) return

  chatMessages.value.push({
    role: 'user',
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  chatInput.value = ''
  isChatLoading.value = true
  await scrollToBottom()

  try {
    const res = await api.touristAiChat({ query: text })
    if (res && res.reply) {
      chatMessages.value.push({
        role: 'bot',
        text: res.reply,
        action_chips: res.action_chips || [],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })
    }
  } catch (err) {
    chatMessages.value.push({
      role: 'bot',
      text: "Maaf, terjadi gangguan jaringan ke server AI. Namun Anda tetap dapat menggunakan kalkulator kurs atau memesan tiket kapal feri langsung di menu.",
      action_chips: ['Jadwal Feri SG-Batam', 'Cek Kurs SGD/IDR'],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  } finally {
    isChatLoading.value = false
    await scrollToBottom()
  }
}

const resetChat = () => {
  chatMessages.value = [
    {
      role: 'bot',
      text: "👋 Halo! Saya **Asisten AI LokaBatam Concierge**.\n\nSilakan pilih topik atau tanyakan apa saja seputar wisata medis, kapal feri, dan liburan di Batam.",
      action_chips: ['Cek Jadwal Feri', 'Berapa Biaya MRI Batam?', 'Apakah Butuh Visa?'],
      time: 'Baru saja'
    }
  ]
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const shareWhatsAppItinerary = () => {
  if (!itineraryResult.value) return
  const summary = `*JADWAL PERJALANAN LOKABATAM (SG ⇄ BATAM)*%0A%0A` +
    `• Durasi: ${formItinerary.value.days} Hari%0A` +
    `• Estimasi Biaya: $${itineraryResult.value.financial_summary?.total_estimated_sgd} SGD (Hemat ${itineraryResult.value.financial_summary?.savings_percentage}%25 vs SG)%0A` +
    `• Pelabuhan: HarbourFront SG %E2%86%94 Harbour Bay Batam%0A%0A` +
    `_Dihasilkan otomatis oleh LokaBatam AI Smart Concierge._`
  window.open(`https://wa.me/?text=${summary}`, '_blank')
}

const formatNumber = (num) => new Intl.NumberFormat('id-ID').format(Math.round(num || 0))
const formatCurrency = (num) => Number(num || 0).toFixed(2)

onMounted(() => {
  generateItinerary()
})
</script>

<style scoped>
.ai-smart-concierge-view {
  width: 100%;
}
</style>
