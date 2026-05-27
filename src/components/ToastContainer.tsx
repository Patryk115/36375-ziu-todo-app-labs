import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';

const toastVariants = {
  initial: { opacity: 0, x: 48, scale: 0.9 },
  animate: { 
    opacity: 1, 
    x: 0,  
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 } 
  },
  exit: { 
    opacity: 0, 
    x: 48, 
    scale: 0.85,
    transition: { duration: 0.18 } 
  },
};

export function ToastContainer() {
  const { toasts } = useToast();
  
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999 }}>
      <AnimatePresence initial={false}>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            layout // płynne przesunięcie pozostałych toastów
            variants={toastVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            style={{ 
              marginBottom: 8,
              padding: '12px 24px',
              backgroundColor: 'var(--surface-color)',
              color: 'var(--text-primary)',
              border: '1px solid var(--accent-color)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              fontWeight: 500
            }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}