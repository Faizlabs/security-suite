import { motion } from 'framer-motion';
import { NAV_ITEMS } from '../../config/navigation';
import type { NavId } from '../../types';

interface SidebarProps {
  active: NavId;
  onNavigate: (id: NavId) => void;
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-cyber-border/60 bg-cyber-surface/40 lg:flex xl:w-60">
      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                isActive
                  ? 'text-cyber-cyan'
                  : 'text-gray-400 hover:bg-cyber-card hover:text-gray-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg border border-cyber-cyan/30 bg-cyber-cyan/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4 shrink-0" />
              <span className="relative z-10 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="border-t border-cyber-border/50 p-3">
        <p className="font-mono text-[10px] text-cyber-muted">CyberFlow XDR v0.1</p>
      </div>
    </aside>
  );
}
