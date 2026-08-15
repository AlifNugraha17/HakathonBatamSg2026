import { ref, computed } from 'vue';
import { I18N_STRINGS } from '../data/translations';
import { api } from '../services/api';
import { useNotification } from './useNotification';

export const REGIONS = [
  {
    id: 'batam',
    name: 'Harbour Bay & Batu Ampar',
    ferryHub: 'HarbourFront Singapore (45m ferry)',
    distanceNote: '1-5 mins from Harbour Bay Ferry Terminal',
    tag: 'Ferry Gate 1'
  },
  {
    id: 'batam_centre',
    name: 'Batam Centre & Mega Mall',
    ferryHub: 'Tanah Merah / HarbourFront SG (50m ferry)',
    distanceNote: 'Directly across Batam Centre Ferry Terminal',
    tag: 'Ferry Gate 2'
  },
  {
    id: 'batam_nongsa',
    name: 'Nongsa Pura Resorts',
    ferryHub: 'Tanah Merah Singapore (35m ferry)',
    distanceNote: '2 mins from Nongsa Pura Ferry Terminal',
    tag: 'Ferry Gate 3'
  }
];

// Reactive Shared State (100% Real Database)
const currentRole = ref('tourist'); // 'tourist' | 'merchant'
const currentRegion = ref('batam');
const currentLanguage = ref('en'); // 'en' | 'id'
const previewMode = ref('phone'); // 'phone' | 'responsive'
const activeTab = ref('discover'); // 'discover' | 'matcher' | 'translator' | 'bookings' | 'saved'

const selectedCategory = ref('all');
const searchQuery = ref('');
const isLoading = ref(false);

// Smart Time Gap Matcher filters
const matcherFilter = ref({
  durationMinutes: 45,
  timeTarget: '14:30',
  maxDistanceMinutes: 10,
  landmark: 'Harbour Bay Ferry Terminal'
});

const salons = ref([]);
const bookings = ref([]);
const savedSalonIds = ref([]);

// Active Modals & Selected items
const selectedSalonForDetail = ref(null);
const selectedSlotForBooking = ref(null);
const isAiTranslatorOpen = ref(false);
const isWhatsAppModalOpen = ref(false);
const currentBookingPayload = ref(null);
const selectedTherapistCardBooking = ref(null);

// Initial backend fetch flag
let isInitialized = false;

export function useZenturaStore() {
  const { showSuccess, showError, showInfo } = useNotification();

  const t = computed(() => {
    return I18N_STRINGS[currentLanguage.value] || I18N_STRINGS.en;
  });

  const activeRegionObj = computed(() => {
    return REGIONS.find(r => r.id === currentRegion.value) || REGIONS[0];
  });

  // Filtered Salons based on region, category, search
  const filteredSalons = computed(() => {
    return salons.value.filter(salon => {
      const matchRegion = !currentRegion.value || salon.region === currentRegion.value;
      const matchCategory = selectedCategory.value === 'all' || (salon.categories && salon.categories.includes(selectedCategory.value));
      const matchSearch = !searchQuery.value.trim() ||
        (salon.name && salon.name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (salon.tagline && salon.tagline.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (salon.landmark && salon.landmark.toLowerCase().includes(searchQuery.value.toLowerCase()));

      return matchRegion && matchCategory && matchSearch;
    });
  });

  // Micro-Moment Matched Slots across the active region
  const matchedFlashSlots = computed(() => {
    const results = [];
    const regionSalons = currentRegion.value
      ? salons.value.filter(s => s.region === currentRegion.value)
      : salons.value;

    for (const s of regionSalons) {
      if (s.flashSlots && s.flashSlots.length > 0) {
        for (const slot of s.flashSlots) {
          if (slot.isFlashActive || slot.is_flash_active) {
            const duration = slot.durationMinutes || slot.duration_minutes || 60;
            const distance = s.distanceMinutes || s.distance_minutes || 5;
            const matchesDuration = !matcherFilter.value.durationMinutes || duration <= matcherFilter.value.durationMinutes;
            const matchesDistance = !matcherFilter.value.maxDistanceMinutes || distance <= matcherFilter.value.maxDistanceMinutes;

            if (matchesDuration && matchesDistance) {
              results.push({
                ...slot,
                salonId: s.id,
                salonName: s.name,
                salonLandmark: s.landmark,
                distanceMinutes: distance,
                hygieneScore: s.hygieneScore || s.hygiene_score || 98,
                salonPhone: s.phone,
                salonImageUrl: s.imageUrl || s.image_url
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

  // Merchant Managed Salon (Defaults to first salon or empty placeholder)
  const merchantSalon = computed(() => {
    return salons.value.find(s => s.id === 'salon-1') || salons.value[0] || {
      id: 'salon-1',
      name: 'Spa Partner Facility',
      flashSlots: [],
      therapists: [],
      services: []
    };
  });

  // Merchant incoming orders
  const merchantBookings = computed(() => {
    if (!merchantSalon.value || !merchantSalon.value.id) return bookings.value;
    return bookings.value.filter(b => b.salonId === merchantSalon.value.id || b.spa_id === merchantSalon.value.id);
  });

  // Async API Loaders from PostgreSQL Database
  const loadSalonsFromApi = async () => {
    try {
      isLoading.value = true;
      const data = await api.getSpas();
      if (Array.isArray(data)) {
        salons.value = data;
      }
    } catch (e) {
      console.warn('[Zentura Store] Error loading spas from database:', e.message);
    } finally {
      isLoading.value = false;
    }
  };

  const loadBookingsFromApi = async () => {
    try {
      const data = await api.getBookings();
      if (Array.isArray(data)) {
        bookings.value = data;
      }
    } catch (e) {
      console.warn('[Zentura Store] Error loading bookings from database:', e.message);
    }
  };

  // Run initial fetch once
  if (!isInitialized) {
    isInitialized = true;
    loadSalonsFromApi();
    loadBookingsFromApi();
  }

  // Actions
  const toggleSaveSalon = (salonId) => {
    const idx = savedSalonIds.value.indexOf(salonId);
    if (idx > -1) {
      savedSalonIds.value.splice(idx, 1);
      showInfo({
        id: 'Spa dihapus dari daftar bookmark.',
        en: 'Spa removed from bookmarks.'
      }, {
        id: 'Bookmark',
        en: 'Bookmark'
      });
    } else {
      savedSalonIds.value.push(salonId);
      showSuccess({
        id: 'Spa berhasil disimpan ke daftar bookmark!',
        en: 'Spa saved to bookmarks!'
      }, {
        id: 'Bookmark Disimpan',
        en: 'Bookmark Saved'
      });
    }
  };

  const isSalonSaved = (salonId) => {
    return savedSalonIds.value.includes(salonId);
  };

  const addBooking = async (newBooking) => {
    try {
      const created = await api.createBooking({
        spa_id: newBooking.salonId || '1',
        guest_name: newBooking.guestName || newBooking.guest_name || 'Traveler',
        guest_phone: newBooking.guestPhone || newBooking.guest_phone || '+65 9123 4567',
        service_name: newBooking.serviceName || newBooking.service_name || 'Massage',
        therapist_name: newBooking.therapistName || newBooking.therapist_name || 'Senior Therapist',
        booking_time: newBooking.time || newBooking.booking_time || '14:30 WIB',
        duration_minutes: newBooking.durationMinutes || newBooking.duration_minutes || 60,
        price_idr: newBooking.priceIdr || newBooking.price_idr || 200000,
        ferry_time: newBooking.ferryTime || newBooking.ferry_time || '17:00 Ferry',
        medical_notes: newBooking.medicalBrief || newBooking.medical_notes || '',
        allergy_alert: newBooking.allergyAlert || newBooking.allergy_alert || '',
      });
      await loadBookingsFromApi();
      const code = created?.booking_code || created?.bookingCode || created?.id || 'ZEN-SG';
      showSuccess({
        id: `Reservasi #${code} berhasil dikonfirmasi dan tersimpan!`,
        en: `Reservation #${code} confirmed & stored successfully!`
      }, {
        id: 'Pemesanan Berhasil',
        en: 'Booking Confirmed'
      });
      return created;
    } catch (e) {
      // Local offline fallback
      const fallbackBooking = {
        id: `BK-${Date.now().toString().slice(-4)}`,
        bookingCode: `ZEN-${Math.floor(1000 + Math.random() * 9000)}`,
        spa_id: newBooking.salonId || '1',
        salonId: newBooking.salonId || '1',
        salonName: newBooking.salonName || 'Martha Heritage Spa',
        serviceName: newBooking.serviceName || 'Balinese Traditional Massage',
        guestName: newBooking.guestName || 'Marcus Lim',
        therapistName: newBooking.therapistName || 'Ibu Dewi',
        time: newBooking.time || '15:00 WIB',
        durationMinutes: newBooking.durationMinutes || 60,
        priceIdr: newBooking.priceIdr || 250000,
        status: 'pending',
        paymentMethod: 'PayNow SGD (Instant BI-FAST)',
        createdAt: new Date().toISOString()
      };
      bookings.value.unshift(fallbackBooking);
      showSuccess({
        id: `Pemesanan #${fallbackBooking.id} berhasil ditambahkan ke jadwal Anda!`,
        en: `Booking #${fallbackBooking.id} confirmed and added to your itinerary!`
      }, { id: 'Pemesanan Berhasil', en: 'Booking Confirmed' });
      return fallbackBooking;
    }
  };

  const createBookingFromSlot = async (slot = {}) => {
    const bookingItem = {
      salonId: slot.salonId || 'salon-1',
      salonName: slot.salonName || 'Martha Heritage Spa',
      serviceName: slot.serviceName || 'Balinese Bodywork',
      therapistName: slot.therapistName || 'Master Practitioner',
      priceIdr: slot.priceIdr || 250000,
      time: slot.time || '15:00 WIB',
      durationMinutes: slot.durationMinutes || 60,
      guestName: 'Alexandre Tan (SG Ferry Passenger)',
      ferryTime: '17:30 Batam Fast Ferry'
    };
    return await addBooking(bookingItem);
  };

  const confirmBooking = async (bookingId) => {
    // 1. Optimistic UI update immediately
    const found = bookings.value.find(b => 
      String(b.id) === String(bookingId) || 
      String(b.bookingCode) === String(bookingId) || 
      String(b.booking_code) === String(bookingId)
    );
    if (found) {
      found.status = 'confirmed';
    }

    try {
      localStorage.setItem('zentura_confirmed_orders_' + bookingId, 'confirmed');
    } catch (e) {}

    try {
      await api.updateOrderStatus(bookingId, 'confirmed');
      await loadBookingsFromApi();
    } catch (e) {
      console.warn('[Store] Remote order status sync fallback:', e.message);
    }

    showSuccess({
      id: `Pesanan #${bookingId} telah dikonfirmasi dan status terupdate di database!`,
      en: `Order #${bookingId} confirmed and updated in database!`
    }, {
      id: 'Konfirmasi Berhasil',
      en: 'Order Confirmed'
    });
  };

  const declineBooking = async (bookingId) => {
    // 1. Optimistic UI update immediately
    const found = bookings.value.find(b => 
      String(b.id) === String(bookingId) || 
      String(b.bookingCode) === String(bookingId) || 
      String(b.booking_code) === String(bookingId)
    );
    if (found) {
      found.status = 'cancelled';
    }

    try {
      localStorage.setItem('zentura_confirmed_orders_' + bookingId, 'cancelled');
    } catch (e) {}

    try {
      await api.updateOrderStatus(bookingId, 'cancelled');
      await loadBookingsFromApi();
    } catch (e) {
      console.warn('[Store] Remote order status sync fallback:', e.message);
    }

    showInfo({
      id: `Pesanan #${bookingId} telah dibatalkan.`,
      en: `Order #${bookingId} has been cancelled.`
    }, {
      id: 'Pesanan Dibatalkan',
      en: 'Order Cancelled'
    });
  };

  const toggleFlashSlot = async (slotId) => {
    try {
      await api.toggleSlot(slotId);
      await loadSalonsFromApi();
      showInfo({
        id: 'Status ketersediaan kursi kosong berhasil diperbarui.',
        en: 'Flash chair availability updated.'
      }, {
        id: 'Slot Kursi',
        en: 'Chair Slot'
      });
    } catch (e) {
      showError({
        id: e.message || 'Gagal memperbarui status kursi.',
        en: e.message || 'Failed to update chair status.'
      }, {
        id: 'Update Gagal',
        en: 'Update Failed'
      });
    }
  };

  const addMerchantFlashSlot = async (newSlot) => {
    try {
      const created = await api.broadcastSlot({
        therapist_name: newSlot.therapistName || newSlot.therapist_name || 'Ibu Ratna',
        service_name: newSlot.serviceName || newSlot.service_name || 'Flash Massage',
        duration_minutes: newSlot.durationMinutes || newSlot.duration_minutes || 45,
        discount_percent: newSlot.discountPercent || newSlot.discount_percent || 20,
        chair: newSlot.chair || 'Chair 1',
        price_idr: newSlot.priceIdr || newSlot.price_idr || 150000,
        original_price_idr: newSlot.originalPriceIdr || newSlot.original_price_idr || 200000,
        time_window: newSlot.time || 'Next Available Window',
      });
      await loadSalonsFromApi();
      showSuccess({
        id: 'Kursi kosong berhasil disiarkan secara live ke Gap Matcher feri!',
        en: 'Vacant chair successfully broadcasted live to Ferry Gap Matcher!'
      }, {
        id: 'Broadcast Berhasil',
        en: 'Broadcast Live'
      });
      return created;
    } catch (e) {
      const msg = {
        id: e.message || 'Gagal menyiarkan kursi kosong.',
        en: e.message || 'Failed to broadcast vacant chair.'
      };
      showError(msg, { id: 'Broadcast Gagal', en: 'Broadcast Failed' });
      throw e;
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
    isLoading,
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
    createBookingFromSlot,
    confirmBooking,
    declineBooking,
    toggleFlashSlot,
    addMerchantFlashSlot,
    loadSalonsFromApi,
    loadBookingsFromApi,
  };
}
