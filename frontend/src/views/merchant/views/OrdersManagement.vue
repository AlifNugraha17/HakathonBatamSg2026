<template>
  <div class="orders-management-view animate-fade-in">
    <ZenDataTable
      :columns="columns"
      :rows="filteredBookings"
      search-placeholder="Search by guest name, booking code, or service..."
      empty-text="No incoming orders yet. Orders from tourists will appear here in real-time."
      :default-per-page="10"
    >
      <template #toolbar>
        <div class="filter-group">
          <button class="tab-btn" :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">
            All Orders ({{ merchantBookings.length }})
          </button>
          <button class="tab-btn" :class="{ active: activeFilter === 'pending' }" @click="activeFilter = 'pending'">
            Pending ({{ pendingCount }})
          </button>
          <button class="tab-btn" :class="{ active: activeFilter === 'confirmed' }" @click="activeFilter = 'confirmed'">
            Confirmed
          </button>
        </div>
        <span class="wa-sync">
          WhatsApp Sync: <strong>+62 812-7788-9901</strong>
        </span>
      </template>

      <template #cell-order="{ row }">
        <div class="cell-stack">
          <span class="cell-booking-id">#{{ row.id || row.booking_code }}</span>
          <span class="cell-sub">{{ row.createdAt || row.created_at || 'Today' }}</span>
        </div>
      </template>

      <template #cell-status="{ row }">
        <span class="badge-status" :class="row.status || 'pending'">
          {{ (row.status || 'pending') === 'confirmed' ? 'CONFIRMED' : 'PENDING' }}
        </span>
      </template>

      <template #cell-guest="{ row }">
        <div class="cell-stack">
          <span class="cell-name">{{ row.touristName || row.guest_name || 'Traveler' }}</span>
          <span class="cell-sub">{{ row.touristCountry || 'Singapore' }} &bull; {{ row.guest_phone || '+65 XXXX XXXX' }}</span>
        </div>
      </template>

      <template #cell-service="{ row }">
        <div class="cell-stack">
          <span class="cell-name">{{ row.serviceName || row.service_name || 'Express Massage' }}</span>
          <span class="cell-sub">{{ row.timeSlot || row.booking_time || '—' }} &bull; {{ row.therapistName || row.therapist_name || 'Senior Master' }}</span>
        </div>
      </template>

      <template #cell-price="{ row }">
        <span class="cell-amount">IDR {{ Number(row.priceIdr || row.price_idr || 0).toLocaleString("id-ID") }}</span>
      </template>

      <template #cell-notes="{ row }">
        <div v-if="row.touristNotes || row.medical_notes" class="ai-notes-cell">
          <span class="notes-label">AI Bridge</span>
          <p class="notes-text">{{ (row.touristNotes || row.medical_notes || '').slice(0, 60) }}...</p>
        </div>
        <span v-else class="cell-sub">—</span>
      </template>

      <template #cell-actions="{ row }">
        <div class="actions-cell">
          <button class="btn-card-open" @click.stop="openTherapistCard(row)">AI Card</button>
          <template v-if="row.status === 'pending'">
            <button class="btn-decline" @click.stop="handleDecline(row.id)">Decline</button>
            <button class="btn-confirm" @click.stop="handleConfirm(row.id)">Accept</button>
          </template>
          <span v-else class="confirmed-text">v Ready</span>
        </div>
      </template>
    </ZenDataTable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useZenturaStore } from '../../../composables/useZenturaStore';
import { useNotification } from '../../../composables/useNotification';
import ZenDataTable from '../../../components/shared/ZenDataTable.vue';

const { merchantBookings, confirmBooking, declineBooking, selectedTherapistCardBooking } = useZenturaStore();
const { showToast } = useNotification();

const activeFilter = ref('all');

const columns = [
  { key: 'order', label: 'Order ID', sortable: false },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'guest', label: 'Guest Profile', sortable: false },
  { key: 'service', label: 'Service & Time', sortable: false },
  { key: 'price', label: 'Price', sortable: true, align: 'right' },
  { key: 'notes', label: 'AI Health Notes', sortable: false },
  { key: 'actions', label: 'Actions', sortable: false, align: 'center' },
];

const pendingCount = computed(() => merchantBookings.value.filter(b => b.status === 'pending').length);
const filteredBookings = computed(() =>
  activeFilter.value === 'all' ? merchantBookings.value : merchantBookings.value.filter(b => b.status === activeFilter.value)
);

const handleConfirm = (id) => { confirmBooking(id); showToast(`Reservation #${id} confirmed!`, 'success'); };
const handleDecline = (id) => { declineBooking(id); showToast(`Reservation #${id} declined.`, 'info'); };
const openTherapistCard = (booking) => { selectedTherapistCardBooking.value = booking; };
</script>

<style scoped>
.orders-management-view { display: flex; flex-direction: column; }

.filter-group { display: flex; gap: 0.35rem; flex-wrap: wrap; align-items: center; }
.tab-btn {
  padding: 0.35rem 0.85rem; border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #f8fafc; color: #475569;
  font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.15s;
}
.tab-btn:hover { background: #f1f5f9; color: #1e3a8a; }
.tab-btn.active { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; font-weight: 700; }
.wa-sync { font-size: 0.74rem; color: #64748b; white-space: nowrap; margin-left: auto; }
.wa-sync strong { color: #047857; }

.cell-stack { display: flex; flex-direction: column; gap: 0.1rem; }
.cell-booking-id { font-family: monospace; font-weight: 800; color: #1d4ed8; font-size: 0.83rem; }
.cell-name { font-weight: 700; color: #0f172a; font-size: 0.83rem; }
.cell-sub { font-size: 0.72rem; color: #64748b; }
.cell-amount { font-weight: 800; color: #0f172a; }

.badge-status {
  font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px;
}
.badge-status.pending { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
.badge-status.confirmed { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }

.ai-notes-cell { display: flex; flex-direction: column; gap: 0.15rem; max-width: 220px; }
.notes-label { font-size: 0.62rem; font-weight: 800; color: #1d4ed8; text-transform: uppercase; }
.notes-text { font-size: 0.75rem; color: #475569; margin: 0; line-height: 1.35; }

.actions-cell { display: flex; align-items: center; gap: 0.4rem; justify-content: center; flex-wrap: wrap; }
.btn-card-open {
  padding: 0.3rem 0.65rem; border-radius: 6px; font-size: 0.72rem; font-weight: 700;
  background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; cursor: pointer;
}
.btn-decline {
  padding: 0.3rem 0.65rem; border-radius: 6px; font-size: 0.72rem; font-weight: 700;
  background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; cursor: pointer;
}
.btn-decline:hover { background: #fee2e2; }
.btn-confirm {
  padding: 0.3rem 0.75rem; border-radius: 6px; font-size: 0.72rem; font-weight: 700;
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8); border: none; color: #fff; cursor: pointer;
}
.btn-confirm:hover { opacity: 0.9; }
.confirmed-text { font-size: 0.72rem; color: #047857; font-weight: 800; }
</style>

