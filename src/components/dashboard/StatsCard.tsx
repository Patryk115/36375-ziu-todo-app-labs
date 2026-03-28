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
    <Card>
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
          <Avatar sx={{ bgcolor: bgColor, color, width: 48, height: 48 }}>
            <Icon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}