import { useCallback } from 'react';
import api from '@/lib/services/api';

interface AnalyticsData {
  totalTransfers: number;
  totalVolume: number;
  averageAmount: number;
  successRate: number;
  topRecipients: Array<{
    address: string;
    count: number;
    volume: number;
  }>;
}

export function useAnalytics() {
  const fetchAnalytics = useCallback(async (address: string): Promise<AnalyticsData> => {
    try {
      const response = await api.get(`/analytics/${address}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      throw error;
    }
  }, []);

  const trackEvent = useCallback(async (eventName: string, data: Record<string, any>) => {
    try {
      await api.post('/analytics/events', {
        event: eventName,
        timestamp: Date.now(),
        ...data,
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }, []);

  return {
    fetchAnalytics,
    trackEvent,
  };
}