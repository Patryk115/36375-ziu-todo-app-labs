import { useMemo, useState, useEffect } from 'react';
import { 
  List, ListItem, ListItemText, ListItemIcon, Checkbox, 
  IconButton, Typography, Paper, Chip 
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Todo, FilterType } from '../types/todo.types';
import AccessibleModal from './AccessibleModal';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  
  // Stan dla ukrytego komunikatu ARIA Live
  const [a11yMessage, setA11yMessage] = useState('');

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  // Dynamiczne powiadomienie dla czytnika po zmianie filtrów
  useEffect(() => {
    setA11yMessage(`Wyświetlam ${filteredTodos.length} zadań w widoku.`);
  }, [filteredTodos.length]);

  const handleDeleteClick = (id: string) => {
    setTodoToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      onDelete(todoToDelete);
      setA11yMessage('Zadanie zostało pomyślnie usunięte.'); // Komunikat ARIA
    }
    setDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  return (
    <>
      {/* Region ogłasza wyniki; użyto aria-live="polite" */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {a11yMessage}
      </div>

      <AccessibleModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Potwierdź usunięcie"
        description="Czy na pewno chcesz usunąć to zadanie? Tej akcji nie można cofnąć."
      />

      {filteredTodos.length === 0 ? (
        <Typography color='text.secondary' textAlign='center' sx={{ mt: 4 }}>
          Brak zadań w tym widoku.
        </Typography>
      ) : (
        <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
          {/* Użycie semantycznej listy z ARIA */}
          <List aria-label="Lista twoich zadań" disablePadding>
            {filteredTodos.map((todo, idx) => (
              <ListItem
                key={todo.id}
                divider={idx < filteredTodos.length - 1}
                sx={{ bgcolor: todo.completed ? 'action.hover' : 'background.paper' }}
                secondaryAction={
                  <IconButton 
                    edge='end' 
                    color='error' 
                    onClick={() => handleDeleteClick(todo.id)} 
                    aria-label={`Usuń zadanie: ${todo.title}`} 
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    inputProps={{ 
                      'aria-label': `Oznacz zadanie ${todo.title} jako ${todo.completed ? 'nieukończone' : 'ukończone'}` 
                    }}
                  />
                </ListItemIcon>
                
                <ListItemText
                  primary={todo.title}
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.disabled' : 'text.primary',
                  }}
                />
                
                {todo.completed && (
                  <Chip label='Ukończone' size='small' color='success' sx={{ mr: 1 }} />
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}