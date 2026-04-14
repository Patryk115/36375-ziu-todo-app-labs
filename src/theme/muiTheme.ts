import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    mode: 'dark', // KLUCZOWA ZMIANA: Wymuszamy ciemny motyw
    primary: {
      main: '#3B82F6', // Niebieski akcent z Twojej Figmy
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#161622', // Główne tło aplikacji (ciemny granat/szary)
      paper: '#1F1F2E',   // Tło dla kart i sidebara
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#9CA3AF', // Szary tekst pomocniczy
    },
  },
  typography: {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  // DODANE h3 dla nagłówka Hero z Figmy
  h3: { fontWeight: 800, fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 1.2 }, 
  h4: { fontWeight: 700, letterSpacing: '-0.02em', fontSize: 'clamp(1.5rem, 4vw, 2.125rem)' },
  h5: { fontWeight: 600, fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' },
  h6: { fontWeight: 600, fontSize: 'clamp(1.125rem, 2vw, 1.25rem)' },
  button: { textTransform: 'none', fontWeight: 600 },
},
  shape: { borderRadius: 16 }, // Zaokrąglenia bardziej pasujące do nowoczesnego UI
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1F1F2E', // Tło Sidebara
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1F1F2E', // Tło nagłówka
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, paddingLeft: 20, paddingRight: 20 },
      },
    },
  },
});

export default muiTheme;