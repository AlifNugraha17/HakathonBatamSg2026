import { ref, computed } from 'vue';
import { 
  MOCK_ADMIN_METRICS, 
  MOCK_ADMIN_MERCHANTS, 
  MOCK_ADMIN_USERS, 
  MOCK_AI_LOGS, 
  MOCK_FINANCE_TRANSACTIONS, 
  MOCK_REVENUE_CHART_DAYS,
  SYSTEM_CONFIG 
} from '../data/mockAdminData';
import { useNotification } from './useNotification';

// Global reactive states for Super Admin
const activeAdminTab = ref('overview'); // 'overview' | 'merchants' | 'users' | 'ai' | 'finance' | 'settings'
const merchants = ref([...MOCK_ADMIN_MERCHANTS]);
const users = ref([...MOCK_ADMIN_USERS]);
const aiLogs = ref([...MOCK_AI_LOGS]);
const transactions = ref([...MOCK_FINANCE_TRANSACTIONS]);
const metrics = ref({ ...MOCK_ADMIN_METRICS });
const systemSettings = ref({ ...SYSTEM_CONFIG });
const revenueChartDays = ref([...MOCK_REVENUE_CHART_DAYS]);

export function useAdminStore() {
  const { showToast } = useNotification();

  const pendingMerchantsCount = computed(() => {
    return merchants.value.filter(m => m.status === 'pending').length;
  });

  const activeMerchants = computed(() => {
    return merchants.value.filter(m => m.status === 'active');
  });

  // Admin Actions
  const approveMerchant = (merchantId) => {
    const m = merchants.value.find(item => item.id === merchantId);
    if (m) {
      m.status = 'active';
      m.kycDocumentsVerified = true;
      metrics.value.activeMerchantsCount += 1;
      metrics.value.pendingVerificationMerchants = Math.max(0, metrics.value.pendingVerificationMerchants - 1);
      showToast(`Partner "${m.name}" has been approved & verified!`, 'success');
    }
  };

  const suspendMerchant = (merchantId) => {
    const m = merchants.value.find(item => item.id === merchantId);
    if (m) {
      m.status = m.status === 'suspended' ? 'active' : 'suspended';
      showToast(`Partner "${m.name}" status updated to ${m.status.toUpperCase()}.`, 'info');
    }
  };

  const toggleUserStatus = (userId) => {
    const u = users.value.find(item => item.id === userId);
    if (u) {
      u.status = u.status === 'active' ? 'banned' : 'active';
      showToast(`User account ${u.name} is now ${u.status.toUpperCase()}.`, 'info');
    }
  };

  const processPayout = (transactionId) => {
    const txn = transactions.value.find(t => t.id === transactionId);
    if (txn) {
      txn.payoutStatus = 'settled';
      showToast(`Payout for transaction #${transactionId} completed via BI-FAST settlement.`, 'success');
    }
  };

  const saveSettings = (newSettings) => {
    systemSettings.value = { ...systemSettings.value, ...newSettings };
    showToast('Global system configurations saved successfully!', 'success');
  };

  return {
    activeAdminTab,
    merchants,
    users,
    aiLogs,
    transactions,
    metrics,
    systemSettings,
    revenueChartDays,
    pendingMerchantsCount,
    activeMerchants,
    approveMerchant,
    suspendMerchant,
    toggleUserStatus,
    processPayout,
    saveSettings
  };
}
