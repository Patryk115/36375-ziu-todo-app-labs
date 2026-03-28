import { createContext, useContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import { Todo, TodoAction } from '../types/todo.types';
import { todoReducer } from '../reducers/todoReducer';

interface TodoContextType {
  state: {
    todos: Todo[];
  };
  dispatch: Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initTodos = (): Todo[] => {
  const saved = localStorage.getItem('todos');
  if (saved) {
    return JSON.parse(saved).map((t: any) => ({ ...t, createdAt: new Date(t.createdAt) }));
  }
  return [];
};

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, [], initTodos);


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ state: { todos }, dispatch }}>
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