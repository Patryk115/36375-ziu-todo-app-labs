// src/main.tsx
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { createAppTheme } from './theme/muiTheme';
import { TodoProvider } from './context/TodoContext';
import { ThemeContextProvider, useThemeContext } from './context/ThemeContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

/**
 * Wewnętrzny komponent, który odczytuje tryb z ThemeContext
 * i podaje odpowiedni motyw MUI.
 */
function ThemedApp() {
  const { mode } = useThemeContext();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/produty-todo-app">
      <ThemeContextProvider>
        <ThemedApp />
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);