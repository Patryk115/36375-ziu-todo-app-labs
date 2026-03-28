import { Grid } from '@mui/material';
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
    <Grid container spacing={3}>
      {/* Usunęliśmy 'item' i przenieśliśmy xs i sm do obiektu 'size' */}
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatsCard 
          title='Wszystkie zadania' 
          value={total} 
          icon={FormatListBulletedIcon} 
          color='#1565C0' 
          bgColor='#E3F2FD' 
        />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatsCard 
          title='Ukończone' 
          value={completed} 
          icon={CheckCircleIcon} 
          color='#2E7D32' 
          bgColor='#E8F5E9' 
        />
      </Grid>
      
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatsCard 
          title='Oczekujące' 
          value={pending} 
          icon={RadioButtonUncheckedIcon} 
          color='#E65100' 
          bgColor='#FFF3E0' 
        />
      </Grid>
    </Grid>
  );
}