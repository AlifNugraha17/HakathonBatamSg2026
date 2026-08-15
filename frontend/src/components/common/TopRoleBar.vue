<template>
  <header class="top-role-header">
    <div class="top-nav-container">
      <!-- Left: Luxury Brand Emblem & Title -->
      <div class="brand-section" @click="handleNavClick('home')">
        <div class="brand-logo-mark">Z</div>
        <div class="brand-titles">
          <span class="brand-name">ZENTURA</span>
          <span class="brand-sub">CROSS-BORDER WELLNESS</span>
        </div>
      </div>

      <!-- Center: Standard SaaS Navigation Links (Home, About, Solutions, Simulator, Impact) -->
      <nav class="nav-links-center">
        <button 
          class="nav-tab" 
          :class="{ active: currentView === 'landing' && activeSection === 'home' }"
          @click="handleNavClick('home')"
        >
          <span>{{ t('nav_home') }}</span>
        </button>

        <button 
          class="nav-tab" 
          @click="handleNavClick('about')"
        >
          <span>{{ t('nav_about') }}</span>
        </button>

        <button 
          class="nav-tab" 
          @click="handleNavClick('solutions')"
        >
          <span>{{ t('nav_solutions') }}</span>
        </button>

        <button 
          class="nav-tab" 
          @click="handleNavClick('simulator')"
        >
          <span>{{ t('nav_simulator') }}</span>
        </button>

        <button 
          class="nav-tab" 
          @click="handleNavClick('impact')"
        >
          <span>{{ t('nav_impact') }}</span>
        </button>
      </nav>

      <!-- Right: Language Switcher & Sign In Button -->
      <div class="user-status-section">
        <!-- Bilingual Language Switcher -->
        <div class="lang-switcher-box">
          <button 
            class="lang-pill" 
            :class="{ active: currentLang === 'en' }"
            @click="setLanguage('en')"
            title="English"
          >
            EN
          </button>
          <span class="lang-divider">/</span>
          <button 
            class="lang-pill" 
            :class="{ active: currentLang === 'id' }"
            @click="setLanguage('id')"
            title="Bahasa Indonesia"
          >
            ID
          </button>
        </div>

        <!-- If Authenticated: Show Dashboard Access & Logout -->
        <template v-if="isAuthenticated">
          <button 
            class="btn-dashboard-link"
            :class="{ active: currentView === 'dashboard' }"
            @click="navigateTo('dashboard')"
          >
            <span class="role-badge-dot"></span>
            <span>{{ t('nav_dashboard') }} ({{ currentRole.toUpperCase() }})</span>
          </button>
          <button class="btn-logout" @click="logout">
            {{ currentLang === 'id' ? 'Keluar' : 'Sign Out' }}
          </button>
        </template>

        <!-- If Not Authenticated: Standard Sign In Button -->
        <template v-else>
          <button 
            class="btn-signin-nav" 
            :class="{ active: currentView === 'login' }"
            @click="navigateTo('login')"
          >
            {{ t('nav_signin') }}
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useLanguage } from '../../composables/useLanguage';

const { 
  currentView, 
  currentRole, 
  isAuthenticated, 
  logout, 
  navigateTo 
} = useAuth();

const { currentLang, setLanguage, t } = useLanguage();
const activeSection = ref('home');

const handleNavClick = (section) => {
  activeSection.value = section;
  if (currentView.value !== 'landing') {
    navigateTo('landing');
  }

  // Smooth scroll to target section if available
  setTimeout(() => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'about') {
      document.getElementById('innovation-bridge')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'solutions') {
      document.getElementById('role-showcase-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'simulator') {
      document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'impact') {
      document.querySelector('.regional-impact-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
};
</script>

<style scoped>
.top-role-header {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%);
  border-radius: var(--radius-md);
  padding: 0.75rem 1.5rem;
  box-shadow: 0 4px 20px -3px rgba(30, 58, 138, 0.25);
  margin-bottom: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  width: 100%;
}

.top-nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.brand-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
}

.brand-logo-mark {
  width: 34px;
  height: 34px;
  background: #ffffff;
  color: #1e3a8a;
  font-weight: 900;
  font-size: 1.15rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.brand-titles {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #ffffff;
  line-height: 1.1;
}

.brand-sub {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #93c5fd;
  text-transform: uppercase;
}

.nav-links-center {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-tab {
  background: transparent;
  border: none;
  color: #cbd5e1;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.45rem 0.95rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s ease;
}

.nav-tab:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}

.nav-tab.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.18);
  font-weight: 700;
}

.user-status-section {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.lang-switcher-box {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
}

.lang-pill {
  background: transparent;
  border: none;
  color: #cbd5e1;
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0.15rem 0.4rem;
  border-radius: 99px;
  transition: all 0.15s ease;
}

.lang-pill:hover {
  color: #ffffff;
}

.lang-pill.active {
  background: #ffffff;
  color: #1e3a8a;
  font-weight: 800;
}

.lang-divider {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.4);
}

.btn-signin-nav {
  background: #ffffff;
  color: #1e3a8a;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-xs);
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.15s ease;
}

.btn-signin-nav:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}

.btn-dashboard-link {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.4);
  color: #38bdf8;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-dashboard-link:hover {
  background: rgba(56, 189, 248, 0.25);
  color: #ffffff;
}

.role-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8;
}

.btn-logout {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-logout:hover {
  background: rgba(239, 68, 68, 0.4);
  color: #ffffff;
}

@media (max-width: 840px) {
  .nav-links-center {
    display: none;
  }
}
</style>
