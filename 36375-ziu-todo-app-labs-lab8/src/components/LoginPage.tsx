import { Box, Container, Button, Typography, Paper, TextField, CircularProgress, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('Podaj poprawny adres e-mail'),
  password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      await login(data.email);
      navigate('/');
    } catch (error) {
      setServerError('Nieprawidłowe dane logowania. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, borderRadius: '24px', textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
              Produty.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Zaloguj się, aby kontynuować pracę.
            </Typography>
          </Box>

          {serverError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '10px', textAlign: 'left' }} role="alert">
              {serverError}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              label="Adres E-mail"
              type="email"
              variant="outlined"
              fullWidth
              disabled={isLoading}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              inputProps={{
                'aria-describedby': errors.email ? 'email-error' : undefined,
                'aria-invalid': !!errors.email,
              }}
              id="login-email"
            />
            <TextField
              label="Hasło"
              type="password"
              variant="outlined"
              fullWidth
              disabled={isLoading}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              inputProps={{
                'aria-describedby': errors.password ? 'password-error' : undefined,
                'aria-invalid': !!errors.password,
              }}
              id="login-password"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              startIcon={
                isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />
              }
              sx={{ mt: 2, py: 1.5, borderRadius: '8px' }}
              id="login-submit-btn"
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            Nie masz jeszcze konta?{' '}
            <Typography
              component={Link}
              to="/register"
              color="primary"
              sx={{ textDecoration: 'none', fontWeight: 600 }}
            >
              Zarejestruj się
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}