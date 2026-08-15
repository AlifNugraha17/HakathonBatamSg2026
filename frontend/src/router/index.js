import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/landing/LandingPage.vue';
import LoginPage from '../views/auth/LoginPage.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import MerchantDashboard from '../views/merchant/MerchantDashboard.vue';
import TouristPortal from '../views/tourist/TouristPortal.vue';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
    meta: { title: 'Zentura — SG ⇄ Batam Cross-Border Wellness' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { title: 'Sign In — Zentura' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: { title: 'Super Admin HQ — Zentura', role: 'admin' }
  },
  {
    path: '/merchant',
    name: 'merchant',
    component: MerchantDashboard,
    meta: { title: 'Merchant Hub — Zentura', role: 'merchant' }
  },
  {
    path: '/tourist',
    name: 'tourist',
    component: TouristPortal,
    meta: { title: 'Tourist Concierge — Zentura', role: 'tourist' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: () => {
      try {
        const raw = localStorage.getItem('zentura_auth_session');
        if (raw) {
          const session = JSON.parse(raw);
          if (session && session.role) {
            return `/${session.role}`;
          }
        }
      } catch (e) {}
      return '/tourist';
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
