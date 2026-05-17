import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STEPS = [
  'Resolving address...',
  'Querying threat intel...',
  'Correlating abuse reports...',
  'Computing risk score...',
];

interface ScanProgressProps {
  active: boolean;
}

export function ScanProgress({ active }: ScanProgressProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) {
      setStep(0);
      return;
    }
    const id = setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length);
    }, 650);
    return () => clearInterval(id);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="relative rounded-lg border border-cyber-cyan/20 bg-[#030306] p-4">
            <div className="scanner-pulse absolute inset-0 rounded-lg opacity-40" />
            <div className="relative flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="h-10 w-10 rounded-full border-2 border-cyber-cyan/30 border-t-cyber-cyan"
              />
              <p className="font-mono text-xs text-cyber-cyan">{STEPS[step]}</p>
              <div className="flex w-full max-w-xs gap-1">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-0.5 flex-1 rounded-full transition-colors ${
                      i <= step ? 'bg-cyber-cyan' : 'bg-cyber-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
