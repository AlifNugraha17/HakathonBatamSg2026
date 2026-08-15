<template>
  <div class="slot-manager glass-panel">
    <div class="manager-header">
      <div>
        <h3 class="manager-title">⚡ Kontrol Slot Kilat (Live Flash Chairs)</h3>
        <p class="manager-sub">Siarkan kursi kosong Anda ke wisatawan lintas batas terdekat secara real-time</p>
      </div>
      <button class="btn btn-emerald btn-sm" @click="showAddModal = true">
        + Buka Slot Kilat Baru
      </button>
    </div>

    <!-- Active Flash Slots Grid -->
    <div class="slots-grid">
      <div
        v-for="slot in merchantSalon.flashSlots"
        :key="slot.id"
        class="slot-control-card glass-card"
        :class="{ active: slot.isFlashActive, inactive: !slot.isFlashActive }"
      >
        <div class="card-top">
          <div class="chair-badge">
            🪑 {{ slot.chair }}
          </div>
          <div class="toggle-wrap">
            <label class="switch">
              <input
                type="checkbox"
                :checked="slot.isFlashActive"
                @change="toggleFlashSlot(slot.id)"
              />
              <span class="slider round"></span>
            </label>
            <span class="toggle-status">
              {{ slot.isFlashActive ? 'LIVE SIARAN' : 'NONAKTIF' }}
            </span>
          </div>
        </div>

        <div class="card-info">
          <h4 class="service-name">{{ slot.serviceName }}</h4>
          <div class="meta-row">
            <span>⏰ {{ slot.time }} ({{ slot.durationMinutes }} menit)</span>
            <span>•</span>
            <span>💆 Terapis: {{ slot.therapistName }}</span>
          </div>

          <div class="price-discount-row">
            <div class="price-info">
              <span class="price-main">Rp {{ Number(slot.priceIdr).toLocaleString('id-ID') }}</span>
              <span class="price-strike">Rp {{ Number(slot.originalPriceIdr).toLocaleString('id-ID') }}</span>
            </div>
            <span class="badge badge-flash">Diskon {{ slot.discountPercent }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Slot Modal -->
    <div v-if="showAddModal" class="modal-backdrop" @click="showAddModal = false">
      <div class="modal-content glass-panel" @click.stop>
        <div class="modal-header">
          <h4>Buka Slot Kursi Kosong Baru</h4>
          <button class="close-btn" @click="showAddModal = false">✕</button>
        </div>

        <form class="add-slot-form" @submit.prevent="handleSubmitNewSlot">
          <div class="form-field">
            <label>Nama Layanan</label>
            <select v-model="newSlot.serviceName" class="input-custom" required>
              <option v-for="srv in merchantSalon.services" :key="srv.id" :value="srv.name">
                {{ srv.name }} ({{ srv.durationMinutes }}m)
              </option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>Kursi / Ruangan</label>
              <input type="text" v-model="newSlot.chair" class="input-custom" placeholder="e.g. VIP Suite 3" required />
            </div>
            <div class="form-field">
              <label>Terapis Bertugas</label>
              <select v-model="newSlot.therapistName" class="input-custom" required>
                <option v-for="th in merchantSalon.therapists" :key="th.name" :value="th.name">
                  {{ th.name }} ({{ th.specialty }})
                </option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>Rentang Waktu</label>
              <input type="text" v-model="newSlot.time" class="input-custom" placeholder="e.g. 16:00 - 17:00" required />
            </div>
            <div class="form-field">
              <label>Diskon Kilat (%)</label>
              <input type="number" v-model.number="newSlot.discountPercent" class="input-custom" min="5" max="50" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label>Harga Normal (Rp)</label>
              <input type="number" v-model.number="newSlot.originalPriceIdr" class="input-custom" required />
            </div>
            <div class="form-field">
              <label>Harga Diskon Kilat (Rp)</label>
              <input type="number" :value="calculatedDiscountPrice" class="input-custom" readonly />
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" @click="showAddModal = false">Batal</button>
            <button type="submit" class="btn btn-emerald">Siarkan Slot Sekarang ⚡</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLokaBatamStore } from '../../composables/useLokaBatamStore';

const {
  merchantSalon,
  toggleFlashSlot,
  addMerchantFlashSlot
} = useLokaBatamStore();

const showAddModal = ref(false);

const newSlot = ref({
  serviceName: 'Balinese Herbal Oil Deep Tissue',
  chair: 'VIP Bed 2',
  therapistName: 'Ibu Ratna',
  time: '16:00 - 17:00',
  durationMinutes: 60,
  discountPercent: 20,
  originalPriceIdr: 250000
});

const calculatedDiscountPrice = computed(() => {
  const orig = newSlot.value.originalPriceIdr || 250000;
  const disc = newSlot.value.discountPercent || 20;
  return Math.round(orig * (1 - disc / 100));
});

const handleSubmitNewSlot = () => {
  addMerchantFlashSlot({
    ...newSlot.value,
    priceIdr: calculatedDiscountPrice.value
  });
  showAddModal.value = false;
};
</script>

<style scoped>
.slot-manager {
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.manager-title {
  font-size: 1.1rem;
  color: var(--color-accent-gold);
}

.manager-sub {
  font-size: 0.76rem;
  color: var(--color-text-muted);
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.slot-control-card {
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  transition: all var(--transition-fast);
}

.slot-control-card.active {
  border-color: rgba(16, 185, 129, 0.45);
  background: rgba(16, 185, 129, 0.08);
}

.slot-control-card.inactive {
  opacity: 0.6;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
}

.chair-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-accent-gold);
}

.toggle-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-status {
  font-size: 0.68rem;
  font-weight: 800;
  color: #34d399;
}

.slot-control-card.inactive .toggle-status {
  color: var(--color-text-muted);
}

/* Switch styling */
.switch {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #374151;
  transition: .3s;
  border-radius: 22px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #10b981;
}

input:checked + .slider:before {
  transform: translateX(16px);
}

.service-name {
  font-size: 0.95rem;
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.meta-row {
  display: flex;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: var(--color-text-muted);
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
}

.price-discount-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.price-main {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-accent-gold);
  margin-right: 0.4rem;
}

.price-strike {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  text-decoration: line-through;
}

/* Add Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(4, 12, 10, 0.85);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.modal-content {
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-accent-gold);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: 1.2rem;
  cursor: pointer;
}

.add-slot-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-field label {
  font-size: 0.72rem;
  color: var(--color-text-secondary);
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
</style>
