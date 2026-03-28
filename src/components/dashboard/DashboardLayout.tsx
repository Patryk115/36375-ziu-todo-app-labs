import { Box, Toolbar, Typography, Divider } from '@mui/material';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import StatsGrid from './StatsGrid';
import RecentTasks from './RecentTasks';


import { useTodoContext } from '../../context/TodoContext';


import TodoInputTailwind from '../TodoInput.tailwind.tsx';
import TodoListTailwind from '../TodoList.tailwind.tsx';

export default function DashboardLayout() {

  const { state, dispatch } = useTodoContext();


  const handleAdd = (text: string) => dispatch({ type: 'ADD', payload: text });
  const handleToggle = (id: string) => dispatch({ type: 'TOGGLE', payload: id });
  const handleDelete = (id: string) => dispatch({ type: 'DELETE', payload: id });

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <AppHeader />
        <Toolbar />
        
        <StatsGrid />
        <RecentTasks />
        
        <Divider sx={{ my: 4 }} />


        <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Zarządzaj zadaniami (wersja Tailwind CSS)
          </Typography>
          
          <TodoInputTailwind onAdd={handleAdd} />
          
          <TodoListTailwind 
            todos={state.todos} 
            onToggle={handleToggle} 
            onDelete={handleDelete} 
          />
        </Box>

      </Box>
    </Box>
  );
}