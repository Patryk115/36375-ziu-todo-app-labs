import { AppBar, Toolbar, Typography, IconButton, Box, Button, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface AppHeaderProps {
  handleDrawerToggle: () => void;
}

export default function AppHeader({ handleDrawerToggle }: AppHeaderProps) {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'background.paper', 
        color: 'text.primary', 
        boxShadow: 'none', 
        borderBottom: '1px solid rgba(255,255,255,0.05)' 
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Lewa strona: Logo + Linki Desktop */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mr: 6, color: 'primary.main', lineHeight: 1.2 }}>
            TaskFlow<br/>
            <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.primary', fontWeight: 600 }}>
              ToDo List
            </Typography>
          </Typography>

          {/* Linki widoczne tylko od breakpointa md (desktop) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            <Button color="inherit" sx={{ fontWeight: 600, opacity: 0.7 }}>Dashboard</Button>
            <Button color="inherit" sx={{ fontWeight: 600 }}>Projekty</Button>
            <Button color="inherit" sx={{ fontWeight: 600, opacity: 0.7 }}>Zadania</Button>
          </Box>
        </Box>

        {/* Prawa strona: Użytkownik + Hamburger Menu (Mobile) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Jan Kowalski</Typography>
          </Box>
          <Avatar sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>JK</Avatar>
          
          {/* Hamburger widoczny tylko na mobile */}
          <IconButton 
            color="inherit" 
            onClick={handleDrawerToggle} 
            sx={{ display: { md: 'none' }, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}