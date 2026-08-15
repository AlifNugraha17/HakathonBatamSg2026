import { ref, computed } from 'vue';
import { useAdminStore } from './useAdminStore';

const currentCurrency = ref('SGD'); // Default for cross-border tourist convenience

export function useCurrency() {
  const { systemSettings } = useAdminStore();

  const ratesToIdr = computed(() => {
    const fx = systemSettings.value?.exchangeRates || {};
    return {
      IDR: 1,
      SGD: Number(fx.SGD_TO_IDR) || 11800,
      MYR: Number(fx.MYR_TO_IDR) || 3450,
      USD: Number(fx.USD_TO_IDR) || 16100,
    };
  });

  const CURRENCY_SYMBOLS = {
    IDR: 'Rp',
    SGD: 'S$',
    MYR: 'RM',
    USD: '$'
  };

  const setCurrency = (curr) => {
    if (['SGD', 'USD', 'MYR', 'IDR'].includes(curr)) {
      currentCurrency.value = curr;
    }
  };

  const formatPrice = (priceIdr) => {
    const rate = ratesToIdr.value[currentCurrency.value] || 1;
    const symbol = CURRENCY_SYMBOLS[currentCurrency.value] || 'Rp';

    if (currentCurrency.value === 'IDR') {
      return `${symbol} ${Number(priceIdr).toLocaleString('id-ID')}`;
    }

    const converted = Number(priceIdr) / rate;
    const formattedNum = converted < 10 
      ? converted.toFixed(2) 
      : converted.toFixed(1);
    return `${symbol} ${formattedNum}`;
  };

  const convertToIdr = (amount, currencyCode = currentCurrency.value) => {
    const rate = ratesToIdr.value[currencyCode] || 1;
    return Math.round(Number(amount) * rate);
  };

  const convertFromIdr = (priceIdr, currencyCode = currentCurrency.value) => {
    const rate = ratesToIdr.value[currencyCode] || 1;
    return Number((Number(priceIdr) / rate).toFixed(2));
  };

  return {
    currentCurrency,
    setCurrency,
    formatPrice,
    convertToIdr,
    convertFromIdr,
    ratesToIdr,
    availableCurrencies: ['SGD', 'USD', 'MYR', 'IDR']
  };
}
