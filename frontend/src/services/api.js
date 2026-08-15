// Centralized High-Performance API Client for LokaBatam (Singapore - Batam Cross-Border Super-App)
const isBrowser = typeof window !== 'undefined';
const isCloudDeploy = isBrowser && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || (isCloudDeploy ? '/api/v1' : 'http://127.0.0.1:8000/api/v1');

// In-Memory Fast SWR Cache
const apiCache = new Map();
const CACHE_TTL_MS = 30000; // 30 seconds

export function clearApiCache(prefix = '') {
  if (!prefix) {
    apiCache.clear();
  } else {
    for (const key of apiCache.keys()) {
      if (key.startsWith(prefix)) {
        apiCache.delete(key);
      }
    }
  }
}

async function request(endpoint, options = {}) {
  const method = options.method ? options.method.toUpperCase() : 'GET';
  const url = `${API_BASE_URL}${endpoint}`;
  const cacheKey = `${method}:${endpoint}`;

  // Check cache for GET requests
  if (method === 'GET' && !options.skipCache) {
    const cached = apiCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
      return cached.data;
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }

    const data = await response.json();
    const result = data.data !== undefined ? data.data : data;

    // Cache successful GET responses
    if (method === 'GET') {
      apiCache.set(cacheKey, {
        timestamp: Date.now(),
        data: result
      });
    } else {
      // Invalidate related cache on mutations
      clearApiCache();
    }

    return result;
  } catch (error) {
    console.warn(`[LokaBatam API] Network request to ${endpoint} failed:`, error.message);
    throw error;
  }
}

export const api = {
  // Cache utility
  clearCache: clearApiCache,

  // Spas & Catalog
  getSpas: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/spas${qs ? `?${qs}` : ''}`);
  },
  getSpaDetail: (id) => request(`/spas/${id}`),

  // Flash Slots & Gap Matcher
  getMatchedGaps: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/matcher/find-gaps${qs ? `?${qs}` : ''}`);
  },
  getMerchantSlots: () => request('/merchant/slots'),
  broadcastSlot: (payload) => request('/merchant/slots/broadcast', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  toggleSlot: (id) => request(`/merchant/slots/${id}/toggle`, { method: 'POST' }).catch(() => null),
  removeSlot: (id) => request(`/merchant/slots/${id}`, { method: 'DELETE' }),

  // AI Medical NLP Translation
  translateMedical: (payload) => request('/ai/translate-medical', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  getAiPresets: () => request('/ai/presets'),
  generateAiItinerary: (payload) => request('/ai/generate-itinerary', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  touristAiChat: (payload) => request('/ai/tourist-chat', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  // Bookings & WhatsApp
  getBookings: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/bookings${qs ? `?${qs}` : ''}`);
  },
  createBooking: (payload) => request('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  getBookingDetail: (id) => request(`/bookings/${id}`),
  generateWhatsAppPayload: (payload) => request('/bookings/generate-whatsapp-payload', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  // Merchant Portal
  getMerchantOverview: () => request('/merchant/overview'),
  getMerchantOrders: () => request('/merchant/orders'),
  updateOrderStatus: (id, status) => request(`/merchant/orders/${id}/status`, {
    method: 'POST',
    body: JSON.stringify({ status })
  }),
  getMerchantTherapists: () => request('/merchant/therapists'),
  getMerchantProfile: () => request('/merchant/profile'),

  // Super Admin HQ
  getAdminMetrics: () => request('/admin/dashboard-metrics'),
  getAdminMerchants: () => request('/admin/merchants'),
  approveMerchant: (id) => request(`/admin/merchants/${id}/approve`, { method: 'POST' }),
  suspendMerchant: (id) => request(`/admin/merchants/${id}/suspend`, { method: 'POST' }),
  getAdminUsers: () => request('/admin/users'),
  getAiLogs: () => request('/admin/ai-logs'),
  getTreasurySummary: () => request('/admin/treasury-summary'),
  executeBiFastPayout: (payload) => request('/admin/payouts/execute-bi-fast', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  getSettings: () => request('/admin/settings'),
  updateSettings: (payload) => request('/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(payload)
  }),

  // Auth
  login: (payload) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  register: (payload) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  quickLogin: (role) => request('/auth/quick-login', {
    method: 'POST',
    body: JSON.stringify({ role })
  }),
  logout: () => request('/auth/logout', { method: 'POST' }).catch(() => null),
  getMe: () => request('/auth/me')
};
