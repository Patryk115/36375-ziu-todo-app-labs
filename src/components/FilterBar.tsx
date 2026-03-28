import { FilterType } from '../types/todo.types';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <button 
        onClick={() => onFilterChange('all')}
        style={{ fontWeight: activeFilter === 'all' ? 'bold' : 'normal' }}
      >
        Wszystkie
      </button>
      <button 
        onClick={() => onFilterChange('active')}
        style={{ fontWeight: activeFilter === 'active' ? 'bold' : 'normal' }}
      >
        Aktywne
      </button>
      <button 
        onClick={() => onFilterChange('completed')}
        style={{ fontWeight: activeFilter === 'completed' ? 'bold' : 'normal' }}
      >
        Zakończone
      </button>
    </div>
  );
};