import { Todo } from '../types/todo.types';

const DELAY = 800;

const getTodosFromStorage = (): Todo[] => {
  const saved = localStorage.getItem('todos');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        priority: t.priority || 'medium',
        tags: Array.isArray(t.tags) ? t.tags : [],
        projectId: t.projectId || undefined,
      }));
    } catch {
      return [];
    }
  }
  return [];
};

export const api = {
  fetchTodos: (): Promise<Todo[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getTodosFromStorage());
      }, DELAY);
    });
  },

  addTodo: (
    title: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
    projectId?: string
  ): Promise<Todo> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (title.toLowerCase() === 'error') {
          reject(new Error('Sztuczny błąd serwera. Spróbuj ponownie.'));
          return;
        }

        const newTodo: Todo = {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: new Date(),
          priority,
          tags: priority === 'high' ? ['Pilne'] : [],
          projectId,
        };

        const currentTodos = getTodosFromStorage();
        localStorage.setItem('todos', JSON.stringify([newTodo, ...currentTodos]));
        resolve(newTodo);
      }, DELAY);
    });
  },

  deleteTodo: (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentTodos = getTodosFromStorage();
        localStorage.setItem('todos', JSON.stringify(currentTodos.filter((t) => t.id !== id)));
        resolve();
      }, DELAY);
    });
  },

  toggleTodo: (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentTodos = getTodosFromStorage();
        const updated = currentTodos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
        localStorage.setItem('todos', JSON.stringify(updated));
        resolve();
      }, DELAY);
    });
  },

  assignToProject: (taskIds: string[], projectId: string | null): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentTodos = getTodosFromStorage();
        const updated = currentTodos.map((t) =>
          taskIds.includes(t.id) ? { ...t, projectId: projectId || undefined } : t
        );
        localStorage.setItem('todos', JSON.stringify(updated));
        resolve();
      }, DELAY);
    });
  },
};