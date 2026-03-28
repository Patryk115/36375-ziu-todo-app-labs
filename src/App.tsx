import { useState, useReducer, useEffect } from 'react';
import { FilterType, Todo } from './types/todo.types';
import { todoReducer } from './reducers/todoReducer';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

// Funkcja pomocnicza do pobierania początkowego stanu
const initTodos = (): Todo[] => {
  const saved = localStorage.getItem('todos');
  if (saved) {
    // Ważne: przy parsowaniu JSONa daty wracają jako stringi, trzeba je odtworzyć
    return JSON.parse(saved).map((t: any) => ({ ...t, createdAt: new Date(t.createdAt) }));
  }
  return [];
};

function App() {
  // Inicjujemy reducer używając funkcji initTodos
  const [todos, dispatch] = useReducer(todoReducer, [], initTodos);
  
  const [filter, setFilter] = useState<FilterType>('all');

  // Ten efekt zapisze zadania do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  const handleAdd = (title: string) => {
    dispatch({ type: 'ADD', payload: title });
  };

  const handleToggle = (id: string) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Moja Lista Zadań</h1>
      <AddTodoForm onAdd={handleAdd} />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />
      <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
      <p style={{ marginTop: '20px', fontSize: '14px', color: 'gray' }}>
        Pozostało aktywnych zadań: {activeCount}
      </p>
    </div>
  );
}

export default App;