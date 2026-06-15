import { Box, Card, CardContent, Typography, Button, CardMedia, IconButton } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useProjectContext } from '../../context/ProjectContext';

export default function ProjectCards() {
  const { state } = useProjectContext();
  const navigate = useNavigate();

  // Ogranicz do maksymalnie 6 projektów na dashboardzie (najnowszych)
  const displayProjects = [...state.projects]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth; // Scroll by the width of the container
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      {/* Nagłówek sekcji z przyciskami nawigacji */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
          Twoje projekty
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {displayProjects.length > 3 && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <IconButton 
                size="small"
                onClick={() => scroll('left')}
                sx={{ bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small"
                onClick={() => scroll('right')}
                sx={{ bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          <Button
            variant="text"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/projects')}
            size="small"
            aria-label="Zobacz wszystkie projekty"
          >
            Zobacz wszystkie
          </Button>
        </Box>
      </Box>

      <Box 
        ref={scrollRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          gap: 3,
          pb: 2,
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari
          width: '100%',
        }}
      >
      {displayProjects.map((project) => (
        <Card 
          key={project.id} 
          sx={{ 
            bgcolor: 'background.paper', 
            display: 'flex', 
            flexDirection: 'column',
            flex: { xs: '0 0 85%', sm: '0 0 calc(50% - 12px)', md: '0 0 calc(33.333% - 16px)' },
            scrollSnapAlign: 'start',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {!project.imageUrl && (
            <Box
              sx={{
                height: '4px',
                bgcolor: project.color,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }}
              aria-hidden="true"
            />
          )}

          {project.imageUrl && (
            <CardMedia
              component="img"
              image={project.imageUrl}
              alt={project.title}
              sx={{ aspectRatio: '16/9', objectFit: 'cover' }}
            />
          )}
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              {!project.imageUrl && (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    bgcolor: `${project.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <FolderOpenIcon sx={{ color: project.color, fontSize: '18px' }} />
                </Box>
              )}
              <Typography variant="h6" fontWeight="700">{project.title}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {project.description || 'Brak opisu'}
            </Typography>
            <Button 
              variant="contained" 
              fullWidth
              onClick={() => navigate(`/projects/${project.id}`)}
              sx={{ bgcolor: project.color, '&:hover': { bgcolor: project.color, filter: 'brightness(0.9)' } }}
            >
              Zobacz projekt
            </Button>
          </CardContent>
        </Card>
      ))}
      </Box>
    </Box>
  );
}