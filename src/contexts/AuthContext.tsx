import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  address: string;
  isVerified: boolean;
  balance: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user was previously connected
    const checkConnection = async () => {
      try {
        // Simulate checking wallet connection
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to check connection:', error);
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  const connect = async () => {
    try {
      // Simulate wallet connection
      const mockUser = {
        address: '0x1234...5678',
        isVerified: true,
        balance: '1000',
      };
      setUser(mockUser);
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const disconnect = () => {
    setUser(null);
    toast.success('Wallet disconnected');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, connect, disconnect }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}