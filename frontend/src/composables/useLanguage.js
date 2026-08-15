import { ref, computed } from 'vue';

// Active language: 'en' | 'id'
const currentLang = ref(localStorage.getItem('lokabatam_lang') || 'en');

export const translations = {
  en: {
    // Top Bar (Standard Navbar)
    nav_home: 'Home',
    nav_about: 'About',
    nav_solutions: 'Solutions',
    nav_simulator: 'Live Simulator',
    nav_impact: 'Impact',
    nav_signin: 'Sign In',
    nav_dashboard: 'Dashboard',
    user_status_live: 'Live Platform Mode',
    switch_lang_label: 'Language',

    // Hero Section
    hero_badge: 'Singapore ⇄ Batam Cross-Border Super-App',
    hero_title_1: 'Cross-Border Medical, Cafe & Resort Travel Guide for',
    hero_title_2: 'Batam & Singapore',
    hero_desc: 'Compare premier hospitals, specialist clinics, beaches, viral cafes, and championship golf courses in both countries with clear SGD/IDR rates. Featuring real-time ferry schedules, PostGIS spatial map, and AI medical translation.',
    btn_launch_admin: 'Explore Platform →',
    btn_launch_merchant: 'Partner Hub',
    btn_launch_tourist: 'Discover Batam',
    trust_corridors: '49 Destinations',
    trust_settlement: 'SGD ⇄ IDR Converter',
    trust_ai: 'AI Medical & Audio NLP',
    trust_sanitation: 'Ferry Schedule & Map',

    // Problem Solution
    prob_badge: 'Batam – Singapore Case Study',
    prob_title: 'The Cross-Border Micro-Transit Friction',
    prob_desc: 'Every weekend, over 65,000 travelers cross between Singapore and Batam via high-speed ferries. LokaBatam solves the 3 core frictions separating tourists from local destinations & healthcare.',
    prob_tag_red: 'THE UNADDRESSED FRICTION',
    prob_heading_red: 'Traditional Cross-Border Barriers',
    prob_p1_title: 'The 45–90 Min Ferry Window Waste:',
    prob_p1_desc: 'Tourists arrive early at ferry terminals (Harbour Bay / Batam Centre) with dead time, while neighboring local hospitals, clinics, and cafes sit unutilized.',
    prob_p2_title: 'Medical & Language Miscommunication:',
    prob_p2_desc: 'Singaporean tourists cannot communicate medical symptoms or allergies to local practitioners who only speak Bahasa Indonesia.',
    prob_p3_title: 'Cross-Border Payment & Price Uncertainty:',
    prob_p3_desc: 'Currency exchange friction (SGD/IDR cash shortages) combined with hidden price markups prevents spontaneous visits.',
    
    sol_tag_blue: 'LOKABATAM CROSS-BORDER INNOVATION',
    sol_heading_blue: 'The Unified AI-Powered Super-App Solution',
    sol_p1_title: '49 Dual-Country Catalog & Savings Badge:',
    sol_p1_desc: 'Compare premier hospitals, dental clinics, cafes, and golf courses with up to 72% cost savings against Singapore rates.',
    sol_p2_title: 'AI Medical Translation & Audio Voice Engine:',
    sol_p2_desc: 'NLP engine transforms tourist inputs (English, Mandarin, Korean) into structured, polite Indonesian doctor/therapist cards with allergy alerts and audio pronunciation.',
    sol_p3_title: 'Direct PayNow SG to BI-FAST IDR Settlement:',
    sol_p3_desc: 'Tourists pay seamlessly in SGD, while local Batam partners receive automated bank settlements in Rupiah.',

    // Simulator
    sim_badge: 'Live Interactive Simulator',
    sim_title: 'Test the Innovation Engines in Real-Time',
    sim_desc: 'Experience how LokaBatam transforms regional transit friction into instant economic value.',
    sim_tab_ai: '1. AI Medical Translation',
    sim_tab_matcher: '2. Dynamic Gap Matcher',
    sim_tab_fx: '3. PayNow to BI-FAST FX',

    // Role Showcase
    role_badge: 'Ecosystem Architecture',
    role_title: 'Integrated Multi-Stakeholder Infrastructure',
    role_desc: 'A unified cross-border platform connecting platform administrators, local spa partners, and regional maritime travelers.',
    role_p1_title: 'Super Admin Console',
    role_p1_sub: 'Platform Headquarters & Governance',
    role_p2_title: 'Merchant Partner Hub',
    role_p2_sub: 'Batam & Regional Spa Operations',
    role_p3_title: 'Tourist Concierge',
    role_p3_sub: 'Singapore & Maritime Travelers',
    role_btn_admin: 'Sign In to Admin HQ →',
    role_btn_merchant: 'Sign In to Merchant Hub →',
    role_btn_tourist: 'Sign In as Traveler →',

    // Regional Impact
    impact_badge: 'Cross-Border Economic Velocity',
    impact_title: 'Empowering Regional MSMEs & Elevating Tourist Experience',
    impact_desc: 'LokaBatam creates tangible economic value across the Singapore–Batam maritime corridor by connecting high-spending cross-border travelers with vetted, high-quality Indonesian wellness centers.',

    // Auth & Login (Standardized Clean Form)
    auth_title: 'Sign In to Your Account',
    auth_sub: 'Enter your credentials to access your dedicated workspace and features.',
    auth_email_label: 'Email Address',
    auth_pwd_label: 'Password',
    auth_remember: 'Remember me on this device',
    auth_signin_btn: 'Sign In →',
    auth_demo_hint: 'Demo credentials:',

    // Common
    loading: 'Authenticating...',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    confirmed: 'Confirmed',
    pending: 'Pending',
    active: 'Active'
  },
  id: {
    // Top Bar (Standard Navbar)
    nav_home: 'Beranda',
    nav_about: 'Tentang',
    nav_solutions: 'Solusi',
    nav_simulator: 'Simulator Live',
    nav_impact: 'Dampak',
    nav_signin: 'Masuk Akun',
    nav_dashboard: 'Dashboard',
    user_status_live: 'Mode Platform Aktif',
    switch_lang_label: 'Bahasa',

    // Hero Section
    hero_badge: 'Aplikasi Super Lintas Batas Singapura ⇄ Batam',
    hero_title_1: 'Panduan Wisata Medis, Kafe & Resort Lintas Batas',
    hero_title_2: 'Batam & Singapura',
    hero_desc: 'Bandingkan rumah sakit terkemuka, klinik spesialis, pantai, kafe viral, dan lapangan golf kejuaraan di kedua negara dengan kurs SGD/IDR yang transparan. Dilengkapi jadwal feri real-time, peta interaktif PostGIS, dan penerjemah medis AI.',
    btn_launch_admin: 'Jelajahi Platform →',
    btn_launch_merchant: 'Portal Mitra',
    btn_launch_tourist: 'Jelajahi Batam',
    trust_corridors: '49 Destinasi',
    trust_settlement: 'Konversi SGD ⇄ IDR',
    trust_ai: 'NLP Medis & Audio Suara',
    trust_sanitation: 'Jadwal Feri & Peta',

    // Problem Solution
    prob_badge: 'Studi Kasus Inovasi Batam – Singapura',
    prob_title: 'Friksi Transit Waktu Singkat Lintas Batas',
    prob_desc: 'Setiap akhir pekan, lebih dari 65.000 wisatawan melintasi Singapura dan Batam menggunakan feri cepat. LokaBatam menyelesaikan 3 hambatan utama antara turis dan fasilitas lokal.',
    prob_tag_red: 'HAMBATAN UTAMA',
    prob_heading_red: 'Tantangan Tradisional Lintas Batas',
    prob_p1_title: 'Waktu Mati Transit 45–90 Menit:',
    prob_p1_desc: 'Wisatawan tiba lebih awal di terminal feri (Harbour Bay / Batam Centre) dengan waktu luang terbuang, sementara fasilitas rumah sakit, klinik, dan kafe di sekitarnya tidak termanfaatkan.',
    prob_p2_title: 'Miskomunikasi Bahasa & Riwayat Medis:',
    prob_p2_desc: 'Turis asal Singapura sulit menyampaikan gejala keluhan atau alergi kepada praktisi lokal yang hanya berbahasa Indonesia.',
    prob_p3_title: 'Kendala Pembayaran & Ketidakpastian Harga:',
    prob_p3_desc: 'Kerumitan penukaran valas (kekurangan uang tunai SGD/IDR) serta kekhawatiran kenaikan harga turis menghalangi kunjungan spontan.',
    
    sol_tag_blue: 'INOVASI LINTAS BATAS LOKABATAM',
    sol_heading_blue: 'Solusi Cerdas Berbasis AI & Super-App',
    sol_p1_title: 'Katalog 49 Destinasi 2 Negara & Badge Hemat:',
    sol_p1_desc: 'Membandingkan rumah sakit, klinik gigi, kafe, dan lapangan golf dengan penghematan biaya hingga 72% dibanding tarif di Singapura.',
    sol_p2_title: 'Jembatan Penerjemah Medis AI & Audio Suara:',
    sol_p2_desc: 'Mesin NLP mengubah instruksi turis (Inggris, Mandarin, Korea) menjadi kartu instruksi dokter/terapis bahasa Indonesia yang sopan disertai peringatan alergi dan suara audio.',
    sol_p3_title: 'Settlement Langsung PayNow SG ke BI-FAST IDR:',
    sol_p3_desc: 'Turis membayar dengan SGD, sementara mitra lokal menerima transfer otomatis Rupiah ke rekening bank lokal.',

    // Simulator
    sim_badge: 'Simulator Interaktif Langsung',
    sim_title: 'Uji Coba Mesin Inovasi Secara Real-Time',
    sim_desc: 'Rasakan langsung bagaimana LokaBatam mengubah waktu tunggu transit menjadi nilai ekonomi nyata.',
    sim_tab_ai: '1. Penerjemah Medis AI',
    sim_tab_matcher: '2. Dynamic Gap Matcher',
    sim_tab_fx: '3. Valas PayNow ke BI-FAST',

    // Role Showcase
    role_badge: 'Arsitektur Ekosistem',
    role_title: 'Infrastruktur Terintegrasi Lintas Pemangku Kepentingan',
    role_desc: 'Platform lintas batas terpadu yang menghubungkan administrator platform, mitra spa lokal, dan wisatawan maritim regional.',
    role_p1_title: 'Konsol Super Admin',
    role_p1_sub: 'Pusat Kendali & Tata Kelola Platform',
    role_p2_title: 'Hub Mitra Spa',
    role_p2_sub: 'Operasional Spa Batam & Regional',
    role_p3_title: 'Layanan Tamu Turis',
    role_p3_sub: 'Wisatawan Singapura & Maritim',
    role_btn_admin: 'Masuk sebagai Super Admin →',
    role_btn_merchant: 'Masuk sebagai Mitra Spa →',
    role_btn_tourist: 'Masuk sebagai Turis →',

    // Regional Impact
    impact_badge: 'Akselerasi Ekonomi Lintas Batas',
    impact_title: 'Memberdayakan UMKM Regional & Meningkatkan Pengalaman Wisatawan',
    impact_desc: 'LokaBatam menciptakan nilai ekonomi nyata di koridor maritim Singapura–Batam dengan menghubungkan wisatawan berdaya beli tinggi ke pusat kebugaran Indonesia yang terverifikasi berkualitas tinggi.',

    // Auth & Login (Standardized Clean Form)
    auth_title: 'Masuk ke Akun Anda',
    auth_sub: 'Masukkan alamat email dan kata sandi Anda untuk mengakses workspace dan fitur akun.',
    auth_email_label: 'Alamat Email',
    auth_pwd_label: 'Kata Sandi',
    auth_remember: 'Ingat saya di perangkat ini',
    auth_signin_btn: 'Masuk Akun →',
    auth_demo_hint: 'Kredensial demo:',

    // Common
    loading: 'Mengautentikasi...',
    save: 'Simpan',
    cancel: 'Batal',
    close: 'Tutup',
    confirmed: 'Terkonfirmasi',
    pending: 'Menunggu Konfirmasi',
    active: 'Aktif'
  }
};

export function useLanguage() {
  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'id') {
      currentLang.value = lang;
      localStorage.setItem('lokabatam_lang', lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = currentLang.value === 'en' ? 'id' : 'en';
    setLanguage(nextLang);
  };

  const t = (key) => {
    if (!key) return '';
    const lang = currentLang?.value || 'en';
    const langObj = translations[lang] || translations.en || {};
    return langObj[key] || (translations.en && translations.en[key]) || key;
  };

  const isIndonesian = computed(() => (currentLang?.value || 'en') === 'id');

  return {
    currentLang,
    isIndonesian,
    setLanguage,
    toggleLanguage,
    t
  };
}
