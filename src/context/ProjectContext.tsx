import { createContext, useContext, useReducer, useCallback, ReactNode, useEffect } from 'react';
import { Project, ProjectState, ProjectAction } from '../types/project.types';
import { projectApi } from '../api/projectApi';

interface ProjectContextType {
  state: ProjectState;
  fetchProjects: () => Promise<void>;
  addProject: (title: string, description: string, imageUrl?: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialState: ProjectState = {
  projects: [],
  isLoading: true,
  error: null,
};

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, projects: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'ADD':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'DELETE':
      return { ...state, projects: state.projects.filter((p) => p.id !== action.payload) };
    case 'UPDATE':
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    default:
      return state;
  }
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const fetchProjects = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await projectApi.fetchProjects();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch {
      dispatch({ type: 'FETCH_ERROR', payload: 'Błąd pobierania projektów.' });
    }
  }, []);

  const addProject = async (title: string, description: string, imageUrl?: string) => {
    try {
      const newProject = await projectApi.addProject(title, description, imageUrl);
      dispatch({ type: 'ADD', payload: newProject });
    } catch (err: any) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Błąd dodawania projektu.' });
    }
  };

  const deleteProject = async (id: string) => {
    dispatch({ type: 'DELETE', payload: id }); // optimistic update
    await projectApi.deleteProject(id);
  };

  const updateProject = async (project: Project) => {
    try {
      const updated = await projectApi.updateProject(project);
      dispatch({ type: 'UPDATE', payload: updated });
    } catch {
      // silent fail — optimistic update already applied
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <ProjectContext.Provider value={{ state, fetchProjects, addProject, deleteProject, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext musi być użyty wewnątrz ProjectProvider');
  }
  return context;
}
