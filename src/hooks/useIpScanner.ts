import { useCallback, useState } from 'react';
import { lookupIpReputation } from '../services/abuseIpDbService';
import type { IpReputationResult } from '../types/ipReputation';
import { isValidIpAddress, normalizeIpInput } from '../utils/validateIp';

export type ScanPhase = 'idle' | 'scanning' | 'complete' | 'error';

export function useIpScanner(initialIp = '185.220.101.42') {
  const [ip, setIp] = useState(initialIp);
  const [phase, setPhase] = useState<ScanPhase>('idle');
  const [result, setResult] = useState<IpReputationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scan = useCallback(async () => {
    const normalized = normalizeIpInput(ip);
    if (!isValidIpAddress(normalized)) {
      setError('Enter a valid IPv4 or IPv6 address.');
      setPhase('error');
      setResult(null);
      return;
    }

    setError(null);
    setPhase('scanning');
    setResult(null);

    try {
      const data = await lookupIpReputation(normalized);
      setResult(data);
      setPhase('complete');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Scan failed. Please retry.');
      setPhase('error');
      setResult(null);
    }
  }, [ip]);

  const reset = useCallback(() => {
    setPhase('idle');
    setResult(null);
    setError(null);
  }, []);

  return {
    ip,
    setIp,
    phase,
    result,
    error,
    scan,
    reset,
    isScanning: phase === 'scanning',
  };
}
