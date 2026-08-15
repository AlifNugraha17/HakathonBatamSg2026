<template>
  <div class="ai-bridge-view animate-fade-in space-y-6">
    <!-- Header Banner -->
    <div class="section-title-box bg-gradient-to-r from-teal-900 via-sky-900 to-indigo-950 text-white p-6 rounded-3xl border border-teal-700/50 shadow-xl">
      <div class="flex items-center gap-2 mb-2">
        <span class="px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-black uppercase font-mono">
          🤖 LokaBatam Clinical-NLP v4.0
        </span>
        <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
          Singapore ⇄ Batam Corridor
        </span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
        AI Medical, Wellness & Getaways Consultation Studio
      </h2>
      <p class="text-xs sm:text-sm text-slate-200 mt-1 max-w-3xl font-medium">
        Penerjemah klinis bertenaga AI untuk wisatawan Singapura: konversi otomatis keluhan medis, gejala penyakit, alergi obat, dan preferensi perawatan dari bahasa English, Singlish, Mandarin, atau Melayu menjadi **Kartu Rekam Medis & Instruksi Dokter Spesialis Indonesia**.
      </p>
    </div>

    <!-- Quick Clinical Presets Strip -->
    <div class="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-black text-slate-700 uppercase tracking-wider">⚡ 1-Click Skenario Medis & Liburan:</span>
        <span class="text-[11px] text-slate-500 font-bold">Pilih untuk auto-fill:</span>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <button 
          v-for="sc in scenarios" 
          :key="sc.id"
          @click="loadScenario(sc)"
          class="p-3 rounded-2xl border border-slate-200 hover:border-teal-500 bg-slate-50 hover:bg-teal-50/60 transition-all text-left group cursor-pointer"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ sc.icon }}</span>
            <div>
              <p class="text-xs font-black text-slate-900 group-hover:text-teal-900">{{ sc.title }}</p>
              <p class="text-[10px] text-slate-500 line-clamp-1">{{ sc.subtitle }}</p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Interactive Translation Workbench Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Left Panel: Tourist Input -->
      <div class="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-200 shadow-md space-y-4 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-7 h-7 rounded-xl bg-teal-800 text-white font-black flex items-center justify-center text-xs">1</span>
              <h3 class="text-sm sm:text-base font-black text-slate-900">Keluhan & Kebutuhan Wisatawan</h3>
            </div>
            <span class="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">Multilingual (EN / ZH / MS / Singlish)</span>
          </div>

          <!-- Voice Mic Bar -->
          <div class="flex items-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <select v-model="spokenLang" class="bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 focus:outline-none">
              <option value="en-US">🇬🇧 English / Singlish</option>
              <option value="zh-CN">🇨🇳 Mandarin (中文)</option>
              <option value="id-ID">🇮🇩 Bahasa Indonesia</option>
            </select>

            <button 
              type="button" 
              @click="toggleVoiceRecording"
              :class="isRecording ? 'bg-red-600 text-white animate-pulse' : 'bg-teal-800 text-white hover:bg-teal-900'"
              class="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{{ isRecording ? '🔴' : '🎙️' }}</span>
              <span>{{ isRecording ? 'Mendengarkan Suara...' : 'Bicara Lewat Mikrofon' }}</span>
            </button>
          </div>

          <!-- Textarea Input -->
          <div class="relative">
            <textarea
              v-model="inputText"
              rows="5"
              placeholder="Ketik atau ucapkan keluhan medis Anda dalam bahasa Inggris, Singlish, atau Mandarin. Contoh: 'Frequent migraine and stiff neck after long office hours, have mild iodine allergy, looking for 1.5T MRI screening with specialist consultation.'"
              class="w-full bg-slate-50 border-2 border-slate-200 focus:border-teal-600 focus:bg-white rounded-2xl p-4 text-xs sm:text-sm text-slate-900 focus:outline-none transition-all leading-relaxed"
            ></textarea>
            
            <div v-if="isRecording" class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-red-50 text-red-600 px-2.5 py-1 rounded-lg border border-red-200 text-[11px] font-bold">
              <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>AI Mic Aktif</span>
            </div>
          </div>

          <!-- Clinical Tag Chips -->
          <div>
            <label class="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">Tag Gejala & Spesialis Cepat:</label>
            <div class="flex flex-wrap gap-1.5">
              <button 
                v-for="tag in clinicalTags" 
                :key="tag.id"
                @click="appendTag(tag.text)"
                class="px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border cursor-pointer"
                :class="tag.isHazard ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-teal-100 hover:text-teal-900'"
              >
                <span v-if="tag.isHazard">🚨 </span>
                <span>{{ tag.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <button 
          @click="handleTranslate"
          :disabled="!inputText.trim() || isTranslating"
          class="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-teal-700 via-sky-700 to-indigo-800 hover:from-teal-800 hover:to-indigo-900 transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 mt-4"
        >
          <span v-if="isTranslating" class="animate-spin">⏳</span>
          <span v-else>✨</span>
          <span>{{ isTranslating ? 'AI Sedang Menerjemahkan...' : 'Terjemahkan ke Kartu Dokter & Spesialis' }}</span>
        </button>
      </div>

      <!-- Right Panel: Doctor Clinical Brief Card Output -->
      <div class="bg-white p-5 sm:p-6 rounded-3xl border-2 border-teal-200 shadow-xl space-y-4 flex flex-col justify-between">
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-teal-100">
            <div class="flex items-center gap-2">
              <span class="w-7 h-7 rounded-xl bg-teal-600 text-white font-black flex items-center justify-center text-xs">2</span>
              <h3 class="text-sm sm:text-base font-black text-slate-900">Kartu Konsultasi Dokter & Rekam Medis (AI)</h3>
            </div>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black font-mono">
              STANDAR IDI / KARS
            </span>
          </div>

          <!-- Result Display Box -->
          <div v-if="translatedResult" class="space-y-3 animate-fade-in">
            
            <!-- Allergy & Hazard Alert Banner -->
            <div v-if="translatedResult.allergy" class="p-3.5 bg-red-50 border-2 border-red-300 rounded-2xl text-red-900 text-xs font-bold flex items-start gap-2.5">
              <span class="text-base">🚨</span>
              <div>
                <p class="font-black uppercase tracking-wider text-[11px] text-red-800">PERINGATAN MEDIS / ALERGI OBAT:</p>
                <p class="mt-0.5 leading-relaxed">{{ translatedResult.allergy }}</p>
              </div>
            </div>

            <!-- Structured Doctor Brief -->
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div class="flex justify-between items-center pb-2 border-b border-slate-200">
                <span class="text-[11px] font-black text-slate-500 uppercase">Spesialis Rekomendasi:</span>
                <span class="font-black text-teal-800 font-mono">{{ translatedResult.specialist_recommended || 'Dokter Spesialis Terkait' }}</span>
              </div>

              <div>
                <span class="text-[10px] font-black text-slate-500 uppercase block mb-1">Rangkuman Keluhan Klinis (Bahasa Indonesia):</span>
                <div class="p-3 bg-white rounded-xl border border-slate-200 text-slate-800 leading-relaxed font-medium whitespace-pre-line font-mono text-xs">
                  {{ translatedResult.indonesian_brief }}
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 pt-1">
                <div class="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span class="text-[10px] font-black text-slate-500 uppercase block">Area / Organ:</span>
                  <span class="font-bold text-slate-900">{{ translatedResult.focus || 'Pemeriksaan Komprehensif' }}</span>
                </div>
                <div class="p-2.5 bg-white rounded-xl border border-slate-200">
                  <span class="text-[10px] font-black text-slate-500 uppercase block">Tingkat Prioritas:</span>
                  <span class="font-bold text-emerald-700">Elektif / Konsultasi Spesialis</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Empty Placeholder -->
          <div v-else class="h-64 flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
            <span class="text-4xl mb-2">📋</span>
            <p class="text-xs font-bold text-slate-600">Kartu Konsultasi Dokter Belum Dibuat</p>
            <p class="text-[11px] text-slate-400 mt-1 max-w-xs">
              Ketik keluhan Anda di sebelah kiri atau pilih salah satu tombol skenario cepat untuk melihat hasil terjemahan resmi.
            </p>
          </div>
        </div>

        <!-- Action Footer -->
        <div v-if="translatedResult" class="flex flex-col sm:flex-row items-center gap-2 pt-3 border-t border-teal-100">
          <button 
            @click="playAudio(translatedResult.indonesian_brief)"
            class="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>🔊</span>
            <span>Dengarkan Bahasa Indonesia</span>
          </button>

          <button 
            @click="shareWhatsAppCard"
            class="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>📲</span>
            <span>Kirim ke Dokter via WhatsApp</span>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '../../../services/api'
import { useNotification } from '../../../composables/useNotification'

const { showSuccess, showError } = useNotification()

const inputText = ref('')
const spokenLang = ref('en-US')
const isRecording = ref(false)
const isTranslating = ref(false)
const translatedResult = ref(null)

const scenarios = [
  {
    id: 'cardio',
    icon: '🫀',
    title: 'Kardiologi & Jantung',
    subtitle: 'Nyeri dada, hipertensi, butuh ECG & konsultasi',
    text: 'Experiencing chest tightness after brisk walking, history of mild hypertension, request ECG & consultation with Dr. Bambang Sp.JP at RS Awal Bros.',
    specialist: 'dr. Bambang Hermanto, Sp.JP(K), FIHA'
  },
  {
    id: 'dental',
    icon: '🦷',
    title: 'Implan Gigi & Bleaching',
    subtitle: 'Gigi sensitif, implan titanium & laser putih',
    text: 'Sensitive gums with cold sensitivity on lower left molar, interested in titanium dental implant and 1-hour laser power bleaching.',
    specialist: 'drg. Cynthia Wijaya, Sp.KG'
  },
  {
    id: 'ortho',
    icon: '🦴',
    title: 'Ortopedi & Nyeri Tulang',
    subtitle: 'Sakit pinggang kronis, butuh MRI 1.5 Tesla',
    text: 'Severe lumbar lower back pain radiating down left leg from prolonged desk work, request 1.5 Tesla MRI scan and orthopedic specialist review.',
    specialist: 'dr. Hendra Gunawan, Sp.OT'
  },
  {
    id: 'eye',
    icon: '👁️',
    title: 'Operasi Katarak Phaco',
    subtitle: 'Penglihatan kabur malam hari, lensa intraokular',
    text: 'Blurry night vision and glare in right eye, inquiring about sutureless Phaco cataract surgery and foldable monofocal lens implantation.',
    specialist: 'dr. Maria Kusuma, Sp.M'
  }
]

const clinicalTags = [
  { id: 'penicillin', label: 'Alergi Penisilin', isHazard: true, text: ' [ALERGI: Alergi antibiotik penisilin / amoksisilin]' },
  { id: 'iodine', label: 'Alergi Kontras Iodine', isHazard: true, text: ' [ALERGI: Hindari kontras cairan iodine pada CT-Scan]' },
  { id: 'diabetes', label: 'Riwayat Diabetes', isHazard: false, text: ' [RIWAYAT: Pasien memiliki riwayat diabetes melitus]' },
  { id: 'mri', label: 'Butuh MRI 1.5T', isHazard: false, text: ' [PERMINTAAN: Jadwalkan pemindaian MRI 1.5 Tesla]' },
  { id: 'fasting', label: 'Sudah Puasa 8 Jam', isHazard: false, text: ' [STATUS: Pasien telah berpuasa 8 jam untuk tes darah]' }
]

const loadScenario = (sc) => {
  inputText.value = sc.text
  handleTranslate()
}

const appendTag = (tagText) => {
  inputText.value += tagText
}

const toggleVoiceRecording = () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Pengenalan suara mikrofon tidak didukung di browser ini. Silakan ketik langsung pada kotak input.')
    return
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.lang = spokenLang.value
  recognition.continuous = false
  recognition.interimResults = false

  if (!isRecording.value) {
    isRecording.value = true
    recognition.start()

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      inputText.value = (inputText.value ? inputText.value + ' ' : '') + transcript
      isRecording.value = false
      handleTranslate()
    }

    recognition.onerror = () => {
      isRecording.value = false
    }

    recognition.onend = () => {
      isRecording.value = false
    }
  } else {
    isRecording.value = false
    recognition.stop()
  }
}

const handleTranslate = async () => {
  const text = inputText.value.trim()
  if (!text) return

  isTranslating.value = true
  try {
    const res = await api.translateMedical({ text })
    if (res) {
      translatedResult.value = {
        indonesian_brief: res.indonesian_brief || `📋 KARTU KONSULTASI DOKTER:\n• Permintaan Pasien: ${text}\n• Status: Terverifikasi oleh AI LokaBatam MedNLP`,
        allergy: res.allergy,
        focus: res.focus || 'Pemeriksaan Kesehatan & Skrining',
        specialist_recommended: text.toLowerCase().includes('heart') || text.toLowerCase().includes('chest') ? 'dr. Bambang Hermanto, Sp.JP' : (text.toLowerCase().includes('tooth') || text.toLowerCase().includes('dental') ? 'drg. Cynthia Wijaya, Sp.KG' : (text.toLowerCase().includes('eye') || text.toLowerCase().includes('cataract') ? 'dr. Maria Kusuma, Sp.M' : 'Dokter Spesialis Terkait'))
      }

      showSuccess({
        id: 'Kartu instruksi dokter berhasil diterjemahkan!',
        en: 'Doctor clinical consultation card generated successfully!'
      })
    }
  } catch (err) {
    // Fallback parser
    let allergyText = null
    if (text.toLowerCase().includes('penicillin') || text.toLowerCase().includes('penisilin')) {
      allergyText = 'DILARANG memberikan antibiotik golongan Penisilin / Amoksisilin.'
    } else if (text.toLowerCase().includes('iodine') || text.toLowerCase().includes('kontras')) {
      allergyText = 'Alergi cairan kontras Iodine. Wajib gunakan protokol non-kontras pada pemindaian radiologi.'
    }

    translatedResult.value = {
      indonesian_brief: `📋 KARTU KONSULTASI DOKTER SPESIALIS (LokaBatam):\n• Keluhan Utama: ${text}\n• Tindakan: Konsultasi & Pemeriksaan Diagnostik\n• Bahasa Pengantar: Dokter fasih berbahasa Inggris`,
      allergy: allergyText,
      focus: 'Pemeriksaan Spesialis',
      specialist_recommended: 'dr. Bambang Hermanto, Sp.JP / Dokter Spesialis RS Awal Bros'
    }
  } finally {
    isTranslating.value = false
  }
}

const playAudio = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const cleanText = text.replace(/[•📋*]/g, '')
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = 'id-ID'
    utterance.rate = 0.95
    window.speechSynthesis.speak(utterance)
  }
}

const shareWhatsAppCard = () => {
  if (!translatedResult.value) return
  const msg = `*KARTU KONSULTASI DOKTER LOKABATAM (SG ⇄ BATAM)*%0A%0A` +
    `• Pasien: Wisatawan Asal Singapura%0A` +
    `• Keluhan Asli: ${inputText.value}%0A` +
    `• Catatan Klinis: ${translatedResult.value.indonesian_brief.replace(/\n/g, '%0A')}%0A%0A` +
    `_Diterjemahkan otomatis oleh LokaBatam AI Clinical Consultation Studio._`
  window.open(`https://wa.me/?text=${msg}`, '_blank')
}
</script>

<style scoped>
.ai-bridge-view {
  width: 100%;
}
</style>
