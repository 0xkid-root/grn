import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/services/api';
import { SUPPORTED_CURRENCIES } from '@/lib/constants/settings';

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: number;
}

export function useExchangeRate(from: string, to: string) {
  const [rate, setRate] = useState<ExchangeRate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchRate = useCallback(async () => {
    if (!SUPPORTED_CURRENCIES.some(c => c.code === from) || 
        !SUPPORTED_CURRENCIES.some(c => c.code === to)) {
      setError(new Error('Unsupported currency pair'));
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.get(`/exchange-rates/${from}/${to}`);
      setRate(response.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    fetchRate();
    // Update rate every minute
    const interval = setInterval(fetchRate, 60000);
    return () => clearInterval(interval);
  }, [fetchRate]);

  const convert = useCallback((amount: number): number => {
    if (!rate) return 0;
    return amount * rate.rate;
  }, [rate]);

  return {
    rate,
    isLoading,
    error,
    convert,
    refresh: fetchRate,
  };
}