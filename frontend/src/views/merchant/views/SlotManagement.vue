<template>
  <div class="slot-management-view animate-fade-in">
    <!-- Header Row in English -->
    <div class="mgmt-header-row">
      <div>
        <h3 class="heading-title">Flash Slot Broadcast Manager</h3>
        <p class="heading-sub">Broadcast last-minute vacant chairs at dynamic promotional rates to capture incoming ferry passengers.</p>
      </div>

      <button class="btn-add-slot" @click="showAddModal = true">
        + Create Flash Slot
      </button>
    </div>

    <!-- Slots Grid -->
    <div class="slots-grid">
      <div 
        v-for="slot in merchantSalon.flashSlots" 
        :key="slot.id" 
        class="slot-card"
        :class="{ active: slot.isFlashActive, inactive: !slot.isFlashActive }"
      >
        <div class="card-top-row">
          <div class="chair-badge">
            <span>{{ slot.chair }}</span>
          </div>

          <button class="toggle-pill" :class="{ 'is-live': slot.isFlashActive }" @click="toggleFlashSlot(slot.id)">
            <span class="toggle-dot"></span>
            <span>{{ slot.isFlashActive ? 'BROADCAST LIVE' : 'OFFLINE' }}</span>
          </button>
        </div>

        <div class="card-main-info">
          <h4 class="service-name">{{ slot.serviceName }}</h4>
          <div class="meta-row">
            <span class="meta-item">Window: {{ slot.time }} ({{ slot.durationMinutes }} Mins)</span>
            <span class="meta-item">Assigned: {{ slot.therapistName }}</span>
          </div>
        </div>

        <div class="card-bottom-row">
          <div class="price-box">
            <span class="price-current">IDR {{ Number(slot.priceIdr).toLocaleString('id-ID') }}</span>
            <span class="price-strike">IDR {{ Number(slot.originalPriceIdr).toLocaleString('id-ID') }}</span>
          </div>

          <span class="discount-pill">Save {{ slot.discountPercent }}%</span>
        </div>
      </div>
    </div>

    <!-- Add Slot Modal -->
    <div v-if="showAddModal" class="modal-backdrop">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Broadcast Vacant Massage Chair</h3>
          <button class="close-btn" @click="showAddModal = false">✕</button>
        </div>

        <form class="modal-form" @submit.prevent="handleCreateSlot">
          <div class="form-group">
            <label>Spa Service Name</label>
            <input 
              v-model="newSlot.serviceName" 
              list="service-suggestions" 
              class="input-styled" 
              placeholder="Select or type service (e.g. Balinese Traditional Massage)" 
              required 
            />
            <datalist id="service-suggestions">
              <option v-for="s in (merchantSalon.services || [])" :key="s.id" :value="s.name">
                {{ s.name }} ({{ s.durationMinutes || 60 }} mins)
              </option>
              <option value="Balinese Herbal Oil Deep Tissue">Balinese Herbal Oil Deep Tissue (60 mins)</option>
              <option value="Express Travel Foot & Calf Revival">Express Travel Foot & Calf Revival (45 mins)</option>
              <option value="Royal Javanese Lulur & Body Polish">Royal Javanese Lulur & Body Polish (90 mins)</option>
              <option value="Japanese Scalp Waterfall & Herbal Head Spa">Japanese Scalp Waterfall & Herbal Head Spa (60 mins)</option>
              <option value="Express 30-Min Head, Neck & Shoulder Blitz">Express 30-Min Head, Neck & Shoulder Blitz (30 mins)</option>
              <option value="Acupressure Foot & Arm Restoration">Acupressure Foot & Arm Restoration (45 mins)</option>
            </datalist>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Assigned Therapist</label>
              <input 
                v-model="newSlot.therapistName" 
                list="therapist-suggestions" 
                class="input-styled" 
                placeholder="Therapist name (e.g. Ibu Ratna)" 
                required 
              />
              <datalist id="therapist-suggestions">
                <option v-for="th in (merchantSalon.therapists || [])" :key="th.id || th.name" :value="th.name">
                  {{ th.name }}
                </option>
                <option value="Ibu Ratna">Ibu Ratna (12 yrs exp - Balinese)</option>
                <option value="Mas Budi">Mas Budi (8 yrs exp - Reflexology)</option>
                <option value="Kak Sarah">Kak Sarah (9 yrs exp - Senior)</option>
                <option value="Mbak Dewi">Mbak Dewi (6 yrs exp - Head Spa)</option>
              </datalist>
            </div>

            <div class="form-group">
              <label>Chair / Suite Room</label>
              <input v-model="newSlot.chair" type="text" class="input-styled" placeholder="VIP Suite 1 / Chair 3" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Time Slot Window</label>
              <input v-model="newSlot.time" type="text" class="input-styled" placeholder="14:30 - 15:15 (WIB)" required />
            </div>
            <div class="form-group">
              <label>Duration (Minutes)</label>
              <input v-model.number="newSlot.durationMinutes" type="number" class="input-styled" placeholder="45" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Original Price (IDR)</label>
              <input v-model.number="newSlot.originalPriceIdr" type="number" class="input-styled" placeholder="250000" required />
            </div>
            <div class="form-group">
              <label>Flash Promo Price (IDR)</label>
              <input v-model.number="newSlot.priceIdr" type="number" class="input-styled" placeholder="200000" required />
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="showAddModal = false">Cancel</button>
            <button type="submit" class="btn-save">Broadcast Slot</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLokaBatamStore } from '../../../composables/useLokaBatamStore';
import { useNotification } from '../../../composables/useNotification';

const { merchantSalon, toggleFlashSlot, addMerchantFlashSlot } = useLokaBatamStore();
const { showToast } = useNotification();

const showAddModal = ref(false);

const newSlot = ref({
  serviceName: merchantSalon.value?.services?.[0]?.name || 'Express Neck & Back Relief',
  chair: 'Chair 3',
  time: '14:45 - 15:30',
  durationMinutes: 45,
  priceIdr: 280000,
  originalPriceIdr: 350000,
  discountPercent: 20,
  therapistName: 'Dewi Anggraini'
});

const handleCreateSlot = () => {
  const discount = Math.round(((newSlot.value.originalPriceIdr - newSlot.value.priceIdr) / newSlot.value.originalPriceIdr) * 100);
  
  addMerchantFlashSlot({
    ...newSlot.value,
    discountPercent: discount > 0 ? discount : 15
  });

  showToast(`Slot "${newSlot.value.chair}" broadcast live!`, 'success');
  showAddModal.value = false;
};
</script>

<style scoped>
.slot-management-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mgmt-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.heading-title {
  font-size: 1.05rem;
  color: #0f172a;
  font-weight: 800;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.02em;
}

.heading-sub {
  font-size: 0.78rem;
  color: #64748b;
}

.btn-add-slot {
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.5rem 1.15rem;
  border-radius: var(--radius-xs);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(29, 78, 216, 0.2);
}

.btn-add-slot:hover {
  background: #0f172a;
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.slot-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  transition: all 0.15s ease;
}

.slot-card:hover {
  border-color: #93c5fd;
}

.slot-card.inactive {
  opacity: 0.6;
}

.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chair-badge {
  font-size: 0.78rem;
  font-weight: 800;
  color: #1e3a8a;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
}

.toggle-pill {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-full);
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}

.toggle-pill.is-live {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.toggle-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.service-name {
  font-size: 1rem;
  color: #0f172a;
  font-weight: 700;
  margin: 0 0 0.35rem 0;
}

.meta-row {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.meta-item {
  font-size: 0.76rem;
  color: #64748b;
}

.card-bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.price-box {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
}

.price-current {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

.price-strike {
  font-size: 0.76rem;
  color: #94a3b8;
  text-decoration: line-through;
}

.discount-pill {
  font-size: 0.7rem;
  font-weight: 700;
  color: #047857;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
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
  max-width: 450px;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.modal-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1.1rem;
  cursor: pointer;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-size: 0.78rem;
  color: #334155;
  font-weight: 600;
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

@media (max-width: 800px) {
  .slots-grid {
    grid-template-columns: 1fr;
  }
}
</style>
