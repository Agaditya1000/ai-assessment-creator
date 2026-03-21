import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import MobileNav from '@/components/MobileNav';
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VedaAI - AI Assessment Creator',
  description: 'Generate structured assessments with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <LayoutWrapper>
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="main-content" style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%'
            }}>
              <Header />
              <main>
                {children}
              </main>
            </div>
            <MobileNav />
          </div>
        </LayoutWrapper>
      </body>
    </html>
  );
}
