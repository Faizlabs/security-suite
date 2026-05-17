import type { ThreatAlert, ThreatSeverity, ThreatStatus } from '../types/threat';

const THREAT_TYPES = [
  'DDoS Attack',
  'Brute Force',
  'Malware C2',
  'Phishing Campaign',
  'SQL Injection',
  'Ransomware Beacon',
  'Port Scan',
  'Botnet Activity',
  'Credential Stuffing',
  'Zero-Day Exploit',
  'DNS Tunneling',
  'Lateral Movement',
];

const COUNTRIES = ['RU', 'CN', 'US', 'BR', 'IN', 'DE', 'NL', 'IR', 'UA', 'VN', 'RO', 'GB', 'KP'];

const TARGETS = [
  'auth-gateway-01',
  'api-cluster-prod',
  'mail-relay-svc',
  'vpn-endpoint-04',
  'db-shard-primary',
  'cdn-edge-us-east',
  'siem-ingest-node',
  'k8s-ingress-02',
  'identity-provider',
  'file-share-corp',
];

const STATUSES: ThreatStatus[] = ['active', 'investigating', 'mitigated', 'blocked'];

const SOURCE_IPS = [
  '185.220.101.42',
  '45.33.32.156',
  '103.21.244.18',
  '198.51.100.23',
  '203.0.113.45',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedSeverity(): ThreatSeverity {
  const r = Math.random();
  if (r < 0.12) return 'critical';
  if (r < 0.32) return 'high';
  if (r < 0.62) return 'medium';
  return 'low';
}

export function createThreatAlert(overrides?: Partial<ThreatAlert>): ThreatAlert {
  const severity = overrides?.severity ?? weightedSeverity();
  const status =
    overrides?.status ??
    (severity === 'critical' || severity === 'high'
      ? pick(['active', 'investigating'] as ThreatStatus[])
      : pick(STATUSES));

  return {
    id: crypto.randomUUID(),
    type: pick(THREAT_TYPES),
    severity,
    sourceCountry: pick(COUNTRIES),
    timestamp: new Date().toISOString(),
    attackTarget: pick(TARGETS),
    status,
    sourceIp: pick(SOURCE_IPS),
    ...overrides,
  };
}

export function generateInitialFeed(count = 24): ThreatAlert[] {
  return Array.from({ length: count }, () =>
    createThreatAlert({
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    })
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
