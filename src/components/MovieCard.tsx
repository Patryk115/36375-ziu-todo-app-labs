import { useState, useCallback } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import type { Movie } from '../hooks/useFetchMovies';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

interface Props {
  movie: Movie;
}

export function MovieCard({ movie }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);

  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    setOptimisticFav(!displayedFav);
    try {
      await toggleFavorite(movie);
      setOptimisticFav(null);
    } catch {
      setOptimisticFav(null);
    }
  }, [displayedFav, toggleFavorite, movie]);

  return (
    <div className='movie-card'>
      <div className='card-poster-wrapper'>
        <img
          src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : '/no-poster.png'}
          alt={movie.title}
          loading="lazy"
        />
      </div>
      
      <div className='card-content'>
        <h3 title={movie.title}>{movie.title}</h3>
        
        <div className='card-meta'>
          <span>{movie.release_date?.slice(0, 4)}</span>
          {' • '}
          <span className='rating'>★ {movie.vote_average.toFixed(1)}</span>
        </div>
        
        {/* Dodany opis filmu */}
        <p className='card-description'>
          {movie.overview || 'Brak opisu dla tego filmu.'}
        </p>
        
        <button
          onClick={handleToggle}
          aria-label={displayedFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          className={`fav-btn ${displayedFav ? 'active' : ''}`}
        >
          {displayedFav ? '❤️ Usuń' : '🤍 Do ulubionych'}
        </button>
      </div>
    </div>
  );
}