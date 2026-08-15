<template>
  <div class="merchant-mgmt-view animate-fade-in">
    <!-- Header Controls & Filter in English -->
    <div class="mgmt-header-row">
      <div class="filter-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: filterStatus === 'all' }"
          @click="filterStatus = 'all'"
        >
          All Partners ({{ merchants.length }})
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: filterStatus === 'pending' }"
          @click="filterStatus = 'pending'"
        >
          Pending KYC ({{ pendingCount }})
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: filterStatus === 'active' }"
          @click="filterStatus = 'active'"
        >
          Verified Active
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: filterStatus === 'suspended' }"
          @click="filterStatus = 'suspended'"
        >
          Suspended
        </button>
      </div>

      <button class="btn-add-merchant" @click="showAddModal = true">
        + Register New Partner
      </button>
    </div>

    <!-- Merchants Table -->
    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th>SPA NAME & OWNER</th>
            <th>CORRIDOR / CITY</th>
            <th>HYGIENE SCORE</th>
            <th>TAKE RATE</th>
            <th>KYC STATUS</th>
            <th>TOTAL GMV</th>
            <th>ADMIN ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in filteredMerchants" :key="m.id" class="table-row">
            <td>
              <div class="merchant-info">
                <span class="m-name">{{ m.name }}</span>
                <span class="m-owner">{{ m.ownerName }} • {{ m.phone }}</span>
              </div>
            </td>
            <td>
              <div class="location-cell">
                <span class="region-pill">{{ m.region.toUpperCase() }}</span>
                <span class="city-text">{{ m.city }}</span>
              </div>
            </td>
            <td>
              <span class="hygiene-text">{{ m.hygieneScore }}/100</span>
            </td>
            <td>
              <span class="commission-text">{{ m.commissionRate }}%</span>
            </td>
            <td>
              <span class="status-pill" :class="m.status">
                {{ m.status === 'active' ? 'VERIFIED' : (m.status === 'pending' ? 'PENDING KYC' : 'SUSPENDED') }}
              </span>
            </td>
            <td>
              <div class="revenue-cell">
                <span class="rev-val">IDR {{ (m.revenueIdr / 1000000).toFixed(1) }}M</span>
                <span class="rev-sub">{{ m.totalBookings }} bookings</span>
              </div>
            </td>
            <td>
              <div class="actions-cell">
                <button 
                  v-if="m.status === 'pending'"
                  class="btn-action approve"
                  @click="approveMerchant(m.id)"
                >
                  Approve KYC
                </button>
                <button 
                  v-else
                  class="btn-action suspend"
                  :class="{ 'reactivate': m.status === 'suspended' }"
                  @click="suspendMerchant(m.id)"
                >
                  {{ m.status === 'suspended' ? 'Reactivate' : 'Suspend' }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredMerchants.length === 0" class="empty-state">
        <span>No spa partners found with this filter status.</span>
      </div>
    </div>

    <!-- Modal for Adding Demo Merchant -->
    <div v-if="showAddModal" class="modal-backdrop">
      <div class="modal-content">
        <h3 class="modal-title">Register New Spa Partner</h3>
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

const { merchants, approveMerchant, suspendMerchant } = useAdminStore();
const { showToast } = useNotification();

const filterStatus = ref('all');
const showAddModal = ref(false);

const newSpa = ref({
  name: '',
  owner: '',
  region: 'batam',
  commission: 12
});

const pendingCount = computed(() => {
  return merchants.value.filter(m => m.status === 'pending').length;
});

const filteredMerchants = computed(() => {
  if (filterStatus.value === 'all') return merchants.value;
  return merchants.value.filter(m => m.status === filterStatus.value);
});

const handleCreateMerchant = () => {
  if (!newSpa.value.name) return;
  merchants.value.unshift({
    id: `merch-${Date.now()}`,
    name: newSpa.value.name,
    ownerName: newSpa.value.owner || 'New Partner',
    region: newSpa.value.region,
    city: newSpa.value.region === 'batam' ? 'Harbour Bay, Batam' : (newSpa.value.region === 'batam_centre' ? 'Batam Centre' : 'Nongsa, Batam'),
    email: 'contact@' + newSpa.value.name.toLowerCase().replace(/\s+/g, '') + '.id',
    phone: '+62 812-9900-1122',
    joinedDate: '2026-08-15',
    status: 'pending',
    hygieneScore: 95,
    commissionRate: Number(newSpa.value.commission) || 12,
    totalBookings: 0,
    revenueIdr: 0,
    kycDocumentsVerified: false,
    rating: 4.8
  });
  showToast(`Partner "${newSpa.value.name}" added successfully!`, 'success');
  showAddModal.value = false;
  newSpa.value = { name: '', owner: '', region: 'batam', commission: 12 };
};
</script>

<style scoped>
.merchant-mgmt-view {
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

.btn-add-merchant {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(29, 78, 216, 0.2);
}

.btn-add-merchant:hover {
  background: #0f172a;
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
  white-space: nowrap;
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

.merchant-info {
  display: flex;
  flex-direction: column;
}

.m-name {
  font-weight: 700;
  color: #0f172a;
}

.m-owner {
  font-size: 0.72rem;
  color: #64748b;
}

.region-pill {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  display: inline-block;
}

.city-text {
  display: block;
  font-size: 0.72rem;
  color: #64748b;
}

.hygiene-text {
  font-weight: 700;
  color: #047857;
}

.commission-text {
  font-weight: 700;
  color: #0f172a;
}

.status-pill {
  font-size: 0.68rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.status-pill.active { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
.status-pill.pending { background: #fefce8; color: #854d0e; border: 1px solid #fef08a; }
.status-pill.suspended { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

.revenue-cell {
  display: flex;
  flex-direction: column;
}

.rev-val {
  font-weight: 700;
  color: #0f172a;
}

.rev-sub {
  font-size: 0.7rem;
  color: #64748b;
}

.actions-cell {
  display: flex;
  gap: 0.4rem;
}

.btn-action {
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-xs);
  font-size: 0.74rem;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn-action.approve {
  background: #1e3a8a;
  color: #ffffff;
}

.btn-action.approve:hover {
  background: #1d4ed8;
}

.btn-action.suspend {
  background: #ffffff;
  color: #991b1b;
  border-color: #fecaca;
}

.btn-action.suspend:hover {
  background: #fef2f2;
}

.btn-action.suspend.reactivate {
  background: #ffffff;
  color: #047857;
  border-color: #a7f3d0;
}

.empty-state {
  text-align: center;
  padding: 2.5rem;
  color: #64748b;
  font-size: 0.85rem;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal-content {
  width: 90%;
  max-width: 440px;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.modal-sub {
  font-size: 0.8rem;
  color: #64748b;
  margin-bottom: 1.25rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.input-styled {
  width: 100%;
  padding: 0.6rem 0.85rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-xs);
  color: #0f172a;
  font-size: 0.84rem;
  outline: none;
}

.input-styled:focus {
  border-color: #2563eb;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #e2e8f0;
  color: #475569;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-xs);
  font-size: 0.82rem;
  cursor: pointer;
}

.btn-save {
  background: #1e3a8a;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-xs);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
}
</style>
