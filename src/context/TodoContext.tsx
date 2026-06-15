import { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { TodoState, PriorityType } from '../types/todo.types';
import { todoReducer } from '../reducers/todoReducer';
import { api } from '../api/mockApi';

interface TodoContextType {
  state: TodoState;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string, priority?: PriorityType, projectId?: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  assignToProject: (taskIds: string[], projectId: string | null) => Promise<void>;
  clearOperationState: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialState: TodoState = {
  todos: [],
  isLoading: true,
  error: null,
  isOperationLoading: false,
  operationError: null,
  operationSuccess: null,
};

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const fetchTodos = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const data = await api.fetchTodos();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch {
      dispatch({ type: 'FETCH_ERROR', payload: 'Błąd synchronizacji z chmurą.' });
    }
  }, []);

  const addTodo = async (title: string, priority: PriorityType = 'medium', projectId?: string) => {
    dispatch({ type: 'OPERATION_START' });
    try {
      const newTodo = await api.addTodo(title, priority, projectId);
      dispatch({ type: 'ADD', payload: newTodo });
      dispatch({ type: 'OPERATION_SUCCESS', payload: `Zadanie "${title}" zostało dodane.` });
    } catch (error: any) {
      dispatch({ type: 'OPERATION_ERROR', payload: error.message || 'Błąd dodawania zadania.' });
    }
  };

  const toggleTodo = async (id: string) => {
    dispatch({ type: 'TOGGLE', payload: id }); // optimistic update
    try {
      await api.toggleTodo(id);
    } catch {
      // rollback — toggle again
      dispatch({ type: 'TOGGLE', payload: id });
      dispatch({ type: 'OPERATION_ERROR', payload: 'Błąd aktualizacji zadania.' });
    }
  };

  const deleteTodo = async (id: string) => {
    dispatch({ type: 'DELETE', payload: id }); // optimistic update
    try {
      await api.deleteTodo(id);
      dispatch({ type: 'OPERATION_SUCCESS', payload: 'Zadanie zostało usunięte.' });
    } catch {
      dispatch({ type: 'OPERATION_ERROR', payload: 'Błąd usuwania zadania.' });
    }
  };

  const clearOperationState = () => {
    dispatch({ type: 'CLEAR_OPERATION_STATE' });
  };

  const assignToProject = async (taskIds: string[], projectId: string | null) => {
    dispatch({ type: 'ASSIGN_TO_PROJECT', payload: { taskIds, projectId } }); // optimistic update
    try {
      await api.assignToProject(taskIds, projectId);
      dispatch({ type: 'OPERATION_SUCCESS', payload: 'Zadania zostały przypisane do projektu.' });
    } catch {
      dispatch({ type: 'OPERATION_ERROR', payload: 'Błąd przypisywania zadań.' });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <TodoContext.Provider value={{ state, fetchTodos, addTodo, toggleTodo, deleteTodo, assignToProject, clearOperationState }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext musi być użyty wewnątrz TodoProvider');
  }
  return context;
}