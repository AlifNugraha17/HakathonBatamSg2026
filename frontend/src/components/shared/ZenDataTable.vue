<template>
  <div class="zen-datatable">
    <div class="dt-toolbar" v-if="searchable || $slots.toolbar">
      <div class="dt-toolbar-left">
        <div v-if="searchable" class="dt-search-wrap">
          <svg class="dt-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input v-model="searchQuery" type="text" class="dt-search-input" :placeholder="searchPlaceholder" />
          <button v-if="searchQuery" class="dt-clear-btn" @click="searchQuery = ''">x</button>
        </div>
      </div>
      <div class="dt-toolbar-right">
        <slot name="toolbar" />
      </div>
    </div>

    <div class="dt-table-wrap">
      <table class="dt-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key"
              :class="['dt-th', col.align ? 'align-'+col.align : '', col.sortable ? 'sortable' : '']"
              :style="col.width ? { width: col.width } : {}"
              @click="col.sortable ? toggleSort(col.key) : null">
              <span class="dt-th-content">
                {{ col.label }}
                <span v-if="col.sortable" class="sort-icon">
                  <span v-if="sortKey === col.key">{{ sortDir === 'asc' ? ' ^' : ' v' }}</span>
                  <span v-else> -</span>
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td :colspan="columns.length" class="dt-state-row">
              <div class="dt-spinner"></div><span>Loading data...</span>
            </td>
          </tr>
          <tr v-else-if="paginatedRows.length === 0">
            <td :colspan="columns.length" class="dt-state-row">
              <div class="dt-empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="36" height="36">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="9" x2="9" y2="21"/>
                </svg>
                <p>{{ emptyText }}</p>
              </div>
            </td>
          </tr>
          <tr v-else v-for="(row, rowIdx) in paginatedRows" :key="row.id || rowIdx"
            class="dt-row" :class="{ 'dt-row-clickable': rowClickable }"
            @click="$emit('row-click', row)">
            <td v-for="col in columns" :key="col.key"
              :class="['dt-td', col.align ? 'align-'+col.align : '']"
              :data-label="col.label">
              <slot :name="'cell-'+col.key" :row="row" :value="getVal(row, col.key)">
                <span>{{ getVal(row, col.key) ?? '-' }}</span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="dt-footer">
      <span class="dt-count">
        <template v-if="filteredRows.length === 0">0 records</template>
        <template v-else>
          {{ (currentPage - 1) * perPage + 1 }}&ndash;{{ Math.min(currentPage * perPage, filteredRows.length) }}
          of {{ filteredRows.length }} records
        </template>
      </span>

      <div class="dt-pagination">
        <button class="dt-page-btn" :disabled="currentPage <= 1" @click="currentPage--">&#8249; Prev</button>
        <template v-for="p in visiblePages" :key="String(p)">
          <span v-if="p === '...'" class="dt-ellipsis">...</span>
          <button v-else class="dt-page-btn" :class="{ active: p === currentPage }" @click="currentPage = p">{{ p }}</button>
        </template>
        <button class="dt-page-btn" :disabled="currentPage >= totalPages" @click="currentPage++">Next &#8250;</button>
      </div>

      <div class="dt-per-page-wrap">
        <label class="dt-per-page-label">Rows per page:</label>
        <select v-model.number="perPage" class="dt-per-page-select">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  searchable: { type: Boolean, default: true },
  searchPlaceholder: { type: String, default: 'Search...' },
  emptyText: { type: String, default: 'No data found.' },
  defaultPerPage: { type: Number, default: 10 },
  isLoading: { type: Boolean, default: false },
  rowClickable: { type: Boolean, default: false },
});
defineEmits(['row-click']);

const searchQuery = ref('');
const sortKey = ref('');
const sortDir = ref('asc');
const currentPage = ref(1);
const perPage = ref(props.defaultPerPage);

watch([searchQuery, perPage], () => { currentPage.value = 1; });

function getVal(row, key) {
  return key.split('.').reduce((obj, k) => obj?.[k], row);
}
function toggleSort(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDir.value = 'asc';
  }
  currentPage.value = 1;
}

const filteredRows = computed(() => {
  let result = [...(props.rows ?? [])];
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(row =>
      Object.values(row).some(v => String(v ?? '').toLowerCase().includes(q))
    );
  }
  if (sortKey.value) {
    result.sort((a, b) => {
      const av = getVal(a, sortKey.value) ?? '';
      const bv = getVal(b, sortKey.value) ?? '';
      return (av > bv ? 1 : av < bv ? -1 : 0) * (sortDir.value === 'asc' ? 1 : -1);
    });
  }
  return result;
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / perPage.value)));
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredRows.value.slice(start, start + perPage.value);
});
const visiblePages = computed(() => {
  const total = totalPages.value;
  const cur = currentPage.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  if (cur > 3) { pages.push(1); if (cur > 4) pages.push('...'); }
  for (let i = Math.max(1, cur - 1); i <= Math.min(total, cur + 1); i++) pages.push(i);
  if (cur < total - 2) { if (cur < total - 3) pages.push('...'); pages.push(total); }
  return pages;
});
</script>

<style scoped>
.zen-datatable {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-lg);
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  overflow: hidden;
  box-sizing: border-box;
}

/* ── Toolbar ─────────────────────────────────────── */
.dt-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  flex-wrap: wrap;
  background: #ffffff;
}
.dt-toolbar-left {
  flex: 1;
  min-width: 200px;
}
.dt-toolbar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.dt-search-wrap {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 320px;
}
.dt-search-icon {
  position: absolute;
  left: 0.75rem;
  width: 15px;
  height: 15px;
  color: #94a3b8;
  pointer-events: none;
}
.dt-search-input {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 2.25rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #0f172a;
  font-size: 0.82rem;
  outline: none;
  transition: all 0.15s ease;
}
.dt-search-input::placeholder {
  color: #94a3b8;
}
.dt-search-input:focus {
  border-color: #1d4ed8;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1);
}
.dt-clear-btn {
  position: absolute;
  right: 0.6rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.8rem;
}

/* ── Table Layout ────────────────────────────────── */
.dt-table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}
.dt-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  text-align: left;
}
.dt-th {
  padding: 0.75rem 1.25rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #1e3a8a;
  white-space: nowrap;
}
.dt-th.sortable {
  cursor: pointer;
  user-select: none;
}
.dt-th.sortable:hover {
  color: #1d4ed8;
  background: #f1f5f9;
}
.dt-th-content {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.sort-icon {
  font-size: 0.65rem;
  color: #1d4ed8;
}

.dt-td {
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.83rem;
  color: #334155;
  vertical-align: middle;
}
.dt-row:last-child .dt-td {
  border-bottom: none;
}
.dt-row {
  transition: background 0.15s ease;
}
.dt-row:hover {
  background: #f8fafc;
}
.dt-row-clickable {
  cursor: pointer;
}

.align-center {
  text-align: center;
}
.align-right {
  text-align: right;
}

/* ── States ──────────────────────────────────────── */
.dt-state-row {
  padding: 2.5rem 1rem;
  text-align: center;
  color: #64748b;
}
.dt-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid #e2e8f0;
  border-top-color: #1d4ed8;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin-right: 0.5rem;
  vertical-align: middle;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.dt-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  padding: 1.5rem 1rem;
}
.dt-empty-state p {
  margin: 0;
  font-size: 0.85rem;
}

/* ── Footer & Pagination ─────────────────────────── */
.dt-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  border-top: 1px solid #f1f5f9;
  background: #ffffff;
  flex-wrap: wrap;
}
.dt-count {
  font-size: 0.76rem;
  color: #64748b;
  flex-shrink: 0;
  font-weight: 600;
}
.dt-pagination {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}
.dt-page-btn {
  padding: 0.3rem 0.65rem;
  min-width: 34px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #475569;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.dt-page-btn:hover:not(:disabled) {
  background: #eff6ff;
  border-color: #bfdbfe;
  color: #1d4ed8;
}
.dt-page-btn.active {
  background: #1d4ed8;
  border-color: #1d4ed8;
  color: #ffffff;
  font-weight: 700;
}
.dt-page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.dt-ellipsis {
  padding: 0 0.25rem;
  color: #94a3b8;
  font-size: 0.77rem;
}
.dt-per-page-wrap {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.dt-per-page-label {
  font-size: 0.74rem;
  color: #64748b;
  white-space: nowrap;
  font-weight: 600;
}
.dt-per-page-select {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #334155;
  font-size: 0.77rem;
  font-weight: 600;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  outline: none;
}

/* ── RESPONSIVE / CARD MODE ON MOBILE ────────────── */
@media (max-width: 768px) {
  .dt-toolbar {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }
  .dt-toolbar-right {
    width: 100%;
    justify-content: flex-start;
  }
  .dt-search-wrap {
    max-width: 100%;
    width: 100%;
  }

  /* Table switches to Card Stack Mode on mobile */
  .dt-table-wrap {
    overflow-x: visible;
  }
  .dt-table {
    min-width: unset;
    display: block;
  }
  .dt-table thead {
    display: none;
  }
  .dt-table tbody {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
  }
  .dt-row {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 0.75rem 1rem;
    box-shadow: 0 2px 8px -2px rgba(30, 58, 138, 0.05);
    gap: 0.35rem;
  }
  .dt-row:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
  .dt-td {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0;
    border-bottom: 1px dashed #f1f5f9;
    font-size: 0.82rem;
    width: 100%;
    box-sizing: border-box;
  }
  .dt-td:last-child {
    border-bottom: none;
    padding-top: 0.5rem;
  }
  .dt-td::before {
    content: attr(data-label);
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #64748b;
    flex-shrink: 0;
    margin-right: 0.75rem;
  }

  .dt-footer {
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;
    padding: 0.75rem 1rem;
    text-align: center;
  }
}
</style>

