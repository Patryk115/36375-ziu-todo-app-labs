import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

// Używamy zwykłego export (bez default), żeby pasowało do Twojego App.tsx
export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='h6' sx={{ mb: 1 }}>
        Dodaj nowe zadanie
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder='Wpisz treść zadania...'
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        />
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleSubmit}
          disabled={!text.trim()}
        >
          Dodaj
        </Button>
      </Box>
    </Box>
  );
}