import { ref, computed } from 'vue';

const currentCurrency = ref('SGD'); // Default for cross-border tourist convenience

const RATES_TO_IDR = {
  IDR: 1,
  SGD: 11800,
  MYR: 3450,
  USD: 16100
};

const CURRENCY_SYMBOLS = {
  IDR: 'Rp',
  SGD: 'S$',
  MYR: 'RM',
  USD: '$'
};

export function useCurrency() {
  const setCurrency = (curr) => {
    if (RATES_TO_IDR[curr]) {
      currentCurrency.value = curr;
    }
  };

  const formatPrice = (priceIdr) => {
    const rate = RATES_TO_IDR[currentCurrency.value] || 1;
    const symbol = CURRENCY_SYMBOLS[currentCurrency.value] || 'Rp';

    if (currentCurrency.value === 'IDR') {
      return `${symbol} ${Number(priceIdr).toLocaleString('id-ID')}`;
    }

    const converted = priceIdr / rate;
    return `${symbol}${converted.toFixed(converted < 10 ? 1 : 0)}`;
  };

  const convertToIdr = (amount, currencyCode) => {
    const rate = RATES_TO_IDR[currencyCode] || 1;
    return Math.round(amount * rate);
  };

  return {
    currentCurrency,
    setCurrency,
    formatPrice,
    convertToIdr,
    availableCurrencies: ['SGD', 'MYR', 'USD', 'IDR']
  };
}
