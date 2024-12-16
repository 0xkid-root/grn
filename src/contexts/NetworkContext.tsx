import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface NetworkStatus {
  isOnline: boolean;
  latency: number;
  chainId: number;
  gasPrice: string;
}

interface NetworkContextType {
  status: NetworkStatus;
  refreshStatus: () => Promise<void>;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: true,
    latency: 0,
    chainId: 1,
    gasPrice: '0',
  });

  const refreshStatus = async () => {
    try {
      // Simulate network check
      const start = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 100));
      const latency = Date.now() - start;

      setStatus({
        isOnline: true,
        latency,
        chainId: 1,
        gasPrice: '20',
      });
    } catch (error) {
      toast.error('Network check failed');
      setStatus((prev) => ({ ...prev, isOnline: false }));
    }
  };

  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <NetworkContext.Provider value={{ status, refreshStatus }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
}