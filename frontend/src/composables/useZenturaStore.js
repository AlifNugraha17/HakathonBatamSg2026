import { ref, computed } from 'vue';
import { MOCK_SALONS, MOCK_REGIONS } from '../data/mockSalons';
import { INITIAL_BOOKINGS } from '../data/mockBookings';
import { I18N_STRINGS } from '../data/translations';

// Reactive Shared State
const currentRole = ref('tourist'); // 'tourist' | 'merchant'
const currentRegion = ref('batam');
const currentLanguage = ref('en'); // 'en' | 'id'
const previewMode = ref('phone'); // 'phone' | 'responsive'
const activeTab = ref('discover'); // 'discover' | 'matcher' | 'translator' | 'bookings' | 'saved'

const selectedCategory = ref('all');
const searchQuery = ref('');

// Smart Time Gap Matcher filters
const matcherFilter = ref({
  durationMinutes: 45,
  timeTarget: '14:30',
  maxDistanceMinutes: 10,
  landmark: 'Harbour Bay Ferry Terminal'
});

const salons = ref(JSON.parse(JSON.stringify(MOCK_SALONS)));
const bookings = ref(JSON.parse(JSON.stringify(INITIAL_BOOKINGS)));
const savedSalonIds = ref(['salon-1', 'salon-3']);

// Active Modals & Selected items
const selectedSalonForDetail = ref(null);
const selectedSlotForBooking = ref(null);
const isAiTranslatorOpen = ref(false);
const isWhatsAppModalOpen = ref(false);
const currentBookingPayload = ref(null);
const selectedTherapistCardBooking = ref(null);

export function useZenturaStore() {
  const t = computed(() => {
    return I18N_STRINGS[currentLanguage.value] || I18N_STRINGS.en;
  });

  const activeRegionObj = computed(() => {
    return MOCK_REGIONS.find(r => r.id === currentRegion.value) || MOCK_REGIONS[0];
  });

  // Filtered Salons based on region, category, search
  const filteredSalons = computed(() => {
    return salons.value.filter(salon => {
      const matchRegion = salon.region === currentRegion.value;
      const matchCategory = selectedCategory.value === 'all' || salon.categories.includes(selectedCategory.value);
      const matchSearch = !searchQuery.value.trim() || 
        salon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        salon.tagline.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        salon.landmark.toLowerCase().includes(searchQuery.value.toLowerCase());
      
      return matchRegion && matchCategory && matchSearch;
    });
  });

  // Micro-Moment Matched Slots across the active region
  const matchedFlashSlots = computed(() => {
    const results = [];
    const regionSalons = salons.value.filter(s => s.region === currentRegion.value);

    for (const s of regionSalons) {
      if (s.flashSlots && s.flashSlots.length > 0) {
        for (const slot of s.flashSlots) {
          if (slot.isFlashActive) {
            const matchesDuration = !matcherFilter.value.durationMinutes || slot.durationMinutes <= matcherFilter.value.durationMinutes;
            const matchesDistance = !matcherFilter.value.maxDistanceMinutes || s.distanceMinutes <= matcherFilter.value.maxDistanceMinutes;
            
            if (matchesDuration && matchesDistance) {
              results.push({
                ...slot,
                salonId: s.id,
                salonName: s.name,
                salonLandmark: s.landmark,
                distanceMinutes: s.distanceMinutes,
                hygieneScore: s.hygieneScore,
                salonPhone: s.phone,
                salonImageUrl: s.imageUrl
              });
            }
          }
        }
      }
    }
    return results;
  });

  // Saved Salons list
  const savedSalonsList = computed(() => {
    return salons.value.filter(s => savedSalonIds.value.includes(s.id));
  });

  // Merchant Managed Salon (Defaults to Salon 1 - Martha Heritage)
  const merchantSalon = computed(() => {
    return salons.value.find(s => s.id === 'salon-1') || salons.value[0];
  });

  // Merchant incoming orders
  const merchantBookings = computed(() => {
    return bookings.value.filter(b => b.salonId === merchantSalon.value.id);
  });

  // Actions
  const toggleSaveSalon = (salonId) => {
    const idx = savedSalonIds.value.indexOf(salonId);
    if (idx > -1) {
      savedSalonIds.value.splice(idx, 1);
    } else {
      savedSalonIds.value.push(salonId);
    }
  };

  const isSalonSaved = (salonId) => {
    return savedSalonIds.value.includes(salonId);
  };

  const addBooking = (newBooking) => {
    bookings.value.unshift({
      ...newBooking,
      id: `ZEN-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending'
    });
  };

  const confirmBooking = (bookingId) => {
    const b = bookings.value.find(item => item.id === bookingId);
    if (b) {
      b.status = 'confirmed';
    }
  };

  const declineBooking = (bookingId) => {
    const idx = bookings.value.findIndex(item => item.id === bookingId);
    if (idx > -1) {
      bookings.value.splice(idx, 1);
    }
  };

  const toggleFlashSlot = (slotId) => {
    const salon = salons.value.find(s => s.id === merchantSalon.value.id);
    if (salon && salon.flashSlots) {
      const slot = salon.flashSlots.find(sl => sl.id === slotId);
      if (slot) {
        slot.isFlashActive = !slot.isFlashActive;
      }
    }
  };

  const addMerchantFlashSlot = (newSlot) => {
    const salon = salons.value.find(s => s.id === merchantSalon.value.id);
    if (salon) {
      salon.flashSlots.unshift({
        id: `slot-${Date.now()}`,
        ...newSlot,
        isFlashActive: true,
        expiresInMinutes: 60
      });
    }
  };

  return {
    currentRole,
    currentRegion,
    currentLanguage,
    previewMode,
    activeTab,
    selectedCategory,
    searchQuery,
    matcherFilter,
    salons,
    bookings,
    savedSalonIds,
    selectedSalonForDetail,
    selectedSlotForBooking,
    isAiTranslatorOpen,
    isWhatsAppModalOpen,
    currentBookingPayload,
    selectedTherapistCardBooking,
    t,
    activeRegionObj,
    filteredSalons,
    matchedFlashSlots,
    savedSalonsList,
    merchantSalon,
    merchantBookings,
    toggleSaveSalon,
    isSalonSaved,
    addBooking,
    confirmBooking,
    declineBooking,
    toggleFlashSlot,
    addMerchantFlashSlot
  };
}
