import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  timelineItemClasses,
} from '@mui/lab';
import { useTodoContext } from '../../context/TodoContext';

export default function RecentTasks() {
  const { state } = useTodoContext();
  const todos = state?.todos || [];

  const recentTodos = [...todos]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Ostatnio dodane zadania
        </Typography>
        
        {recentTodos.length === 0 ? (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Brak zadań do wyświetlenia.
          </Typography>
        ) : (
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {recentTodos.map((todo, index) => (
              <TimelineItem key={todo.id}>
                <TimelineSeparator>
                  <TimelineDot color={todo.completed ? 'success' : 'primary'} />
                  {index < recentTodos.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                
                <TimelineContent>
                  <Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'text.secondary' : 'text.primary'
                      }}
                    >
                      {todo.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(todo.createdAt).toLocaleString('pl-PL', { 
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                      })}
                    </Typography>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </CardContent>
    </Card>
  );
}