<template>
  <section class="feature-grid-section">
    <div class="section-header">
      <span class="section-badge">Core Capabilities</span>
      <h2 class="section-title">Engineered for Singapore – Batam Maritime Corridor</h2>
      <p class="section-desc">
        Purpose-built to eliminate cross-border friction between Singapore maritime travelers and Batam wellness centers.
      </p>
    </div>

    <div class="features-container">
      <div class="feature-card">
        <span class="feature-index">01</span>
        <h3 class="feature-heading">Micro-Moment Time Gap Matcher</h3>
        <p class="feature-text">
          Dynamically connects empty salon massage chairs with travelers' 45-to-90 minute free windows prior to ferry departure times, boosting partner occupancy by up to 84%.
        </p>
      </div>

      <div class="feature-card">
        <span class="feature-index">02</span>
        <h3 class="feature-heading">AI Medical & Language Bridge</h3>
        <p class="feature-text">
          Converts freeform tourist inputs (English, Mandarin, Korean) into structured Indonesian therapist cards with automated allergen and safety alerts (peanut oil, pregnancy).
        </p>
      </div>

      <div class="feature-card">
        <span class="feature-index">03</span>
        <h3 class="feature-heading">Certified Hygiene Audits (95+)</h3>
        <p class="feature-text">
          Automated compliance checks verifying linen sanitation, medical-grade tool sterilization, and official BNSP therapist accreditations across all network partners.
        </p>
      </div>

      <div class="feature-card">
        <span class="feature-index">04</span>
        <h3 class="feature-heading">Cross-Border Settlement Rails</h3>
        <p class="feature-text">
          Travelers pay in SGD via PayNow/Card, while local Batam spa merchants receive automated, direct-to-bank settlements in IDR via BI-FAST.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-grid-section {
  margin-bottom: 3rem;
}

.section-header {
  text-align: center;
  max-width: 680px;
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

.features-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.feature-card {
  padding: 1.75rem;
  border-radius: var(--radius-md);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.15s ease;
}

.feature-card:hover {
  border-color: #93c5fd;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(30, 58, 138, 0.08);
}

.feature-index {
  font-size: 0.85rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 0.75rem;
  display: inline-block;
}

.feature-heading {
  font-size: 1.1rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.feature-text {
  font-size: 0.86rem;
  color: #475569;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features-container {
    grid-template-columns: 1fr;
  }
}
</style>
