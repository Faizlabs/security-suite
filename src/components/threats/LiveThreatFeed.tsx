import { AnimatePresence, motion } from 'framer-motion';
import { useThreatFeed } from '../../hooks/useThreatFeed';
import { GlassCard } from '../ui/GlassCard';
import { ThreatFeedHeader } from './ThreatFeedHeader';
import { ThreatFeedRow } from './ThreatFeedRow';

interface LiveThreatFeedProps {
  compact?: boolean;
  className?: string;
}

export function LiveThreatFeed({
  compact = false,
  className = '',
}: LiveThreatFeedProps) {
  const { alerts, loading, live, setLive, error, refresh } =
    useThreatFeed({
      pollIntervalMs: compact ? 4000 : 3000,
      maxAlerts: compact ? 30 : 50,
    });

  const maxHeight = compact
    ? 'max-h-[220px] sm:max-h-[260px]'
    : 'max-h-[280px] sm:max-h-[380px] md:max-h-[480px]';

  return (
    <GlassCard className={`overflow-hidden p-0 ${className}`}>
      <ThreatFeedHeader
        count={alerts.length}
        live={live}
        onToggleLive={() => setLive((v) => !v)}
        onRefresh={refresh}
        loading={loading}
        compact={compact}
      />

      <div className="relative bg-[var(--theme-card)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent" />

        <div className="sticky top-0 z-10 hidden border-b border-white/10 bg-[var(--theme-card)] px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-[var(--theme-muted)] md:grid md:grid-cols-[minmax(0,1.4fr)_auto_auto_auto_auto] md:gap-x-3 md:px-4">
          <span>Threat</span>
          <span>Origin</span>
          <span>Time</span>
          <span>Target</span>
          <span>Status</span>
        </div>

        <div
          className={`overflow-y-auto overflow-x-hidden ${maxHeight}`}
          role="log"
          aria-live="polite"
        >
          {loading && alerts.length === 0 ? (
            <FeedSkeleton compact={compact} />
          ) : error ? (
            <p className="px-3 py-4 font-mono text-xs text-red-400">
              {error}
            </p>
          ) : alerts.length === 0 ? (
            <p className="px-3 py-4 font-mono text-xs text-[var(--theme-muted)]">
              No alerts in queue.
            </p>
          ) : (
            <AnimatePresence initial={false}>
              {alerts.map((alert, index) => (
                <ThreatFeedRow
                  key={alert.id}
                  alert={alert}
                  index={index}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-3 py-2 font-mono text-[10px] text-green-400 md:px-4">
          <span className="terminal-cursor">
            xdr-stream@cyberflow
          </span>

          <motion.span
            key={alerts[0]?.id ?? 'idle'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--theme-muted)]"
          >
            {live ? 'ingesting...' : 'paused'}
          </motion.span>
        </div>
      </div>
    </GlassCard>
  );
}

function FeedSkeleton({ compact }: { compact?: boolean }) {
  const rows = compact ? 4 : 6;

  return (
    <div className="space-y-2 p-3">
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="h-10 rounded border border-white/10 bg-white/5"
        />
      ))}
    </div>
  );
}