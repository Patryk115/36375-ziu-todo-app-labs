import { Box } from '@mui/material'; // Zmieniamy import z Grid na Box
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StatsCard from './StatsCard';
import { useTodoContext } from '../../context/TodoContext';

export default function StatsGrid() {
  const { state } = useTodoContext(); 
  
  const todos = state?.todos || [];

  const total = todos.length;
  const completed = todos.filter((todo: any) => todo.completed).length;
  const pending = total - completed;

  return (
    // Używamy CSS Grid i clamp() dla odstępów - pełna responsywność bez breakpointów
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: 'clamp(1rem, 2vw, 1.5rem)',
      mb: 3
    }}>
      <StatsCard 
        title='Wszystkie zadania' 
        value={total} 
        icon={FormatListBulletedIcon} 
        color='#1565C0' 
        bgColor='#E3F2FD' 
      />
      <StatsCard 
        title='Ukończone' 
        value={completed} 
        icon={CheckCircleIcon} 
        color='#2E7D32' 
        bgColor='#E8F5E9' 
      />
      <StatsCard 
        title='Oczekujące' 
        value={pending} 
        icon={RadioButtonUncheckedIcon} 
        color='#E65100' 
        bgColor='#FFF3E0' 
      />
    </Box>
  );
}