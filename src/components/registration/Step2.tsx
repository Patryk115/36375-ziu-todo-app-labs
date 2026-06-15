import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Button, TextField, IconButton, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
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
    <Box component="form" onSubmit={handleSubmit(onComplete)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Zainteresowania (Kategorie)</Typography>
        
        {fields.map((field, index) => (
          <Box key={field.id} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
            <TextField
              label={`Kategoria ${index + 1}`}
              fullWidth
              placeholder="Napisz co Cię interesuje..."
              error={!!errors.categories?.[index]?.value}
              helperText={errors.categories?.[index]?.value?.message}
              {...register(`categories.${index}.value` as const)}
            />
            {fields.length > 1 && (
              <IconButton 
                color="error" 
                onClick={() => remove(index)} 
                aria-label={`Usuń kategorię ${index + 1}`}
                sx={{ mt: 1 }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </Box>
        ))}
        {errors.categories && !Array.isArray(errors.categories) && (
          <Typography color="error" variant="caption" sx={{ display: 'block', mb: 2 }}>
            {errors.categories.message}
          </Typography>
        )}
        <Button 
          startIcon={<AddIcon />} 
          onClick={() => append({ value: '' })}
          sx={{ mt: 1 }}
        >
          Dodaj kolejną kategorię
        </Button>
      </Box>

      <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Powiadomienia</Typography>
        <FormGroup>
          <Controller
            name="notifications.email"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} onChange={field.onChange} />}
                label="Otrzymuj przypomnienia na e-mail"
              />
            )}
          />
          <Controller
            name="notifications.push"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} onChange={field.onChange} />}
                label="Powiadomienia Push w przeglądarce"
              />
            )}
          />
        </FormGroup>
      </Box>

      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
        <FormControlLabel
          control={<Checkbox {...register('newsletter')} />}
          label="Zapisz się do opcjonalnego newslettera"
        />
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="text" 
          onClick={onBack}
          sx={{ color: 'text.secondary', px: 3 }}
        >
          Wstecz
        </Button>
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