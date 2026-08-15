<template>
  <div class="profile-section glass-panel">
    <div class="section-header">
      <div>
        <h3 class="section-title">🏢 Profil UMKM & Verifikasi Higienitas</h3>
        <p class="section-sub">Tingkatkan kepercayaan wisatawan mancanegara dengan standar kebersihan Zentura</p>
      </div>
      <span class="badge badge-verified">✓ 99% Verified Hygiene</span>
    </div>

    <!-- Salon Info Card -->
    <div class="info-card glass-card">
      <div class="salon-main-row">
        <img :src="merchantSalon.imageUrl" :alt="merchantSalon.name" class="salon-thumb" />
        <div class="salon-details">
          <h4 class="salon-name">{{ merchantSalon.name }}</h4>
          <p class="salon-tagline">{{ merchantSalon.tagline }}</p>
          <div class="meta-row">
            <span>📍 {{ merchantSalon.address }}</span>
            <span>•</span>
            <span class="text-gold">🚶 {{ merchantSalon.distanceMinutes }} menit dari Harbour Bay Ferry</span>
          </div>
          <div class="contact-row">
            <span>WhatsApp: <strong>{{ merchantSalon.phone }}</strong></span>
            <span>•</span>
            <span>Jam Buka: {{ merchantSalon.operatingHours }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hygiene Verification Checklist -->
    <div class="hygiene-management-card glass-card">
      <h4 class="card-title">🛡️ Checklist Standar Sanitasi & Higienitas</h4>
      <div class="checklist-grid">
        <div
          v-for="(badge, idx) in merchantSalon.hygieneBadges"
          :key="idx"
          class="checklist-item"
        >
          <span class="check-box checked">✓</span>
          <span class="item-text">{{ badge }}</span>
        </div>
        <div class="checklist-item">
          <span class="check-box checked">✓</span>
          <span class="item-text">Penyaring Udara HEPA di Ruang Pijat</span>
        </div>
        <div class="checklist-item">
          <span class="check-box checked">✓</span>
          <span class="item-text">Pengecekan Suhu & Disinfeksi Setiap Sesi</span>
        </div>
      </div>
    </div>

    <!-- Therapists Roster -->
    <div class="therapists-management-card glass-card">
      <h4 class="card-title">💆 Tim Terapis Bersertifikasi</h4>
      <div class="therapists-grid">
        <div
          v-for="(th, idx) in merchantSalon.therapists"
          :key="idx"
          class="therapist-box"
        >
          <div class="avatar">👤</div>
          <div class="th-meta">
            <div class="name">{{ th.name }}</div>
            <div class="exp">{{ th.experience }} • {{ th.specialty }}</div>
            <div class="rating">⭐ {{ th.rating }} Rating Tamu</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useZenturaStore } from '../../composables/useZenturaStore';

const { merchantSalon } = useZenturaStore();
</script>

<style scoped>
.profile-section {
  padding: 1.25rem;
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.section-title {
  font-size: 1.1rem;
  color: var(--color-accent-gold);
}

.section-sub {
  font-size: 0.76rem;
  color: var(--color-text-muted);
}

.info-card, .hygiene-management-card, .therapists-management-card {
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  border: 1px solid var(--border-subtle);
}

.salon-main-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

@media (max-width: 580px) {
  .salon-main-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

.salon-thumb {
  width: 120px;
  height: 90px;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.salon-name {
  font-size: 1.05rem;
  color: var(--color-text-primary);
  margin-bottom: 0.2rem;
}

.salon-tagline {
  font-size: 0.78rem;
  color: var(--color-accent-emerald-light);
  margin-bottom: 0.35rem;
}

.meta-row, .contact-row {
  font-size: 0.74rem;
  color: var(--color-text-muted);
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-bottom: 0.2rem;
}

.card-title {
  font-size: 0.95rem;
  color: var(--color-accent-gold);
  margin-bottom: 0.85rem;
}

.checklist-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

@media (max-width: 480px) {
  .checklist-grid {
    grid-template-columns: 1fr;
  }
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.76rem;
  color: var(--color-text-secondary);
}

.check-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid #10b981;
  color: #34d399;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.therapists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

.therapist-box {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem;
  background: rgba(8, 22, 18, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
}

.avatar {
  font-size: 1.4rem;
}

.name {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-text-primary);
}

.exp {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.rating {
  font-size: 0.7rem;
  color: var(--color-accent-gold);
}
</style>
