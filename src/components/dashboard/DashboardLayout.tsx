import { useState } from 'react';
import { Box, Typography, Button, Container, Drawer, List, ListItemButton, ListItemText, Paper } from '@mui/material';
import AppHeader from './AppHeader';
import ProjectCards from './ProjectCards';
import StatsGrid from './StatsGrid';
import { AddTodoForm } from '../AddTodoForm';
import { FilterBar } from '../FilterBar';
import TodoList from '../TodoList';
import { useTodoContext } from '../../context/TodoContext';
import { FilterType } from '../../types/todo.types';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Podłączenie globalnego stanu (Context API)
  const { state, dispatch } = useTodoContext();
  const [filter, setFilter] = useState<FilterType>('all');

  // Funkcje obsługujące akcje na zadaniach
  const handleAdd = (text: string) => dispatch({ type: 'ADD', payload: text });
  const handleToggle = (id: string) => dispatch({ type: 'TOGGLE', payload: id });
  const handleDelete = (id: string) => dispatch({ type: 'DELETE', payload: id });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      
      {/* Skip Navigation Link dla osób używających klawiatury */}
      <a href="#main-content" className="skip-link">
        Przejdź do głównej treści
      </a>

      <Box component="header">
        <AppHeader handleDrawerToggle={handleDrawerToggle} />
      </Box>

      <Drawer
        component="nav"
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: 'background.paper' },
        }}
      >
        <List sx={{ pt: 2 }} aria-label="Nawigacja mobilna">
          <ListItemButton onClick={handleDrawerToggle}><ListItemText primary="Dashboard" /></ListItemButton>
          <ListItemButton onClick={handleDrawerToggle}><ListItemText primary="Zadania" /></ListItemButton>
          <ListItemButton onClick={handleDrawerToggle}><ListItemText primary="Projekty" /></ListItemButton>
        </List>
      </Drawer>

      {/* Główna sekcja z ID dla Skip Linka */}
      <Box component="main" id="main-content" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }} tabIndex={-1}>
        <Container maxWidth="lg">
          
          <Box component="section" aria-labelledby="hero-heading" sx={{ mb: 6, maxWidth: '800px' }}>
            <Typography variant="h3" component="h1" id="hero-heading" sx={{ fontWeight: 800, mb: 2 }}>
              Zarządzaj swoimi zadaniami jak profesjonalista
            </Typography>
            <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
              Nasza aplikacja ToDo pomoże Ci zorganizować każdy dzień, śledzić postępy i zwiększyć produktywność całego zespołu.
            </Typography>
            <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: '8px' }}>
              Rozpocznij teraz
            </Button>
          </Box>

          {/* Sekcja Statystyk */}
          <Box component="section" aria-label="Statystyki zadań" sx={{ mb: 6 }}>
            <StatsGrid />
          </Box>

          {/* Główna aplikacja ToDo List */}
          <Box component="section" aria-label="Zarządzanie listą zadań" sx={{ mb: 8 }}>
            <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, bgcolor: 'background.paper' }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Moja lista zadań
              </Typography>
              
              <AddTodoForm onAdd={handleAdd} />
              <FilterBar activeFilter={filter} onFilterChange={setFilter} />
              
              {/* Tutaj jest lista z dostępnym modalem i koszem */}
              <TodoList 
                todos={state.todos} 
                filter={filter} 
                onToggle={handleToggle} 
                onDelete={handleDelete} 
              />
            </Paper>
          </Box>

          {/* Sekcja projektów */}
          <Box component="section" aria-label="Twoje projekty">
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Polecane projekty
            </Typography>
            <ProjectCards />
          </Box>

        </Container>
      </Box>

      <Box component="footer" sx={{ 
        py: 4, borderTop: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.paper' 
      }}>
        <Container maxWidth="lg" sx={{ 
          display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            Regulamin | Polityka prywatności
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Wersja: 1.0.0
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}