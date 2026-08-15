<template>
  <section id="role-showcase-section" class="role-showcase-container">
    <div class="section-header">
      <span class="section-badge">{{ t('role_badge') }}</span>
      <h2 class="section-title">{{ t('role_title') }}</h2>
      <p class="section-desc">
        {{ t('role_desc') }}
      </p>
    </div>

    <div class="roles-grid">
      <!-- 1. Super Admin Card -->
      <div class="role-card featured-admin">
        <div class="role-header">
          <div class="role-chip admin">PORTAL 01</div>
          <h3 class="role-name">{{ t('role_p1_title') }}</h3>
          <span class="role-sub">{{ t('role_p1_sub') }}</span>
        </div>

        <div class="role-features-box">
          <span class="features-title">{{ currentLang === 'id' ? 'Fitur yang Anda Dapatkan:' : 'Features You Get Access To:' }}</span>
          <ul class="role-features-list">
            <li><strong>{{ currentLang === 'id' ? 'Ringkasan Eksekutif:' : 'Executive Overview:' }}</strong> {{ currentLang === 'id' ? 'Pantau GMV real-time, grafik pertumbuhan, dan volume per koridor.' : 'Real-time GMV, growth charts, and regional volume share.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Manajemen Mitra:' : 'Merchant Management:' }}</strong> {{ currentLang === 'id' ? 'Verifikasi dokumen KYC, setujui mitra spa, dan audit skor higienis.' : 'Review KYC documents, approve spa partners, audit hygiene ratings.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Direktori Pengguna:' : 'User Directory:' }}</strong> {{ currentLang === 'id' ? 'Kelola izin hak akses RBAC dan status akun.' : 'Control RBAC permissions and account statuses.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Pemantauan AI:' : 'AI Monitoring:' }}</strong> {{ currentLang === 'id' ? 'Inspeksi log query NLP real-time dan peringatan bahaya medis/alergi.' : 'Real-time NLP query inspector and allergy safety flag alerts.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Kas Lintas Batas:' : 'Cross-Border Treasury:' }}</strong> {{ currentLang === 'id' ? 'Lacak komisi platform dan eksekusi pencairan dana otomatis BI-FAST.' : 'Track platform commissions and execute BI-FAST IDR payouts.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Pengaturan Sistem:' : 'System Configurations:' }}</strong> {{ currentLang === 'id' ? 'Kurs valas live (SGD/MYR/IDR) dan webhook WhatsApp.' : 'Live FX conversion rates (SGD/MYR/IDR) and WhatsApp webhooks.' }}</li>
          </ul>
        </div>

        <div class="role-footer">
          <button class="btn-role-action primary-blue" @click="quickLogin('admin')">
            {{ t('role_btn_admin') }}
          </button>
        </div>
      </div>

      <!-- 2. Merchant / Partner Card -->
      <div class="role-card">
        <div class="role-header">
          <div class="role-chip merchant">PORTAL 02</div>
          <h3 class="role-name">{{ t('role_p2_title') }}</h3>
          <span class="role-sub">{{ t('role_p2_sub') }}</span>
        </div>

        <div class="role-features-box">
          <span class="features-title">{{ currentLang === 'id' ? 'Fitur yang Anda Dapatkan:' : 'Features You Get Access To:' }}</span>
          <ul class="role-features-list">
            <li><strong>{{ currentLang === 'id' ? 'Performa Spa:' : 'Spa Performance:' }}</strong> {{ currentLang === 'id' ? 'Pantau omset harian, tingkat keterisian kursi, dan kedatangan tamu.' : 'Monitor daily revenue, chair occupancy rates, and arriving guests.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Flash Slot Broadcast:' : 'Flash Slot Broadcast:' }}</strong> {{ currentLang === 'id' ? 'Siarkan kursi pijat kosong pada tarif promo dinamis.' : 'Broadcast vacant massage chairs at dynamic promotional rates.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Reservasi Masuk:' : 'Incoming Reservations:' }}</strong> {{ currentLang === 'id' ? 'Terima/tolak pesanan tersinkronisasi cloud WhatsApp.' : 'Accept/decline bookings with WhatsApp cloud sync.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Kartu Terapis AI:' : 'AI Therapist Cards:' }}</strong> {{ currentLang === 'id' ? 'Inspeksi keluhan tamu otomatis berbahasa Indonesia dengan peringatan alergi.' : 'Inspect guest complaints localized into Indonesian with allergy alerts.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Jadwal Terapis:' : 'Therapist Roster:' }}</strong> {{ currentLang === 'id' ? 'Kelola jam giliran kerja (shift) dan sertifikasi BNSP.' : 'Manage shift hours and BNSP accreditation records.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Profil & Sanitasi:' : 'Hygiene & Profile:' }}</strong> {{ currentLang === 'id' ? 'Ubah foto fasilitas dan audit checklist sanitasi.' : 'Edit facility photos and audit sanitation checklists.' }}</li>
          </ul>
        </div>

        <div class="role-footer">
          <button class="btn-role-action" @click="quickLogin('merchant')">
            {{ t('role_btn_merchant') }}
          </button>
        </div>
      </div>

      <!-- 3. Tourist / Customer Card -->
      <div class="role-card">
        <div class="role-header">
          <div class="role-chip tourist">PORTAL 03</div>
          <h3 class="role-name">{{ t('role_p3_title') }}</h3>
          <span class="role-sub">{{ t('role_p3_sub') }}</span>
        </div>

        <div class="role-features-box">
          <span class="features-title">{{ currentLang === 'id' ? 'Fitur yang Anda Dapatkan:' : 'Features You Get Access To:' }}</span>
          <ul class="role-features-list">
            <li><strong>{{ currentLang === 'id' ? 'Direktori Koridor:' : 'Corridor Directory:' }}</strong> {{ currentLang === 'id' ? 'Jelajahi spa terverifikasi di Batam (Harbour Bay, Batam Centre, Nongsa).' : 'Browse vetted wellness centers across Batam (Harbour Bay, Batam Centre, Nongsa).' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Pencocok Waktu Luang:' : 'Time Gap Matcher:' }}</strong> {{ currentLang === 'id' ? 'Cocokkan jendela waktu luang 30-90 menit sebelum jadwal kapal feri.' : 'Match your 30-90m free window before ferry departure.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Studio Terjemahan AI:' : 'AI Translation Studio:' }}</strong> {{ currentLang === 'id' ? 'Terjemahkan keluhan medis menjadi kartu instruksi sopan untuk terapis.' : 'Translate health complaints into polite Indonesian brief cards.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Booking 1-Klik WhatsApp:' : '1-Click WhatsApp Booking:' }}</strong> {{ currentLang === 'id' ? 'Kirim pesan reservasi terformat langsung ke pemilik spa.' : 'Send direct formatted reservation payloads to salon owners.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Harga Multi-Mata Uang:' : 'Multi-Currency Pricing:' }}</strong> {{ currentLang === 'id' ? 'Transparansi harga real-time dalam SGD dengan konversi instan.' : 'Transparent live pricing in SGD with instant conversion.' }}</li>
            <li><strong>{{ currentLang === 'id' ? 'Pelacak Itinerary:' : 'Itinerary Tracker:' }}</strong> {{ currentLang === 'id' ? 'Pantau status reservasi tersinkronisasi jadwal feri.' : 'Keep track of confirmed appointments with ferry departure sync.' }}</li>
          </ul>
        </div>

        <div class="role-footer">
          <button class="btn-role-action" @click="quickLogin('tourist')">
            {{ t('role_btn_tourist') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuth } from '../../../composables/useAuth';
import { useLanguage } from '../../../composables/useLanguage';

const { quickLogin } = useAuth();
const { currentLang, t } = useLanguage();
</script>

<style scoped>
.role-showcase-container {
  margin-bottom: 3.5rem;
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 2.5rem;
}

.section-badge {
  display: inline-block;
  font-size: 0.74rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  margin-bottom: 0.6rem;
  letter-spacing: 0.02em;
}

.section-title {
  font-size: 1.85rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.section-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.55;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.35rem;
}

.role-card {
  padding: 2rem 1.65rem;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  transition: all 0.2s ease;
  position: relative;
}

.role-card:hover {
  border-color: #93c5fd;
  transform: translateY(-3px);
  box-shadow: 0 12px 28px -6px rgba(30, 58, 138, 0.12);
}

.role-card.featured-admin {
  border-color: #bfdbfe;
  box-shadow: 0 6px 24px -2px rgba(37, 99, 235, 0.1);
}

.role-header {
  margin-bottom: 1.25rem;
}

.role-chip {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.4rem;
}

.role-chip.admin { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.role-chip.merchant { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.role-chip.tourist { background: #fefce8; color: #854d0e; border: 1px solid #fef08a; }

.role-name {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.15rem 0;
  letter-spacing: -0.02em;
}

.role-sub {
  font-size: 0.76rem;
  color: #64748b;
  display: block;
}

.role-features-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 1.15rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  flex: 1;
}

.features-title {
  font-size: 0.74rem;
  font-weight: 800;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  display: block;
  margin-bottom: 0.75rem;
}

.role-features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.role-features-list li {
  font-size: 0.8rem;
  color: #475569;
  position: relative;
  padding-left: 1.1rem;
  line-height: 1.45;
}

.role-features-list li strong {
  color: #0f172a;
}

.role-features-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #2563eb;
  font-weight: 800;
  font-size: 0.78rem;
}

.role-footer {
  margin-top: auto;
}

.btn-role-action {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.86rem;
  font-weight: 700;
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #0f172a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.btn-role-action:hover {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
}

.btn-role-action.primary-blue {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: 1px solid #1e3a8a;
  box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);
}

.btn-role-action.primary-blue:hover {
  background: #0f172a;
  border-color: #0f172a;
}

@media (max-width: 960px) {
  .roles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
