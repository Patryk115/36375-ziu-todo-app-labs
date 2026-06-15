import { useMemo } from 'react';
import { Box } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import StatsCard from './StatsCard';
import { Todo } from '../../types/todo.types';

interface StatsGridProps {
  todos: Todo[];
}

export default function StatsGrid({ todos }: StatsGridProps) {
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length;

    return { total, completed, active, highPriority };
  }, [todos]);

  return (
    <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, 
        gap: 3 
    }}>
      <StatsCard
        title="Wszystkie"
        value={stats.total}
        icon={FormatListBulletedIcon}
        color="#F9FAFB"
        bgColor="rgba(255,255,255,0.05)"
      />
      <StatsCard
        title="Ukończone"
        value={stats.completed}
        icon={CheckCircleOutlineIcon}
        color="#10B981"
        bgColor="rgba(16, 185, 129, 0.1)"
      />
      <StatsCard
        title="W toku"
        value={stats.active}
        icon={HourglassEmptyIcon}
        color="#F59E0B"
        bgColor="rgba(245, 158, 11, 0.1)"
      />
      <StatsCard
        title="Wysoki priorytet"
        value={stats.highPriority}
        icon={ErrorOutlineIcon}
        color="#EF4444"
        bgColor="rgba(239, 68, 68, 0.1)"
      />
    </Box>
  );
}