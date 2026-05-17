import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  Flag,
  Globe2,
  Hash,
  Server,
  ShieldAlert,
} from 'lucide-react';
import type { IpReputationResult } from '../../types/ipReputation';
import { GlassCard } from '../ui/GlassCard';
import { AbuseScoreGauge } from './AbuseScoreGauge';
import { ResultMetricCard } from './ResultMetricCard';
import { RiskLevelBadge } from './RiskLevelBadge';

interface IpScanResultsProps {
  result: IpReputationResult;
}

function formatTimestamp(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

const riskTextColor: Record<IpReputationResult['riskLevel'], string> = {
  critical: 'text-cyber-red',
  high: 'text-orange-400',
  medium: 'text-cyber-amber',
  low: 'text-cyber-green',
  safe: 'text-cyber-cyan',
};

export function IpScanResults({ result }: IpScanResultsProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result.ip}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        <GlassCard className="p-3 md:p-4">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-wider text-cyber-muted">Scanned IP</p>
              <p className="mt-0.5 font-mono text-lg font-bold text-cyber-cyan md:text-xl">{result.ip}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <RiskLevelBadge level={result.riskLevel} large pulse={result.riskLevel === 'critical'} />
                {result.isTor && (
                  <span className="rounded border border-cyber-amber/40 bg-cyber-amber/10 px-2 py-0.5 font-mono text-[9px] text-cyber-amber">
                    TOR EXIT
                  </span>
                )}
              </div>
            </div>
            <AbuseScoreGauge score={result.abuseConfidenceScore} riskLevel={result.riskLevel} />
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          <ResultMetricCard
            label="ISP / Provider"
            value={result.isp}
            icon={Building2}
            index={0}
          />
          <ResultMetricCard label="Country" value={result.country} icon={Flag} index={1} />
          <ResultMetricCard
            label="Domain"
            value={result.domain ?? '—'}
            icon={Globe2}
            index={2}
          />
          <ResultMetricCard label="Usage Type" value={result.usageType} icon={Server} index={3} />
          <ResultMetricCard
            label="Total Reports"
            value={result.totalReports.toLocaleString()}
            icon={Hash}
            highlight
            index={4}
          />
          <ResultMetricCard
            label="Risk Level"
            value={result.riskLevel.toUpperCase()}
            icon={ShieldAlert}
            valueClassName={riskTextColor[result.riskLevel]}
            index={5}
          />
          <ResultMetricCard
            label="Last Reported"
            value={formatTimestamp(result.lastReportedAt)}
            icon={Calendar}
            className="col-span-2 md:col-span-3"
            index={6}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
