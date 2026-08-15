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
    meta: { title: 'LokaBatam — SG ⇄ Batam Medical, Wellness & Getaways' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { title: 'Sign In — LokaBatam' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: { title: 'Cross-Border HQ Console — LokaBatam', role: 'admin' }
  },
  {
    path: '/partner',
    alias: '/merchant',
    name: 'partner',
    component: MerchantDashboard,
    meta: { title: 'Healthcare & Destination Partner Hub — LokaBatam', role: 'merchant' }
  },
  {
    path: '/tourist',
    name: 'tourist',
    component: TouristPortal,
    meta: { title: 'Tourist Concierge — LokaBatam', role: 'tourist' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: () => {
      try {
        const raw = localStorage.getItem('lokabatam_auth_session');
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
