// src/theme/muiTheme.ts
import { createTheme, PaletteMode } from '@mui/material/styles';

export const createAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#7C3AED',
        light: '#A78BFA',
        dark: '#5B21B6',
      },
      ...(mode === 'dark'
        ? {
            background: {
              default: '#0A0B10',
              paper: '#111319',
            },
            text: {
              primary: '#F9FAFB',
              secondary: '#9CA3AF',
            },
            divider: 'rgba(255, 255, 255, 0.06)',
            action: {
              hover: 'rgba(124, 58, 237, 0.08)',
            },
          }
        : {
            background: {
              default: '#F3F4F6',
              paper: '#FFFFFF',
            },
            text: {
              primary: '#111827',
              secondary: '#6B7280',
            },
            divider: 'rgba(0, 0, 0, 0.08)',
            action: {
              hover: 'rgba(124, 58, 237, 0.06)',
            },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            padding: '10px 24px',
          },
          containedPrimary: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(124, 58, 237, 0.3)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            ...(mode === 'dark' && {
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }),
          },
          elevation1: {
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

// Eksport domyślnego motywu dla kompatybilności
export const muiTheme = createAppTheme('dark');