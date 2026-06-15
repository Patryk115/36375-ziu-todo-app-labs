import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: number;
  icon: SvgIconComponent;
  color: string;
  bgColor: string;
}

export default function StatsCard({ title, value, icon: Icon, color, bgColor }: StatsCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              {title}
            </Typography>
            <Typography variant='h4' fontWeight={700}>
              {value}
            </Typography>
          </Box>
          <Avatar 
            sx={{ 
              bgcolor: bgColor, 
              color, 
              width: 48, 
              // Ustawienie wysokości na auto pozwala właściwości aspect-ratio
              // na poprawne zdefiniowanie proporcji elementu.
              height: 'auto', 
              aspectRatio: '1 / 1', 
              // objectFit zapewnia, że zawartość nie zostanie zniekształcona
              objectFit: 'cover' 
            }}
          >
            <Icon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}