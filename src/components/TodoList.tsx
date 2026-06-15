import { useMemo, useState, useEffect } from 'react';
import { 
  List, ListItem, ListItemText, ListItemIcon, Checkbox, 
  IconButton, Typography, Paper, Chip, CircularProgress, Box, Alert
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlagIcon from '@mui/icons-material/Flag';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo, FilterType, PriorityType } from '../types/todo.types';
import AccessibleModal from './AccessibleModal';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  isLoading: boolean;
  error: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const getPriorityDetails = (priority: PriorityType) => {
  switch (priority) {
    case 'high': return { color: '#EF4444', label: 'Wysoki' };
    case 'medium': return { color: '#F59E0B', label: 'Średni' };
    case 'low': return { color: '#9CA3AF', label: 'Niski' };
    default: return { color: '#F59E0B', label: 'Średni' };
  }
};

export default function TodoList({ todos, filter, isLoading, error, onToggle, onDelete }: TodoListProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [a11yMessage, setA11yMessage] = useState('');

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return sortedTodos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [sortedTodos, filter]);

  useEffect(() => {
    if (!isLoading && !error) {
      setA11yMessage(`Zaktualizowano listę. Wyświetlam ${filteredTodos.length} zadań.`);
    }
  }, [filteredTodos.length, isLoading, error]);

  const handleDeleteClick = (id: string, title: string) => {
    setTodoToDelete(id);
    setA11yMessage(`Otwarto okno potwierdzenia usunięcia zadania: ${title}`);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      onDelete(todoToDelete);
      setA11yMessage('Zadanie zostało pomyślnie usunięte.');
    }
    setDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  if (isLoading && todos.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 5, gap: 2 }} aria-busy="true" aria-live="polite">
        <CircularProgress size={30} />
        <Typography color="text.secondary">Synchronizowanie z chmurą...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>{error}</Alert>;
  }

  if (filteredTodos.length === 0 && !isLoading) {
    return (
        <Paper variant="outlined" sx={{ mt: 2, p: 4, textAlign: 'center', borderStyle: 'dashed', borderColor: 'divider', bgcolor: 'transparent' }}>
            <Typography variant="h6" color='text.secondary'>
                Vualà! Brak zadań w tym widoku.
            </Typography>
            <Typography variant="body2" color='text.disabled'>
                Dodaj nowe zadanie, aby rozpocząć.
            </Typography>
        </Paper>
    );
  }

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {a11yMessage}
      </div>

      <AccessibleModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Potwierdź usunięcie"
        description="Czy na pewno chcesz trwale usunąć to zadanie? Tej akcji nie można cofnąć."
        confirmText="Usuń trwale"
        confirmColor="error"
        maxWidth="xs"
      />

      <List aria-label="Lista twoich zadań" disablePadding sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <AnimatePresence>
          {filteredTodos.map((todo) => {
            const priorityDetails = getPriorityDetails(todo.priority || 'medium');
            const safeTags = todo.tags || []; // Zabezpieczenie przed błędem z undefined
            
            return (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
              >
                <Paper 
                    variant={todo.completed ? 'outlined' : 'elevation'}
                    elevation={todo.completed ? 0 : 1}
                    sx={{ 
                        borderRadius: '10px',
                        overflow: 'hidden', 
                        bgcolor: todo.completed ? 'transparent' : 'background.paper',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            borderColor: 'primary.dark',
                            boxShadow: todo.completed ? 'none' : '0px 4px 15px rgba(0,0,0,0.2)'
                        }
                    }}
                >
                  <ListItem
                    sx={{ p: 1.5 }}
                    secondaryAction={
                      <IconButton 
                        edge='end' 
                        color='default' 
                        onClick={() => handleDeleteClick(todo.id, todo.title)} 
                        aria-label={`Usuń zadanie: ${todo.title}`} 
                        sx={{ '&:hover': { color: 'error.main' }}}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Checkbox
                        edge="start"
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                        size="small"
                        color="primary"
                        inputProps={{ 
                          'aria-label': `Oznacz zadanie "${todo.title}" jako ${todo.completed ? 'nieukończone' : 'ukończone'}` 
                        }}
                      />
                    </ListItemIcon>
                    
                    <ListItemText
                      primary={todo.title}
                      sx={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'text.disabled' : 'text.primary',
                        mr: 2
                      }}
                      primaryTypographyProps={{
                          variant: 'body1',
                          fontWeight: todo.completed ? 400 : 500,
                      }}
                    />
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mr: 5 }}>
                        {safeTags.map(tag => (
                             <Chip key={tag} label={tag} size='small' variant="outlined" sx={{ color: 'primary.light', borderColor: 'primary.dark', height: '22px', fontSize: '11px' }} />
                        ))}
                        
                        {!todo.completed && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <FlagIcon sx={{ color: priorityDetails.color, fontSize: '16px' }} />
                                <Typography variant="caption" sx={{ color: priorityDetails.color, fontWeight: 600 }}>
                                    {priorityDetails.label}
                                </Typography>
                            </Box>
                        )}

                        {todo.completed && (
                          <Chip label='Ukończone' size='small' color='success' variant="filled" sx={{ height: '22px', fontSize: '11px', bgcolor: 'rgba(16, 185, 129, 0.15)' }} />
                        )}
                    </Box>
                  </ListItem>
                </Paper>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </List>
    </>
  );
}