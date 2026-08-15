export const INITIAL_BOOKINGS = [
  {
    id: 'ZEN-7821',
    salonId: 'salon-1',
    salonName: 'Martha Heritage Herbal Spa & Reflexology',
    salonPhone: '+6281270088990',
    salonAddress: 'Komplek Harbour Bay Mall Ruko No. 8-9, Batam',
    serviceName: 'Balinese Herbal Oil Deep Tissue',
    durationMinutes: 60,
    appointmentTime: '14:30 WIB (Today)',
    appointmentDate: '2026-08-15',
    touristName: 'Marcus Lim',
    touristCountry: '🇸🇬 Singapore',
    touristPhone: '+6591234567',
    ferryDepartureTime: '17:30 WIB (Batam Fast to HarbourFront SG)',
    priceIdr: 200000,
    status: 'confirmed', // 'confirmed', 'pending', 'completed'
    therapistName: 'Ibu Ratna',
    createdAt: '2026-08-15 12:45',
    specialRequestsEn: 'Firm pressure on shoulders, no lemongrass oil (eczema prone), prefer silent treatment to take a nap.',
    aiTranslatedCard: {
      category: 'Pijat Tradisional Bali & Terapi Minyak',
      pressure: 'Kuat (Firm) di area bahu & leher',
      focusAreas: ['Bahu & Belikat', 'Pinggang Bawah'],
      allergyAlerts: ['Alergi Minyak Serai / Lemongrass (Gunakan Virgin Coconut Oil Murni)'],
      etiquette: ['Sesi Hening (Tamu ingin tidur/istirahat tanpa obrolan)'],
      therapistNotesId: 'Tamu asal Singapura dengan jadwal ferry jam 17:30. Fokus pada peregangan otot bahu tegang. Peringatan: jangan gunakan aroma serai karena alergi kulit.'
    }
  },
  {
    id: 'ZEN-9904',
    salonId: 'salon-1',
    salonName: 'Martha Heritage Herbal Spa & Reflexology',
    salonPhone: '+6281270088990',
    salonAddress: 'Komplek Harbour Bay Mall Ruko No. 8-9, Batam',
    serviceName: 'Micro-Moment Express Foot Reflexology',
    durationMinutes: 45,
    appointmentTime: '15:30 WIB (Today)',
    appointmentDate: '2026-08-15',
    touristName: 'Sarah Jenkins',
    touristCountry: '🇦🇺 Australia',
    touristPhone: '+61400123456',
    ferryDepartureTime: '18:15 WIB (Batam to SG)',
    priceIdr: 136000,
    status: 'pending',
    therapistName: 'Mas Budi',
    createdAt: '2026-08-15 13:10',
    specialRequestsEn: 'Medium pressure on left calf due to slight ankle sprain. Clean tools please.',
    aiTranslatedCard: {
      category: 'Refleksi Kaki Cepat & Relaksasi Betis',
      pressure: 'Sedang (Medium)',
      focusAreas: ['Betis Kiri (Hati-hati riwayat cedera pergelangan kaki)', 'Telapak Kaki'],
      allergyAlerts: [],
      etiquette: ['Standar Kebersihan Higienis Ekstra'],
      therapistNotesId: 'Terapis mohon berhati-hati pada area pergelangan kaki kiri tamu yang pernah terkilir ringan. Gunakan tekanan lembut-sedang.'
    }
  }
];
