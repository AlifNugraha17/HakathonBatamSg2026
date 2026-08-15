<template>
  <div class="therapist-roster-view animate-fade-in">
    <!-- Header Controls in English -->
    <div class="roster-header">
      <div>
        <h3 class="roster-title">Therapist Rostering & BNSP Certifications</h3>
        <p class="roster-sub">Ensure all on-duty therapists review AI tourist brief cards prior to treatment delivery.</p>
      </div>

      <button class="btn-add-therapist" @click="showAddModal = true">
        + Add Master Therapist
      </button>
    </div>

    <!-- Therapists Grid -->
    <div class="therapists-grid">
      <div 
        v-for="th in therapists" 
        :key="th.id"
        class="therapist-card"
      >
        <div class="card-header-row">
          <div class="avatar-circle">
            {{ th.name.charAt(0) }}
          </div>

          <div class="therapist-meta">
            <h4 class="t-name">{{ th.name }}</h4>
            <span class="t-title">{{ th.title }} ({{ th.experienceYears }} Yrs Experience)</span>
            <span class="t-cert">BNSP Certified Level 3</span>
          </div>
        </div>

        <div class="specialties-box">
          <span class="box-label">Core Specialties:</span>
          <div class="tags-row">
            <span v-for="sp in th.specialties" :key="sp" class="spec-tag">{{ sp }}</span>
          </div>
        </div>

        <div class="card-footer-row">
          <div class="shift-info">
            <span class="shift-label">Active Shift:</span>
            <span class="shift-val">{{ th.shift }}</span>
          </div>

          <button 
            class="btn-status-toggle"
            :class="th.status === 'ready' ? 'ready' : 'busy'"
            @click="toggleTherapistStatus(th.id)"
          >
            {{ th.status === 'ready' ? 'STANDBY (READY)' : 'IN TREATMENT' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for Adding Demo Therapist -->
    <div v-if="showAddModal" class="modal-backdrop">
      <div class="modal-content">
        <h3 class="modal-title">Register Master Therapist</h3>
        <p class="modal-sub">Enter practitioner details, experience, and certified bodywork techniques.</p>

        <form class="modal-form" @submit.prevent="handleCreateTherapist">
          <div class="form-group">
            <label>Full Legal Name</label>
            <input v-model="newTherapist.name" type="text" class="input-styled" placeholder="e.g. Maya Anggraini" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Experience (Years)</label>
              <input v-model.number="newTherapist.years" type="number" class="input-styled" required />
            </div>
            <div class="form-group">
              <label>Working Shift</label>
              <input v-model="newTherapist.shift" type="text" class="input-styled" placeholder="10:00 - 18:00" required />
            </div>
          </div>

          <div class="form-group">
            <label>Specialties (comma-separated)</label>
            <input v-model="newTherapist.specialtiesText" type="text" class="input-styled" placeholder="Balinese, Acupressure, Head Spa" required />
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="showAddModal = false">Cancel</button>
            <button type="submit" class="btn-save">Save Therapist</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNotification } from '../../../composables/useNotification';

const { showToast } = useNotification();

const showAddModal = ref(false);

const therapists = ref([
  {
    id: 'th-1',
    name: 'Dewi Anggraini',
    title: 'Senior Balinese Master Therapist',
    experienceYears: 7,
    specialties: ['Balinese Deep Tissue', 'Aromatherapy', 'Foot Reflexology'],
    shift: '10:00 - 19:00 WIB',
    status: 'ready'
  },
  {
    id: 'th-2',
    name: 'Siti Rahma',
    title: 'Herbal & Body Scrub Specialist',
    experienceYears: 10,
    specialties: ['Javanese Lulur', 'Postnatal Massage', 'Hot Stone'],
    shift: '11:00 - 20:00 WIB',
    status: 'busy'
  },
  {
    id: 'th-3',
    name: 'Bayu Pratama',
    title: 'Sports & Acupressure Specialist',
    experienceYears: 5,
    specialties: ['Upper Back Relief', 'Foot Pressure Points', 'Dry Shiatsu'],
    shift: '12:00 - 21:00 WIB',
    status: 'ready'
  }
]);

const newTherapist = ref({
  name: '',
  years: 4,
  shift: '10:00 - 18:00 WIB',
  specialtiesText: 'Balinese, Head Spa, Reflexology'
});

const toggleTherapistStatus = (id) => {
  const t = therapists.value.find(item => item.id === id);
  if (t) {
    t.status = t.status === 'ready' ? 'busy' : 'ready';
    showToast(`Status for ${t.name} set to ${t.status === 'ready' ? 'STANDBY' : 'IN TREATMENT'}.`, 'info');
  }
};

const handleCreateTherapist = () => {
  if (!newTherapist.value.name) return;
  therapists.value.push({
    id: `th-${Date.now()}`,
    name: newTherapist.value.name,
    title: 'Certified Master Therapist',
    experienceYears: newTherapist.value.years,
    specialties: newTherapist.value.specialtiesText.split(',').map(s => s.trim()),
    shift: newTherapist.value.shift,
    status: 'ready'
  });
  showToast(`Therapist "${newTherapist.value.name}" registered successfully!`, 'success');
  showAddModal.value = false;
  newTherapist.value = { name: '', years: 4, shift: '10:00 - 18:00 WIB', specialtiesText: 'Balinese, Head Spa' };
};
</script>

<style scoped>
.therapist-roster-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.roster-header {
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

.roster-title {
  font-size: 1.05rem;
  color: #0f172a;
  font-weight: 800;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.02em;
}

.roster-sub {
  font-size: 0.78rem;
  color: #64748b;
}

.btn-add-therapist {
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

.btn-add-therapist:hover {
  background: #0f172a;
}

.therapists-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.therapist-card {
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.95rem;
  transition: all 0.15s ease;
}

.therapist-card:hover {
  border-color: #93c5fd;
}

.card-header-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.therapist-meta {
  display: flex;
  flex-direction: column;
}

.t-name {
  font-size: 0.95rem;
  color: #0f172a;
  font-weight: 700;
  margin: 0;
}

.t-title {
  font-size: 0.74rem;
  color: #64748b;
}

.t-cert {
  font-size: 0.68rem;
  font-weight: 700;
  color: #047857;
}

.specialties-box {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.box-label {
  font-size: 0.72rem;
  color: #1e3a8a;
  font-weight: 700;
  text-transform: uppercase;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.spec-tag {
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  font-weight: 600;
}

.card-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
}

.shift-info {
  display: flex;
  flex-direction: column;
}

.shift-label {
  font-size: 0.68rem;
  color: #64748b;
}

.shift-val {
  font-size: 0.78rem;
  font-weight: 700;
  color: #0f172a;
}

.btn-status-toggle {
  padding: 0.3rem 0.65rem;
  border-radius: var(--radius-xs);
  font-size: 0.7rem;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn-status-toggle.ready {
  background: #ecfdf5;
  color: #047857;
  border-color: #a7f3d0;
}

.btn-status-toggle.busy {
  background: #fefce8;
  color: #854d0e;
  border-color: #fef08a;
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

.modal-title {
  font-size: 1.15rem;
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

@media (max-width: 900px) {
  .therapists-grid {
    grid-template-columns: 1fr;
  }
}
</style>
