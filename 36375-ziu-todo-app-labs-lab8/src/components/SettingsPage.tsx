import { useState } from 'react';
import {
  Box, Container, Button, Typography, Paper, TextField, Switch,
  FormControlLabel, Divider, Avatar, Snackbar, Alert, Card, CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { useTodoContext } from '../context/TodoContext';
import { useThemeContext } from '../context/ThemeContext';
import PageTransition from './ui/PageTransition';
import AppHeader from './dashboard/AppHeader';

const settingsSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastName: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
});
type SettingsFormData = z.infer<typeof settingsSchema>;

export function SettingsPage() {
  const navigate = useNavigate();
  const { user, userEmail } = useAuth();
  const { state } = useTodoContext();
  const { mode, toggleTheme } = useThemeContext();

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const totalTodos = state.todos.length;
  const completedTodos = state.todos.filter((t) => t.completed).length;
  const efficiency = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    mode: 'onBlur',
    defaultValues: {
      name: user?.firstName || 'Jan',
      lastName: user?.lastName || 'Kowalski',
    },
  });

  const nameValue = watch('name');
  const lastNameValue = watch('lastName');
  const userInitial = nameValue ? nameValue.charAt(0).toUpperCase() : 'U';

  const handleSave = (_data: SettingsFormData) => {
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <a href="#main-content" className="skip-link">Przejdź do głównej treści</a>
      <Box component="header">
        <AppHeader />
      </Box>

      <Box component="main" id="main-content" sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }} tabIndex={-1}>
        <PageTransition>
          <Container maxWidth="lg">
            {/* Nagłówek i powrót */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                variant="text"
                color="primary"
                aria-label="Wróć do panelu głównego"
              >
                Wróć do Dashboardu
              </Button>
              <Typography variant="body2" color="text.secondary">
                Profil konta #1425
              </Typography>
            </Box>

            {/* Główna siatka ustawień */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '4fr 8fr' },
                gap: 4,
              }}
            >
              {/* LEWA KOLUMNA */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Paper sx={{ p: 3, textAlign: 'center', borderRadius: '16px' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                    aria-label={`Avatar użytkownika ${nameValue} ${lastNameValue}`}
                  >
                    {userInitial}
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    {nameValue} {lastNameValue}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Administrator konta
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.disabled" textAlign="left">
                    Zalogowany jako:
                    <br />
                    <span style={{ fontWeight: 500 }}>{userEmail}</span>
                  </Typography>
                </Paper>

                {/* Panel Skuteczności */}
                <Card sx={{ borderRadius: '16px' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <EqualizerIcon color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Twoja skuteczność
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Ukończone zadania:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                        {completedTodos} / {totalTodos}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">Wskaźnik efektywności:</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.light' }}>
                        {efficiency}%
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* PRAWA KOLUMNA */}
              <Box
                component="form"
                onSubmit={handleSubmit(handleSave)}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                {/* Sekcja 1: Dane osobowe */}
                <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px' }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <SecurityIcon fontSize="small" color="primary" /> Dane profilowe
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                      <TextField
                        label="Imię"
                        fullWidth
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        id="settings-name"
                      />
                      <TextField
                        label="Nazwisko"
                        fullWidth
                        {...register('lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        id="settings-lastname"
                      />
                    </Box>
                    <TextField
                      label="Adres E-mail"
                      type="email"
                      fullWidth
                      value={userEmail || ''}
                      disabled
                      helperText="Zmiana adresu e-mail jest zablokowana ze względów bezpieczeństwa."
                      id="settings-email"
                    />
                  </Box>
                </Paper>

                {/* Sekcja 2: Motyw */}
                <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px' }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <DarkModeIcon fontSize="small" color="primary" /> Wygląd
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                        color="primary"
                        inputProps={{ 'aria-label': 'Przełącz tryb ciemny' }}
                      />
                    }
                    label="Tryb ciemny (Dark Mode)"
                  />
                </Paper>

                {/* Sekcja 3: Powiadomienia */}
                <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px' }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <NotificationsIcon fontSize="small" color="primary" /> Centrum powiadomień
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Dostosuj, w jaki sposób aplikacja ma przypominać Ci o nadchodzących terminach.
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={emailNotif}
                          onChange={(e) => setEmailNotif(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Otrzymuj codzienne podsumowanie zadań na e-mail"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={pushNotif}
                          onChange={(e) => setPushNotif(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Włącz powiadomienia Push w przeglądarce"
                    />
                  </Box>
                </Paper>

                {/* Przycisk zapisu */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    sx={{ px: 4, py: 1.5 }}
                    id="settings-save-btn"
                  >
                    Zapisz ustawienia
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </PageTransition>
      </Box>

      {/* Mikrointerakcja - Snackbar sukcesu */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%', borderRadius: '10px' }}
        >
          Ustawienia profilu zostały pomyślnie zaktualizowane!
        </Alert>
      </Snackbar>
    </Box>
  );
}