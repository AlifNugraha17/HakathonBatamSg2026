import { ref } from 'vue';

export function useAiTranslator() {
  const isTranslating = ref(false);

  /**
   * Simulates Hugging Face NLP model inference for localized spa/therapist instructions
   */
  const translateAndFormatRequest = async ({ freeTextEn, selectedTags = [], serviceName = '' }) => {
    isTranslating.value = true;
    
    // Simulate lightweight model latency (350ms)
    await new Promise((resolve) => setTimeout(resolve, 350));

    const lowerText = (freeTextEn || '').toLowerCase();
    
    const focusAreas = [];
    const allergyAlerts = [];
    const etiquette = [];
    let pressure = 'Sedang (Medium - Tekanan Seimbang Tradisional)';

    // 1. Analyze Pressure
    if (selectedTags.includes('firm_pressure') || lowerText.includes('firm') || lowerText.includes('hard') || lowerText.includes('strong') || lowerText.includes('deep')) {
      pressure = 'Kuat (Firm - Tekanan Dalam untuk Otot Kaku)';
    } else if (selectedTags.includes('gentle_pressure') || lowerText.includes('gentle') || lowerText.includes('soft') || lowerText.includes('light')) {
      pressure = 'Lembut (Soft / Gentle - Sentuhan Santai)';
    }

    // 2. Analyze Focus Areas
    if (selectedTags.includes('lower_back') || lowerText.includes('back') || lowerText.includes('spine') || lowerText.includes('lumbar')) {
      focusAreas.push('Pinggang & Punggung Bawah');
    }
    if (selectedTags.includes('shoulder_knots') || lowerText.includes('shoulder') || lowerText.includes('neck') || lowerText.includes('trap')) {
      focusAreas.push('Bahu, Tengkuk & Belikat');
    }
    if (selectedTags.includes('tired_feet') || lowerText.includes('feet') || lowerText.includes('foot') || lowerText.includes('calf') || lowerText.includes('leg')) {
      focusAreas.push('Betis & Telapak Kaki');
    }

    if (focusAreas.length === 0) {
      focusAreas.push('Seluruh Tubuh Seimbang (Full Body Relaxation)');
    }

    // 3. Analyze Allergies & Medical Hazards
    if (selectedTags.includes('no_lemongrass') || lowerText.includes('lemongrass') || lowerText.includes('serai') || lowerText.includes('citronella')) {
      allergyAlerts.push('PERINGATAN ALERGI: DILARANG menggunakan minyak serai / lemongrass. Gunakan minyak kelapa murni (VCO).');
    }
    if (selectedTags.includes('sensitive_skin') || lowerText.includes('sensitive') || lowerText.includes('eczema') || lowerText.includes('rash')) {
      allergyAlerts.push('KULIT SENSITIF / ECZEMA: Gunakan produk hypoallergenic tanpa pewangi buatan.');
    }
    if (selectedTags.includes('no_eucalyptus') || lowerText.includes('eucalyptus') || lowerText.includes('menthol') || lowerText.includes('balm') || lowerText.includes('kayu putih')) {
      allergyAlerts.push('HINDARI BALSAM PANAS: Jangan oleskan minyak kayu putih atau balsam menthol menyengat.');
    }

    // 4. Analyze Etiquette & Communication
    if (selectedTags.includes('silent_session') || lowerText.includes('quiet') || lowerText.includes('sleep') || lowerText.includes('silent') || lowerText.includes('nap')) {
      etiquette.push('Sesi Hening (Tamu ingin istirahat total, mohon tidak mengajak mengobrol selain konfirmasi kenyamanan).');
    }
    if (selectedTags.includes('female_preferred') || lowerText.includes('female')) {
      etiquette.push('Preferensi Terapis: Wanita.');
    }
    if (selectedTags.includes('skip_head') || lowerText.includes('hair') || lowerText.includes('head')) {
      etiquette.push('Jangan mengacak atau memijat area rambut/kepala.');
    }

    // Generate polite Indonesian therapist instruction summary
    let summaryTextId = `Catatan Terapis Zentura AI:\n• Layanan: ${serviceName || 'Perawatan Relaksasi'}\n• Tingkat Tekanan: ${pressure}\n• Titik Fokus Utama: ${focusAreas.join(', ')}`;
    
    if (allergyAlerts.length > 0) {
      summaryTextId += `\n• ⚠️ PERHATIAN KHUSUS: ${allergyAlerts.join(' | ')}`;
    }
    if (etiquette.length > 0) {
      summaryTextId += `\n• Suasana & Etiket: ${etiquette.join('; ')}`;
    }
    if (freeTextEn && freeTextEn.trim().length > 0) {
      summaryTextId += `\n• Catatan Tambahan Tamu: "${freeTextEn.trim()}"`;
    }

    isTranslating.value = false;

    return {
      category: serviceName ? `Perawatan: ${serviceName}` : 'Sesi Relaksasi Terpadu',
      pressure,
      focusAreas,
      allergyAlerts,
      etiquette,
      therapistNotesId: summaryTextId,
      rawEnglish: freeTextEn
    };
  };

  /**
   * Formats WhatsApp message payload for 1-click booking
   */
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
