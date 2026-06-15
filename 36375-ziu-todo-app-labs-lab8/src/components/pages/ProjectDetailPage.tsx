import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Button, CircularProgress, Alert, Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useProjectContext } from '../../context/ProjectContext';
import { useTodoContext } from '../../context/TodoContext';
import AppHeader from '../dashboard/AppHeader';
import TodoList from '../TodoList';
import { FilterBar } from '../FilterBar';
import AccessibleModal from '../AccessibleModal';
import { AddTodoForm } from '../AddTodoForm';
import PageTransition from '../ui/PageTransition';
import GlobalSnackbar from '../ui/GlobalSnackbar';
import { FilterType } from '../../types/todo.types';

export default function ProjectDetailPage() {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state: projectState } = useProjectContext();
  const { state: todoState, addTodo, toggleTodo, deleteTodo } = useTodoContext();

  const [filter, setFilter] = useState<FilterType>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const project = projectState.projects.find((p) => p.id === projectId);
  const projectTodos = todoState.todos.filter((t) => t.projectId === projectId);

  if (projectState.isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!project) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppHeader />
        <Container maxWidth="lg" sx={{ pt: 6 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={() => navigate('/projects')}>
                Wróć do projektów
              </Button>
            }
          >
            Projekt nie został znaleziony.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <a href="#main-content" className="skip-link">Przejdź do głównej treści</a>
      <Box component="header">
        <AppHeader />
      </Box>

      <Box component="main" id="main-content" sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }} tabIndex={-1}>
        <PageTransition>
          <Container maxWidth="lg">
            {/* Nawigacja wstecz */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/projects')}
              variant="text"
              color="primary"
              sx={{ mb: 3 }}
              aria-label="Wróć do listy projektów"
            >
              Projekty
            </Button>

            {/* Nagłówek projektu */}
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      bgcolor: project.color,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <Typography variant="h3" component="h1" sx={{ fontWeight: 800 }}>
                    {project.title}
                  </Typography>
                </Box>
                {project.description && (
                  <Typography variant="body1" color="text.secondary" sx={{ ml: '30px' }}>
                    {project.description}
                  </Typography>
                )}
              </Box>

              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => setIsAddModalOpen(true)}
                aria-label="Dodaj zadanie do projektu"
                sx={{ bgcolor: project.color, '&:hover': { bgcolor: project.color, filter: 'brightness(0.85)' } }}
              >
                Dodaj zadanie
              </Button>
            </Box>

            {/* Lista zadań */}
            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: '16px' }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                Zadania projektu{' '}
                <Typography component="span" variant="h5" color="text.secondary">
                  ({projectTodos.length})
                </Typography>
              </Typography>

              <FilterBar activeFilter={filter} onFilterChange={setFilter} />

              <TodoList
                todos={projectTodos}
                filter={filter}
                isLoading={todoState.isLoading}
                error={todoState.error}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </Paper>
          </Container>
        </PageTransition>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, mt: 'auto', borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
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
        title={`Dodaj zadanie do: ${project.title}`}
        maxWidth="sm"
      >
        <AddTodoForm
          onAdd={(text, priority) => {
            addTodo(text, priority, projectId);
            setIsAddModalOpen(false);
          }}
        />
      </AccessibleModal>

      <GlobalSnackbar />
    </Box>
  );
}
