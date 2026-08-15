<template>
  <header class="merchant-header">
    <div class="header-left">
      <div class="title-meta">
        <h2 class="view-title">{{ currentTitle }}</h2>
        <span class="view-sub">{{ currentSubtitle }}</span>
      </div>
    </div>

    <div class="header-right">
      <div class="flash-status-pill">
        <span class="live-dot"></span>
        <span class="status-text">Flash Broadcast Live (2 Empty Chairs)</span>
      </div>

      <div class="merchant-profile-pill">
        <div class="avatar-circle">{{ currentUser.name.charAt(0) }}</div>
        <div class="profile-info">
          <span class="name">{{ currentUser.name }}</span>
          <span class="role">Verified Spa Partner</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useAuth } from '../../../composables/useAuth';

const props = defineProps({
  activeTab: { type: String, default: 'overview' }
});

const { currentUser } = useAuth();

const titleMap = {
  overview: { title: 'Partner Performance & Occupancy', sub: 'Track daily revenue, massage chair utilization, and incoming regional tourists' },
  orders: { title: 'Incoming Tourist Reservations', sub: 'Confirm appointments and inspect AI-structured Indonesian therapist cards' },
  slots: { title: 'Flash Slot Broadcast Control', sub: 'Broadcast empty therapist chairs at dynamic rates to capture arriving ferry passengers' },
  therapists: { title: 'Therapist Rostering & Accreditations', sub: 'Manage master therapist schedules, BNSP certifications, and bodywork specialties' },
  profile: { title: 'Spa Profile & Sanitation Audit', sub: 'Update facility amenities, photo galleries, and certified 95+ hygiene ratings' }
};

const currentTitle = computed(() => titleMap[props.activeTab]?.title || 'Merchant Hub');
const currentSubtitle = computed(() => titleMap[props.activeTab]?.sub || '');
</script>

<style scoped>
.merchant-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px -2px rgba(30, 58, 138, 0.06);
  margin-bottom: 1.25rem;
  gap: 1rem;
}

.view-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 0.2rem 0;
  letter-spacing: -0.02em;
}

.view-sub {
  font-size: 0.78rem;
  color: #64748b;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.flash-status-pill {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: var(--radius-full);
  font-size: 0.74rem;
  color: #1d4ed8;
  font-weight: 700;
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2563eb;
}

.merchant-profile-pill {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-left: 0.75rem;
  border-left: 1px solid #e2e8f0;
}

.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 0.78rem;
  font-weight: 700;
  color: #0f172a;
}

.role {
  font-size: 0.65rem;
  color: #1e3a8a;
  font-weight: 600;
}

@media (max-width: 900px) {
  .merchant-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header-right {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
