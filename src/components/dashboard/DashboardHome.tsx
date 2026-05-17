import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, Globe, Shield, ShieldCheck } from 'lucide-react';
import { LiveThreatFeed } from '../threats/LiveThreatFeed';
import { GlassCard } from '../ui/GlassCard';
import { NeonButton } from '../ui/NeonButton';
import { PageHeader } from '../ui/PageHeader';
import { MetricCard } from './MetricCard';

export function DashboardHome() {
  const logs = [
    '[INFO] Threat feed synchronized',
    '[SCAN] Abuse score 92% detected',
    '[BLOCKED] Malicious IP blacklisted',
    '[ALERT] SQL Injection attempt detected',
    '[INFO] Endpoint telemetry received',
    '[CRITICAL] Brute force attack detected',
    '[MITIGATED] Botnet communication stopped',
  ];

  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];

      setTerminalLogs((prev) => {
        const updated = [...prev, randomLog];
        return updated.slice(-8);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Security Overview"
        description="Real-time posture summary for your SOC workspace."
      />

      <section className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 md:gap-3">
        <MetricCard label="Active Threats" value="47" icon={Shield} accent="red" />
        <MetricCard label="Malicious IPs" value="1.2K" icon={Activity} accent="amber" />
        <MetricCard label="URLs Scanned" value="8.9K" icon={Globe} accent="cyan" />
        <MetricCard label="Threat Score" value="72%" icon={AlertTriangle} accent="red" />
        <MetricCard label="System Health" value="94%" icon={ShieldCheck} accent="green" />
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <LiveThreatFeed compact />

        <GlassCard className="p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyber-cyan">
            SOC Terminal
          </h3>

          <p className="mt-3 font-mono text-xs text-cyber-muted">
            Live telemetry and security event stream.
          </p>

          <div className="mt-4 h-40 rounded-lg border border-dashed border-cyber-border/60 bg-[#030306] p-3 overflow-hidden">
            <div className="font-mono text-xs text-cyber-green space-y-1">
              {terminalLogs.map((log, index) => (
                <div key={index} className="animate-pulse">
                  {`> ${log}`}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      <GlassCard className="flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white">Quick actions</p>
          <p className="text-xs text-cyber-muted">
            Scanner and map modules will appear here.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <NeonButton>Run IP Scan</NeonButton>
          <NeonButton variant="ghost">View Analytics</NeonButton>
        </div>
      </GlassCard>
    </div>
  );
}