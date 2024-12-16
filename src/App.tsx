import { useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Layout from '@/components/layout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import History from '@/pages/History';

export default function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="remittance-theme">
      <Layout>
        {!user ? (
          <Login />
        ) : (
          <div>
            <Dashboard />
            <Profile />
            <History />
          </div>
        )}
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}