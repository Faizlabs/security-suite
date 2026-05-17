import type { IpRiskLevel } from '../../types/ipReputation';

const styles: Record<IpRiskLevel, { badge: string; glow: string }> = {
  critical: {
    badge: 'border-cyber-red/50 bg-cyber-red/15 text-cyber-red',
    glow: 'shadow-[0_0_14px_rgba(255,51,102,0.5)]',
  },
  high: {
    badge: 'border-orange-500/50 bg-orange-500/15 text-orange-400',
    glow: 'shadow-[0_0_12px_rgba(251,146,60,0.4)]',
  },
  medium: {
    badge: 'border-cyber-amber/50 bg-cyber-amber/15 text-cyber-amber',
    glow: 'shadow-[0_0_10px_rgba(255,176,32,0.35)]',
  },
  low: {
    badge: 'border-cyber-green/40 bg-cyber-green/10 text-cyber-green',
    glow: 'shadow-[0_0_8px_rgba(0,255,136,0.3)]',
  },
  safe: {
    badge: 'border-cyber-cyan/40 bg-cyber-cyan/10 text-cyber-cyan',
    glow: 'shadow-[0_0_8px_rgba(0,245,212,0.25)]',
  },
};

interface RiskLevelBadgeProps {
  level: IpRiskLevel;
  large?: boolean;
  pulse?: boolean;
}

export function RiskLevelBadge({ level, large, pulse }: RiskLevelBadgeProps) {
  const s = styles[level];
  return (
    <span
      className={`inline-flex items-center rounded border font-mono font-bold uppercase tracking-wider ${s.badge} ${s.glow} ${
        large ? 'px-3 py-1 text-xs md:text-sm' : 'px-2 py-0.5 text-[10px] md:text-xs'
      } ${pulse ? 'animate-pulse' : ''}`}
    >
      {level}
    </span>
  );
}
