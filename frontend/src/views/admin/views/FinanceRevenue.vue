<template>
  <div class="finance-revenue-view animate-fade-in">
    <!-- Summary KPI Cards (Real Database) -->
    <div class="finance-summary-row">
      <div class="fin-card">
        <span class="fin-label">Total Settled Volume</span>
        <span class="fin-value">IDR {{ totalSettledIdr.toLocaleString("id-ID") }}</span>
        <span class="fin-sub">SGD {{ totalSettledSgd.toFixed(2) }} (Gross Platform GMV)</span>
      </div>
      <div class="fin-card">
        <span class="fin-label">Retained Platform Take-Rate</span>
        <span class="fin-value">IDR {{ totalRetainedFeeIdr.toLocaleString("id-ID") }}</span>
        <span class="fin-sub">12.0% Average Take Rate</span>
      </div>
      <div class="fin-card">
        <span class="fin-label">Pending Merchant Payouts</span>
        <span class="fin-value">IDR {{ pendingPayoutsIdr.toLocaleString("id-ID") }}</span>
        <span class="fin-sub">Scheduled for Automated BI-FAST Batch</span>
      </div>
    </div>

    <!-- Cross-Border Settlement DataTable -->
    <ZenDataTable
      :columns="columns"
      :rows="transactions"
      search-placeholder="Search by transaction, spa name, or status..."
      empty-text="No transactions yet. Transactions will appear here after the first tourist booking is paid."
    >
      <template #toolbar>
        <div class="table-title-group">
          <h3 class="table-title">Cross-Border Settlement & Payout Ledger</h3>
          <span class="table-sub">Multi-currency reconciliation between tourist origin currency (SGD) and partner payout (IDR)</span>
        </div>
        <button class="btn-export">Download Audit CSV</button>
      </template>

      <template #cell-txnId="{ row }">
        <div class="cell-stack">
          <span class="cell-txn-id">{{ row.id || row.ref || 'TXN-...' }}</span>
          <span class="cell-sub">{{ row.date || 'Today' }}</span>
        </div>
      </template>

      <template #cell-tourist="{ row }">
        <div class="cell-stack">
          <span class="cell-name">{{ row.customer || row.guest_name || 'Traveler' }}</span>
          <span class="cell-sub">{{ row.paymentMethod || row.payment_method || 'PayNow SG' }}</span>
        </div>
      </template>

      <template #cell-spa="{ row }">
        <div class="cell-stack">
          <span class="cell-name">{{ row.merchant || row.merchant_name || 'Spa Partner' }}</span>
          <span class="cell-sub">{{ row.service || row.service_name || 'Spa Service' }}</span>
        </div>
      </template>

      <template #cell-gross="{ row }">
        <div class="cell-stack" style="text-align:right">
          <span class="cell-amount-primary">SGD {{ row.amountSgd || row.gross_sgd || 0 }}</span>
          <span class="cell-sub">IDR {{ Number(row.amountIdr || row.gross_idr || 0).toLocaleString("id-ID") }}</span>
        </div>
      </template>

      <template #cell-fee="{ row }">
        <span class="cell-fee">IDR {{ Number(row.platformFeeIdr || row.commission_idr || 0).toLocaleString("id-ID") }}</span>
      </template>

      <template #cell-payout="{ row }">
        <span class="cell-amount-primary">IDR {{ Number(row.merchantPayoutIdr || row.payout_idr || 0).toLocaleString("id-ID") }}</span>
      </template>

      <template #cell-status="{ row }">
        <div style="display:flex; align-items:center; justify-content:center;">
          <span v-if="row.payoutStatus === 'settled' || row.status === 'settled'" class="badge-settled">SETTLED</span>
          <button v-else class="btn-bifast" @click.stop="processPayout(row.id)">Execute BI-FAST</button>
        </div>
      </template>
    </ZenDataTable>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ZenDataTable from '../../../components/shared/ZenDataTable.vue';
import { useAdminStore } from '../../../composables/useAdminStore';

const { transactions, processPayout } = useAdminStore();

const columns = [
  { key: 'txnId', label: 'Transaction ID', sortable: false },
  { key: 'tourist', label: 'Tourist & Payment', sortable: false },
  { key: 'spa', label: 'Recipient Spa', sortable: false },
  { key: 'gross', label: 'Gross Amount', sortable: false, align: 'right' },
  { key: 'fee', label: 'Fee (12%)', sortable: false, align: 'right' },
  { key: 'payout', label: 'Net Payout', sortable: false, align: 'right' },
  { key: 'status', label: 'Status / Action', sortable: false, align: 'center' },
];

const totalSettledIdr = computed(() =>
  (transactions.value || []).filter(t => t.payoutStatus === 'settled' || t.status === 'settled')
    .reduce((acc, t) => acc + (Number(t.amountIdr || t.gross_idr) || 0), 0)
);
const totalSettledSgd = computed(() => totalSettledIdr.value / 11850);
const totalRetainedFeeIdr = computed(() =>
  (transactions.value || []).reduce((acc, t) => acc + (Number(t.platformFeeIdr || t.commission_idr) || 0), 0)
);
const pendingPayoutsIdr = computed(() =>
  (transactions.value || []).filter(t => t.payoutStatus === 'pending' || t.status === 'pending')
    .reduce((acc, t) => acc + (Number(t.merchantPayoutIdr || t.net_idr) || 0), 0)
);
</script>

<style scoped>
.finance-revenue-view { display: flex; flex-direction: column; gap: 1.25rem; }

/* KPI Cards */
.finance-summary-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.fin-card {
  padding: 1.25rem 1.5rem; border-radius: var(--radius-lg);
  background: #ffffff; border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex; flex-direction: column; gap: 0.35rem;
}
.fin-label { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #1e3a8a; }
.fin-value { font-size: 1.45rem; font-weight: 800; color: #0f172a; line-height: 1.2; }
.fin-sub { font-size: 0.75rem; color: #64748b; }

/* Table header area */
.table-title-group { flex: 1; }
.table-title { font-size: 0.95rem; font-weight: 800; color: #0f172a; margin: 0 0 0.2rem; }
.table-sub { font-size: 0.75rem; color: #64748b; }
.btn-export {
  padding: 0.4rem 0.9rem; border-radius: 7px;
  background: #f8fafc; border: 1px solid #e2e8f0;
  color: #475569; font-size: 0.75rem; font-weight: 600; cursor: pointer; white-space: nowrap;
}
.btn-export:hover { background: #f1f5f9; color: #1e3a8a; }

.cell-stack { display: flex; flex-direction: column; gap: 0.1rem; }
.cell-name { font-weight: 700; color: #0f172a; font-size: 0.83rem; }
.cell-txn-id { font-family: monospace; font-size: 0.78rem; color: #1d4ed8; font-weight: 700; }
.cell-sub { font-size: 0.72rem; color: #64748b; }
.cell-amount-primary { font-weight: 800; color: #0f172a; font-size: 0.83rem; }
.cell-fee { font-weight: 700; color: #b91c1c; font-size: 0.82rem; }

.badge-settled {
  font-size: 0.65rem; font-weight: 700; padding: 0.18rem 0.6rem; border-radius: 4px;
  background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;
}
.btn-bifast {
  padding: 0.35rem 0.85rem; border-radius: 7px;
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8);
  border: none; color: #fff; font-size: 0.74rem; font-weight: 700; cursor: pointer;
}
.btn-bifast:hover { opacity: 0.9; }

@media (max-width: 768px) {
  .finance-summary-row { grid-template-columns: 1fr; gap: 0.75rem; }
  .fin-value { font-size: 1.25rem; }
}
</style>

