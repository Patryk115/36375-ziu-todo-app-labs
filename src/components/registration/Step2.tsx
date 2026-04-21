import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, Step2Data } from './schemas';

interface Step2Props {
  defaultValues?: Step2Data;
  onComplete: (data: Step2Data) => void;
  onBack: () => void;
}

export const Step2: React.FC<Step2Props> = ({ defaultValues, onComplete, onBack }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: 'onBlur',
    defaultValues: defaultValues || {
      categories: [{ value: '' }],
      notifications: { email: true, push: false },
      newsletter: false
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  return (
    <form onSubmit={handleSubmit(onComplete)} className="flex flex-col gap-6" noValidate>
      <fieldset className="border border-slate-700 p-4 rounded-lg">
        <legend className="text-lg font-semibold text-white px-2">Zainteresowania (Kategorie)</legend>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 items-center mt-4">
            <div className="flex-grow flex flex-col gap-1">
              <label htmlFor={`cat-${index}`} className="sr-only">Kategoria {index + 1}</label>
              <input
                id={`cat-${index}`}
                aria-invalid={!!errors.categories?.[index]?.value}
                className="bg-slate-800 border border-slate-700 text-white p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Napisz co Cię interesuje..."
                {...register(`categories.${index}.value` as const)}
              />
              {errors.categories?.[index]?.value && (
                <span role="alert" className="text-red-400 text-sm">{errors.categories[index]?.value?.message}</span>
              )}
            </div>
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(index)} className="text-red-400 hover:text-red-300 font-semibold px-4" aria-label={`Usuń kategorię ${index + 1}`}>
                Usuń
              </button>
            )}
          </div>
        ))}
        {errors.categories && !Array.isArray(errors.categories) && (
             <span role="alert" className="text-red-400 text-sm mt-2 block">{errors.categories.message}</span>
        )}
        <button type="button" onClick={() => append({ value: '' })} className="mt-4 text-blue-400 font-semibold hover:text-blue-300 text-sm">
          + Dodaj kolejną kategorię
        </button>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border border-slate-700 p-4 rounded-lg">
        <legend className="text-lg font-semibold text-white px-2">Powiadomienia</legend>
        
        <div className="flex items-center gap-3">
          <Controller
            name="notifications.email"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="notif-email"
                aria-label="Powiadomienia e-mail"
                className="w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-blue-500"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <label htmlFor="notif-email" className="text-gray-200">Otrzymuj przypomnienia na e-mail</label>
        </div>

        <div className="flex items-center gap-3">
          <Controller
            name="notifications.push"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="notif-push"
                className="w-5 h-5 accent-blue-600 focus:ring-2 focus:ring-blue-500"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <label htmlFor="notif-push" className="text-gray-200">Powiadomienia Push w przeglądarce</label>
        </div>
      </fieldset>

      <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg">
        <input type="checkbox" id="newsletter" className="w-5 h-5 accent-blue-600" {...register('newsletter')} />
        <label htmlFor="newsletter" className="text-gray-200">Zapisz się do opcjonalnego newslettera</label>
      </div>

      <div className="mt-4 flex justify-between">
        <button type="button" onClick={onBack} className="text-gray-400 hover:text-white font-semibold py-3 px-8 transition-colors">
          Wstecz
        </button>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 outline-none">
          Dalej
        </button>
      </div>
    </form>
  );
};