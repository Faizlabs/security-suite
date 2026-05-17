import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../config/navigation';
import type { NavId } from '../../types';

interface MobileDrawerProps {
  open: boolean;
  active: NavId;
  onNavigate: (id: NavId) => void;
  onClose: () => void;
}

export function MobileDrawer({ open, active, onNavigate, onClose }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed left-0 top-12 z-40 flex h-[calc(100%-3rem)] w-64 flex-col border-r border-cyber-border bg-cyber-surface lg:hidden"
          >
            <nav className="flex flex-col gap-0.5 p-3">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      isActive ? 'bg-cyber-cyan/10 text-cyber-cyan' : 'text-gray-400'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
