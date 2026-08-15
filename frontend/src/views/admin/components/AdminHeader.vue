<template>
  <header class="admin-header">
    <div class="header-left">
      <div class="title-meta">
        <h2 class="view-title">{{ currentTitle }}</h2>
        <span class="view-sub">{{ currentSubtitle }}</span>
      </div>
    </div>

    <div class="header-right">
      <div class="search-box">
        <input 
          type="text" 
          placeholder="Search transactions, partners..." 
          class="search-input"
        />
      </div>

      <div class="health-pill">
        <span class="live-dot"></span>
        <span>Systems Normal (185ms)</span>
      </div>

      <div class="admin-profile-pill">
        <div class="avatar-circle">{{ currentUser.name.charAt(0) }}</div>
        <div class="profile-info">
          <span class="name">{{ currentUser.name }}</span>
          <span class="role">Master Admin</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useAdminStore } from '../../../composables/useAdminStore';
import { useAuth } from '../../../composables/useAuth';

const { activeAdminTab } = useAdminStore();
const { currentUser } = useAuth();

const titleMap = {
  overview: { title: 'Executive Overview', sub: 'Real-time ecosystem GMV, transaction volume, and operational growth metrics' },
  merchants: { title: 'Partner & Spa Management', sub: 'Verify partner KYC credentials, approve registrations, and audit hygiene scores' },
  users: { title: 'User Account Directory', sub: 'Manage registered tourist & merchant accounts, permissions, and security status' },
  ai: { title: 'AI Monitoring & Safety Logs', sub: 'Inspect real-time multilingual NLP translation queries, latency, and allergen filters' },
  finance: { title: 'Cross-Border Treasury & Payouts', sub: 'Multi-currency platform commission splits and automated BI-FAST bank settlements' },
  settings: { title: 'Global System Configurations', sub: 'Manage live FX currency conversion rates, WhatsApp webhooks, and active AI models' }
};

const currentTitle = computed(() => titleMap[activeAdminTab.value]?.title || 'Admin Console');
const currentSubtitle = computed(() => titleMap[activeAdminTab.value]?.sub || '');
</script>

<style scoped>
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  margin-bottom: 1.25rem;
  gap: 1rem;
}

.view-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.02em;
}

.view-sub {
  font-size: 0.78rem;
  color: #64748b;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.search-input {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-sm);
  color: #0f172a;
  font-size: 0.8rem;
  width: 220px;
  outline: none;
  transition: all 0.15s;
}

.search-input:focus {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.health-pill {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: var(--radius-full);
  font-size: 0.74rem;
  color: #047857;
  font-weight: 700;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.admin-profile-pill {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-left: 0.75rem;
  border-left: 1px solid #e2e8f0;
}

.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 0.78rem;
  font-weight: 700;
  color: #0f172a;
}

.role {
  font-size: 0.65rem;
  color: #1e3a8a;
  font-weight: 600;
}

@media (max-width: 900px) {
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header-right {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
