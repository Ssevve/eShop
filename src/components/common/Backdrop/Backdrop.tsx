import { AnimatePresence, motion } from 'framer-motion';
import { useLockedBody } from 'usehooks-ts';

export function Backdrop() {
  useLockedBody(true, 'root');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/60"
      />
    </AnimatePresence>
  );
}
