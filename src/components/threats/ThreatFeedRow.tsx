import { motion } from 'framer-motion';
import type { ThreatAlert } from '../../types/threat';
import { SeverityBadge } from './SeverityBadge';
import { ThreatStatusBadge } from './ThreatStatusBadge';

const severityBorder: Record<ThreatAlert['severity'], string> = {
  critical: 'border-l-cyber-red hover:bg-cyber-red/5',
  high: 'border-l-orange-500 hover:bg-orange-500/5',
  medium: 'border-l-cyber-amber hover:bg-cyber-amber/5',
  low: 'border-l-cyber-green hover:bg-cyber-green/5',
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

interface ThreatFeedRowProps {
  alert: ThreatAlert;
  index: number;
}

export function ThreatFeedRow({ alert, index }: ThreatFeedRowProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.28, delay: index < 3 ? index * 0.04 : 0 }}
      whileHover={{ backgroundColor: 'rgba(0, 245, 212, 0.04)' }}
      className={`group grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 border-b border-cyber-border/30 border-l-2 px-2 py-2 transition-colors md:grid-cols-[minmax(0,1.4fr)_auto_auto_auto_auto] md:items-center md:gap-x-3 md:px-3 md:py-2.5 ${severityBorder[alert.severity]}`}
    >
      <div className="col-span-2 flex items-center gap-2 md:col-span-1 md:min-w-0">
        <SeverityBadge severity={alert.severity} pulse={alert.status === 'active'} />
        <span className="truncate font-mono text-[11px] font-medium text-gray-100 md:text-xs">
          {alert.type}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[9px] text-cyber-muted md:contents md:text-[10px]">
        <span className="text-cyber-cyan">
          <span className="text-cyber-muted/80 md:hidden">CC </span>
          {alert.sourceCountry}
        </span>
        <span className="hidden text-gray-500 md:inline">{formatTime(alert.timestamp)}</span>
        <span className="truncate text-cyber-amber/90 md:max-w-[140px]" title={alert.attackTarget}>
          <span className="text-cyber-muted/80 md:hidden">→ </span>
          {alert.attackTarget}
        </span>
        <ThreatStatusBadge status={alert.status} />
      </div>

      <div className="col-span-2 flex items-center justify-between font-mono text-[9px] text-gray-600 md:hidden">
        <span>{formatTime(alert.timestamp)}</span>
        {alert.sourceIp && <span className="truncate text-cyber-muted">{alert.sourceIp}</span>}
      </div>
    </motion.article>
  );
}
