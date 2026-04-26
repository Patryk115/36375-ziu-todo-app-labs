import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FilterType } from '../types/todo.types';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <Box sx={{ mb: 3 }} aria-label="Filtrowanie zadań">
      <ToggleButtonGroup
        color="primary"
        value={activeFilter}
        exclusive
        onChange={(_, newValue) => {
          if (newValue !== null) onFilterChange(newValue);
        }}
        aria-label="Wybierz filtr zadań"
        size="small"
      >
        <ToggleButton value="all" aria-label="Wszystkie zadania">Wszystkie</ToggleButton>
        <ToggleButton value="active" aria-label="Aktywne zadania">Aktywne</ToggleButton>
        <ToggleButton value="completed" aria-label="Zakończone zadania">Zakończone</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};