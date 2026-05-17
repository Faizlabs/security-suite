import { motion } from 'framer-motion';
import type { IpRiskLevel } from '../../types/ipReputation';

const ringColor: Record<IpRiskLevel, string> = {
  critical: '#ff3366',
  high: '#fb923c',
  medium: '#ffb020',
  low: '#00ff88',
  safe: '#00f5d4',
};

interface AbuseScoreGaugeProps {
  score: number;
  riskLevel: IpRiskLevel;
  animate?: boolean;
}

export function AbuseScoreGauge({ score, riskLevel, animate = true }: AbuseScoreGaugeProps) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;
  const color = ringColor[riskLevel];

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.9 } : false}
      animate={{ opacity: 1, scale: 1 }}
      className="relative mx-auto flex h-28 w-28 items-center justify-center md:h-32 md:w-32"
    >
      <svg className="-rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="rgba(30,30,46,0.8)"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={animate ? { strokeDashoffset: circumference } : false}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-bold text-white md:text-3xl">{score}</span>
        <span className="text-[9px] uppercase tracking-wider text-cyber-muted">abuse %</span>
      </div>
    </motion.div>
  );
}
