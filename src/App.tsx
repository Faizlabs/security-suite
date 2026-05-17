import { useCallback, useState } from 'react';
import { PlaceholderPage } from './components/common/PlaceholderPage';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { IpScannerPage } from './components/scanners/IpScannerPage';
import { UrlScannerPage } from './components/scanners/UrlScannerPage';
import { ThreatMapPage } from './components/map/ThreatMapPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { ThreatFeedPage } from './components/threats/ThreatFeedPage';
import { AppShell } from './components/layout/AppShell';
import { NAV_ITEMS } from './config/navigation';
import type { NavId } from './types';

const PAGE_TITLES: Record<NavId, string> = Object.fromEntries(
  NAV_ITEMS.map((item) => [item.id, item.label])
) as Record<NavId, string>;

export default function App() {
  const [activeNav, setActiveNav] = useState<NavId>('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useCallback((id: NavId) => {
    setActiveNav(id);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderPage = () => {
    if (activeNav === 'dashboard') return <DashboardHome />;
  
    if (activeNav === 'threat-feed') return <ThreatFeedPage />;
  
    if (activeNav === 'ip-scanner') return <IpScannerPage />;
  
    if (activeNav === 'url-scanner') return <UrlScannerPage />;
  
    if (activeNav === 'threat-map') return <ThreatMapPage />;
  
    if (activeNav === 'analytics') return <AnalyticsPage />;
    if (activeNav === 'settings') return <SettingsPage />;
  
    return <PlaceholderPage title={PAGE_TITLES[activeNav]} />;
  };
  return (
    <AppShell
      activeNav={activeNav}
      drawerOpen={drawerOpen}
      onMenuToggle={() => setDrawerOpen((open) => !open)}
      onNavigate={navigate}
      onDrawerClose={() => setDrawerOpen(false)}
    >
      {renderPage()}
    </AppShell>
  );
}