import { Box, Container, Button, Typography, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import MultiStepForm from './registration/MultiStepForm';

export function RegisterPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        
        <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/')}
            variant="text"
            color="primary"
          >
            Wróć do Dashboardu
          </Button>
          <Paper variant="outlined" sx={{ px: 2, py: 0.5, borderColor: 'primary.dark' }}>
             <Typography variant="body2" color="primary.light">Onboarding Nowego Projektu</Typography>
          </Paper>
        </Box>

        <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, 
            gap: 5 
        }}>
          <Box sx={{ position: 'sticky', top: 40, height: 'fit-content' }}>
              <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, color: 'text.primary', lineHeight: 1.1 }}>
                  Zacznij nowy projekt w 3 minuty.
              </Typography>
              <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 4, fontWeight: 400, opacity: 0.8 }}>
                  Dokończ konfigurację, aby stworzyć spersonalizowane środowisko pracy dla siebie i swojego zespołu.
              </Typography>
          </Box>
          
          <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
            <MultiStepForm />
          </Paper>
        </Box>

      </Container>
    </Box>
  );
}