import { useState } from 'react';
import {
  Box, Typography, Button, DialogActions, DialogContent,
  FormControl, InputLabel, Select, MenuItem, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Checkbox,
  Alert, Paper
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useTodoContext } from '../context/TodoContext';
import { useProjectContext } from '../context/ProjectContext';

interface AssignTasksModalProps {
  onClose: () => void;
}

export default function AssignTasksModal({ onClose }: AssignTasksModalProps) {
  const { state: todoState, assignToProject } = useTodoContext();
  const { state: projectState } = useProjectContext();
  
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTasks = todoState.todos.filter(t => !t.completed); // Można przypisywać tylko aktywne zadania, albo wszystkie? Dajmy aktywne.

  const handleToggle = (id: string) => {
    const currentIndex = selectedTaskIds.indexOf(id);
    const newChecked = [...selectedTaskIds];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedTaskIds(newChecked);
  };

  const handleSave = async () => {
    if (!selectedProjectId || selectedTaskIds.length === 0) return;
    
    setIsSubmitting(true);
    await assignToProject(selectedTaskIds, selectedProjectId);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Box>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
        {projectState.projects.length === 0 ? (
          <Alert severity="warning">Nie masz jeszcze żadnych projektów. Najpierw utwórz projekt w zakładce "Projekty".</Alert>
        ) : (
          <>
            <FormControl fullWidth>
              <InputLabel id="select-project-label">Wybierz projekt</InputLabel>
              <Select
                labelId="select-project-label"
                value={selectedProjectId}
                label="Wybierz projekt"
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                {projectState.projects.map(project => (
                  <MenuItem key={project.id} value={project.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FolderIcon sx={{ color: project.color, fontSize: 20 }} />
                      {project.title}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Wybierz aktywne zadania do przypisania:
              </Typography>
              
              {availableTasks.length === 0 ? (
                <Typography variant="body2" color="text.disabled">Brak aktywnych zadań do przypisania.</Typography>
              ) : (
                <Paper variant="outlined" sx={{ maxHeight: 250, overflow: 'auto' }}>
                  <List dense disablePadding>
                    {availableTasks.map(task => {
                      const isAssignedToThisProject = task.projectId === selectedProjectId;
                      const labelId = `checkbox-list-label-${task.id}`;
                      
                      return (
                        <ListItem key={task.id} disablePadding>
                          <ListItemButton 
                            role={undefined} 
                            onClick={() => handleToggle(task.id)} 
                            dense
                            disabled={isAssignedToThisProject && selectedProjectId !== ''}
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Checkbox
                                edge="start"
                                checked={selectedTaskIds.includes(task.id) || (isAssignedToThisProject && selectedProjectId !== '')}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                disabled={isAssignedToThisProject && selectedProjectId !== ''}
                              />
                            </ListItemIcon>
                            <ListItemText 
                              id={labelId} 
                              primary={task.title} 
                              secondary={
                                task.projectId 
                                  ? `(Przypisano do: ${projectState.projects.find(p => p.id === task.projectId)?.title || 'nieznany'})` 
                                  : undefined
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              )}
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          Anuluj
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!selectedProjectId || selectedTaskIds.length === 0 || isSubmitting}
        >
          {isSubmitting ? 'Zapisywanie...' : 'Przypisz wybrane'}
        </Button>
      </DialogActions>
    </Box>
  );
}
