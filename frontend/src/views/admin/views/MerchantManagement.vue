<template>
  <div class="merchant-mgmt-view animate-fade-in">
    <ZenDataTable
      :columns="columns"
      :rows="filteredMerchants"
      search-placeholder="Search partner name, region..."
      empty-text="No spa partners found for this filter."
    >
      <template #toolbar>
        <div class="filter-tabs">
          <button class="tab-btn" :class="{ active: filterStatus === 'all' }" @click="filterStatus = 'all'">
            All ({{ merchants.length }})
          </button>
          <button class="tab-btn" :class="{ active: filterStatus === 'pending' }" @click="filterStatus = 'pending'">
            Pending KYC ({{ pendingCount }})
          </button>
          <button class="tab-btn" :class="{ active: filterStatus === 'active' }" @click="filterStatus = 'active'">
            Verified
          </button>
          <button class="tab-btn" :class="{ active: filterStatus === 'suspended' }" @click="filterStatus = 'suspended'">
            Suspended
          </button>
        </div>
        <button class="btn-add-partner" @click="showAddModal = true">+ Register Partner</button>
      </template>

      <template #cell-spa="{ row }">
        <div class="cell-stack">
          <span class="cell-name">{{ row.name || 'Spa Partner' }}</span>
          <span class="cell-sub">{{ row.ownerName || row.owner_name || 'Owner' }}</span>
        </div>
      </template>

      <template #cell-region="{ row }">
        <div class="cell-stack">
          <span class="badge-region">{{ String(row.region || 'batam').toUpperCase() }}</span>
          <span class="cell-sub">{{ row.city || 'Batam' }}</span>
        </div>
      </template>

      <template #cell-hygiene="{ row }">
        <span class="cell-score">{{ row.hygieneScore || row.hygiene_score || 98 }}/100</span>
      </template>

      <template #cell-commission="{ row }">
        <span class="cell-commission">{{ row.commissionRate || row.commission_rate || 12 }}%</span>
      </template>

      <template #cell-kyc="{ row }">
        <span class="badge-kyc" :class="row.status || 'active'">
          {{ (row.status || 'active') === 'active' ? 'VERIFIED' : (row.status === 'pending' ? 'PENDING KYC' : 'SUSPENDED') }}
        </span>
      </template>

      <template #cell-gmv="{ row }">
        <div class="cell-stack" style="text-align: right">
          <span class="cell-amount">IDR {{ ((row.revenueIdr || row.revenue_idr || 0) / 1000000).toFixed(1) }}M</span>
          <span class="cell-sub">{{ row.totalBookings || row.total_bookings || 0 }} bookings</span>
        </div>
      </template>

      <template #cell-actions="{ row }">
        <div class="actions-cell">
          <button v-if="row.status === 'pending'" class="btn-action approve" @click.stop="approveMerchant(row.id)">
            Approve KYC
          </button>
          <button v-else class="btn-action" :class="row.status === 'suspended' ? 'reactivate' : 'suspend'"
            @click.stop="suspendMerchant(row.id)">
            {{ row.status === 'suspended' ? 'Reactivate' : 'Suspend' }}
          </button>
        </div>
      </template>
    </ZenDataTable>

    <!-- Add Partner Modal -->
    <div v-if="showAddModal" class="modal-backdrop" @click.self="showAddModal = false">
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">Register New Spa Partner</h3>
          <button class="modal-close" @click="showAddModal = false">x</button>
        </div>
        <p class="modal-sub">Add partner details, operating region, and hygiene audit score.</p>
        <div class="modal-form">
          <div class="form-group">
            <label>Spa / Center Name</label>
            <input v-model="newSpa.name" type="text" class="input-styled" placeholder="e.g. Royal Balinese Sanctuary" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Owner Name</label>
              <input v-model="newSpa.owner" type="text" class="input-styled" placeholder="Full name..." />
            </div>
            <div class="form-group">
              <label>Corridor Region</label>
              <select v-model="newSpa.region" class="input-styled">
                <option value="batam">Batam (Harbour Bay)</option>
                <option value="batam_centre">Batam Centre Terminal</option>
                <option value="batam_nongsa">Batam Nongsa Pura</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Platform Commission (%)</label>
            <input v-model="newSpa.commission" type="number" class="input-styled" placeholder="12" />
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showAddModal = false">Cancel</button>
          <button class="btn-save" @click="handleCreateMerchant">Save Partner</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAdminStore } from '../../../composables/useAdminStore';
import { useNotification } from '../../../composables/useNotification';
import ZenDataTable from '../../../components/shared/ZenDataTable.vue';

const { merchants, approveMerchant, suspendMerchant } = useAdminStore();
const { showToast } = useNotification();

const filterStatus = ref('all');
const showAddModal = ref(false);
const newSpa = ref({ name: '', owner: '', region: 'batam', commission: 12 });

const columns = [
  { key: 'spa', label: 'Spa Name & Owner', sortable: false },
  { key: 'region', label: 'Corridor / City', sortable: true },
  { key: 'hygiene', label: 'Hygiene Score', sortable: false, align: 'center' },
  { key: 'commission', label: 'Take Rate', sortable: false, align: 'center' },
  { key: 'kyc', label: 'KYC Status', sortable: true },
  { key: 'gmv', label: 'Total GMV', sortable: false, align: 'right' },
  { key: 'actions', label: 'Admin Actions', sortable: false, align: 'center' },
];

const pendingCount = computed(() => merchants.value.filter(m => m.status === 'pending').length);
const filteredMerchants = computed(() =>
  filterStatus.value === 'all' ? merchants.value : merchants.value.filter(m => m.status === filterStatus.value)
);

const handleCreateMerchant = () => {
  if (!newSpa.value.name) return;
  merchants.value.unshift({
    id: `merch-${Date.now()}`, name: newSpa.value.name,
    ownerName: newSpa.value.owner || 'New Partner', region: newSpa.value.region,
    city: newSpa.value.region === 'batam' ? 'Harbour Bay, Batam' : newSpa.value.region === 'batam_centre' ? 'Batam Centre' : 'Nongsa, Batam',
    status: 'pending', hygieneScore: 95, commissionRate: Number(newSpa.value.commission) || 12,
    totalBookings: 0, revenueIdr: 0, kycDocumentsVerified: false, rating: 4.8,
  });
  showToast(`Partner "${newSpa.value.name}" added!`, 'success');
  showAddModal.value = false;
  newSpa.value = { name: '', owner: '', region: 'batam', commission: 12 };
};
</script>

<style scoped>
.merchant-mgmt-view { display: flex; flex-direction: column; }

.filter-tabs { display: flex; gap: 0.35rem; flex-wrap: wrap; }
.tab-btn {
  padding: 0.35rem 0.85rem; border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #f8fafc; color: #475569;
  font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.15s;
}
.tab-btn:hover { background: #f1f5f9; color: #1e3a8a; }
.tab-btn.active { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; font-weight: 700; }

.btn-add-partner {
  padding: 0.4rem 1rem; border-radius: 8px;
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8);
  border: none; color: #fff; font-size: 0.78rem; font-weight: 700;
  cursor: pointer; white-space: nowrap; transition: opacity 0.15s;
}
.btn-add-partner:hover { opacity: 0.9; }

.cell-stack { display: flex; flex-direction: column; gap: 0.1rem; }
.cell-name { font-weight: 700; color: #0f172a; font-size: 0.83rem; }
.cell-sub { font-size: 0.72rem; color: #64748b; }
.cell-score { font-weight: 800; color: #047857; }
.cell-commission { font-weight: 700; color: #1e3a8a; }
.cell-amount { font-weight: 800; color: #0f172a; font-size: 0.83rem; }

.badge-region {
  display: inline-block; font-size: 0.62rem; font-weight: 700; padding: 0.1rem 0.4rem;
  border-radius: 4px; background: #eff6ff; color: #1d4ed8;
  border: 1px solid #bfdbfe;
}
.badge-kyc {
  font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px;
}
.badge-kyc.active { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.badge-kyc.pending { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.badge-kyc.suspended { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

.actions-cell { display: flex; justify-content: center; }
.btn-action {
  padding: 0.3rem 0.75rem; border-radius: 6px; font-size: 0.73rem; font-weight: 700;
  border: 1px solid transparent; cursor: pointer; transition: all 0.15s;
}
.btn-action.approve { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.btn-action.approve:hover { background: #d1fae5; }
.btn-action.suspend { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
.btn-action.suspend:hover { background: #fee2e2; }
.btn-action.reactivate { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
.btn-action.reactivate:hover { background: #dbeafe; }

/* Modal */
.modal-backdrop {
  position: fixed; inset: 0; background: rgba(15,23,42,0.6);
  display: flex; align-items: center; justify-content: center;
  z-index: 999; padding: 1rem;
}
.modal-box {
  background: #ffffff; border: 1px solid #e2e8f0;
  border-radius: 16px; padding: 1.75rem; width: 100%; max-width: 520px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}
.modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem; }
.modal-title { font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0; }
.modal-close { background: none; border: none; color: #64748b; font-size: 1.2rem; cursor: pointer; }
.modal-sub { font-size: 0.8rem; color: #64748b; margin: 0 0 1.25rem; }
.modal-form { display: flex; flex-direction: column; gap: 0.85rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.form-group { display: flex; flex-direction: column; gap: 0.35rem; }
.form-group label { font-size: 0.75rem; font-weight: 700; color: #334155; }
.input-styled {
  padding: 0.55rem 0.85rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px; color: #0f172a;
  font-size: 0.82rem; outline: none;
}
.input-styled:focus { border-color: #1d4ed8; background: #ffffff; }
.modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1rem; }
.btn-cancel {
  padding: 0.5rem 1.25rem; border-radius: 8px;
  background: #f8fafc; border: 1px solid #e2e8f0;
  color: #475569; font-size: 0.82rem; font-weight: 600; cursor: pointer;
}
.btn-save {
  padding: 0.5rem 1.25rem; border-radius: 8px;
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8);
  border: none; color: #fff; font-size: 0.82rem; font-weight: 700; cursor: pointer;
}

@media (max-width: 480px) {
  .form-row { grid-template-columns: 1fr; }
}
</style>

