import type { ThreatStatus } from '../../types/threat';

const styles: Record<ThreatStatus, string> = {
  active: 'text-cyber-red border-cyber-red/30 bg-cyber-red/10',
  investigating: 'text-cyber-amber border-cyber-amber/30 bg-cyber-amber/10',
  mitigated: 'text-cyber-green border-cyber-green/30 bg-cyber-green/10',
  blocked: 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10',
};

const labels: Record<ThreatStatus, string> = {
  active: 'ACTIVE',
  investigating: 'INVESTIGATING',
  mitigated: 'MITIGATED',
  blocked: 'BLOCKED',
};

interface ThreatStatusBadgeProps {
  status: ThreatStatus;
}

export function ThreatStatusBadge({ status }: ThreatStatusBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 rounded border px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wide md:text-[9px] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
