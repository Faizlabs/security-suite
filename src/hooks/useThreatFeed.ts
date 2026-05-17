import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchLatestAlert, fetchThreatFeed } from '../services/threatFeedService';
import type { ThreatAlert } from '../types/threat';

const MAX_ALERTS = 50;
const DEFAULT_POLL_MS = 3200;

interface UseThreatFeedOptions {
  pollIntervalMs?: number;
  maxAlerts?: number;
  autoStart?: boolean;
}

export function useThreatFeed(options: UseThreatFeedOptions = {}) {
  const {
    pollIntervalMs = DEFAULT_POLL_MS,
    maxAlerts = MAX_ALERTS,
    autoStart = true,
  } = options;

  const [alerts, setAlerts] = useState<ThreatAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [live, setLive] = useState(autoStart);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const loadInitial = useCallback(async () => {
    try {
      setError(null);
      const res = await fetchThreatFeed(maxAlerts);
      if (!mounted.current) return;
      setAlerts(res.alerts);
      setLastUpdated(res.lastUpdated);
    } catch (e) {
      if (mounted.current) {
        setError(e instanceof Error ? e.message : 'Failed to load feed');
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [maxAlerts]);

  const pushLatest = useCallback(async () => {
    try {
      const alert = await fetchLatestAlert();
      if (!mounted.current) return;
      setAlerts((prev) => [alert, ...prev].slice(0, maxAlerts));
      setLastUpdated(new Date().toISOString());
      setError(null);
    } catch (e) {
      if (mounted.current) {
        setError(e instanceof Error ? e.message : 'Feed sync failed');
      }
    }
  }, [maxAlerts]);

  useEffect(() => {
    mounted.current = true;
    loadInitial();
    return () => {
      mounted.current = false;
    };
  }, [loadInitial]);

  useEffect(() => {
    if (!live || loading) return;
    const id = setInterval(pushLatest, pollIntervalMs);
    return () => clearInterval(id);
  }, [live, loading, pollIntervalMs, pushLatest]);

  return {
    alerts,
    loading,
    live,
    setLive,
    lastUpdated,
    error,
    refresh: loadInitial,
  };
}
