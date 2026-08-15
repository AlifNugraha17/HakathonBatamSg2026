<template>
  <footer class="landing-footer">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="brand-line">
          <span class="brand-badge">Z</span>
          <span class="brand-title">ZENTURA</span>
        </div>
        <p class="brand-desc">
          Enterprise cross-border operations & management ecosystem connecting Singapore ferry travelers with vetted Batam wellness centers.
        </p>
      </div>

      <div class="footer-links-group">
        <div class="link-col">
          <h4 class="col-title">Role Portals</h4>
          <button class="footer-link-btn" @click="quickLogin('admin')">Super Admin Dashboard</button>
          <button class="footer-link-btn" @click="quickLogin('merchant')">Merchant Partner Portal</button>
          <button class="footer-link-btn" @click="quickLogin('tourist')">Tourist Concierge</button>
          <button class="footer-link-btn" @click="navigateTo('login')">Account Sign In</button>
        </div>

        <div class="link-col">
          <h4 class="col-title">Singapore ⇄ Batam Corridors</h4>
          <span class="footer-static-item">HarbourFront SG ⇄ Batam Harbour Bay</span>
          <span class="footer-static-item">Tanah Merah SG ⇄ Batam Centre</span>
          <span class="footer-static-item">Tanah Merah SG ⇄ Nongsa Pura</span>
        </div>

        <div class="link-col">
          <h4 class="col-title">Core Infrastructure</h4>
          <span class="footer-static-item">Zentura-MedNLP Inference Engine</span>
          <span class="footer-static-item">PayNow SG ⇄ BI-FAST IDR Settlement</span>
          <span class="footer-static-item">BNSP Certified Hygiene Protocol</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="copyright-text">
        © 2026 Zentura Ecosystem Technologies Inc. Dedicated to the Singapore – Batam Maritime Corridor.
      </p>
      <div class="footer-meta-pills">
        <span class="meta-pill">Vue 3.5</span>
        <span class="meta-pill">Vite Fast Engine</span>
        <span class="meta-pill">Multi-Role Architecture</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useAuth } from '../../../composables/useAuth';

const { quickLogin, navigateTo } = useAuth();
</script>

<style scoped>
.landing-footer {
  padding: 2.5rem 1.75rem 1.75rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
}

.footer-top {
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  gap: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f1f5f9;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.brand-line {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.brand-badge {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-weight: 900;
  font-size: 0.95rem;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: 0.06em;
}

.brand-desc {
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.footer-links-group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.link-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.col-title {
  font-size: 0.8rem;
  font-weight: 800;
  color: #1e3a8a;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.25rem;
}

.footer-link-btn {
  background: transparent;
  border: none;
  text-align: left;
  font-size: 0.8rem;
  color: #475569;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s ease;
}

.footer-link-btn:hover {
  color: #1d4ed8;
}

.footer-static-item {
  font-size: 0.8rem;
  color: #64748b;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.copyright-text {
  font-size: 0.78rem;
  color: #94a3b8;
  margin: 0;
}

.footer-meta-pills {
  display: flex;
  gap: 0.4rem;
}

.meta-pill {
  font-size: 0.68rem;
  font-weight: 700;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

@media (max-width: 860px) {
  .footer-top {
    grid-template-columns: 1fr;
  }
}
</style>
