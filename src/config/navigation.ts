import {
  Activity,
  Globe,
  LayoutDashboard,
  Map,
  Network,
  Rss,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import type { NavId } from '../types';

export interface NavItem {
  id: NavId;
  label: string;
  icon: LucideIcon;
}

/** Full sidebar navigation */
export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'threat-feed', label: 'Threat Feed', icon: Rss },
  { id: 'ip-scanner', label: 'IP Scanner', icon: Network },
  { id: 'url-scanner', label: 'URL Scanner', icon: Globe },
  { id: 'threat-map', label: 'Threat Map', icon: Map },
  { id: 'analytics', label: 'Analytics', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings },
];

/** Bottom bar — primary routes only (mobile) */
export const MOBILE_NAV_ITEMS: NavItem[] = NAV_ITEMS.filter((item) =>
  ['dashboard', 'threat-feed', 'threat-map', 'analytics', 'settings'].includes(item.id)
);
