import { useMemo } from 'react';
import { 
  List, ListItem, ListItemText, ListItemIcon, Checkbox, 
  IconButton, Typography, Paper, Chip 
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Todo, FilterType } from '../types/todo.types';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType; // <-- Dodany prop filter
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  
  // Optymalizacja za pomocą useMemo: filtrujemy tylko gdy zmienią się zadania lub sam filtr
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true; // 'all'
    });
  }, [todos, filter]);

  // Używamy filteredTodos.length zamiast todos.length
  if (filteredTodos.length === 0) {
    return (
      <Typography color='text.secondary' textAlign='center' sx={{ mt: 4 }}>
        Brak zadań w tym widoku.
      </Typography>
    );
  }

  return (
    <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
      <List disablePadding>
        {/* Renderujemy filteredTodos zamiast todos */}
        {filteredTodos.map((todo, idx) => (
          <ListItem
            key={todo.id}
            divider={idx < filteredTodos.length - 1}
            sx={{ bgcolor: todo.completed ? 'action.hover' : 'background.paper' }}
            secondaryAction={
              <IconButton 
                edge='end' 
                color='error' 
                onClick={() => onDelete(todo.id)} 
                aria-label='Usuń zadanie'
              >
                <DeleteOutlineIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                inputProps={{ 'aria-label': todo.title }}
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
  );
}