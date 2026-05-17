import { MOBILE_NAV_ITEMS } from '../../config/navigation';
import type { NavId } from '../../types';

interface MobileNavProps {
  active: NavId;
  onNavigate: (id: NavId) => void;
}

export function MobileNav({ active, onNavigate }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-cyber-border/60 bg-cyber-bg/95 backdrop-blur-xl lg:hidden safe-area-pb">
      <div className="flex justify-around px-1 pt-1">
        {MOBILE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const short = item.label.split(' ')[0];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 transition ${
                isActive ? 'text-cyber-cyan' : 'text-gray-500'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'drop-shadow-[0_0_6px_#00f5d4]' : ''}`} />
              <span className="truncate text-[9px] font-medium">{short}</span>
              {isActive && (
                <span className="h-0.5 w-5 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f5d4]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
