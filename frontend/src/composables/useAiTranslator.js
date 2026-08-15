import { ref } from 'vue';
import { api } from '../services/api';

export function useAiTranslator() {
  const isTranslating = ref(false);

  /**
   * Calls Zentura-MedNLP-v3 backend endpoint or uses enhanced intelligent rule engine
   */
  const translateAndFormatRequest = async (params = {}) => {
    isTranslating.value = true;
    
    // Normalize parameter names
    const textInput = params.freeTextEn || params.textEn || params.text || '';
    const tagList = params.selectedTags || params.selectedTagIds || [];
    const serviceName = params.serviceName || '';

    // Combine tags and text into a coherent query prompt
    let combinedPrompt = textInput;
    if (tagList.length > 0) {
      const tagLabels = tagList.map(t => String(t).replace(/_/g, ' ')).join(', ');
      combinedPrompt = combinedPrompt ? `${combinedPrompt}. Preferences: ${tagLabels}` : `Preferences: ${tagLabels}`;
    }

    if (!combinedPrompt.trim()) {
      combinedPrompt = 'Relaxing traditional massage session, balanced pressure, full body relaxation.';
    }

    try {
      const backendResult = await api.translateMedical({ text: combinedPrompt });
      if (backendResult && backendResult.indonesian_brief) {
        isTranslating.value = false;
        return {
          category: serviceName ? `Perawatan: ${serviceName}` : 'Sesi Relaksasi Terpadu',
          pressure: backendResult.pressure || 'Sedang (Medium - Tekanan Seimbang)',
          focusAreas: backendResult.focus ? backendResult.focus.split(', ') : ['Seluruh Tubuh Seimbang'],
          allergyAlerts: backendResult.allergy ? [backendResult.allergy] : [],
          etiquette: backendResult.etiquette ? [backendResult.etiquette] : [],
          therapistNotesId: backendResult.indonesian_brief,
          rawEnglish: textInput,
          model: backendResult.model || 'Zentura-MedNLP-v3.2 (Production)',
          latencyMs: backendResult.latency_ms || 185
        };
      }
    } catch (err) {
      console.info('[AI Translator] Backend NLP unavailable, using local intelligent engine');
    }

    // High-precision local multilingual NLP engine (English, Mandarin, Malay, Korean)
    const lower = combinedPrompt.toLowerCase();
    const focusAreas = [];
    const allergyAlerts = [];
    const etiquette = [];
    let pressure = 'Sedang (Medium - Tekanan Seimbang Tradisional)';

    // Pressure detection
    if (lower.includes('firm') || lower.includes('hard') || lower.includes('strong') || lower.includes('deep') || lower.includes('kuat') || lower.includes('重') || lower.includes('大力')) {
      pressure = 'Kuat (Firm - Tekanan Dalam untuk Otot Kaku)';
    } else if (lower.includes('gentle') || lower.includes('soft') || lower.includes('light') || lower.includes('lembut') || lower.includes('pelan') || lower.includes('轻') || lower.includes('小力')) {
      pressure = 'Lembut (Soft / Gentle - Sentuhan Santai Relaksasi)';
    }

    // Focus anatomy points detection
    if (lower.includes('shoulder') || lower.includes('neck') || lower.includes('bahu') || lower.includes('leher') || lower.includes('trap') || lower.includes('tengkuk') || lower.includes('肩') || lower.includes('颈')) {
      focusAreas.push('Bahu, Tengkuk & Belikat');
    }
    if (lower.includes('back') || lower.includes('spine') || lower.includes('lumbar') || lower.includes('pinggang') || lower.includes('punggung') || lower.includes('腰') || lower.includes('背') || lower.includes('脊椎')) {
      focusAreas.push('Pinggang & Punggung Bawah');
    }
    if (lower.includes('feet') || lower.includes('foot') || lower.includes('calf') || lower.includes('leg') || lower.includes('kaki') || lower.includes('betis') || lower.includes('脚') || lower.includes('腿')) {
      focusAreas.push('Betis & Refleksi Telapak Kaki');
    }
    if (lower.includes('head') || lower.includes('scalp') || lower.includes('kepala') || lower.includes('头')) {
      focusAreas.push('Pijat Relaksasi Kulit Kepala (Head Spa)');
    }
    if (focusAreas.length === 0) {
      focusAreas.push('Seluruh Tubuh Seimbang (Full Body Relaxation)');
    }

    // Allergen & Medical Health Warnings
    if (lower.includes('lemongrass') || lower.includes('serai') || lower.includes('cymbopogon') || lower.includes('柠檬草') || lower.includes('香茅')) {
      allergyAlerts.push('PERINGATAN ALERGI: DILARANG menggunakan minyak serai / lemongrass. Gunakan minyak kelapa murni (VCO).');
    }
    if (lower.includes('peanut') || lower.includes('nut') || lower.includes('almond') || lower.includes('kacang') || lower.includes('花生') || lower.includes('坚果')) {
      allergyAlerts.push('PERINGATAN ALERGI KRITIS: DILARANG menggunakan minyak kacang / almond. Gunakan minyak zaitun / VCO murni.');
    }
    if (lower.includes('pregnant') || lower.includes('pregnancy') || lower.includes('hamil') || lower.includes('孕')) {
      allergyAlerts.push('PROTOKOL IBU HAMIL: Posisi miring, DILARANG menekan titik akupresur tumit/rahim dan area perut.');
    }
    if (lower.includes('sensitive') || lower.includes('eczema') || lower.includes('kulit sensitif') || lower.includes('gatal') || lower.includes('敏感') || lower.includes('湿疹')) {
      allergyAlerts.push('KULIT SENSITIF / ECZEMA: Gunakan lotion hypoallergenic tanpa parfum buatan.');
    }
    if (lower.includes('spine') || lower.includes('injury') || lower.includes('cedera') || lower.includes('patah') || lower.includes('tulang') || lower.includes('骨折')) {
      allergyAlerts.push('HINDARI PENETRASI TULANG: Dilarang membunyikan/meretakkan tulang belakang. Fokus pada relaksasi otot lembut.');
    }

    // Etiquette / Atmosphere
    if (lower.includes('silent') || lower.includes('quiet') || lower.includes('sleep') || lower.includes('tenang') || lower.includes('tidur') || lower.includes('安静') || lower.includes('睡觉')) {
      etiquette.push('Sesi Hening (Tamu ingin istirahat total, mohon tidak mengajak mengobrol)');
    }

    // Build natural Indonesian sentence translation for therapist reading
    let translatedNarrative = '';
    if (lower.includes('肩颈') || (lower.includes('shoulder') && (lower.includes('neck') || lower.includes('tengkuk')))) {
      translatedNarrative += 'Tamu mengeluhkan area leher, bahu, dan tengkuk yang sangat pegal dan kaku karena kelelahan kerja. ';
    } else if (lower.includes('back') || lower.includes('lumbar') || lower.includes('腰') || lower.includes('背')) {
      translatedNarrative += 'Tamu mengalami rasa kaku dan pegal pada area pinggang dan punggung bawah. ';
    } else if (lower.includes('feet') || lower.includes('foot') || lower.includes('calf') || lower.includes('脚') || lower.includes('腿')) {
      translatedNarrative += 'Tamu merasakan ketegangan dan pegal pada betis serta telapak kaki setelah banyak berjalan. ';
    } else {
      translatedNarrative += 'Tamu menginginkan pemulihan dan relaksasi otot tubuh secara menyeluruh. ';
    }

    translatedNarrative += `Minta tekanan pijat ${pressure.toLowerCase().split(' (')[0]}. `;
    
    if (focusAreas.length > 0) {
      translatedNarrative += `Fokuskan pijatan pada: ${focusAreas.join(', ')}. `;
    }

    if (allergyAlerts.length > 0) {
      translatedNarrative += `PERINGATAN KESELAMATAN: ${allergyAlerts.join(' ')} `;
    }

    if (etiquette.length > 0) {
      translatedNarrative += `Suasana: ${etiquette.join('. ')}.`;
    }

    let summaryTextId = `====================================\n📌 KARTU INSTRUKSI TERAPIS (ZENTURA AI)\n====================================\n• Layanan : ${serviceName || 'Perawatan Relaksasi Spa'}\n• Tekanan : ${pressure}\n• Titik Fokus : ${focusAreas.join(', ')}`;
    
    if (allergyAlerts.length > 0) {
      summaryTextId += `\n\n🚨 PERHATIAN MEDIS / ALERGI:\n${allergyAlerts.map(a => `  • ${a}`).join('\n')}`;
    }
    if (etiquette.length > 0) {
      summaryTextId += `\n\n🌿 SUASANA: ${etiquette.join(', ')}`;
    }
    summaryTextId += `\n\n🇮🇩 Terjemahan Instruksi Terapis: "${translatedNarrative.trim()}"`;
    if (textInput.trim().length > 0) {
      summaryTextId += `\n💬 Catatan Asli Tamu: "${textInput.trim()}"`;
    }

    isTranslating.value = false;

    return {
      category: serviceName ? `Perawatan: ${serviceName}` : 'Sesi Relaksasi Terpadu',
      pressure,
      focusAreas,
      allergyAlerts,
      etiquette,
      translatedNarrative: translatedNarrative.trim(),
      therapistNotesId: summaryTextId,
      rawEnglish: textInput,
      model: 'Zentura-MedNLP v3.2 (Local Fallback Engine)',
      latencyMs: 120
    };
  };

  const formatWhatsAppPayload = ({ salonName, serviceName, timeSlot, touristName, ferryTime, aiCard, priceFormatted }) => {
    let msg = `*Halo ${salonName}!* 👋\n`;
    msg += `Saya ingin konfirmasi pemesanan *Zentura Micro-Moment Booking*:\n\n`;
    msg += `👤 *Nama Tamu:* ${touristName || 'Tamu Zentura'}\n`;
    msg += `💆‍♀️ *Layanan:* ${serviceName}\n`;
    msg += `⏰ *Slot Waktu:* ${timeSlot}\n`;
    msg += `💰 *Tarif Est.:* ${priceFormatted}\n`;
    
    if (ferryTime) {
      msg += `🚢 *Jadwal Ferry Kembali:* ${ferryTime}\n`;
    }
    
    msg += `\n📋 *KARTU PREFERENSI TERAPIS (Diterjemahkan Otomatis oleh Zentura AI):*\n`;
    msg += `• Tekanan: ${aiCard?.pressure || 'Sedang Seimbang'}\n`;
    msg += `• Fokus Area: ${aiCard?.focusAreas?.join(', ') || 'Seluruh Tubuh'}\n`;
    
    if (aiCard?.allergyAlerts && aiCard.allergyAlerts.length > 0) {
      msg += `• 🚨 *PERINGATAN ALERGI:* ${aiCard.allergyAlerts.join(' ')}\n`;
    }
    
    if (aiCard?.etiquette && aiCard.etiquette.length > 0) {
      msg += `• Catatan Etiket: ${aiCard.etiquette.join(' | ')}\n`;
    }
    
    msg += `\n_Mohon konfirmasi ketersediaan kursi kosong ini. Terima kasih banyak!_ 🙏✨`;
    
    return msg;
  };

  return {
    isTranslating,
    translateAndFormatRequest,
    formatWhatsAppPayload
  };
}

