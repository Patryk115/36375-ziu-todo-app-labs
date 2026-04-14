import { Todo } from '../types/todo.types'; // Upewnij się, że ścieżka jest dobra!

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoListTailwind({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className='text-center text-gray-400 mt-8'>Brak zadań. Dodaj pierwsze!</p>
    );
  }

  return (
    <ul className='divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden'>
      {todos.map(todo => (
        <li
          key={todo.id}
          className={`flex items-center gap-3 px-4 py-3 ${
            todo.completed ? 'bg-gray-50' : 'bg-white'
          }`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 cursor-pointer accent-brand-500"
          />

          <span
            className={`flex-1 text-sm transition-colors ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {todo.title}
          </span>

          <button
  onClick={() => onDelete(todo.id)}
  // NOWE: dodano min-h-[44px] min-w-[44px] oraz flex dla wyśrodkowania ikony
  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50"
  title="Usuń"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
</button>
        </li>
      ))}
    </ul>
  );
}