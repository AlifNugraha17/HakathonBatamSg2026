<template>
  <div class="therapist-roster-view animate-fade-in">
    <ZenDataTable
      :columns="columns"
      :rows="therapists"
      search-placeholder="Search doctor or specialist by name or clinical specialty..."
      empty-text="No specialists registered yet. Click Add Doctor / Specialist to get started."
      :default-per-page="10"
    >
      <template #toolbar>
        <div class="roster-info">
          <h3 class="roster-title">Doctors & Medical Specialists Roster</h3>
        </div>
        <button class="btn-add-therapist" @click="showAddModal = true">+ Add Doctor / Specialist</button>
      </template>

      <template #cell-therapist="{ row }">
        <div class="cell-therapist">
          <div class="avatar-circle">{{ (row.name || '?').charAt(0) }}</div>
          <div class="cell-stack">
            <span class="cell-name">{{ row.name }}</span>
            <span class="cell-sub">{{ row.title }} &bull; {{ row.experienceYears }} Yrs Exp</span>
          </div>
        </div>
      </template>

      <template #cell-cert="{ row }">
        <span class="badge-bnsp">IDI / Board Certified</span>
      </template>

      <template #cell-specialties="{ row }">
        <div class="tags-row">
          <span v-for="sp in (row.specialties || [])" :key="sp" class="spec-tag">{{ sp }}</span>
        </div>
      </template>

      <template #cell-shift="{ row }">
        <span class="cell-shift">{{ row.shift }}</span>
      </template>

      <template #cell-status="{ row }">
        <button
          class="btn-status-toggle"
          :class="row.status === 'ready' ? 'ready' : 'busy'"
          @click.stop="toggleTherapistStatus(row.id)"
        >
          {{ row.status === 'ready' ? 'AVAILABLE' : 'IN CONSULTATION' }}
        </button>
      </template>
    </ZenDataTable>

    <!-- Add Practitioner Modal -->
    <div v-if="showAddModal" class="modal-backdrop" @click.self="showAddModal = false">
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">Register Doctor / Medical Specialist</h3>
          <button class="modal-close" @click="showAddModal = false">x</button>
        </div>
        <p class="modal-sub">Enter doctor qualifications, clinical experience, and consultation hours.</p>
        <form class="modal-form" @submit.prevent="handleCreateTherapist">
          <div class="form-group">
            <label>Full Legal Name & Title</label>
            <input v-model="newTherapist.name" type="text" class="input-styled" placeholder="e.g. dr. Bambang Hermanto, Sp.JP" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Experience (Years)</label>
              <input v-model.number="newTherapist.years" type="number" class="input-styled" required />
            </div>
            <div class="form-group">
              <label>Consultation Shift</label>
              <input v-model="newTherapist.shift" type="text" class="input-styled" placeholder="09:00 - 15:00 WIB" required />
            </div>
          </div>
          <div class="form-group">
            <label>Specialties (comma-separated)</label>
            <input v-model="newTherapist.specialtiesText" type="text" class="input-styled" placeholder="Cardiology, MRI, Health Checkup" required />
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="showAddModal = false">Cancel</button>
            <button type="submit" class="btn-save">Save Specialist</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNotification } from '../../../composables/useNotification';
import ZenDataTable from '../../../components/shared/ZenDataTable.vue';

const { showToast } = useNotification();
const showAddModal = ref(false);

const columns = [
  { key: 'therapist', label: 'Doctor / Specialist Profile', sortable: false },
  { key: 'cert', label: 'Medical Board Certification', sortable: false, align: 'center' },
  { key: 'specialties', label: 'Clinical Specialties', sortable: false },
  { key: 'shift', label: 'Consultation Hours', sortable: true },
  { key: 'status', label: 'Status', sortable: true, align: 'center' },
];

const defaultTherapists = [
  { id: 'th-1', name: 'dr. Bambang Hermanto, Sp.JP(K), FIHA', title: 'Senior Interventional Cardiologist', experienceYears: 18, specialties: ['Executive Health Screening', 'Cardiology & Cath Lab', 'Internal Medicine'], shift: '09:00 - 15:00 WIB', status: 'ready' },
  { id: 'th-2', name: 'drg. Cynthia Wijaya, Sp.KG', title: 'Aesthetic Dental Surgeon', experienceYears: 12, specialties: ['Laser Teeth Whitening', 'Titanium Implants', 'Smile Design'], shift: '10:00 - 18:00 WIB', status: 'busy' },
  { id: 'th-3', name: 'dr. Hendra Gunawan, Sp.OT', title: 'Orthopedic & Spine Surgeon', experienceYears: 15, specialties: ['Spine Decompression', 'Joint Arthroscopy', 'Sports Injury'], shift: '11:00 - 16:00 WIB', status: 'ready' },
  { id: 'th-4', name: 'dr. Maria Kusuma, Sp.M', title: 'Ophthalmologist & LASIK Surgeon', experienceYears: 14, specialties: ['Cataract Phaco', 'LASIK Refractive', 'Retinal Exam'], shift: '08:30 - 14:00 WIB', status: 'ready' },
];

const therapists = ref(defaultTherapists);

const loadSavedTherapists = () => {
  try {
    const raw = localStorage.getItem('lokabatam_merchant_practitioners');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        therapists.value = parsed;
      }
    }
  } catch (e) {}
};

loadSavedTherapists();

const saveTherapists = () => {
  try {
    localStorage.setItem('lokabatam_merchant_practitioners', JSON.stringify(therapists.value));
  } catch (e) {}
};

const newTherapist = ref({ name: '', years: 4, shift: '10:00 - 18:00 WIB', specialtiesText: 'Balinese, Head Spa, Reflexology' });

const toggleTherapistStatus = (id) => {
  const t = therapists.value.find(item => item.id === id);
  if (t) {
    t.status = t.status === 'ready' ? 'busy' : 'ready';
    saveTherapistsToStorage();
    showToast(`${t.name} status: ${t.status === 'ready' ? 'STANDBY (Siap Layani Tamu)' : 'IN TREATMENT (Sedang Melayani)'}`, 'info');
  }
};

const handleCreateTherapist = () => {
  if (!newTherapist.value.name) return;
  therapists.value.push({
    id: `th-${Date.now()}`, name: newTherapist.value.name,
    title: 'Certified Master Therapist', experienceYears: newTherapist.value.years,
    specialties: newTherapist.value.specialtiesText.split(',').map(s => s.trim()),
    shift: newTherapist.value.shift, status: 'ready',
  });
  saveTherapistsToStorage();
  showToast(`Therapist "${newTherapist.value.name}" registered!`, 'success');
  showAddModal.value = false;
  newTherapist.value = { name: '', years: 4, shift: '10:00 - 18:00 WIB', specialtiesText: '' };
};
</script>

<style scoped>
.therapist-roster-view { display: flex; flex-direction: column; }
.roster-info { flex: 1; }
.roster-title { font-size: 0.95rem; font-weight: 800; color: #0f172a; margin: 0; }

.btn-add-therapist {
  padding: 0.4rem 1rem; border-radius: 8px;
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8);
  border: none; color: #fff; font-size: 0.78rem; font-weight: 700;
  cursor: pointer; white-space: nowrap; transition: opacity 0.15s;
}
.btn-add-therapist:hover { opacity: 0.9; }

.cell-therapist { display: flex; align-items: center; gap: 0.75rem; }
.avatar-circle {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, #1e3a8a, #1d4ed8);
  color: #fff; font-weight: 800; font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cell-stack { display: flex; flex-direction: column; gap: 0.1rem; }
.cell-name { font-weight: 700; color: #0f172a; font-size: 0.83rem; }
.cell-sub { font-size: 0.72rem; color: #64748b; }
.cell-shift { font-size: 0.8rem; color: #1e3a8a; font-weight: 700; }

.badge-bnsp {
  font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px;
  background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;
}
.tags-row { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.spec-tag {
  font-size: 0.67rem; padding: 0.12rem 0.45rem; border-radius: 4px;
  background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe;
  font-weight: 700;
}

.btn-status-toggle {
  padding: 0.3rem 0.65rem; border-radius: 6px;
  font-size: 0.7rem; font-weight: 700; border: 1px solid transparent; cursor: pointer; transition: all 0.15s;
}
.btn-status-toggle.ready { background: #ecfdf5; color: #047857; border-color: #a7f3d0; }
.btn-status-toggle.ready:hover { background: #d1fae5; }
.btn-status-toggle.busy { background: #fffbeb; color: #b45309; border-color: #fde68a; }
.btn-status-toggle.busy:hover { background: #fef3c7; }

/* Modal */
.modal-backdrop {
  position: fixed; inset: 0; background: rgba(15,23,42,0.6);
  display: flex; align-items: center; justify-content: center; z-index: 999; padding: 1rem;
}
.modal-box {
  background: #ffffff; border: 1px solid #e2e8f0;
  border-radius: 16px; padding: 1.75rem; width: 100%; max-width: 480px;
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
  padding: 0.55rem 0.85rem; background: #f8fafc;
  border: 1px solid #e2e8f0; border-radius: 8px;
  color: #0f172a; font-size: 0.82rem; outline: none; box-sizing: border-box; width: 100%;
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
@media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
</style>

