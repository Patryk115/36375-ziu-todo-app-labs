import { useState } from 'react';
import {
  Box, Container, Typography, Button, Paper, Chip,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTodoContext } from '../../context/TodoContext';
import { FilterType } from '../../types/todo.types';
import AppHeader from '../dashboard/AppHeader';
import { FilterBar } from '../FilterBar';
import TodoList from '../TodoList';
import AccessibleModal from '../AccessibleModal';
import { AddTodoForm } from '../AddTodoForm';
import AssignTasksModal from '../AssignTasksModal';
import GlobalSnackbar from '../ui/GlobalSnackbar';
import PageTransition from '../ui/PageTransition';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function TasksPage() {
  const { state, addTodo, toggleTodo, deleteTodo } = useTodoContext();
  const [filter, setFilter] = useState<FilterType>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const totalCount = state.todos.length;
  const activeCount = state.todos.filter((t) => !t.completed).length;
  const completedCount = state.todos.filter((t) => t.completed).length;

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}
    >
      <a href="#main-content" className="skip-link">
        Przejdź do głównej treści
      </a>
      <Box component="header">
        <AppHeader />
      </Box>

      <Box
        component="main"
        id="main-content"
        sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }}
        tabIndex={-1}
      >
        <PageTransition>
          <Container maxWidth="lg">
            {/* Hero */}
            <Box
              sx={{
                mb: 5,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 3,
              }}
            >
              <Box>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{ fontWeight: 800, mb: 1 }}
                >
                  Twoje{' '}
                  <span style={{ color: '#7C3AED' }}>Zadania</span>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Zarządzaj wszystkimi swoimi zadaniami w jednym miejscu.
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setIsAddModalOpen(true)}
                aria-label="Dodaj nowe zadanie"
                id="tasks-add-btn"
              >
                Nowe zadanie
              </Button>
            </Box>

            {/* Szybkie statystyki */}
            <Box
              component="section"
              aria-label="Podsumowanie zadań"
              sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}
            >
              <Chip
                label={`Wszystkie: ${totalCount}`}
                variant={filter === 'all' ? 'filled' : 'outlined'}
                color={filter === 'all' ? 'primary' : 'default'}
                onClick={() => setFilter('all')}
                sx={{ fontWeight: 600, cursor: 'pointer' }}
                aria-pressed={filter === 'all'}
              />
              <Chip
                label={`Aktywne: ${activeCount}`}
                variant={filter === 'active' ? 'filled' : 'outlined'}
                color={filter === 'active' ? 'warning' : 'default'}
                onClick={() => setFilter('active')}
                sx={{ fontWeight: 600, cursor: 'pointer' }}
                aria-pressed={filter === 'active'}
              />
              <Chip
                label={`Ukończone: ${completedCount}`}
                variant={filter === 'completed' ? 'filled' : 'outlined'}
                color={filter === 'completed' ? 'success' : 'default'}
                onClick={() => setFilter('completed')}
                sx={{ fontWeight: 600, cursor: 'pointer' }}
                aria-pressed={filter === 'completed'}
              />
              {state.isOperationLoading && (
                <Chip label="Zapisywanie..." size="small" color="primary" variant="outlined" />
              )}
            </Box>

            {/* Lista zadań */}
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: '16px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
                  Lista zadań
                </Typography>
                <Button
                  size="small"
                  variant="text"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => setIsAssignModalOpen(true)}
                  aria-label="Otwórz okno przypisywania zadań do projektów"
                >
                  Dodaj do projektu
                </Button>
              </Box>

              <FilterBar activeFilter={filter} onFilterChange={setFilter} />

              <TodoList
                todos={state.todos}
                filter={filter}
                isLoading={state.isLoading}
                error={state.error}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </Paper>
          </Container>
        </PageTransition>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Produty © 2026 Patryk Kindra | Projekt zaliczeniowy ZIU
          </Typography>
        </Container>
      </Box>

      {/* Modal dodawania zadania */}
      <AccessibleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Dodaj nowe zadanie"
        maxWidth="sm"
      >
        <AddTodoForm
          onAdd={(text, priority) => {
            addTodo(text, priority);
            setIsAddModalOpen(false);
          }}
        />
      </AccessibleModal>

      {/* Modal przypisywania do projektu */}
      <AccessibleModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Przypisz zadania do projektu"
        maxWidth="sm"
      >
        <AssignTasksModal onClose={() => setIsAssignModalOpen(false)} />
      </AccessibleModal>

      <GlobalSnackbar />
    </Box>
  );
}
