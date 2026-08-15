<template>
  <div class="finance-revenue-view animate-fade-in">
    <!-- Summary Financial Cards in English -->
    <div class="finance-summary-row">
      <div class="fin-card">
        <span class="fin-label">Total Settled Volume</span>
        <span class="fin-value">IDR 428.5M</span>
        <span class="fin-sub">≈ SGD 36,120 (Gross Platform GMV)</span>
      </div>

      <div class="fin-card">
        <span class="fin-label">Retained Platform Take-Rate</span>
        <span class="fin-value">IDR 51.4M</span>
        <span class="fin-sub">12.0% Average Take Rate</span>
      </div>

      <div class="fin-card">
        <span class="fin-label">Pending Merchant Payouts</span>
        <span class="fin-value">IDR 12.8M</span>
        <span class="fin-sub">Scheduled for Automated BI-FAST Batch</span>
      </div>
    </div>

    <!-- Cross-Border Transactions Table -->
    <div class="transactions-card">
      <div class="card-header">
        <div>
          <h3 class="card-title">Cross-Border Settlement & Payout Ledger</h3>
          <span class="card-sub">Multi-currency exchange reconciliation between tourist origin currency (SGD/MYR) and partner payout (IDR)</span>
        </div>
        <button class="btn-export">Download Audit CSV</button>
      </div>

      <div class="table-container">
        <table class="custom-table">
          <thead>
            <tr>
              <th>TRANSACTION ID</th>
              <th>TOURIST & PAYMENT</th>
              <th>RECIPIENT SPA</th>
              <th>GROSS AMOUNT</th>
              <th>FEE (12%)</th>
              <th>NET PAYOUT</th>
              <th>STATUS / ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="txn in transactions" :key="txn.id" class="table-row">
              <td>
                <div class="txn-meta">
                  <span class="txn-id">{{ txn.id }}</span>
                  <span class="txn-date">{{ txn.date }}</span>
                </div>
              </td>
              <td>
                <div class="cust-info">
                  <span class="cust-name">{{ txn.customer }}</span>
                  <span class="cust-method">{{ txn.paymentMethod }}</span>
                </div>
              </td>
              <td>
                <div class="merch-info">
                  <span class="merch-name">{{ txn.merchant }}</span>
                  <span class="merch-svc">{{ txn.service }}</span>
                </div>
              </td>
              <td>
                <div class="amount-info">
                  <span class="amount-orig">{{ txn.amountOriginal }}</span>
                  <span class="amount-idr">IDR {{ txn.amountIdr.toLocaleString('id-ID') }}</span>
                </div>
              </td>
              <td>
                <span class="fee-text">IDR {{ txn.platformFeeIdr.toLocaleString('id-ID') }}</span>
              </td>
              <td>
                <span class="payout-val">IDR {{ txn.merchantPayoutIdr.toLocaleString('id-ID') }}</span>
              </td>
              <td>
                <div class="payout-action-cell">
                  <span 
                    v-if="txn.payoutStatus === 'settled'" 
                    class="badge-settled"
                  >
                    SETTLED
                  </span>
                  <button 
                    v-else 
                    class="btn-process-payout"
                    @click="processPayout(txn.id)"
                  >
                    Execute BI-FAST
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '../../../composables/useAdminStore';

const { transactions, processPayout } = useAdminStore();
</script>

<style scoped>
.finance-revenue-view {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.finance-summary-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.fin-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
}

.fin-label {
  font-size: 0.78rem;
  color: #1e3a8a;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.35rem;
}

.fin-value {
  font-size: 1.6rem;
  font-weight: 800;
  color: #0f172a;
}

.fin-sub {
  font-size: 0.74rem;
  color: #64748b;
  margin-top: 0.25rem;
}

.transactions-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.card-title {
  font-size: 1rem;
  color: #0f172a;
  font-weight: 700;
  margin: 0;
}

.card-sub {
  font-size: 0.76rem;
  color: #64748b;
}

.btn-export {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  transition: all 0.15s;
}

.btn-export:hover {
  background: #1e3a8a;
  color: #ffffff;
}

.table-container {
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

.txn-meta {
  display: flex;
  flex-direction: column;
}

.txn-id {
  font-weight: 700;
  color: #0f172a;
}

.txn-date {
  font-size: 0.72rem;
  color: #64748b;
}

.cust-info, .merch-info, .amount-info {
  display: flex;
  flex-direction: column;
}

.cust-name, .merch-name {
  font-weight: 700;
  color: #0f172a;
}

.cust-method, .merch-svc, .amount-idr {
  font-size: 0.74rem;
  color: #64748b;
}

.amount-orig {
  font-weight: 700;
  color: #1e3a8a;
}

.fee-text {
  font-weight: 600;
  color: #64748b;
}

.payout-val {
  font-weight: 800;
  color: #0f172a;
}

.badge-settled {
  font-size: 0.68rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.btn-process-payout {
  background: #1e3a8a;
  color: #ffffff;
  border: none;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
}

.btn-process-payout:hover {
  background: #1d4ed8;
}

@media (max-width: 900px) {
  .finance-summary-row {
    grid-template-columns: 1fr;
  }
}
</style>
