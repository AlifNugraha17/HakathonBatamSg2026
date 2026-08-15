<template>
  <aside class="admin-sidebar">
    <div class="sidebar-brand">
      <span class="brand-chip">Medical, Wellness & Getaways HQ</span>
      <h3 class="brand-name">Master Console</h3>
    </div>

    <!-- Navigation Items -->
    <nav class="sidebar-nav">
      <!-- 1. Executive Overview -->
      <button 
        class="nav-item" 
        :class="{ active: activeAdminTab === 'overview' }"
        @click="activeAdminTab = 'overview'"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span class="nav-text">Executive Overview</span>
      </button>

      <!-- 2. Healthcare & Tourism Partners -->
      <button 
        class="nav-item" 
        :class="{ active: activeAdminTab === 'merchants' }"
        @click="activeAdminTab = 'merchants'"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span class="nav-text">Hospitals & Partners</span>
        <span v-if="pendingMerchantsCount > 0" class="badge-pending">
          {{ pendingMerchantsCount }}
        </span>
      </button>

      <!-- 3. User Directory -->
      <button 
        class="nav-item" 
        :class="{ active: activeAdminTab === 'users' }"
        @click="activeAdminTab = 'users'"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span class="nav-text">User Directory</span>
      </button>

      <!-- 4. AI Intelligence & Safety Logs -->
      <button 
        class="nav-item" 
        :class="{ active: activeAdminTab === 'ai' }"
        @click="activeAdminTab = 'ai'"
      >
        <span class="text-sm">🤖</span>
        <span class="nav-text">AI Safety & Logs</span>
        <span class="badge-ai-live">Active</span>
      </button>

      <!-- 5. Finance & Payouts -->
      <button 
        class="nav-item" 
        :class="{ active: activeAdminTab === 'finance' }"
        @click="activeAdminTab = 'finance'"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
        <span class="nav-text">Finance & Payouts</span>
      </button>

      <!-- 6. System Settings -->
      <button 
        class="nav-item" 
        :class="{ active: activeAdminTab === 'settings' }"
        @click="activeAdminTab = 'settings'"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span class="nav-text">System Settings</span>
      </button>
    </nav>

    <!-- Quick Switcher Box & Logout -->
    <div class="sidebar-footer">
      <span class="hint-label">Quick Portal Access:</span>
      <div class="hint-btns">
        <button class="hint-btn" @click="quickLogin('merchant')">
          Merchant
        </button>
        <button class="hint-btn" @click="quickLogin('tourist')">
          Tourist
        </button>
      </div>

      <button class="btn-admin-logout" @click="logout">
        <span>🚪 Sign Out (Keluar)</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useAdminStore } from '../../../composables/useAdminStore';
import { useAuth } from '../../../composables/useAuth';

const { activeAdminTab, pendingMerchantsCount } = useAdminStore();
const { quickLogin, logout } = useAuth();
</script>

<style scoped>
.admin-sidebar {
  width: 260px;
  border-radius: var(--radius-lg);
  padding: 1.5rem 1.15rem;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  flex-shrink: 0;
  gap: 1.25rem;
  box-sizing: border-box;
}

.sidebar-brand {
  padding: 0.25rem 0.5rem 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.brand-chip {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 800;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.35rem;
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid transparent;
  color: #475569;
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  width: 100%;
  box-sizing: border-box;
}

.nav-icon {
  width: 18px;
  height: 18px;
  color: #64748b;
  flex-shrink: 0;
  transition: color 0.15s ease;
}

.nav-item:hover {
  background: #f8fafc;
  color: #1e3a8a;
  border-color: #e2e8f0;
}

.nav-item:hover .nav-icon {
  color: #1e3a8a;
}

.nav-item.active {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
  font-weight: 700;
}

.nav-item.active .nav-icon {
  color: #1d4ed8;
}

.nav-text {
  flex: 1;
}

.badge-pending {
  background: #ef4444;
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.1rem 0.45rem;
  border-radius: 99px;
}

.badge-ai-live {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
}

.sidebar-footer {
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.hint-label {
  font-size: 0.72rem;
  color: #64748b;
  font-weight: 600;
}

.hint-btns {
  display: flex;
  gap: 0.4rem;
}

.hint-btn {
  flex: 1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.35rem 0.5rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s ease;
}

.hint-btn:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1e3a8a;
}

.btn-admin-logout {
  width: 100%;
  margin-top: 0.75rem;
  padding: 0.55rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 0.78rem;
  font-weight: 700;
  border-radius: var(--radius-xs);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  transition: all 0.15s ease;
}

.btn-admin-logout:hover {
  background: #fee2e2;
  border-color: #f87171;
}

@media (max-width: 900px) {
  .admin-sidebar {
    width: 100%;
    padding: 1rem;
    gap: 0.75rem;
  }
  .sidebar-brand {
    display: none;
  }
  .sidebar-nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 0.4rem;
  }
  .nav-item {
    padding: 0.5rem 0.65rem;
    font-size: 0.78rem;
    justify-content: center;
    text-align: center;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
  }
  .nav-item.active {
    background: #eff6ff;
    border-color: #bfdbfe;
  }
  .sidebar-footer {
    display: none;
  }
}
</style>

