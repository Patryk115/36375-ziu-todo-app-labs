import { TodoState, TodoAction } from '../types/todo.types';

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, todos: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'OPERATION_START':
      return { ...state, isOperationLoading: true, operationError: null, operationSuccess: null };
    case 'OPERATION_SUCCESS':
      return { ...state, isOperationLoading: false, operationSuccess: action.payload };
    case 'OPERATION_ERROR':
      return { ...state, isOperationLoading: false, operationError: action.payload };
    case 'CLEAR_OPERATION_STATE':
      return { ...state, isOperationLoading: false, operationError: null, operationSuccess: null };

    case 'ADD':
      return { ...state, todos: [action.payload, ...state.todos] };
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'DELETE':
      return { ...state, todos: state.todos.filter((t) => t.id !== action.payload) };
    case 'ASSIGN_TO_PROJECT':
      return {
        ...state,
        todos: state.todos.map((t) =>
          action.payload.taskIds.includes(t.id)
            ? { ...t, projectId: action.payload.projectId || undefined }
            : t
        ),
      };
    default:
      return state;
  }
};