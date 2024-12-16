import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

interface Transfer {
  id: string;
  sender: string;
  recipient: string;
  amount: string;
  status: 'pending' | 'completed' | 'cancelled';
  timestamp: number;
}

interface TransferContextType {
  transfers: Transfer[];
  initiateTransfer: (recipient: string, amount: string) => Promise<void>;
  cancelTransfer: (id: string) => Promise<void>;
  getTransferHistory: () => Promise<void>;
}

const TransferContext = createContext<TransferContextType | undefined>(undefined);

export function TransferProvider({ children }: { children: React.ReactNode }) {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  const initiateTransfer = async (recipient: string, amount: string) => {
    try {
      // Simulate transfer initiation
      const newTransfer: Transfer = {
        id: Math.random().toString(36).substr(2, 9),
        sender: '0x1234...5678',
        recipient,
        amount,
        status: 'pending',
        timestamp: Date.now(),
      };
      setTransfers((prev) => [newTransfer, ...prev]);
      toast.success('Transfer initiated successfully');
    } catch (error) {
      console.error('Failed to initiate transfer:', error);
      toast.error('Failed to initiate transfer');
    }
  };

  const cancelTransfer = async (id: string) => {
    try {
      setTransfers((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: 'cancelled' } : t
        )
      );
      toast.success('Transfer cancelled successfully');
    } catch (error) {
      console.error('Failed to cancel transfer:', error);
      toast.error('Failed to cancel transfer');
    }
  };

  const getTransferHistory = async () => {
    try {
      // Simulate fetching transfer history
      const mockTransfers: Transfer[] = [
        {
          id: '1',
          sender: '0x1234...5678',
          recipient: '0x8765...4321',
          amount: '100',
          status: 'completed',
          timestamp: Date.now() - 86400000,
        },
        {
          id: '2',
          sender: '0x1234...5678',
          recipient: '0x9876...5432',
          amount: '50',
          status: 'pending',
          timestamp: Date.now() - 43200000,
        },
      ];
      setTransfers(mockTransfers);
    } catch (error) {
      console.error('Failed to fetch transfer history:', error);
      toast.error('Failed to fetch transfer history');
    }
  };

  return (
    <TransferContext.Provider
      value={{ transfers, initiateTransfer, cancelTransfer, getTransferHistory }}
    >
      {children}
    </TransferContext.Provider>
  );
}

export function useTransfer() {
  const context = useContext(TransferContext);
  if (context === undefined) {
    throw new Error('useTransfer must be used within a TransferProvider');
  }
  return context;
}