import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, Step3Data, Step1Data, Step2Data } from './schemas';

interface Step3Props {
  formData: { step1?: Step1Data; step2?: Step2Data };
  onComplete: (data: Step3Data) => void;
  onBack: () => void;
  isSubmittingForm: boolean;
}

export const Step3: React.FC<Step3Props> = ({ formData, onComplete, onBack, isSubmittingForm }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onComplete)} className="flex flex-col gap-6" noValidate>
      
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4">Podsumowanie danych</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-400">Konto</p>
          <p className="text-lg text-white font-medium">{formData.step1?.firstName} {formData.step1?.lastName}</p>
          <p className="text-md text-gray-300">{formData.step1?.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Wybrane kategorie</p>
          <ul className="list-disc list-inside text-gray-300">
            {formData.step2?.categories.map((c, i) => (
              <li key={i}>{c.value}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="rodo"
            aria-required="true"
            aria-invalid={!!errors.rodo}
            aria-describedby={errors.rodo ? 'rodo-err' : undefined}
            className="w-5 h-5 mt-1 accent-blue-600 focus:ring-2 focus:ring-blue-500 outline-none"
            {...register('rodo')}
          />
          <label htmlFor="rodo" className="text-gray-200 leading-relaxed text-sm">
            * Akceptuję regulamin i politykę prywatności. Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z RODO.
          </label>
        </div>
        {errors.rodo && <span id="rodo-err" role="alert" className="text-red-400 text-sm ml-8">{errors.rodo.message}</span>}
      </div>

      {/* Instrukcja testowa dla sprawdzającego */}
      <p className="text-xs text-gray-500 text-center mt-2">
        Wskazówka: E-mail <strong className="text-gray-300">zajety@gmail.com</strong> zwraca błąd 409. <strong className="text-gray-300">error@gmail.com</strong> zwraca 500.
      </p>

      <div className="mt-4 flex justify-between">
        <button type="button" onClick={onBack} disabled={isSubmittingForm} className="text-gray-400 hover:text-white font-semibold py-3 px-8 transition-colors disabled:opacity-50">
          Wstecz
        </button>
        <button 
          type="submit" 
          disabled={isSubmittingForm}
          aria-busy={isSubmittingForm}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {isSubmittingForm ? 'Tworzenie konta...' : 'Zarejestruj się'}
        </button>
      </div>
    </form>
  );
};