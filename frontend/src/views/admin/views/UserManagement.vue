<template>
  <div class="user-mgmt-view animate-fade-in">
    <ZenDataTable
      :columns="columns"
      :rows="filteredUsers"
      :is-loading="isLoading"
      search-placeholder="Search by name or email..."
      empty-text="No users found. Use the filter tabs above to change the view."
    >
      <template #toolbar>
        <div class="filter-tabs">
          <button class="tab-btn" :class="{ active: filterRole === 'all' }" @click="filterRole = 'all'">
            All ({{ users.length }})
          </button>
          <button class="tab-btn" :class="{ active: filterRole === 'tourist' }" @click="filterRole = 'tourist'">
            Tourists
          </button>
          <button class="tab-btn" :class="{ active: filterRole === 'merchant' }" @click="filterRole = 'merchant'">
            Partners
          </button>
          <button class="tab-btn" :class="{ active: filterRole === 'admin' }" @click="filterRole = 'admin'">
            Admins
          </button>
        </div>
      </template>

      <template #cell-account="{ row }">
        <div class="cell-stack">
          <span class="cell-name">{{ row.name || 'User' }}</span>
          <span class="cell-sub">{{ row.email || '-' }}</span>
        </div>
      </template>

      <template #cell-role="{ row }">
        <span class="badge-role" :class="row.role || 'tourist'">
          {{ String(row.role || 'tourist').toUpperCase() }}
        </span>
      </template>

      <template #cell-country="{ row }">
        <span class="cell-country">{{ row.country || 'Singapore' }}</span>
      </template>

      <template #cell-spent="{ row }">
        <span v-if="row.role === 'tourist'" class="cell-amount">
          SGD {{ row.totalSpentSgd || row.total_spent_sgd || 0 }}
        </span>
        <span v-else class="cell-sub">Partner Hub</span>
      </template>

      <template #cell-status="{ row }">
        <span class="badge-status" :class="row.status || 'active'">
          {{ (row.status || 'active') === 'active' ? 'ACTIVE' : 'SUSPENDED' }}
        </span>
      </template>

      <template #cell-lastActive="{ row }">
        <span class="cell-sub">{{ row.lastActive || row.last_active || 'Today' }}</span>
      </template>

      <template #cell-actions="{ row }">
        <button
          v-if="row.role !== 'admin'"
          class="btn-action"
          :class="(row.status || 'active') === 'active' ? 'btn-ban' : 'btn-activate'"
          @click.stop="toggleUserStatus(row.id)"
        >
          {{ (row.status || 'active') === 'active' ? 'Suspend' : 'Reactivate' }}
        </button>
        <span v-else class="cell-protected">Protected HQ</span>
      </template>
    </ZenDataTable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAdminStore } from '../../../composables/useAdminStore';
import ZenDataTable from '../../../components/shared/ZenDataTable.vue';

const { users, isLoading, toggleUserStatus } = useAdminStore();

const filterRole = ref('all');

const columns = [
  { key: 'account', label: 'Account & Contact', sortable: false },
  { key: 'role', label: 'System Role', sortable: true },
  { key: 'country', label: 'Origin Region', sortable: true },
  { key: 'spent', label: 'Lifetime Spent', sortable: false, align: 'right' },
  { key: 'status', label: 'Security Status', sortable: true },
  { key: 'lastActive', label: 'Last Active', sortable: false },
  { key: 'actions', label: 'Actions', sortable: false, align: 'center' },
];

const filteredUsers = computed(() =>
  users.value.filter(u =>
    filterRole.value === 'all' || u.role === filterRole.value
  )
);
</script>

<style scoped>
.user-mgmt-view { display: flex; flex-direction: column; }

.filter-tabs { display: flex; gap: 0.35rem; flex-wrap: wrap; }
.tab-btn {
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.tab-btn:hover { background: #f1f5f9; color: #1e3a8a; }
.tab-btn.active {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
  font-weight: 700;
}

.cell-stack { display: flex; flex-direction: column; gap: 0.1rem; }
.cell-name { font-weight: 700; color: #0f172a; font-size: 0.83rem; }
.cell-sub { font-size: 0.72rem; color: #64748b; }
.cell-country { font-weight: 600; color: #334155; }
.cell-amount { font-weight: 800; color: #1e3a8a; }
.cell-protected { font-size: 0.72rem; color: #94a3b8; font-weight: 600; }

.badge-role {
  font-size: 0.65rem; font-weight: 700;
  padding: 0.15rem 0.5rem; border-radius: 4px;
}
.badge-role.admin { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.badge-role.merchant { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.badge-role.tourist { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }

.badge-status {
  font-size: 0.65rem; font-weight: 700;
  padding: 0.15rem 0.5rem; border-radius: 4px;
}
.badge-status.active { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.badge-status.banned,
.badge-status.suspended { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

.btn-action {
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 0.73rem; font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer; transition: all 0.15s;
}
.btn-ban { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.btn-ban:hover { background: #fee2e2; }
.btn-activate { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.btn-activate:hover { background: #d1fae5; }
</style>

