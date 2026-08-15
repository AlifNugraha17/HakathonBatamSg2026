<template>
  <div class="merchant-ai-cards-view animate-fade-in space-y-6">
    
    <!-- Top Header -->
    <div class="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-emerald-700/40">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 font-mono">
        <span>🤖</span>
        <span>AI Cross-Border Clinical Brief Decoder</span>
      </div>
      <h3 class="text-xl sm:text-2xl font-black text-white font-display">
        Kartu Instruksi Medis & Keluhan Wisatawan (AI Translated)
      </h3>
      <p class="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl">
        Terjemahan otomatis keluhan medis, preferensi tekanan pijat, dan riwayat alergi pasien/wisatawan Singapura yang telah diselaraskan oleh AI ke dalam standar bahasa Indonesia.
      </p>
    </div>

    <!-- Live Briefs Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <!-- Card 1 -->
      <div class="bg-white p-5 rounded-3xl border-2 border-emerald-100 shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
            <div>
              <span class="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-black font-mono">ZEN-SG-8812</span>
              <h4 class="text-sm font-black text-slate-900 mt-1">Alexandre Tan (Singapore)</h4>
            </div>
            <span class="px-2 py-1 rounded-full bg-red-100 text-red-800 text-[11px] font-black flex items-center gap-1">
              <span>⚠️</span>
              <span>Alergi Kacang</span>
            </span>
          </div>

          <div class="space-y-2.5 text-xs">
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span class="text-[10px] font-black text-slate-500 uppercase block">Input Asli Wisatawan (English):</span>
              <p class="text-slate-800 italic font-medium">"Chronic neck and shoulder stiffness from desk work. Please avoid peanut massage oil due to skin allergy, prefer firm pressure."</p>
            </div>

            <div class="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200 text-slate-800 space-y-1">
              <span class="text-[10px] font-black text-emerald-800 uppercase block">📋 Instruksi Terapis / Dokter (AI Verified):</span>
              <p>• <strong>Area Fokus:</strong> Leher, Pundak, & Belikat Atas</p>
              <p>• <strong>Tingkat Tekanan:</strong> Kuat (Deep Tissue / Firm)</p>
              <p class="text-red-700 font-black">• 🚨 Wajib: Hindari minyak kacang! Gunakan Virgin Coconut Oil (VCO) murni.</p>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] text-slate-500 font-medium">Terapis: <strong>Ibu Ratna (VIP 1)</strong></span>
          <button 
            @click="playInstructionAudio('Alexandre Tan: Pegal leher dan pundak. Tekanan kuat. Peringatan: Gunakan minyak kelapa murni, hindari minyak kacang.')"
            class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🔊</span>
            <span>Dengarkan Suara</span>
          </button>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-md hover:border-teal-400 transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
            <div>
              <span class="px-2.5 py-0.5 rounded-lg bg-sky-100 text-sky-800 text-[11px] font-black font-mono">ZEN-SG-8813</span>
              <h4 class="text-sm font-black text-slate-900 mt-1">Grace Lim (Singapore)</h4>
            </div>
            <span class="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-[11px] font-black">
              🚢 17:45 Ferry Express
            </span>
          </div>

          <div class="space-y-2.5 text-xs">
            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span class="text-[10px] font-black text-slate-500 uppercase block">Input Asli Wisatawan (Mandarin):</span>
              <p class="text-slate-800 italic font-medium">"走路逛街很久，小腿和脚底很酸痛，需要快速放松，赶下午5点45分的船。"</p>
            </div>

            <div class="bg-teal-50/80 p-3.5 rounded-2xl border border-teal-200 text-slate-800 space-y-1">
              <span class="text-[10px] font-black text-teal-800 uppercase block">📋 Instruksi Terapis (AI Verified):</span>
              <p>• <strong>Area Fokus:</strong> Telapak Kaki, Tumit & Otot Betis</p>
              <p>• <strong>Tingkat Tekanan:</strong> Sedang (Refleksi Relaksasi Cepat)</p>
              <p>• <strong>Waktu Selesai Wajib:</strong> Maksimal 16:15 WIB (Beri waktu 90 menit sebelum boarding feri).</p>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] text-slate-500 font-medium">Terapis: <strong>Mas Budi (Kursi 3)</strong></span>
          <button 
            @click="playInstructionAudio('Grace Lim: Pegal telapak kaki dan betis. Tekanan sedang. Selesai tepat waktu sebelum feri jam 17:45.')"
            class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🔊</span>
            <span>Dengarkan Suara</span>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
const playInstructionAudio = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    utterance.rate = 0.95
    window.speechSynthesis.speak(utterance)
  } else {
    alert(text)
  }
}
</script>

<style scoped>
.merchant-ai-cards-view {
  width: 100%;
}
</style>
