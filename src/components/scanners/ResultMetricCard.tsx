import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ResultMetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  highlight?: boolean;
  valueClassName?: string;
  className?: string;
  index?: number;
}

export function ResultMetricCard({
  label,
  value,
  icon: Icon,
  highlight,
  valueClassName = 'text-white',
  className = '',
  index = 0,
}: ResultMetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      whileHover={{ y: -2, boxShadow: '0 0 20px rgba(0, 245, 212, 0.08)' }}
      className={`rounded-lg border p-2.5 transition-colors md:p-3 ${className} ${
        highlight
          ? 'border-cyber-cyan/30 bg-cyber-cyan/5 glow-border'
          : 'border-cyber-border/50 bg-cyber-bg/50 hover:border-cyber-cyan/20'
      }`}
    >
      <div className="mb-1.5 flex items-center gap-1.5 text-cyber-muted">
        <Icon className="h-3.5 w-3.5 shrink-0 text-cyber-cyan/80" />
        <span className="text-[9px] font-medium uppercase tracking-wider md:text-[10px]">{label}</span>
      </div>
      <p className={`truncate font-mono text-sm font-semibold md:text-base ${valueClassName}`} title={value}>
        {value}
      </p>
    </motion.div>
  );
}
