import { Project } from '../types/project.types';

const DELAY = 600;
const STORAGE_KEY = 'projects';

const PROJECT_COLORS = [
  '#7C3AED', // violet
  '#2563EB', // blue
  '#059669', // green
  '#D97706', // amber
  '#DC2626', // red
  '#7C3AED', // violet again
];

const getProjectsFromStorage = (): Project[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        todoIds: Array.isArray(p.todoIds) ? p.todoIds : [],
        imageUrl: p.imageUrl || undefined,
      }));
    } catch {
      return getDefaultProjects();
    }
  }
  // Domyślne projekty demo (jak na Figmie)
  const defaults = getDefaultProjects();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
};

const getDefaultProjects = (): Project[] => [
  {
    id: 'proj-1',
    title: 'Projekty firmowe',
    description: 'Zarządzanie zespołem i budżetem',
    createdAt: new Date('2026-01-15'),
    color: '#7C3AED',
    todoIds: [],
  },
  {
    id: 'proj-2',
    title: 'Lista zakupów',
    description: 'Mleko, pieczywo, rzeczy na grilla',
    createdAt: new Date('2026-02-20'),
    color: '#2563EB',
    todoIds: [],
  },
  {
    id: 'proj-3',
    title: 'Zadania domowe',
    description: 'Zadanie z matematyki i polskiego',
    createdAt: new Date('2026-03-10'),
    color: '#059669',
    todoIds: [],
  },
];

export const projectApi = {
  fetchProjects: (): Promise<Project[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getProjectsFromStorage());
      }, DELAY);
    });
  },

  addProject: (title: string, description: string, imageUrl?: string): Promise<Project> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!title.trim()) {
          reject(new Error('Nazwa projektu jest wymagana.'));
          return;
        }
        const currentProjects = getProjectsFromStorage();
        const colorIndex = currentProjects.length % PROJECT_COLORS.length;
        const newProject: Project = {
          id: crypto.randomUUID(),
          title: title.trim(),
          description: description.trim(),
          createdAt: new Date(),
          color: PROJECT_COLORS[colorIndex],
          todoIds: [],
          imageUrl,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...currentProjects, newProject]));
        resolve(newProject);
      }, DELAY);
    });
  },

  deleteProject: (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const current = getProjectsFromStorage();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current.filter((p) => p.id !== id)));
        resolve();
      }, DELAY);
    });
  },

  updateProject: (project: Project): Promise<Project> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const current = getProjectsFromStorage();
        const updated = current.map((p) => (p.id === project.id ? project : p));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve(project);
      }, DELAY);
    });
  },
};
