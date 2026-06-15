export type PriorityType = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority?: PriorityType;
  tags?: string[];
  projectId?: string; // powiązanie z projektem
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  // Stany operacji (add/delete/toggle) — wymaganie: loading · success · error
  isOperationLoading: boolean;
  operationError: string | null;
  operationSuccess: string | null;
}

export type TodoAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Todo[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'ADD'; payload: Todo }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'ASSIGN_TO_PROJECT'; payload: { taskIds: string[], projectId: string | null } }
  | { type: 'OPERATION_START' }
  | { type: 'OPERATION_SUCCESS'; payload: string }
  | { type: 'OPERATION_ERROR'; payload: string }
  | { type: 'CLEAR_OPERATION_STATE' };