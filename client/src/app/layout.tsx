import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VedaAI - AI Assessment Creator',
  description: 'Generate structured assessments with AI',
};

import MobileNav from '@/components/MobileNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <div style={{ display: 'flex' }}>
          <div className="desktop-only">
            <Sidebar />
          </div>
          <div className="main-content" style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Header />
            <main>
              {children}
            </main>
          </div>
          <div className="mobile-only">
            <MobileNav />
          </div>
        </div>
      </body>
    </html>
  );
}
