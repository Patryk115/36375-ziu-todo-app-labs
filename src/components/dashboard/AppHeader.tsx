import { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Avatar,
  Menu, MenuItem, ListItemIcon, ListItemText, Divider, Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AppHeaderProps {
  handleDrawerToggle?: () => void;
}

export default function AppHeader({ handleDrawerToggle }: AppHeaderProps) {
  const { user, userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const firstName = user?.firstName || 'Jan';
  const lastName = user?.lastName || 'Kowalski';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const fullName = `${firstName} ${lastName}`;

  return (
    <AppBar
      position="sticky"
      component="nav"
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 0.5 }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}
          aria-label="Strona główna Produty"
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <Typography sx={{ color: 'white', fontWeight: 900, fontSize: '1rem' }}>P</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1 }}>
            ToDo List
          </Typography>
        </Box>

        {/* Desktop nawigacja (jak na Figmie) */}
        <Box
          component="ul"
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 0.5,
            listStyle: 'none',
            m: 0,
            p: 0,
          }}
          role="menubar"
          aria-label="Nawigacja główna"
        >
          {[
            { label: 'Dashboard', path: '/' },
            { label: 'Projekty', path: '/projects' },
            { label: 'Zadania', path: '/tasks' },
          ].map(({ label, path }) => {
            const isActive =
              path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(path);

            return (
              <Box component="li" key={label} role="none">
                <Button
                  component={Link}
                  to={path}
                  role="menuitem"
                  sx={{
                    color: isActive ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.9rem',
                    px: 2,
                    borderRadius: '8px',
                    '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                    position: 'relative',
                    '&::after': isActive
                      ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 4,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '20px',
                          height: '2px',
                          bgcolor: 'primary.main',
                          borderRadius: '1px',
                        }
                      : {},
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Button>
              </Box>
            );
          })}
        </Box>

        {/* Prawa strona: imię + avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {fullName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {userEmail}
            </Typography>
          </Box>

          {/* Klikalny Avatar */}
          <IconButton
            onClick={handleAvatarClick}
            size="small"
            aria-controls={openMenu ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            aria-label="Menu profilu użytkownika"
            id="profile-avatar-btn"
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 'bold',
                width: 40,
                height: 40,
                border: '2px solid rgba(124, 58, 237, 0.3)',
                fontSize: '0.875rem',
              }}
            >
              {initials}
            </Avatar>
          </IconButton>

          {/* Rozwijane menu profilu */}
          <Menu
            anchorEl={anchorEl}
            id="profile-menu"
            open={openMenu}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                minWidth: 200,
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => navigate('/profile')}>
              <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Profil" />
            </MenuItem>

            <MenuItem onClick={() => navigate('/settings')}>
              <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Ustawienia" />
            </MenuItem>

            <Divider sx={{ my: '4px !important' }} />

            <MenuItem onClick={logout} sx={{ color: 'error.main' }}>
              <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
              <ListItemText primary="Wyloguj się" />
            </MenuItem>
          </Menu>

          {/* Hamburger (mobile) */}
          <IconButton
            color="inherit"
            aria-label="Otwórz nawigację mobilną"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
            id="mobile-menu-btn"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}