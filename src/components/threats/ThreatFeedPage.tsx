import { LiveThreatFeed } from './LiveThreatFeed';
import { PageHeader } from '../ui/PageHeader';

export function ThreatFeedPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Threat Intelligence Feed"
        description="Real-time SOC alert stream with automated correlation and severity scoring."
      />
      <LiveThreatFeed />
    </div>
  );
}
