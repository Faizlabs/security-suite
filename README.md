# CyberFlow XDR (Base)

Foundation for a cybersecurity SOC dashboard — layout, theme, and navigation only.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v3 (PostCSS)
- Framer Motion
- Lucide React icons

## Run

```bash
npm install
npm run dev
```

## Structure

```
src/
  components/
    common/       PlaceholderPage
    dashboard/    DashboardHome, MetricCard
    layout/       AppShell, TopNavbar, Sidebar, MobileNav, MobileDrawer
    ui/           GlassCard, NeonButton, LiveDot, PageHeader
  config/         navigation.ts
  types/          NavId, ThreatLevel
  App.tsx
  index.css       @tailwind directives + component utilities
  tailwind.config.js
  postcss.config.js
```

## Responsive behavior

- **Desktop (lg+)**: Sidebar + top navbar
- **Mobile**: Hamburger drawer + bottom navigation bar
- **Safe area**: Bottom padding for notched devices

Advanced modules (threat feed, scanners, maps, charts) are intentionally not included yet.
