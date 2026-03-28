import { 
  Drawer, List, ListItemButton, ListItemIcon, ListItemText, 
  Toolbar, Typography, Divider, Avatar, Box 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';

const DRAWER_WIDTH = 240;

const navItems = [
  { label: 'Dashboard', icon: DashboardIcon, path: '/' },
  { label: 'Zadania', icon: TaskIcon, path: '/todos' },
  { label: 'Ustawienia', icon: SettingsIcon, path: '/settings' },
];

export default function Sidebar() {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: DRAWER_WIDTH,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: 'primary.main',
          color: 'white',
        },
      }}
    >
      <Toolbar>
        <Typography variant='h6' fontWeight={700}>TodoApp</Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <List>
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <ListItemButton key={index}>
              <ListItemIcon sx={{ color: 'white' }}>
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.dark' }}>U</Avatar>
        <Typography variant='body2'>Użytkownik</Typography>
      </Box>
    </Drawer>
  );
}