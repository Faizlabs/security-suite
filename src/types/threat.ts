export type ThreatSeverity = 'critical' | 'high' | 'medium' | 'low';

export type ThreatStatus = 'active' | 'investigating' | 'mitigated' | 'blocked';

export interface ThreatAlert {
  id: string;
  type: string;
  severity: ThreatSeverity;
  sourceCountry: string;
  timestamp: string;
  attackTarget: string;
  status: ThreatStatus;
  sourceIp?: string;
}

export interface ThreatFeedResponse {
  alerts: ThreatAlert[];
  total: number;
  lastUpdated: string;
}
