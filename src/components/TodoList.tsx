import { Todo } from '../types/todo.types';
import TodoItem from './TodoItem';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {/* AnimatePresence pilnuje, kiedy element znika z listy */}
      <AnimatePresence>
        {todos.map(todo => (
          // Zamieniamy zwykłe <li> na <motion.li> ze zdefiniowanymi animacjami
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: -12 }} // Start: przezroczysty, lekko w górze
            animate={{ opacity: 1, y: 0 }}   // Wchodzi: pełna widoczność, na swoim miejscu
            exit={{ opacity: 0, x: 48 }}     // Wychodzi: odjeżdża w prawo i znika
            transition={{ duration: 0.22 }}
          >
            <TodoItem 
              todo={todo} 
              onToggle={onToggle} 
              onDelete={onDelete} 
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};