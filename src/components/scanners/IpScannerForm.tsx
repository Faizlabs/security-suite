import { Search } from 'lucide-react';
import type { FormEvent } from 'react';
import { isAbuseIpDbMockMode } from '../../services/abuseIpDbService';
import { CyberInput } from '../ui/CyberInput';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { ScanProgress } from './ScanProgress';

interface IpScannerFormProps {
  ip: string;
  onIpChange: (value: string) => void;
  onScan: () => void;
  isScanning: boolean;
  error: string | null;
}

export function IpScannerForm({
  ip,
  onIpChange,
  onScan,
  isScanning,
  error,
}: IpScannerFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onScan();
  };

  return (
    <GlassCard className="p-3 md:p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyber-cyan md:text-sm">
              IP Reputation Scanner
            </h3>
            <p className="mt-0.5 font-mono text-[10px] text-cyber-muted">
              {isAbuseIpDbMockMode() ? 'Mock mode · set VITE_ABUSEIPDB_API_KEY' : 'AbuseIPDB connected'}
            </p>
          </div>
          <span className="hidden rounded border border-cyber-cyan/30 bg-cyber-cyan/10 px-2 py-0.5 font-mono text-[9px] text-cyber-cyan sm:inline">
            IPv4 / IPv6
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <CyberInput
            label="Target IP"
            value={ip}
            onChange={(e) => onIpChange(e.target.value)}
            placeholder="e.g. 8.8.8.8 or 2001:4860:4860::8888"
            icon={<Search className="h-4 w-4" />}
            disabled={isScanning}
            error={error && !isScanning ? error : undefined}
            className="flex-1"
            autoComplete="off"
            spellCheck={false}
          />
          <div className="flex shrink-0 sm:pt-5">
            <NeonButton type="submit" loading={isScanning} className="w-full sm:w-auto sm:min-w-[120px]">
              {isScanning ? 'Scanning' : 'Scan IP'}
            </NeonButton>
          </div>
        </div>

        <ScanProgress active={isScanning} />
      </form>
    </GlassCard>
  );
}
