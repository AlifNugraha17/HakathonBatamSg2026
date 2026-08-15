<template>
  <section id="innovation-bridge" class="problem-solution-section">
    <div class="section-header">
      <span class="section-badge">{{ t('prob_badge') }}</span>
      <h2 class="section-title">{{ t('prob_title') }}</h2>
      <p class="section-desc">
        {{ t('prob_desc') }}
      </p>
    </div>

    <div class="comparison-grid">
      <!-- 1. The Problem Card -->
      <div class="card-problem">
        <div class="card-tag red">{{ t('prob_tag_red') }}</div>
        <h3 class="card-heading">{{ t('prob_heading_red') }}</h3>

        <div class="points-list">
          <div class="point-item">
            <span class="point-num red">01</span>
            <div class="point-content">
              <strong>{{ t('prob_p1_title') }}</strong>
              <p>{{ t('prob_p1_desc') }}</p>
            </div>
          </div>

          <div class="point-item">
            <span class="point-num red">02</span>
            <div class="point-content">
              <strong>{{ t('prob_p2_title') }}</strong>
              <p>{{ t('prob_p2_desc') }}</p>
            </div>
          </div>

          <div class="point-item">
            <span class="point-num red">03</span>
            <div class="point-content">
              <strong>{{ t('prob_p3_title') }}</strong>
              <p>{{ t('prob_p3_desc') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. The Zentura Solution Card -->
      <div class="card-solution">
        <div class="card-tag blue">{{ t('sol_tag_blue') }}</div>
        <h3 class="card-heading">{{ t('sol_heading_blue') }}</h3>

        <div class="points-list">
          <div class="point-item">
            <span class="point-num blue">01</span>
            <div class="point-content">
              <strong>{{ t('sol_p1_title') }}</strong>
              <p>{{ t('sol_p1_desc') }}</p>
            </div>
          </div>

          <div class="point-item">
            <span class="point-num blue">02</span>
            <div class="point-content">
              <strong>{{ t('sol_p2_title') }}</strong>
              <p>{{ t('sol_p2_desc') }}</p>
            </div>
          </div>

          <div class="point-item">
            <span class="point-num blue">03</span>
            <div class="point-content">
              <strong>{{ t('sol_p3_title') }}</strong>
              <p>{{ t('sol_p3_desc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '../../../composables/useLanguage';

const { t } = useLanguage();
</script>

<style scoped>
.problem-solution-section {
  margin-bottom: 3rem;
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 2.25rem;
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
  line-height: 1.6;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 1.5rem;
}

.card-problem, .card-solution {
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
}

.card-solution {
  border-color: #bfdbfe;
  background: #ffffff;
  box-shadow: 0 8px 24px -4px rgba(30, 58, 138, 0.1);
  position: relative;
}

.card-solution::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.card-tag {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.card-tag.red { color: #991b1b; }
.card-tag.blue { color: #1e3a8a; }

.card-heading {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}

.points-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.point-item {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}

.point-num {
  font-size: 0.82rem;
  font-weight: 800;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.point-num.red {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.point-num.blue {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.point-content {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.point-content strong {
  font-size: 0.88rem;
  color: #0f172a;
}

.point-content p {
  font-size: 0.82rem;
  color: #475569;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 860px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
