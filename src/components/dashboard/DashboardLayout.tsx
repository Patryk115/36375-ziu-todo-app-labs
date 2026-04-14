import { useState } from 'react';
import { Box, Typography, Button, Container, Drawer, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import AppHeader from './AppHeader';
import ProjectCards from './ProjectCards';

export default function DashboardLayout() {
  // LAB 6: Zarządzanie stanem menu mobilnego (Hamburger Menu) [cite: 51-56]
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Nawigacja górna (Top Bar) z Figmy [cite: 468-469] */}
      <AppHeader handleDrawerToggle={handleDrawerToggle} />

      {/* LAB 6: Zwijana nawigacja mobilna (Collapsible navigation) [cite: 50-78] */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: 'background.paper' },
        }}
      >
        <List sx={{ pt: 2 }}>
          <ListItemButton onClick={handleDrawerToggle}><ListItemText primary="Dashboard" /></ListItemButton>
          <ListItemButton onClick={handleDrawerToggle}><ListItemText primary="Projekty" /></ListItemButton>
          <ListItemButton onClick={handleDrawerToggle}><ListItemText primary="Zadania" /></ListItemButton>
        </List>
      </Drawer>

      {/* Główna zawartość strony (Main Content) */}
      <Box component="main" sx={{ flexGrow: 1, py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          
          {/* Sekcja Hero z Figmy [cite: 470-471, 504-505] */}
          <Box sx={{ mb: 8, maxWidth: '800px' }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
              Zarządzaj swoimi zadaniami jak profesjonalista
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
              Nasza aplikacja ToDo pomoże Ci zorganizować każdy dzień, śledzić postępy i zwiększyć produktywność całego zespołu.
            </Typography>
            <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, borderRadius: '8px' }}>
              Rozpocznij teraz
            </Button>
          </Box>

          {/* Sekcja projektów - responsywna siatka kart [cite: 472-480] */}
          <ProjectCards />

        </Container>
      </Box>

      {/* Stopka (Footer) z Figmy [cite: 477, 483, 516-517] */}
      <Box component="footer" sx={{ 
        py: 4, 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        bgcolor: 'background.paper' 
      }}>
        <Container maxWidth="lg" sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            Regulamin | Polityka prywatności
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Wersja: 1.0.0
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}