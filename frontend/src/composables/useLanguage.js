import { ref, computed } from 'vue';

// Active language: 'en' | 'id'
const currentLang = ref(localStorage.getItem('zentura_lang') || 'en');

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
    hero_badge: 'Singapore – Batam Maritime Corridor Wellness Network',
    hero_title_1: 'AI-Powered Cross-Border Wellness & Dynamic Yield Platform for',
    hero_title_2: 'Maritime Tourism Corridors',
    hero_desc: 'Connecting Singapore maritime ferry travelers with vetted Batam wellness centers. Features real-time AI medical translation, dynamic vacant chair matching, and automated PayNow-to-BI-FAST currency settlements.',
    btn_launch_admin: 'Explore Platform →',
    btn_launch_merchant: 'Partner With Us',
    btn_launch_tourist: 'Discover Spas',
    trust_corridors: 'Ferry Corridors',
    trust_settlement: 'Cross-Border Settlement',
    trust_ai: 'Medical Safety NLP',
    trust_sanitation: 'Sanitation Benchmark',

    // Problem Solution
    prob_badge: 'Batam – Singapore Case Study',
    prob_title: 'The Cross-Border Micro-Transit Friction',
    prob_desc: 'Every weekend, over 65,000 travelers cross between Singapore and Batam via high-speed ferries. Zentura solves the 3 core frictions separating tourists from local wellness MSMEs.',
    prob_tag_red: 'THE UNADDRESSED FRICTION',
    prob_heading_red: 'Traditional Cross-Border Barriers',
    prob_p1_title: 'The 45–90 Min Ferry Window Waste:',
    prob_p1_desc: 'Tourists arrive early at ferry terminals (Harbour Bay / Batam Centre) with dead time, while neighboring local spas sit with empty massage chairs.',
    prob_p2_title: 'Medical & Language Miscommunication:',
    prob_p2_desc: 'Singaporean tourists cannot communicate pressure points or allergies (peanut oil, eczema) to local therapists who only speak Bahasa Indonesia.',
    prob_p3_title: 'Cross-Border Payment & Trust Gaps:',
    prob_p3_desc: 'Currency exchange friction (SGD/IDR cash shortages) combined with hygiene uncertainty prevents spontaneous walk-in bookings.',
    
    sol_tag_blue: 'ZENTURA CROSS-BORDER INNOVATION',
    sol_heading_blue: 'The AI-Powered Cross-Border Solution',
    sol_p1_title: 'Dynamic Flash Gap Matcher:',
    sol_p1_desc: 'Pairs real-time ferry departures with vacant chairs at dynamic promotional rates, increasing local MSME chair occupancy by up to 84%.',
    sol_p2_title: 'AI Medical Translation Bridge:',
    sol_p2_desc: 'NLP engine transforms tourist inputs (English, Mandarin, Korean) into structured, polite Indonesian therapist cards with allergy alerts.',
    sol_p3_title: 'Direct PayNow SG to BI-FAST IDR Settlement:',
    sol_p3_desc: 'Tourists pay in SGD, while local spa partners receive automated bank settlements in Rupiah with certified 95+ hygiene ratings.',

    // Simulator
    sim_badge: 'Live Interactive Simulator',
    sim_title: 'Test the Innovation Engines in Real-Time',
    sim_desc: 'Experience how Zentura transforms regional transit friction into instant economic value.',
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
    impact_desc: 'Zentura creates tangible economic value across the Singapore–Batam maritime corridor by connecting high-spending cross-border travelers with vetted, high-quality Indonesian wellness centers.',

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
    hero_badge: 'Jaringan Kebugaran Koridor Maritim Singapura – Batam',
    hero_title_1: 'Platform Kebugaran Lintas Batas & Dynamic Yield Berbasis AI untuk',
    hero_title_2: 'Koridor Pariwisata Maritim',
    hero_desc: 'Menghubungkan wisatawan kapal feri Singapura dengan pusat spa terverifikasi di Batam. Dilengkapi penerjemah medis AI real-time, pencocokan kursi kosong dinamis, dan penyelesaian pembayaran otomatis PayNow ke BI-FAST Rupiah.',
    btn_launch_admin: 'Jelajahi Platform →',
    btn_launch_merchant: 'Gabung Mitra Spa',
    btn_launch_tourist: 'Temukan Spa',
    trust_corridors: 'Koridor Feri',
    trust_settlement: 'Pembayaran Lintas Batas',
    trust_ai: 'NLP Keselamatan Medis',
    trust_sanitation: 'Standar Sanitasi',

    // Problem Solution
    prob_badge: 'Studi Kasus Inovasi Batam – Singapura',
    prob_title: 'Friksi Transit Waktu Singkat Lintas Batas',
    prob_desc: 'Setiap akhir pekan, lebih dari 65.000 wisatawan melintasi Singapura dan Batam menggunakan feri cepat. Zentura menyelesaikan 3 hambatan utama antara turis dan UMKM kebugaran lokal.',
    prob_tag_red: 'HAMBATAN UTAMA',
    prob_heading_red: 'Tantangan Tradisional Lintas Batas',
    prob_p1_title: 'Waktu Mati Transit 45–90 Menit:',
    prob_p1_desc: 'Wisatawan tiba lebih awal di terminal feri (Harbour Bay / Batam Centre) dengan waktu luang terbuang, sementara kursi pijat spa lokal di sekitarnya kosong.',
    prob_p2_title: 'Miskomunikasi Bahasa & Riwayat Medis:',
    prob_p2_desc: 'Turis asal Singapura sulit menyampaikan titik pegal atau alergi (minyak kacang, eksim) kepada terapis lokal yang hanya berbahasa Indonesia.',
    prob_p3_title: 'Kendala Pembayaran & Kepastian Higienis:',
    prob_p3_desc: 'Kerumitan penukaran valas (kekurangan uang tunai SGD/IDR) serta keraguan standar higienis menghalangi pemesanan langsung.',
    
    sol_tag_blue: 'INOVASI LINTAS BATAS ZENTURA',
    sol_heading_blue: 'Solusi Cerdas Berbasis AI',
    sol_p1_title: 'Pencocok Celah Waktu Dinamis (Flash Gap Matcher):',
    sol_p1_desc: 'Memasangkan jadwal keberangkatan kapal secara real-time dengan kursi spa kosong pada tarif promo dinamis, meningkatkan okupansi kursi hingga 84%.',
    sol_p2_title: 'Jembatan Penerjemah Medis AI:',
    sol_p2_desc: 'Mesin NLP mengubah instruksi turis (Inggris, Mandarin, Korea) menjadi kartu instruksi terapis bahasa Indonesia yang sopan disertai peringatan alergi.',
    sol_p3_title: 'Settlement Langsung PayNow SG ke BI-FAST IDR:',
    sol_p3_desc: 'Turis membayar dengan SGD, sementara mitra spa menerima transfer otomatis Rupiah ke rekening bank lokal dengan sertifikasi higienis 95+.',

    // Simulator
    sim_badge: 'Simulator Interaktif Langsung',
    sim_title: 'Uji Coba Mesin Inovasi Secara Real-Time',
    sim_desc: 'Rasakan langsung bagaimana Zentura mengubah waktu tunggu transit menjadi nilai ekonomi nyata.',
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
    impact_desc: 'Zentura menciptakan nilai ekonomi nyata di koridor maritim Singapura–Batam dengan menghubungkan wisatawan berdaya beli tinggi ke pusat kebugaran Indonesia yang terverifikasi berkualitas tinggi.',

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
      localStorage.setItem('zentura_lang', lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = currentLang.value === 'en' ? 'id' : 'en';
    setLanguage(nextLang);
  };

  const t = (key) => {
    const langObj = translations[currentLang.value] || translations.en;
    return langObj[key] || translations.en[key] || key;
  };

  const isIndonesian = computed(() => currentLang.value === 'id');

  return {
    currentLang,
    isIndonesian,
    setLanguage,
    toggleLanguage,
    t
  };
}
