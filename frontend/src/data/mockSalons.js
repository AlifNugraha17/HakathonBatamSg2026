export const MOCK_REGIONS = [
  { 
    id: 'batam', 
    name: 'Batam Harbour Bay Zone', 
    country: 'Indonesia', 
    flag: '🇮🇩', 
    currency: 'IDR', 
    ferryHub: 'Direct 45m Ferry from Singapore HarbourFront' 
  },
  { 
    id: 'batam_centre', 
    name: 'Batam Centre Terminal Zone', 
    country: 'Indonesia', 
    flag: '🇮🇩', 
    currency: 'IDR', 
    ferryHub: 'Direct 45m Ferry from Singapore Tanah Merah / HarbourFront' 
  },
  { 
    id: 'batam_nongsa', 
    name: 'Nongsa Pura Luxury Coast', 
    country: 'Indonesia', 
    flag: '🇮🇩', 
    currency: 'IDR', 
    ferryHub: 'Direct 35m Ferry from Singapore Tanah Merah' 
  }
];

export const MOCK_CATEGORIES = [
  { id: 'all', name: 'All Wellness', icon: 'Sparkles', count: 18 },
  { id: 'massage', name: 'Balinese & Deep Massage', icon: 'Activity', count: 8 },
  { id: 'reflexology', name: 'Express Reflexology', icon: 'Footprints', count: 6 },
  { id: 'spa', name: 'Aroma & Herbal Spa', icon: 'Flower2', count: 5 },
  { id: 'nails', name: 'Nail Art & Gel Polish', icon: 'HeartHandshake', count: 4 },
  { id: 'headspa', name: 'Herbal Head Spa', icon: 'Wind', count: 3 }
];

export const MOCK_SALONS = [
  {
    id: 'salon-1',
    name: 'Martha Heritage Herbal Spa Grand Batam',
    tagline: 'Authentic Balinese Touch & Warm Jamu Herbal Steam',
    region: 'batam',
    landmark: '3 mins walk from Harbour Bay Ferry Terminal',
    distanceMinutes: 3,
    rating: 4.9,
    reviewCount: 248,
    hygieneScore: 99,
    hygieneBadges: [
      'Single-Use Organic Bed Linens',
      'UV Sanitized Tools (Hospital Grade)',
      '100% Certified Master Therapists',
      'Individual Fresh Herbal Infusion'
    ],
    phone: '+6281270088990',
    address: 'Komplek Harbour Bay Mall Ruko No. 8-9, Batu Ampar, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['massage', 'reflexology', 'spa'],
    openNow: true,
    operatingHours: '09:00 - 22:00 (WIB)',
    therapists: [
      { name: 'Ibu Ratna', experience: '12 yrs exp', specialty: 'Balinese Pressure & Acupressure', rating: 4.9 },
      { name: 'Mas Budi', experience: '8 yrs exp', specialty: 'Reflexology & Sciatica Release', rating: 4.8 },
      { name: 'Mbak Dewi', experience: '6 yrs exp', specialty: 'Aroma Therapy & Head Spa', rating: 4.9 }
    ],
    flashSlots: [
      {
        id: 'slot-101',
        time: '14:15 - 15:15',
        durationMinutes: 60,
        therapistName: 'Ibu Ratna',
        discountPercent: 20,
        chair: 'Private VIP Room 1',
        serviceName: 'Balinese Herbal Oil Deep Tissue',
        priceIdr: 200000,
        originalPriceIdr: 250000,
        isFlashActive: true,
        expiresInMinutes: 12
      },
      {
        id: 'slot-102',
        time: '15:30 - 16:15',
        durationMinutes: 45,
        therapistName: 'Mas Budi',
        discountPercent: 25,
        chair: 'Reflexology Recliner 3',
        serviceName: 'Express Travel Foot & Calf Revival',
        priceIdr: 135000,
        originalPriceIdr: 180000,
        isFlashActive: true,
        expiresInMinutes: 28
      }
    ],
    services: [
      {
        id: 'srv-101',
        name: 'Balinese Herbal Oil Deep Tissue',
        durationMinutes: 60,
        priceIdr: 250000,
        category: 'massage',
        popular: true,
        desc: 'Traditional Indonesian palm kneading, skin rolling, and warm infused ginger-clove oil targeting tight lower back and shoulder knots.'
      },
      {
        id: 'srv-102',
        name: 'Express Travel Foot & Calf Revival',
        durationMinutes: 45,
        priceIdr: 180000,
        category: 'reflexology',
        popular: true,
        desc: 'Specialized foot pressure-point relief designed to restore circulation after maritime ferry transit and duty-free shopping.'
      },
      {
        id: 'srv-103',
        name: 'Royal Javanese Lulur & Body Polish',
        durationMinutes: 90,
        priceIdr: 380000,
        category: 'spa',
        popular: false,
        desc: 'Full body botanical scrub with turmeric, rice powder, jasmine essence followed by yoghurt skin hydration.'
      }
    ]
  },
  {
    id: 'salon-2',
    name: 'Eska Wellness & Reflexology Harbour Bay',
    tagline: 'Modern Hydrotherapy & Rapid Pre-Ferry Decompression',
    region: 'batam',
    landmark: 'Directly linked to Harbour Bay Ferry Terminal Walkway',
    distanceMinutes: 2,
    rating: 4.85,
    reviewCount: 312,
    hygieneScore: 98,
    hygieneBadges: [
      'Medical Grade Sanitization',
      'Disposable Slippers & Underwear',
      'BNSP Licensed Senior Practitioners',
      'Allergy Free Natural Carrier Oils'
    ],
    phone: '+6281364551122',
    address: 'Bayfront Promenade Block C-12, Harbour Bay, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['massage', 'reflexology', 'headspa'],
    openNow: true,
    operatingHours: '09:00 - 22:30 (WIB)',
    therapists: [
      { name: 'Kak Sarah', experience: '9 yrs exp', specialty: 'Upper Trapezius & Migraine Relief', rating: 4.9 },
      { name: 'Pak Agus', experience: '14 yrs exp', specialty: 'Deep Shiatsu & Spinal Alignment', rating: 4.8 }
    ],
    flashSlots: [
      {
        id: 'slot-201',
        time: '14:30 - 15:00',
        durationMinutes: 30,
        therapistName: 'Kak Sarah',
        discountPercent: 15,
        chair: 'Chair 4 (Fast Track)',
        serviceName: 'Express 30-Min Head, Neck & Shoulder Blitz',
        priceIdr: 120000,
        originalPriceIdr: 140000,
        isFlashActive: true,
        expiresInMinutes: 8
      }
    ],
    services: [
      {
        id: 'srv-201',
        name: 'Express 30-Min Head, Neck & Shoulder Blitz',
        durationMinutes: 30,
        priceIdr: 140000,
        category: 'massage',
        popular: true,
        desc: 'Quick targeted relief for passengers with less than 45 minutes before ferry boarding calls.'
      },
      {
        id: 'srv-202',
        name: 'Japanese Scalp Waterfall & Herbal Head Spa',
        durationMinutes: 60,
        priceIdr: 320000,
        category: 'headspa',
        popular: true,
        desc: 'Warm water circulator ring, volcanic clay scalp detox, and therapeutic temple acupressure.'
      }
    ]
  },
  {
    id: 'salon-3',
    name: 'Nagoya Hill Reflexology & Aromatherapy Sanctuary',
    tagline: 'Premium Thai Acupressure & Reflexology Center',
    region: 'batam_centre',
    landmark: '5 mins from Batam Centre Ferry Terminal',
    distanceMinutes: 5,
    rating: 4.78,
    reviewCount: 194,
    hygieneScore: 96,
    hygieneBadges: [
      'Fresh Laundered Sheets Every Guest',
      'UV Sterilized Hot Towel Cabinets',
      'Non-Greasy Aromatherapy Formulas'
    ],
    phone: '+6281233445566',
    address: 'Nagoya City Walk Complex Blok A No. 1-3, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['reflexology', 'massage'],
    openNow: true,
    operatingHours: '10:00 - 22:00 (WIB)',
    therapists: [
      { name: 'Ibu Maya', experience: '7 yrs exp', specialty: 'Reflexology & Lymphatic Drainage', rating: 4.8 },
      { name: 'Mas Dian', experience: '10 yrs exp', specialty: 'Deep Tissue Shiatsu', rating: 4.7 }
    ],
    flashSlots: [
      {
        id: 'slot-301',
        time: '15:00 - 15:45',
        durationMinutes: 45,
        therapistName: 'Ibu Maya',
        discountPercent: 18,
        chair: 'Recliner Suite 2',
        serviceName: 'Acupressure Foot & Arm Restoration',
        priceIdr: 145000,
        originalPriceIdr: 175000,
        isFlashActive: true,
        expiresInMinutes: 20
      }
    ],
    services: [
      {
        id: 'srv-301',
        name: 'Acupressure Foot & Arm Restoration',
        durationMinutes: 45,
        priceIdr: 175000,
        category: 'reflexology',
        popular: true,
        desc: 'Concentrated pressure points targeting feet, calves, palms, and forearms with warming ginger balm.'
      }
    ]
  },
  {
    id: 'salon-4',
    name: 'Nongsa Pura Coastal Botanical Spa',
    tagline: 'Seaside Pavilion Relaxation by the Marina',
    region: 'batam_nongsa',
    landmark: '2 mins walk from Nongsa Pura Ferry Terminal',
    distanceMinutes: 2,
    rating: 4.95,
    reviewCount: 180,
    hygieneScore: 99,
    hygieneBadges: [
      'Private Oceanfront Suites',
      'Single-Use Organic Bed Linens',
      'Hospital Grade Autoclave Tools',
      'Hypoallergenic Virgin Coconut Oils'
    ],
    phone: '+6281198765432',
    address: 'Nongsa Marina Promenade, Nongsa, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['massage', 'spa', 'reflexology'],
    openNow: true,
    operatingHours: '09:00 - 21:00 (WIB)',
    therapists: [
      { name: 'Ibu Wayan', experience: '15 yrs exp', specialty: 'Coastal Warm Stone Deep Therapy', rating: 5.0 },
      { name: 'Mbak Cindy', experience: '8 yrs exp', specialty: 'Organic Herbal Jamu Compress', rating: 4.9 }
    ],
    flashSlots: [
      {
        id: 'slot-401',
        time: '16:00 - 17:00',
        durationMinutes: 60,
        therapistName: 'Ibu Wayan',
        discountPercent: 20,
        chair: 'Oceanfront Pavilion 1',
        serviceName: 'Nongsa Ocean Breeze Herbal Massage',
        priceIdr: 280000,
        originalPriceIdr: 350000,
        isFlashActive: true,
        expiresInMinutes: 15
      }
    ],
    services: [
      {
        id: 'srv-401',
        name: 'Nongsa Ocean Breeze Herbal Massage',
        durationMinutes: 60,
        priceIdr: 350000,
        category: 'massage',
        popular: true,
        desc: 'Deep thumb pressure along meridian lines combined with palm kneading and organic virgin coconut massage oil overlooking the Singapore strait.'
      }
    ]
  }
];
