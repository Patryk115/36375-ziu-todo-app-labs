import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Card, CardContent, CardActions,
  IconButton, CircularProgress, Alert, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Chip, Skeleton, CardMedia,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProjectContext } from '../../context/ProjectContext';
import { useTodoContext } from '../../context/TodoContext';
import AppHeader from '../dashboard/AppHeader';
import PageTransition from '../ui/PageTransition';
import GlobalSnackbar from '../ui/GlobalSnackbar';

const projectSchema = z.object({
  title: z.string().min(3, 'Nazwa musi mieć co najmniej 3 znaki').max(50, 'Nazwa jest za długa'),
  description: z.string().max(120, 'Opis jest za długi').optional(),
});
type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { state: projectState, addProject, deleteProject } = useProjectContext();
  const { state: todoState } = useTodoContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: 'onBlur',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    await addProject(data.title, data.description || '', imageFile || undefined);
    setIsSubmitting(false);
    setIsDialogOpen(false);
    setImageFile(null);
    setImageName(null);
    reset();
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmId) {
      await deleteProject(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const getProjectTodoCount = (projectId: string) => {
    return todoState.todos.filter((t) => t.projectId === projectId).length;
  };

  const getCompletedCount = (projectId: string) => {
    return todoState.todos.filter((t) => t.projectId === projectId && t.completed).length;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <a href="#main-content" className="skip-link">Przejdź do głównej treści</a>
      <Box component="header">
        <AppHeader />
      </Box>

      <Box component="main" id="main-content" sx={{ flexGrow: 1, py: { xs: 4, md: 6 } }} tabIndex={-1}>
        <PageTransition>
          <Container maxWidth="lg">
            {/* Hero */}
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
              <Box>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
                  Twoje <span style={{ color: '#7C3AED' }}>Projekty</span>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Organizuj zadania w projekty i śledź postępy swojego zespołu.
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsDialogOpen(true)}
                size="large"
                aria-label="Dodaj nowy projekt"
                id="add-project-btn"
              >
                Nowy projekt
              </Button>
            </Box>

            {/* Error state */}
            {projectState.error && (
              <Alert severity="error" sx={{ mb: 4, borderRadius: '10px' }}>
                {projectState.error}
              </Alert>
            )}

            {/* Loading skeletons */}
            {projectState.isLoading && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {[1, 2, 3].map((i) => (
                  <Box key={i} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.33% - 16px)' } }}>
                    <Skeleton variant="rounded" height={220} sx={{ borderRadius: '16px' }} />
                  </Box>
                ))}
              </Box>
            )}

            {/* Projects grid */}
            {!projectState.isLoading && (
              <Box
                component="section"
                aria-label="Lista projektów"
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                  gap: 3 
                }}
              >
                <AnimatePresence>
                  {projectState.projects.map((project) => {
                    const totalTodos = getProjectTodoCount(project.id);
                    const completedTodos = getCompletedCount(project.id);
                    const progress = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

                    return (
                      <Box key={project.id} sx={{ minWidth: 0 }}>
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.25 }}
                          style={{ height: '100%' }}
                        >
                          <Card
                            sx={{
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              borderRadius: '16px',
                              border: '1px solid rgba(255,255,255,0.07)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                borderColor: project.color,
                                boxShadow: `0 4px 24px ${project.color}22`,
                                transform: 'translateY(-2px)',
                              },
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                            role="article"
                            aria-label={`Projekt: ${project.title}`}
                          >
                            {/* Kolorowy pasek na górze karty */}
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
                                alt={`Obrazek projektu ${project.title}`}
                                sx={{ aspectRatio: '16/9', objectFit: 'cover' }}
                              />
                            )}

                            <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                {!project.imageUrl && (
                                  <Box
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: '10px',
                                      bgcolor: `${project.color}22`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                    aria-hidden="true"
                                  >
                                    <FolderOpenIcon sx={{ color: project.color, fontSize: '20px' }} />
                                  </Box>
                                )}
                                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                                  {project.title}
                                </Typography>
                              </Box>

                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '2.5em' }}>
                                {project.description || 'Brak opisu projektu.'}
                              </Typography>

                              {/* Pasek postępu */}
                              <Box sx={{ mb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography variant="caption" color="text.secondary">
                                    Postęp
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: project.color, fontWeight: 600 }}>
                                    {progress}%
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    height: '6px',
                                    borderRadius: '3px',
                                    bgcolor: 'rgba(255,255,255,0.06)',
                                    overflow: 'hidden',
                                  }}
                                  role="progressbar"
                                  aria-valuenow={progress}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-label={`Postęp projektu ${project.title}: ${progress}%`}
                                >
                                  <Box
                                    sx={{
                                      height: '100%',
                                      width: `${progress}%`,
                                      bgcolor: project.color,
                                      borderRadius: '3px',
                                      transition: 'width 0.5s ease',
                                    }}
                                  />
                                </Box>
                              </Box>

                              <Chip
                                label={`${totalTodos} zadań`}
                                size="small"
                                sx={{
                                  mt: 1,
                                  bgcolor: `${project.color}18`,
                                  color: project.color,
                                  fontWeight: 600,
                                  border: `1px solid ${project.color}33`,
                                }}
                              />
                            </CardContent>

                            <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
                              <Button
                                size="small"
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => navigate(`/projects/${project.id}`)}
                                aria-label={`Zobacz zadania projektu ${project.title}`}
                                sx={{ bgcolor: project.color, '&:hover': { bgcolor: project.color, filter: 'brightness(0.85)' } }}
                              >
                                Zobacz zadania
                              </Button>
                              <IconButton
                                size="small"
                                color="default"
                                onClick={() => setDeleteConfirmId(project.id)}
                                aria-label={`Usuń projekt ${project.title}`}
                                sx={{ '&:hover': { color: 'error.main' } }}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </CardActions>
                          </Card>
                        </motion.div>
                      </Box>
                    );
                  })}
                </AnimatePresence>

                {/* Empty state */}
                {projectState.projects.length === 0 && (
                  <Box sx={{ width: '100%' }}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        py: 10,
                        border: '2px dashed',
                        borderColor: 'divider',
                        borderRadius: '16px',
                      }}
                    >
                      <FolderOpenIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        Nie masz jeszcze żadnych projektów
                      </Typography>
                      <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
                        Utwórz swój pierwszy projekt, by organizować zadania
                      </Typography>
                      <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsDialogOpen(true)}>
                        Utwórz projekt
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Container>
        </PageTransition>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, mt: 'auto', borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Produty © 2026 Patryk Kindra | Projekt zaliczeniowy ZIU
          </Typography>
        </Container>
      </Box>

      {/* Dialog dodawania projektu */}
      <Dialog
        open={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); reset(); setImageFile(null); setImageName(null); }}
        maxWidth="sm"
        fullWidth
        aria-labelledby="add-project-dialog-title"
      >
        <DialogTitle id="add-project-dialog-title" sx={{ fontWeight: 700 }}>
          Nowy projekt
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit(handleAddProject)} noValidate>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <TextField
              label="Nazwa projektu *"
              fullWidth
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              inputProps={{ 'aria-describedby': errors.title ? 'title-err' : undefined }}
              autoFocus
            />
            <TextField
              label="Opis projektu"
              fullWidth
              multiline
              rows={3}
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message || 'Opcjonalny krótki opis projektu'}
            />
            <Box>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ py: 1.5, borderStyle: 'dashed' }}
              >
                Dodaj obrazek (opcjonalnie)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </Button>
              {imageName && (
                <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                  Wybrano plik: {imageName}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => { setIsDialogOpen(false); reset(); setImageFile(null); setImageName(null); }} color="inherit">
              Anuluj
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : <AddIcon />}
            >
              {isSubmitting ? 'Tworzenie...' : 'Utwórz projekt'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Dialog potwierdzenia usunięcia */}
      <Dialog
        open={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        maxWidth="xs"
        fullWidth
        aria-labelledby="delete-project-dialog-title"
      >
        <DialogTitle id="delete-project-dialog-title" sx={{ fontWeight: 700 }}>
          Usuń projekt
        </DialogTitle>
        <DialogContent>
          <Typography>Czy na pewno chcesz usunąć ten projekt? Tej akcji nie można cofnąć.</Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDeleteConfirmId(null)} color="inherit">Anuluj</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">Usuń trwale</Button>
        </DialogActions>
      </Dialog>

      <GlobalSnackbar />
    </Box>
  );
}
