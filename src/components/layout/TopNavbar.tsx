import { Bell, Menu, Shield, X } from 'lucide-react';
import type { ThreatLevel } from '../../types';
import { LiveDot } from '../ui/LiveDot';

interface TopNavbarProps {
  threatLevel?: ThreatLevel;
  onMenuToggle: () => void;
  menuOpen: boolean;
}

const threatStyles: Record<ThreatLevel, { bg: string; text: string; label: string }> = {
  guarded: { bg: 'bg-cyber-green/15', text: 'text-cyber-green', label: 'GUARDED' },
  elevated: { bg: 'bg-cyber-amber/15', text: 'text-cyber-amber', label: 'ELEVATED' },
  high: { bg: 'bg-orange-500/15', text: 'text-orange-400', label: 'HIGH' },
  critical: { bg: 'bg-cyber-red/15', text: 'text-cyber-red', label: 'CRITICAL' },
};

export function TopNavbar({
  threatLevel = 'elevated',
  onMenuToggle,
  menuOpen,
}: TopNavbarProps) {
  const threat = threatStyles[threatLevel];

  return (
    <header className="sticky top-0 z-50 border-b border-cyber-border/60 bg-cyber-bg/85 backdrop-blur-xl">
      <div className="flex h-12 items-center justify-between gap-2 px-3 md:h-14 md:px-5 lg:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-cyber-surface hover:text-cyber-cyan lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyber-cyan/30 bg-cyber-cyan/10">
              <Shield className="h-4 w-4 text-cyber-cyan" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold md:text-base">
                <span className="text-cyber-cyan neon-text">CyberFlow</span>
                <span className="text-gray-300"> XDR</span>
              </h1>
              <p className="hidden text-[10px] text-cyber-muted sm:block">SOC Threat Intelligence</p>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <div
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${threat.bg} ${threat.text}`}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-current" />
            <span className="font-mono text-[10px] font-bold tracking-wider md:text-xs">
              {threat.label}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-cyber-border bg-cyber-surface/60 px-2 py-1">
            <LiveDot color="green" />
            <span className="font-mono text-[10px] text-gray-400">ONLINE</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold sm:hidden ${threat.bg} ${threat.text}`}
          >
            {threat.label}
          </span>
          <button
            type="button"
            className="relative rounded-lg p-2 text-gray-400 hover:bg-cyber-surface hover:text-cyber-cyan"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 flex h-3 min-w-3 items-center justify-center rounded-full bg-cyber-red text-[8px] font-bold text-white">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
