import type { LucideIcon } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: 'cyan' | 'green' | 'amber' | 'red';
}

const accentMap = {
  cyan: 'text-cyber-cyan border-cyber-cyan/25',
  green: 'text-cyber-green border-cyber-green/25',
  amber: 'text-cyber-amber border-cyber-amber/25',
  red: 'text-cyber-red border-cyber-red/25',
};

export function MetricCard({ label, value, icon: Icon, accent = 'cyan' }: MetricCardProps) {
  const colors = accentMap[accent];

  return (
    <GlassCard hover className="p-3 md:p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-cyber-muted md:text-xs">
            {label}
          </p>
          <p className="mt-1 font-mono text-xl font-bold text-white md:text-2xl">{value}</p>
        </div>
        <div className={`rounded-lg border bg-cyber-bg/50 p-2 ${colors}`}>
          <Icon className="h-4 w-4 md:h-5 md:w-5" />
        </div>
      </div>
    </GlassCard>
  );
}
