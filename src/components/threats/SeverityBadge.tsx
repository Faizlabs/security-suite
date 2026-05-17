import type { ThreatSeverity } from '../../types/threat';

const styles: Record<
  ThreatSeverity,
  { badge: string; glow: string }
> = {
  critical: {
    badge: 'border-cyber-red/50 bg-cyber-red/15 text-cyber-red',
    glow: 'shadow-[0_0_12px_rgba(255,51,102,0.45)]',
  },
  high: {
    badge: 'border-orange-500/50 bg-orange-500/15 text-orange-400',
    glow: 'shadow-[0_0_10px_rgba(251,146,60,0.35)]',
  },
  medium: {
    badge: 'border-cyber-amber/50 bg-cyber-amber/15 text-cyber-amber',
    glow: 'shadow-[0_0_10px_rgba(255,176,32,0.3)]',
  },
  low: {
    badge: 'border-cyber-green/40 bg-cyber-green/10 text-cyber-green',
    glow: 'shadow-[0_0_8px_rgba(0,255,136,0.25)]',
  },
};

interface SeverityBadgeProps {
  severity: ThreatSeverity;
  pulse?: boolean;
  className?: string;
}

export function SeverityBadge({ severity, pulse, className = '' }: SeverityBadgeProps) {
  const s = styles[severity];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider md:text-[10px] ${s.badge} ${s.glow} ${pulse ? 'animate-pulse' : ''} ${className}`}
    >
      {severity}
    </span>
  );
}
