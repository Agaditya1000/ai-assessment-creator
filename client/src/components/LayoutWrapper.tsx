'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useUIStore();

  useEffect(() => {
    const root = document.documentElement;
    if (isSidebarCollapsed) {
      root.classList.add('sidebar-collapsed');
    } else {
      root.classList.remove('sidebar-collapsed');
    }
  }, [isSidebarCollapsed]);

  return <>{children}</>;
}
