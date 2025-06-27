import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import LoadingWrapper from '@/Components/LoadingWrapper';

export const metadata: Metadata = {
  title: 'Ninho de Pardais',
  
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <LoadingWrapper>
            {children}
          </LoadingWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
