import { GlassCard } from '../ui/GlassCard';
import { PageHeader } from '../ui/PageHeader';

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div>
      <PageHeader title={title} description="This module will be implemented in a later phase." />
      <GlassCard className="p-6 text-center">
        <p className="font-mono text-sm text-cyber-muted">Coming soon</p>
        <p className="mt-2 text-xs text-gray-500">Layout and navigation are ready for this section.</p>
      </GlassCard>
    </div>
  );
}
