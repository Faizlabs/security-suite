import { Pause, Play, Radio, RefreshCw } from 'lucide-react';
import { LiveDot } from '../ui/LiveDot';

interface ThreatFeedHeaderProps {
  count: number;
  live: boolean;
  onToggleLive: () => void;
  onRefresh: () => void;
  loading?: boolean;
  compact?: boolean;
}

export function ThreatFeedHeader({
  count,
  live,
  onToggleLive,
  onRefresh,
  loading,
  compact,
}: ThreatFeedHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between gap-2 border-b border-cyber-border/50 bg-cyber-bg/40 px-3 ${compact ? 'py-2' : 'py-2.5 md:px-4 md:py-3'}`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Radio className="h-4 w-4 shrink-0 text-cyber-cyan" />
        <div className="min-w-0">
          <h3 className="truncate text-xs font-semibold uppercase tracking-wider text-cyber-cyan md:text-sm">
            Live Threat Feed
          </h3>
          {!compact && (
            <p className="hidden font-mono text-[10px] text-cyber-muted sm:block">
              SIEM stream · auto-refresh {live ? 'active' : 'paused'}
            </p>
          )}
        </div>
        {live && (
          <div className="flex items-center gap-1.5 rounded-full border border-cyber-red/30 bg-cyber-red/10 px-2 py-0.5">
            <LiveDot color="red" />
            <span className="font-mono text-[9px] font-bold uppercase text-cyber-red md:text-[10px]">
              Live
            </span>
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <span className="mr-1 hidden font-mono text-[10px] text-cyber-muted sm:inline">
          {count} events
        </span>
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-cyber-surface hover:text-cyber-cyan disabled:opacity-40"
          aria-label="Refresh feed"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
        <button
          type="button"
          onClick={onToggleLive}
          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-cyber-surface hover:text-cyber-cyan"
          aria-label={live ? 'Pause feed' : 'Resume feed'}
        >
          {live ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
