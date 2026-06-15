import { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useTodoContext } from '../../context/TodoContext';

/**
 * Globalny Snackbar wyświetlający stan operacji TodoContext:
 * - operationSuccess (green)
 * - operationError (red)
 * Spełnia wymaganie: "Widoczna obsługa błędów sieciowych w UI"
 */
export default function GlobalSnackbar() {
  const { state, clearOperationState } = useTodoContext();

  const { operationSuccess, operationError } = state;

  const isOpen = Boolean(operationSuccess || operationError);
  const severity = operationError ? 'error' : 'success';
  const message = operationError || operationSuccess || '';

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        clearOperationState();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, clearOperationState]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      onClose={clearOperationState}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={clearOperationState}
        severity={severity}
        variant="filled"
        sx={{ width: '100%', borderRadius: '10px' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
