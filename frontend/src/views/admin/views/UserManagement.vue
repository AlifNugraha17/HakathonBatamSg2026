<template>
  <div class="user-mgmt-view animate-fade-in">
    <!-- Header Control Bar in English -->
    <div class="mgmt-header-row">
      <div class="filter-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: filterRole === 'all' }"
          @click="filterRole = 'all'"
        >
          All Users ({{ users.length }})
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: filterRole === 'tourist' }"
          @click="filterRole = 'tourist'"
        >
          Tourists
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: filterRole === 'merchant' }"
          @click="filterRole = 'merchant'"
        >
          Partners
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: filterRole === 'admin' }"
          @click="filterRole = 'admin'"
        >
          Admins
        </button>
      </div>

      <input 
        v-model="userSearchQuery" 
        type="text" 
        placeholder="Search user by name or email..." 
        class="search-input-styled"
      />
    </div>

    <!-- Users Table -->
    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th>ACCOUNT & CONTACT</th>
            <th>SYSTEM ROLE</th>
            <th>ORIGIN REGION</th>
            <th>LIFETIME SPENT</th>
            <th>SECURITY STATUS</th>
            <th>LAST ACTIVE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in filteredUsers" :key="u.id" class="table-row">
            <td>
              <div class="user-details">
                <span class="u-name">{{ u.name }}</span>
                <span class="u-email">{{ u.email }}</span>
              </div>
            </td>
            <td>
              <span class="role-badge" :class="u.role">
                {{ u.role.toUpperCase() }}
              </span>
            </td>
            <td>
              <span class="country-text">{{ u.country }}</span>
            </td>
            <td>
              <span v-if="u.role === 'tourist'" class="spent-val">SGD {{ u.totalSpentSgd }}</span>
              <span v-else class="spent-sub">Partner Hub</span>
            </td>
            <td>
              <span class="status-badge" :class="u.status">
                {{ u.status === 'active' ? 'ACTIVE' : 'SUSPENDED' }}
              </span>
            </td>
            <td>
              <span class="last-active">{{ u.lastActive }}</span>
            </td>
            <td>
              <button 
                v-if="u.role !== 'admin'"
                class="btn-status-toggle"
                :class="u.status === 'active' ? 'btn-ban' : 'btn-activate'"
                @click="toggleUserStatus(u.id)"
              >
                {{ u.status === 'active' ? 'Suspend' : 'Reactivate' }}
              </button>
              <span v-else class="system-protected">Protected HQ</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAdminStore } from '../../../composables/useAdminStore';

const { users, toggleUserStatus } = useAdminStore();

const filterRole = ref('all');
const userSearchQuery = ref('');

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const matchRole = filterRole.value === 'all' || u.role === filterRole.value;
    const matchSearch = !userSearchQuery.value.trim() ||
      u.name.toLowerCase().includes(userSearchQuery.value.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.value.toLowerCase());
    return matchRole && matchSearch;
  });
});
</script>

<style scoped>
.user-mgmt-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mgmt-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 1.25rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-tabs {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.tab-btn:hover {
  background: #ffffff;
  color: #1e3a8a;
  border-color: #93c5fd;
}

.tab-btn.active {
  background: #1e3a8a;
  color: #ffffff;
  font-weight: 700;
  border-color: #1e3a8a;
}

.search-input-styled {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-xs);
  color: #0f172a;
  font-size: 0.8rem;
  outline: none;
  width: 240px;
}

.search-input-styled:focus {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.table-container {
  padding: 0.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.custom-table th {
  font-size: 0.72rem;
  font-weight: 800;
  color: #1e3a8a;
  letter-spacing: 0.04em;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.custom-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.82rem;
  vertical-align: middle;
}

.table-row:hover {
  background: #f8fafc;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.u-name {
  font-weight: 700;
  color: #0f172a;
}

.u-email {
  font-size: 0.72rem;
  color: #64748b;
}

.role-badge {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
}

.role-badge.admin { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.role-badge.merchant { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.role-badge.tourist { background: #fefce8; color: #854d0e; border: 1px solid #fef08a; }

.country-text {
  color: #334155;
  font-weight: 600;
}

.spent-val {
  font-weight: 700;
  color: #0f172a;
}

.spent-sub {
  font-size: 0.72rem;
  color: #64748b;
}

.status-badge {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
}

.status-badge.active { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.status-badge.banned { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

.last-active {
  font-size: 0.75rem;
  color: #64748b;
}

.btn-status-toggle {
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-xs);
  font-size: 0.74rem;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn-ban {
  background: #ffffff;
  color: #991b1b;
  border-color: #fecaca;
}

.btn-ban:hover {
  background: #fef2f2;
}

.btn-activate {
  background: #ffffff;
  color: #047857;
  border-color: #a7f3d0;
}

.btn-activate:hover {
  background: #ecfdf5;
}

.system-protected {
  font-size: 0.72rem;
  color: #94a3b8;
  font-weight: 600;
}
</style>
