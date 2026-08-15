<template>
  <section class="regional-impact-section">
    <div class="pitch-card-luxury">
      <div class="pitch-header">
        <span class="pitch-badge">{{ t('impact_badge') }}</span>
        <h2 class="pitch-title">{{ t('impact_title') }}</h2>
        <p class="pitch-desc">
          {{ t('impact_desc') }}
        </p>
      </div>

      <div class="pillars-grid">
        <div class="pillar-box">
          <span class="pillar-metric">4.2x</span>
          <h4 class="pillar-title">{{ currentLang === 'id' ? 'Akselerasi Okupansi UMKM' : 'MSME Yield Acceleration' }}</h4>
          <p class="pillar-text">
            {{ currentLang === 'id' ? 'Mengubah kursi pijat kosong pada jam sepi menjadi mikro-slot promosi tanpa biaya komisi agensi yang mahal.' : 'Transforms dormant off-peak massage chairs into revenue-generating flash micro-slots without high agency acquisition costs.' }}
          </p>
        </div>

        <div class="pillar-box">
          <span class="pillar-metric">0%</span>
          <h4 class="pillar-title">{{ currentLang === 'id' ? 'Bebas Hambatan Valas' : 'FX Friction for Tourists' }}</h4>
          <p class="pillar-text">
            {{ currentLang === 'id' ? 'Settlement digital langsung dari PayNow & Kartu Singapura ke rekening bank BI-FAST Rupiah dengan kurs transparan.' : 'Direct digital settlement from Singapore PayNow & Cards into Indonesian BI-FAST bank accounts with transparent live exchange rates.' }}
          </p>
        </div>

        <div class="pillar-box">
          <span class="pillar-metric">185ms</span>
          <h4 class="pillar-title">{{ currentLang === 'id' ? 'AI Keselamatan Medis' : 'Medical Safety AI' }}</h4>
          <p class="pillar-text">
            {{ currentLang === 'id' ? 'Deteksi alergi kulit otomatis mencegah bahaya bahan minyak pijat sekaligus menjembatani kendala bahasa dengan terapis.' : 'Automated allergen detection preventing dangerous skin reactions while eliminating cross-language friction with local therapists.' }}
          </p>
        </div>

        <div class="pillar-box">
          <span class="pillar-metric">95+</span>
          <h4 class="pillar-title">{{ currentLang === 'id' ? 'Standar Sanitasi Terverifikasi' : 'Verified Sanitation Benchmark' }}</h4>
          <p class="pillar-text">
            {{ currentLang === 'id' ? 'Membangun kepercayaan turis Singapura melalui sertifikasi higienis, audit sterilisasi alat, dan akreditasi BNSP.' : 'Builds trust for Singaporean travelers via verifiable hygiene scoring, sterile equipment audits, and BNSP therapist accreditation.' }}
          </p>
        </div>
      </div>

      <!-- Quick Launch Strip -->
      <div class="pitch-cta-strip">
        <span class="cta-prompt">{{ currentLang === 'id' ? 'Siap mengevaluasi kapabilitas khusus setiap peran?' : 'Ready to explore specialized multi-role capabilities?' }}</span>
        <div class="cta-buttons">
          <button class="btn-pitch-launch" @click="quickLogin('admin')">
            {{ t('btn_launch_admin') }}
          </button>
          <button class="btn-pitch-sub" @click="quickLogin('merchant')">
            {{ t('btn_launch_merchant') }}
          </button>
          <button class="btn-pitch-sub" @click="quickLogin('tourist')">
            {{ t('btn_launch_tourist') }}
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
.regional-impact-section {
  margin-bottom: 3rem;
}

.pitch-card-luxury {
  padding: 3rem 2.5rem;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%);
  color: #ffffff;
  box-shadow: 0 10px 30px -5px rgba(30, 58, 138, 0.3);
  position: relative;
  overflow: hidden;
}

.pitch-card-luxury::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.pitch-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto 2.5rem;
}

.pitch-badge {
  display: inline-block;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  padding: 0.3rem 0.85rem;
  border-radius: var(--radius-full);
  margin-bottom: 0.85rem;
  text-transform: uppercase;
}

.pitch-title {
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.pitch-desc {
  font-size: 0.95rem;
  color: #cbd5e1;
  line-height: 1.6;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.pillar-box {
  padding: 1.5rem;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
}

.pillar-metric {
  font-size: 1.85rem;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: -0.02em;
  margin-bottom: 0.35rem;
}

.pillar-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.45rem;
}

.pillar-text {
  font-size: 0.78rem;
  color: #cbd5e1;
  line-height: 1.5;
  margin: 0;
}

.pitch-cta-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  flex-wrap: wrap;
  gap: 1rem;
}

.cta-prompt {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e2e8f0;
}

.cta-buttons {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.btn-pitch-launch {
  background: #ffffff;
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.65rem 1.4rem;
  border-radius: var(--radius-xs);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.15s ease;
}

.btn-pitch-launch:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}

.btn-pitch-sub {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 0.65rem 1.15rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-pitch-sub:hover {
  background: rgba(255, 255, 255, 0.25);
}

@media (max-width: 1024px) {
  .pillars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .pitch-card-luxury {
    padding: 2rem 1.5rem;
  }
  .pitch-title {
    font-size: 1.5rem;
  }
  .pillars-grid {
    grid-template-columns: 1fr;
  }
  .pitch-cta-strip {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
