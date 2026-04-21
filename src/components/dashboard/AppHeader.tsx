import { AppBar, Toolbar, Typography, IconButton, Box, Button, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

interface AppHeaderProps {
  handleDrawerToggle?: () => void; // zrobione opcjonalne dla bezpieczeństwa
}

export default function AppHeader({ handleDrawerToggle }: AppHeaderProps) {
  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        
        {/* LOGO (Klikalne, wraca na stronę główną) */}
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mr: 6, color: 'primary.main', lineHeight: 1.2 }}>
            TaskFlow<br/>
            <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.primary', fontWeight: 600 }}>
              ToDo List
            </Typography>
          </Typography>
        </Box>

        {/* PRAWA STRONA: Rejestracja i Użytkownik */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Przycisk Rejestracji na głównej */}
          <Button 
            component={Link} 
            to="/register" 
            variant="contained" 
            color="primary"
            sx={{ fontWeight: 600, borderRadius: 2, textTransform: 'none', display: { xs: 'none', sm: 'block' } }}
          >
            Zarejestruj się
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.dark', color: 'white', fontWeight: 'bold' }}>JK</Avatar>
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>

      </Toolbar>
    </AppBar>
  );
}