import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
    <form onSubmit={handleSubmit(onComplete)} className="flex flex-col gap-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-semibold text-gray-200">Imię *</label>
          <input
            id="firstName"
            type="text"
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-err' : undefined}
            className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            {...register('firstName')}
          />
          {errors.firstName && <span id="firstName-err" role="alert" className="text-red-400 text-sm">{errors.firstName.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-semibold text-gray-200">Nazwisko *</label>
          <input
            id="lastName"
            type="text"
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-err' : undefined}
            className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            {...register('lastName')}
          />
          {errors.lastName && <span id="lastName-err" role="alert" className="text-red-400 text-sm">{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-gray-200">E-mail *</label>
        <input
          id="email"
          type="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
          className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          {...register('email')}
        />
        {errors.email && <span id="email-err" role="alert" className="text-red-400 text-sm">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-semibold text-gray-200">Hasło *</label>
        <input
          id="password"
          type="password"
          aria-required="true"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'pwd-err' : 'pwd-hint'}
          className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          {...register('password')}
        />
        <div className="flex justify-between items-center mt-1">
          <span id="pwd-hint" aria-live="polite" className={`text-sm font-medium ${strength === 'słabe' ? 'text-red-400' : strength === 'średnie' ? 'text-yellow-400' : 'text-green-400'}`}>
            {strength && `Siła hasła: ${strength}`}
          </span>
        </div>
        {errors.password && <span id="pwd-err" role="alert" className="text-red-400 text-sm">{errors.password.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-200">Potwierdź hasło *</label>
        <input
          id="confirmPassword"
          type="password"
          aria-required="true"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirm-pwd-err' : undefined}
          className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <span id="confirm-pwd-err" role="alert" className="text-red-400 text-sm">{errors.confirmPassword.message}</span>}
      </div>

      <div className="mt-4 flex justify-end">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 outline-none">
          Dalej
        </button>
      </div>
    </form>
  );
};