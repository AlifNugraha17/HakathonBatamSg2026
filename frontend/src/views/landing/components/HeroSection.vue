<template>
  <section class="hero-section">
    <!-- Top Corridor Badge -->
    <div class="hero-badge-wrap">
      <span class="luxury-badge">
        <span class="badge-dot"></span>
        {{ t('hero_badge') }}
      </span>
    </div>

    <!-- Main Headline with i18n -->
    <h1 class="hero-title">
      {{ t('hero_title_1') }}
      <span class="text-gradient-blue"> {{ t('hero_title_2') }}</span>
    </h1>

    <p class="hero-description">
      {{ t('hero_desc') }}
    </p>

    <!-- Role Launch Buttons with Automatic Role Routing -->
    <div class="hero-actions-group">
      <button class="btn-primary-luxury" @click="quickLogin('admin')">
        {{ t('btn_launch_admin') }}
      </button>

      <button class="btn-secondary-luxury" @click="quickLogin('merchant')">
        {{ t('btn_launch_merchant') }}
      </button>

      <button class="btn-outline-luxury" @click="quickLogin('tourist')">
        {{ t('btn_launch_tourist') }}
      </button>
    </div>

    <!-- Luxury Trust Highlights with i18n -->
    <div class="hero-trust-bar">
      <div class="trust-item">
        <span class="trust-label">{{ t('trust_corridors') }}</span>
        <span class="trust-val">Harbour Bay • Batam Centre • Lagoi</span>
      </div>
      <div class="trust-divider"></div>
      <div class="trust-item">
        <span class="trust-label">{{ t('trust_settlement') }}</span>
        <span class="trust-val">PayNow SG ⇄ BI-FAST IDR</span>
      </div>
      <div class="trust-divider"></div>
      <div class="trust-item">
        <span class="trust-label">{{ t('trust_ai') }}</span>
        <span class="trust-val">185ms Latency • Allergy Alerts</span>
      </div>
      <div class="trust-divider"></div>
      <div class="trust-item">
        <span class="trust-label">{{ t('trust_sanitation') }}</span>
        <span class="trust-val">95+ Hygiene Score Audit</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuth } from '../../../composables/useAuth';
import { useLanguage } from '../../../composables/useLanguage';

const { quickLogin } = useAuth();
const { t } = useLanguage();
</script>

<style scoped>
.hero-section {
  text-align: center;
  padding: 3.5rem 2rem 2.75rem;
  max-width: 1280px;
  margin: 0 auto 2.5rem;
  background: #ffffff;
  border-radius: var(--radius-lg);
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  position: relative;
  overflow: hidden;
  width: 100%;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 50%, #38bdf8 100%);
}

.hero-badge-wrap {
  margin-bottom: 1.25rem;
}

.luxury-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.35rem 0.95rem;
  border-radius: var(--radius-full);
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 0 8px #2563eb;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #0f172a;
  margin-bottom: 1.15rem;
  letter-spacing: -0.03em;
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
}

.text-gradient-blue {
  color: #1d4ed8;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 0.95rem;
  line-height: 1.65;
  color: #475569;
  max-width: 820px;
  margin: 0 auto 2.25rem;
}

.hero-actions-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.btn-primary-luxury {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 800;
  padding: 0.8rem 1.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid #1e3a8a;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(29, 78, 216, 0.28);
  transition: all 0.15s ease;
}

.btn-primary-luxury:hover {
  background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(29, 78, 216, 0.38);
}

.btn-secondary-luxury {
  background: #ffffff;
  color: #1e3a8a;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.8rem 1.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid #cbd5e1;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-secondary-luxury:hover {
  background: #f8fafc;
  border-color: #93c5fd;
  color: #1d4ed8;
}

.btn-outline-luxury {
  background: transparent;
  color: #475569;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.8rem 1.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-outline-luxury:hover {
  background: #f8fafc;
  color: #0f172a;
}

.hero-trust-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trust-label {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.15rem;
}

.trust-val {
  font-size: 0.84rem;
  color: #0f172a;
  font-weight: 800;
}

.trust-divider {
  width: 1px;
  height: 24px;
  background: #e2e8f0;
}

@media (max-width: 900px) {
  .hero-title {
    font-size: 1.85rem;
  }
  .hero-trust-bar {
    gap: 1rem;
  }
  .trust-divider {
    display: none;
  }
}
</style>
