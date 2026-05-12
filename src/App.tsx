import { useState } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { InfiniteMovieList } from './components/InfiniteMovieList';
import { MovieModal } from './components/MovieModal';

export default function App() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  return (
    <div className='app-container'>
      <header>
        <h1>🎬 Movie Browser</h1>
        <input
          type="text"
          placeholder="Szukaj filmów (min. 2 znaki)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='search-input'
        />
      </header>

      <main>
        {/* Zastępujemy starą listę nowym komponentem bonusowym */}
        <InfiniteMovieList 
          query={debouncedQuery} 
          onMovieClick={(id) => setSelectedMovieId(id)} 
        />
      </main>

      <MovieModal 
        movieId={selectedMovieId} 
        onClose={() => setSelectedMovieId(null)} 
      />
    </div>
  );
}