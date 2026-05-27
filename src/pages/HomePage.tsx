import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDebounce } from '../hooks/useDebounce';
import { InfiniteMovieList } from '../components/InfiniteMovieList';
import { MovieModal } from '../components/MovieModal';

const pageVariants = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit:    { opacity: 0, x: 16,  transition: { duration: 0.18, ease: 'easeIn' } },
};

export function HomePage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Szukaj filmów (min. 2 znaki)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='search-input'
        />
      </div>

      <InfiniteMovieList 
        query={debouncedQuery} 
        onMovieClick={(id) => setSelectedMovieId(id)} 
      />

      <MovieModal 
        movieId={selectedMovieId} 
        onClose={() => setSelectedMovieId(null)} 
      />
    </motion.div>
  );
}