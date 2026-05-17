import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { NavId } from '../../types';
import { CyberGridBackground } from './CyberGridBackground';
import { MobileDrawer } from './MobileDrawer';
import { MobileNav } from './MobileNav';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

interface AppShellProps {
  activeNav: NavId;
  drawerOpen: boolean;
  onMenuToggle: () => void;
  onNavigate: (id: NavId) => void;
  onDrawerClose: () => void;
  children: ReactNode;
}

export function AppShell({
  activeNav,
  drawerOpen,
  onMenuToggle,
  onNavigate,
  onDrawerClose,
  children,
}: AppShellProps) {
  return (
    <div className="relative min-h-screen bg-cyber-bg text-gray-100">
      <CyberGridBackground />
      <TopNavbar onMenuToggle={onMenuToggle} menuOpen={drawerOpen} />
      <MobileDrawer
        open={drawerOpen}
        active={activeNav}
        onNavigate={onNavigate}
        onClose={onDrawerClose}
      />

      <div className="flex">
        <Sidebar active={activeNav} onNavigate={onNavigate} />
        <main className="min-h-[calc(100vh-3rem)] flex-1 overflow-x-hidden pb-20 lg:pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mx-auto max-w-6xl p-3 md:p-4 lg:p-5"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <MobileNav active={activeNav} onNavigate={onNavigate} />
    </div>
  );
}
