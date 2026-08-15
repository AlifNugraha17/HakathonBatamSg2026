export const MOCK_REGIONS = [
  { 
    id: 'batam', 
    name: 'Batam Harbour Bay & Baloi Zone', 
    country: 'Indonesia', 
    flag: '🇮🇩', 
    currency: 'IDR', 
    ferryHub: 'Direct 45m Ferry from Singapore HarbourFront' 
  },
  { 
    id: 'batam_centre', 
    name: 'Batam Centre Terminal & Seraya Zone', 
    country: 'Indonesia', 
    flag: '🇮🇩', 
    currency: 'IDR', 
    ferryHub: 'Direct 45m Ferry from Singapore Tanah Merah / HarbourFront' 
  },
  { 
    id: 'batam_nongsa', 
    name: 'Nongsa Pura Resorts & Coast', 
    country: 'Indonesia', 
    flag: '🇮🇩', 
    currency: 'IDR', 
    ferryHub: 'Direct 35m Ferry from Singapore Tanah Merah' 
  }
];

export const MOCK_CATEGORIES = [
  { id: 'all', name: '🌟 All Destinations (49)', icon: 'Sparkles', count: 49 },
  { id: 'medical', name: '🏥 Hospitals & Executive Checkups', icon: 'Activity', count: 23 },
  { id: 'dental', name: '🦷 Dental & Aesthetics', icon: 'HeartHandshake', count: 6 },
  { id: 'massage', name: '💆‍♀️ Wellness & Herbal Spas', icon: 'Flower2', count: 12 },
  { id: 'culinary', name: '🦀 Seafood Kelong & Cafes', icon: 'Coffee', count: 14 },
  { id: 'golf', name: '⛳ Golf & Beach Resorts', icon: 'Sun', count: 8 }
];

export const MOCK_SALONS = [
  {
    id: 'salon-1',
    name: 'RS Awal Bros Batam — Executive Health Center',
    tagline: 'KARS International Accredited • 1.5T MRI • Cardiology & Orthopedics',
    region: 'batam',
    landmark: '5 mins from Harbour Bay Ferry Terminal',
    distanceMinutes: 5,
    rating: 4.95,
    reviewCount: 380,
    hygieneScore: 99,
    hygieneBadges: [
      'KARS Paripurna Accredited',
      '1.5 Tesla MRI & 128-Slice CT',
      'English-Speaking Specialists',
      'VIP Terminal Ferry Pickup Liaison'
    ],
    phone: '+62 778 431 777',
    address: 'Jl. Gajah Mada Kav. 1, Baloi, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['medical', 'hospital'],
    services: [
      {
        id: 'srv-1',
        name: 'Executive Medical Screening + 1.5T MRI',
        durationMinutes: 120,
        priceIdr: 3890000,
        priceSgd: 280.00,
        category: 'medical',
        popular: true,
        desc: 'Comprehensive blood biochemistry panel, 1.5 Tesla MRI spine/brain scan, ECG, and immediate doctor consultation.'
      },
      {
        id: 'srv-2',
        name: 'Cardiovascular Comprehensive Screening (Cath Lab & Echo)',
        durationMinutes: 90,
        priceIdr: 2950000,
        priceSgd: 212.00,
        category: 'medical',
        popular: true,
        desc: 'Echocardiography, treadmill stress test, carotid doppler, and cardiologist review.'
      }
    ],
    therapists: [
      {
        id: 'th-1',
        name: 'dr. Bambang Hermanto, Sp.JP(K), FIHA',
        experience: 'Senior Interventional Cardiologist',
        specialty: 'Cardiovascular & Cath Lab Specialist',
        rating: 4.98,
        bnspCertified: true,
        status: 'available'
      },
      {
        id: 'th-2',
        name: 'dr. Hendra Gunawan, Sp.OT',
        experience: 'Spine & Orthopedic Surgeon',
        specialty: 'Orthopedic & Joint Surgery',
        rating: 4.93,
        bnspCertified: true,
        status: 'available'
      }
    ],
    flashSlots: [
      {
        id: 'slot-1',
        therapistName: 'dr. Bambang Hermanto, Sp.JP',
        serviceName: 'Executive Medical Screening Slot',
        chair: 'VIP Medical Suite 1',
        time: '09:30 - 11:30',
        durationMinutes: 120,
        discountPercent: 20,
        priceIdr: 3100000,
        originalPriceIdr: 3890000,
        isFlashActive: true,
        expiresAt: new Date(Date.now() + 3 * 3600000).toISOString()
      }
    ]
  },
  {
    id: 'salon-2',
    name: 'Nagoya Dental & Aesthetic Smile Center',
    tagline: 'Titanium Dental Implants • Laser Teeth Whitening • Orthodontics',
    region: 'batam',
    landmark: '3 mins from Nagoya Hill Mall & Harbour Bay',
    distanceMinutes: 4,
    rating: 4.94,
    reviewCount: 290,
    hygieneScore: 99,
    hygieneBadges: [
      'Hospital Grade Autoclave Sterilization',
      'Certified Aesthetic Dental Masters',
      'Real-time SGD Transparant Pricing',
      'Free Digital Panoramic X-Ray'
    ],
    phone: '+62 778 456 888',
    address: 'Nagoya City Walk Complex Blok B No. 8-10, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['dental', 'medical'],
    services: [
      {
        id: 'srv-3',
        name: 'Laser Teeth Whitening (Power Bleaching)',
        durationMinutes: 60,
        priceIdr: 1800000,
        priceSgd: 130.00,
        category: 'dental',
        popular: true,
        desc: 'Advanced cold-light blue laser whitening brightening teeth up to 8 shades in a single 60-min session.'
      },
      {
        id: 'srv-4',
        name: 'Titanium Dental Implant + Zirconia Crown',
        durationMinutes: 90,
        priceIdr: 8500000,
        priceSgd: 610.00,
        category: 'dental',
        popular: true,
        desc: 'Surgical grade titanium fixture with natural translucent zirconia porcelain crown.'
      }
    ],
    therapists: [
      {
        id: 'th-3',
        name: 'drg. Cynthia Wijaya, Sp.KG',
        experience: 'Aesthetic Dentistry Specialist',
        specialty: 'Smile Design & Endodontics',
        rating: 4.97,
        bnspCertified: true,
        status: 'available'
      }
    ],
    flashSlots: [
      {
        id: 'slot-2',
        therapistName: 'drg. Cynthia Wijaya, Sp.KG',
        serviceName: 'Laser Teeth Whitening Slot',
        chair: 'Dental Chair 2',
        time: '11:45 - 12:45',
        durationMinutes: 60,
        discountPercent: 15,
        priceIdr: 1530000,
        originalPriceIdr: 1800000,
        isFlashActive: true,
        expiresAt: new Date(Date.now() + 4 * 3600000).toISOString()
      }
    ]
  },
  {
    id: 'salon-3',
    name: 'Restoran Seafood Kelong Barelang 168',
    tagline: 'Live Black Pepper Crab • Overwater Sea View • Barelang Bridge',
    region: 'batam_centre',
    landmark: 'Direct waterfront at Barelang Bridge 1',
    distanceMinutes: 20,
    rating: 4.88,
    reviewCount: 520,
    hygieneScore: 97,
    hygieneBadges: [
      'Fresh Catch Sea Enclosures',
      'Halal Certified Kitchen',
      'Overwater Sunset Pavilion'
    ],
    phone: '+62 812 7001 168',
    address: 'Jembatan 1 Barelang Waterfront, Tembesi, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['culinary', 'seafood'],
    services: [
      {
        id: 'srv-5',
        name: 'Signature Jumbo Black Pepper Crab (1 KG)',
        durationMinutes: 45,
        priceIdr: 420000,
        priceSgd: 30.00,
        category: 'culinary',
        popular: true,
        desc: 'Meaty live mud crabs wok-tossed in Sarawak black pepper sauce with aromatic butter curry leaves.'
      }
    ],
    therapists: [
      {
        id: 'th-4',
        name: 'Chef Ah Seng & Team',
        experience: '20 yrs Master Chef',
        specialty: 'Maritime Live Seafood',
        rating: 4.9,
        bnspCertified: true,
        status: 'available'
      }
    ],
    flashSlots: []
  },
  {
    id: 'salon-4',
    name: 'Palm Springs Golf & Beach Resort Nongsa',
    tagline: '18-Hole Championship Course • Ocean View • Luxury Club',
    region: 'batam_nongsa',
    landmark: '3 mins from Nongsa Pura Ferry Terminal',
    distanceMinutes: 3,
    rating: 4.92,
    reviewCount: 310,
    hygieneScore: 99,
    hygieneBadges: [
      'PGA Standard 18-Hole Course',
      'Professional Caddie Team',
      'Complimentary Buggy & Locker'
    ],
    phone: '+62 778 761 222',
    address: 'Jl. Hang Lekiu, Nongsa, Batam',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['golf', 'tourism'],
    services: [
      {
        id: 'srv-6',
        name: '18-Hole Ocean Championship Round',
        durationMinutes: 240,
        priceIdr: 1800000,
        priceSgd: 130.00,
        category: 'golf',
        popular: true,
        desc: 'Full 18-hole round with buggy, locker, professional caddie service, and post-game refreshment.'
      }
    ],
    therapists: [],
    flashSlots: []
  },
  {
    id: 'salon-5',
    name: 'Royal Heritage & Herbal Spa Grand Batam',
    tagline: 'Authentic Balinese Touch & Warm Jamu Herbal Steam',
    region: 'batam',
    landmark: '3 mins from Harbour Bay Ferry Terminal',
    distanceMinutes: 3,
    rating: 4.91,
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
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'
    ],
    categories: ['massage', 'wellness'],
    services: [
      {
        id: 'srv-7',
        name: 'Balinese Herbal Oil Deep Tissue',
        durationMinutes: 60,
        priceIdr: 250000,
        priceSgd: 18.00,
        category: 'massage',
        popular: true,
        desc: 'Traditional Indonesian palm kneading, skin rolling, and warm infused ginger-clove oil targeting tight lower back and shoulder knots.'
      }
    ],
    therapists: [
      {
        id: 'th-5',
        name: 'Ibu Ratna',
        experience: '12 yrs exp',
        specialty: 'Balinese Pressure & Acupressure',
        rating: 4.9,
        bnspCertified: true,
        status: 'available'
      }
    ],
    flashSlots: [
      {
        id: 'slot-3',
        therapistName: 'Ibu Ratna',
        serviceName: 'Balinese Herbal Oil Deep Tissue',
        chair: 'Private VIP Room 1',
        time: '14:15 - 15:15',
        durationMinutes: 60,
        discountPercent: 20,
        priceIdr: 200000,
        originalPriceIdr: 250000,
        isFlashActive: true,
        expiresAt: new Date(Date.now() + 2 * 3600000).toISOString()
      }
    ]
  }
];
