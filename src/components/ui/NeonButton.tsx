import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  variant?: 'cyan' | 'ghost';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
}

export function NeonButton({
  children,
  variant = 'cyan',
  className = '',
  onClick,
  disabled,
  loading,
  type = 'button',
}: NeonButtonProps) {
  const styles =
    variant === 'cyan'
      ? 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/40 hover:bg-cyber-cyan/20 hover:shadow-[0_0_16px_rgba(0,245,212,0.25)]'
      : 'bg-transparent text-gray-300 border-cyber-border hover:border-cyber-cyan/30 hover:text-cyber-cyan';

  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
