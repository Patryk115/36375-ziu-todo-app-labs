import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NotificationsIcon from '@mui/icons-material/Notifications';

const DRAWER_WIDTH = 240;

export default function AppHeader() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Dashboard
        </Typography>
        
        <IconButton color="inherit">
          <Brightness4Icon />
        </IconButton>
        
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}