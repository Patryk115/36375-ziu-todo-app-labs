import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PriorityType } from '../types/todo.types';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const addTodoSchema = z.object({
  title: z
    .string()
    .min(3, 'Treść zadania musi mieć co najmniej 3 znaki')
    .max(200, 'Treść zadania jest za długa (max 200 znaków)'),
  priority: z.enum(['low', 'medium', 'high']),
});

type AddTodoFormData = z.infer<typeof addTodoSchema>;

interface AddTodoFormProps {
  onAdd: (text: string, priority: PriorityType) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddTodoFormData>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: { title: '', priority: 'medium' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: AddTodoFormData) => {
    onAdd(data.title.trim(), data.priority as PriorityType);
    reset();
  };

  return (
    <Box sx={{ p: 1 }} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <TextField
          fullWidth
          label="Treść zadania"
          placeholder="np. Przygotować raport do Lab 4..."
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          inputProps={{
            'aria-label': 'Wpisz treść nowego zadania',
            'aria-describedby': errors.title ? 'todo-title-error' : undefined,
            'aria-invalid': !!errors.title,
          }}
          autoFocus
          id="todo-title-input"
        />

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
          <FormControl size="small" sx={{ minWidth: 150 }} error={!!errors.priority}>
            <InputLabel id="priority-select-label">Priorytet</InputLabel>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="priority-select-label"
                  label="Priorytet"
                  inputProps={{ 'aria-label': 'Wybierz priorytet zadania' }}
                  id="priority-select"
                >
                  <MenuItem value="low">Niski</MenuItem>
                  <MenuItem value="medium">Średni</MenuItem>
                  <MenuItem value="high">Wysoki</MenuItem>
                </Select>
              )}
            />
            {errors.priority && (
              <FormHelperText>{errors.priority.message}</FormHelperText>
            )}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            aria-label="Dodaj zadanie do listy"
            sx={{ flexGrow: 1, py: 1 }}
            id="add-todo-submit-btn"
          >
            Dodaj Zadanie
          </Button>
        </Box>
      </Box>
    </Box>
  );
}