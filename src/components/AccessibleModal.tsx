/* src/components/AccessibleModal.tsx */
import { useEffect, useRef } from 'react';
import { Box, Typography, Button, Portal } from '@mui/material';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function AccessibleModal({ isOpen, onClose, onConfirm, title, description }: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 1. Zapisujemy element, który miał fokus przed otwarciem modala
      prevFocusRef.current = document.activeElement as HTMLElement;
      
      // 2. Blokujemy interakcję z tłem dla czytników ekranu (wymóg WCAG)
      const rootElement = document.getElementById('root');
      rootElement?.setAttribute('aria-hidden', 'true');

      // 3. Przenosimy fokus do wnętrza modala natychmiast po otwarciu
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        // Zamykanie na Escape
        if (e.key === 'Escape') {
          onClose();
        }
        
        if (e.key === 'Tab' && modalRef.current) {
          const elements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (elements.length === 0) return;

          const first = elements[0];
          const last = elements[elements.length - 1];

          // POPRAWKA: Jeśli fokus jakimś cudem znalazł się poza modalem, wciągnij go z powrotem
          if (!modalRef.current.contains(document.activeElement)) {
            first.focus();
            e.preventDefault();
            return;
          }

          // Logika zapętlania (Focus Trap)
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Przywracamy dostępność tła i fokus po zamknięciu
        rootElement?.removeAttribute('aria-hidden');
        prevFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Portal>
      {/* Overlay - musi blokować kliknięcia "pod spód" */}
      <Box 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title" 
        aria-describedby="modal-desc"
        ref={modalRef} 
        sx={{ 
          position: 'fixed', inset: 0, zIndex: 1300, display: 'flex', 
          alignItems: 'center', justifyContent: 'center', 
          backgroundColor: 'rgba(0,0,0,0.7)', // Ciemniejsze tło dla lepszego kontrastu
          pointerEvents: 'auto' // Przechwytuje zdarzenia myszy
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()} // Zamknij przy kliknięciu w tło
      >
        <Box sx={{ 
          bgcolor: 'background.paper', p: 4, borderRadius: 2, 
          minWidth: 320, maxWidth: 500, boxShadow: 24,
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom fontWeight={700}>
            {title}
          </Typography>
          <Typography id="modal-desc" variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose} variant="outlined" sx={{ color: 'text.primary' }}>
              Anuluj
            </Button>
            <Button onClick={onConfirm} variant="contained" color="error" autoFocus>
              Usuń zadanie
            </Button>
          </Box>
        </Box>
      </Box>
    </Portal>
  );
}