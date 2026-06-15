import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Box, Button } from '@mui/material';
import { step1Schema, Step1Data } from './schemas';

interface Step1Props {
  defaultValues?: Step1Data;
  onComplete: (data: Step1Data) => void;
  serverError?: string;
}

export const Step1: React.FC<Step1Props> = ({ defaultValues, onComplete, serverError }) => {
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: defaultValues || { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password');

  // Wymóg Lab 7: Wskaźnik siły hasła
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return '';
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score < 2) return 'słabe';
    if (score === 2 || score === 3) return 'średnie';
    return 'silne';
  };

  const strength = getPasswordStrength(passwordValue || '');

  // Wymóg Lab 7: Obsługa błędu serwera 409 powracającego z Kroku 3
  useEffect(() => {
    if (serverError) {
      setError('email', { type: 'server', message: serverError });
    }
  }, [serverError, setError]);

  return (
    <Box component="form" onSubmit={handleSubmit(onComplete)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <TextField
          id="firstName"
          label="Imię"
          required
          fullWidth
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register('firstName')}
        />

        <TextField
          id="lastName"
          label="Nazwisko"
          required
          fullWidth
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register('lastName')}
        />
      </Box>

      <TextField
        id="email"
        label="E-mail"
        type="email"
        required
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <TextField
        id="password"
        label="Hasło"
        type="password"
        required
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message || `Siła hasła: ${strength}`}
        {...register('password')}
      />

      <TextField
        id="confirmPassword"
        label="Potwierdź hasło"
        type="password"
        required
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{ px: 4, py: 1.5, borderRadius: '8px' }}
        >
          Dalej
        </Button>
      </Box>
    </Box>
  );
};