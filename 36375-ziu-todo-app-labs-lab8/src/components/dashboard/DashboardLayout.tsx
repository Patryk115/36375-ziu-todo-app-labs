import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Typography, Button, Container, Drawer, List, ListItemButton,
  ListItemText, Skeleton,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AppHeader from './AppHeader';
import StatsGrid from './StatsGrid';
import ProjectCards from './ProjectCards';
import { useTodoContext } from '../../context/TodoContext';
import { useProjectContext } from '../../context/ProjectContext';
import AccessibleModal from '../AccessibleModal';
import { AddTodoForm } from '../AddTodoForm';
import { useAuth } from '../../context/AuthContext';
import GlobalSnackbar from '../ui/GlobalSnackbar';
import PageTransition from '../ui/PageTransition';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const { state, addTodo } = useTodoContext();
  const { state: projectState } = useProjectContext();
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <a href="#main-content" className="skip-link">
        Przejdź do głównej treści (WCAG)
      </a>

      <Box component="header">
        <AppHeader handleDrawerToggle={handleDrawerToggle} />
      </Box>

      {/* Nawigacja mobilna (Drawer) */}
      <Drawer
        component="nav"
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
        aria-label="Nawigacja mobilna"
      >
        <List sx={{ pt: 2 }} aria-label="Nawigacja mobilna">
          <ListItemButton onClick={() => { handleDrawerToggle(); navigate('/'); }} selected={location.pathname === '/'}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={() => { handleDrawerToggle(); navigate('/tasks'); }} selected={location.pathname === '/tasks'}>
            <ListItemText primary="Zadania" />
          </ListItemButton>
          <ListItemButton onClick={() => { handleDrawerToggle(); navigate('/projects'); }} selected={location.pathname.startsWith('/projects')}>
            <ListItemText primary="Projekty" />
          </ListItemButton>
          <ListItemButton onClick={() => { handleDrawerToggle(); navigate('/profile'); }}>
            <ListItemText primary="Profil" />
          </ListItemButton>
          <ListItemButton onClick={() => { handleDrawerToggle(); navigate('/settings'); }}>
            <ListItemText primary="Ustawienia profilu" />
          </ListItemButton>
          <ListItemButton onClick={() => { handleDrawerToggle(); logout(); }}>
            <ListItemText primary="Wyloguj się" sx={{ color: 'error.main' }} />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" id="main-content" sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }} tabIndex={-1}>
        <PageTransition>
          <Container maxWidth="lg">
            {/* Sekcja powitalna */}
            <Box
              component="section"
              aria-labelledby="hero-heading"
              sx={{
                mb: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 4,
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              <Box sx={{ maxWidth: '700px' }}>
                <Typography
                  variant="h3"
                  component="h1"
                  id="hero-heading"
                  sx={{ fontWeight: 800, mb: 1, lineHeight: 1.2 }}
                >
                  Zarządzaj swoimi zadaniami{' '}
                  <span style={{ color: '#7C3AED' }}>jak profesjonalista</span>
                </Typography>
                <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 3, fontWeight: 400 }}>
                  Nasza aplikacja ToDo pomoże Ci zorganizować każdy dzień, śledzić postępy i zwiększyć
                  produktywność całego zespołu.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/tasks')}
                  sx={{ px: 3, py: 1.2, borderRadius: '8px' }}
                  id="hero-add-task-btn"
                >
                  Przejdź do zadań
                </Button>
              </Box>
            </Box>

            {/* Siatka statystyk na górze */}
            <Box component="section" aria-label="Statystyki zadań" sx={{ mb: 6 }}>
              <StatsGrid todos={state.todos} />
            </Box>

            {/* Projekty (karty jak na Figmie) */}
            {!projectState.isLoading && projectState.projects.length > 0 && (
              <Box component="section" aria-label="Twoje projekty" sx={{ mb: 5 }}>
                <ProjectCards />
              </Box>
            )}

            {/* Skeleton ładowania projektów */}
            {projectState.isLoading && (
              <Box sx={{ mb: 5, display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
                {[1, 2, 3].map((i) => (
                  <Box key={i} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 10px)', md: '1 1 calc(33.33% - 14px)' } }}>
                    <Skeleton variant="rounded" height={200} sx={{ borderRadius: '16px' }} />
                  </Box>
                ))}
              </Box>
            )}
          </Container>
        </PageTransition>
      </Box>

      {/* Stopka */}
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
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Regulamin | Polityka prywatności
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Wersja: 1.0.0
          </Typography>
        </Container>
      </Box>

      {/* Modal szybkiego zadania */}
      <AccessibleModal
        isOpen={isAddTodoModalOpen}
        onClose={() => setIsAddTodoModalOpen(false)}
        title="Dodaj nowe zadanie"
        maxWidth="sm"
      >
        <AddTodoForm
          onAdd={(text, priority) => {
            addTodo(text, priority);
            setIsAddTodoModalOpen(false);
          }}
        />
      </AccessibleModal>

      {/* Globalny Snackbar obsługi błędów i sukcesów */}
      <GlobalSnackbar />
    </Box>
  );
}