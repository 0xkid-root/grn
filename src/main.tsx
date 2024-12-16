import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@/contexts/AuthContext';
import { TransferProvider } from '@/contexts/TransferContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { NetworkProvider } from '@/contexts/NetworkContext';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <NetworkProvider>
        <AuthProvider>
          <TransferProvider>
            <App />
          </TransferProvider>
        </AuthProvider>
      </NetworkProvider>
    </SettingsProvider>
  </StrictMode>
);