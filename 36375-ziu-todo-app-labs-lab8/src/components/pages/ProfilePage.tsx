import {
  Box, Container, Typography, Avatar, Card, CardContent,
  List, ListItemButton, ListItemIcon, ListItemText, Divider,
  Switch, FormControlLabel,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTodoContext } from '../../context/TodoContext';
import { useProjectContext } from '../../context/ProjectContext';
import { useThemeContext } from '../../context/ThemeContext';
import AppHeader from '../dashboard/AppHeader';
import PageTransition from '../ui/PageTransition';

interface StatCardProps {
  value: string | number;
  label: string;
  actionLabel: string;
  onAction?: () => void;
  color?: string;
}

function StatCard({ value, label, actionLabel, onAction, color }: StatCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.15 }}>
      <Card
        sx={{
          borderRadius: '14px',
          height: '100%',
          border: '1px solid rgba(255,255,255,0.07)',
          transition: 'border-color 0.2s',
          '&:hover': { borderColor: color || 'primary.main' },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h3"
            component="p"
            sx={{ fontWeight: 800, color: color || 'text.primary', mb: 0.5 }}
          >
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {label}
          </Typography>
          <Box
            component="button"
            onClick={onAction}
            sx={{
              bgcolor: 'rgba(124, 58, 237, 0.15)',
              color: 'primary.light',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              borderRadius: '8px',
              px: 2,
              py: 0.75,
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
          >
            {actionLabel}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state: todoState } = useTodoContext();
  const { state: projectState } = useProjectContext();
  const { mode, toggleTheme } = useThemeContext();

  const firstName = user?.firstName || 'Jan';
  const lastName = user?.lastName || 'Kowalski';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  // Statystyki
  const completedTodos = todoState.todos.filter((t) => t.completed).length;
  const totalTodos = todoState.todos.length;
  const activeProjects = projectState.projects.length;
  const efficiency = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 98;
  const todayTodos = todoState.todos.filter((t) => {
    const today = new Date();
    const created = new Date(t.createdAt);
    return (
      !t.completed &&
      created.getDate() === today.getDate() &&
      created.getMonth() === today.getMonth()
    );
  }).length;
  const overdueTodos = todoState.todos.filter((t) => !t.completed).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <a href="#main-content" className="skip-link">Przejdź do głównej treści</a>
      <Box component="header">
        <AppHeader />
      </Box>

      <Box component="main" id="main-content" sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }} tabIndex={-1}>
        <PageTransition>
          <Container maxWidth="lg">
            {/* Dark mode toggle — prawy górny róg (jak na Figmie) */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === 'dark'}
                    onChange={toggleTheme}
                    color="primary"
                    inputProps={{ 'aria-label': 'Przełącz tryb ciemny' }}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    Włącz tryb ciemny
                  </Typography>
                }
                labelPlacement="start"
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '220px 1fr' },
                gap: 4,
                alignItems: 'start',
              }}
            >
              {/* Lewa kolumna — profil użytkownika */}
              <Box>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'primary.main',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        border: '3px solid rgba(124, 58, 237, 0.4)',
                        boxShadow: '0 0 30px rgba(124, 58, 237, 0.3)',
                      }}
                      aria-label={`Avatar użytkownika ${firstName} ${lastName}`}
                    >
                      {initials}
                    </Avatar>

                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {firstName} {lastName}
                    </Typography>

                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        borderRadius: '20px',
                        bgcolor: 'rgba(124, 58, 237, 0.15)',
                        border: '1px solid rgba(124, 58, 237, 0.3)',
                        mb: 3,
                      }}
                    >
                      <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 600 }}>
                        Administrator
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <List dense disablePadding>
                    <ListItemButton
                      onClick={() => navigate('/settings')}
                      sx={{ borderRadius: '8px', mb: 0.5 }}
                      aria-label="Przejdź do ustawień konta"
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <SettingsIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Ustawienia konta" primaryTypographyProps={{ variant: 'body2' }} />
                    </ListItemButton>

                    <ListItemButton sx={{ borderRadius: '8px', mb: 0.5 }} aria-label="Powiadomienia">
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <NotificationsIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Powiadomienia" primaryTypographyProps={{ variant: 'body2' }} />
                    </ListItemButton>

                    <ListItemButton sx={{ borderRadius: '8px' }} aria-label="Prywatność">
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <LockIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Prywatność" primaryTypographyProps={{ variant: 'body2' }} />
                    </ListItemButton>
                  </List>
                </motion.div>
              </Box>

              {/* Prawa kolumna — siatka statystyk (jak na Figmie) */}
              <Box
                component="section"
                aria-label="Statystyki użytkownika"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                  gap: 2.5,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <StatCard
                    value={completedTodos || 142}
                    label="Ukończone zadania"
                    actionLabel="Historia"
                    onAction={() => navigate('/')}
                    color="#10B981"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <StatCard
                    value={activeProjects || 5}
                    label="Aktywne projekty"
                    actionLabel="Zarządzaj"
                    onAction={() => navigate('/projects')}
                    color="#3B82F6"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <StatCard
                    value={`${efficiency}%`}
                    label="Skuteczność"
                    actionLabel="Raport"
                    color="#7C3AED"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <StatCard
                    value={todayTodos || 12}
                    label="Zadania na dzisiaj"
                    actionLabel="Rozpocznij"
                    onAction={() => navigate('/')}
                    color="#F59E0B"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <StatCard
                    value={7}
                    label="Dni z rzędu"
                    actionLabel="Osiągnięcia"
                    color="#EC4899"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <StatCard
                    value={overdueTodos || 3}
                    label="Zaległe zadania"
                    actionLabel="Sprawdź"
                    onAction={() => navigate('/')}
                    color="#EF4444"
                  />
                </motion.div>
              </Box>
            </Box>
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
    </Box>
  );
}
