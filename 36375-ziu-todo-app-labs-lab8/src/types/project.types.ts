export interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  color: string; // kolor karty projektu
  todoIds: string[]; // powiązane zadania (IDs)
  imageUrl?: string; // obrazek projektu
}

export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

export type ProjectAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Project[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD'; payload: Project }
  | { type: 'DELETE'; payload: string }
  | { type: 'UPDATE'; payload: Project };
