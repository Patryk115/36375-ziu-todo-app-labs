// src/components/AccessibleModal.tsx
import { ReactNode } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogContentText, 
  DialogActions, Button, IconButton, Typography, useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmText?: string;
  confirmColor?: 'primary' | 'error' | 'success' | 'warning' | 'info' | 'inherit';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function AccessibleModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  children,
  confirmText = 'Zatwierdź',
  confirmColor = 'primary',
  maxWidth = 'sm'
}: AccessibleModalProps) {
  const theme = useTheme();

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      aria-labelledby="accessible-dialog-title"
      aria-describedby={description ? "accessible-dialog-description" : undefined}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
          sx: {
              p: 1,
              borderRadius: '16px',
              bgcolor: 'background.paper',
          }
      }}
    >
      <DialogTitle id="accessible-dialog-title" sx={{ m: 0, p: 2, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
            {title}
        </Typography>
        <IconButton
          aria-label="Zamknij okno"
          onClick={onClose}
          sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
                color: theme.palette.text.primary,
            }
          }}
        >
          <CloseIcon fontSize="small"/>
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 2, pt: 1 }}>
        {description && (
          <DialogContentText id="accessible-dialog-description" sx={{ mb: 2, color: 'text.secondary' }}>
            {description}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      
      {onConfirm && (
        <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Anuluj
          </Button>
          <Button onClick={onConfirm} variant="contained" color={confirmColor} autoFocus>
            {confirmText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}