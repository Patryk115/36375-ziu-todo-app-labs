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

// Odbieramy propsy
interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function Sidebar({ mobileOpen, handleDrawerToggle }: SidebarProps) {
  
  // Zewnętrzny komponent wnętrza sidebara, by nie kopiować kodu
  const drawerContent = (
    <>
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
    </>
  );

  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      
      {/* 1. Wersja mobilna (temporary) - znika od "md" wzwyż */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Lepsza wydajność na mobile
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: 'primary.main', color: 'white' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 2. Wersja desktopowa (permanent) - ukryta na małych ekranach */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, bgcolor: 'primary.main', color: 'white' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}