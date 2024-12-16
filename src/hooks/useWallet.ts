import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface WalletHook {
  isConnecting: boolean;
  connect: () => Promise<string>;
  disconnect: () => void;
  getBalance: (address: string) => Promise<string>;
}

export function useWallet(): WalletHook {
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const address = '0x1234...5678';
      return address;
    } catch (error) {
      toast.error('Failed to connect wallet');
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    // Simulate wallet disconnection
    toast.success('Wallet disconnected');
  }, []);

  const getBalance = useCallback(async (address: string) => {
    try {
      // Simulate balance fetch
      await new Promise((resolve) => setTimeout(resolve, 500));
      return '1000.00';
    } catch (error) {
      toast.error('Failed to fetch balance');
      throw error;
    }
  }, []);

  return {
    isConnecting,
    connect,
    disconnect,
    getBalance,
  };
}