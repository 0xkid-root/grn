import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
}

interface TransactionsHook {
  transactions: Transaction[];
  isLoading: boolean;
  sendTransaction: (to: string, amount: string) => Promise<void>;
  fetchTransactions: (address: string) => Promise<void>;
}

export function useTransactions(): TransactionsHook {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendTransaction = useCallback(async (to: string, amount: string) => {
    try {
      setIsLoading(true);
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const newTransaction: Transaction = {
        id: Math.random().toString(36).substring(7),
        from: '0x1234...5678',
        to,
        amount,
        status: 'completed',
        timestamp: Date.now(),
      };

      setTransactions((prev) => [newTransaction, ...prev]);
      toast.success('Transaction sent successfully');
    } catch (error) {
      toast.error('Transaction failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async (address: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          from: '0x1234...5678',
          to: '0x8765...4321',
          amount: '100',
          status: 'completed',
          timestamp: Date.now() - 86400000,
        },
        {
          id: '2',
          from: '0x8765...4321',
          to: '0x1234...5678',
          amount: '50',
          status: 'pending',
          timestamp: Date.now() - 43200000,
        },
      ];

      setTransactions(mockTransactions);
    } catch (error) {
      toast.error('Failed to fetch transactions');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    transactions,
    isLoading,
    sendTransaction,
    fetchTransactions,
  };
}