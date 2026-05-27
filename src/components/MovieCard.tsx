import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../context/ToastContext';
import type { Movie } from '../hooks/useFetchMovies';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

interface Props {
  movie: Movie;
  onClick?: () => void;
}

export function MovieCard({ movie, onClick }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToast } = useToast();
  const [optimisticFav, setOptimisticFav] = useState<boolean | null>(null);
  
  // Etap 6: Strategia dla dostępności – zdejmujemy animację w osi Y
  const shouldReduce = useReducedMotion();

  const displayedFav = optimisticFav ?? isFavorite(movie.id);

  const handleToggle = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    const isAdding = !displayedFav;
    setOptimisticFav(isAdding);
    try {
      await toggleFavorite(movie);
      setOptimisticFav(null);
      // Wywołanie Toasta
      addToast(isAdding ? `Dodano "${movie.title}" do ulubionych` : `Usunięto "${movie.title}" z ulubionych`);
    } catch {
      setOptimisticFav(null);
      addToast('Wystąpił błąd');
    }
  }, [displayedFav, toggleFavorite, movie, addToast]);

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.li 
      className='movie-card'
      variants={itemVariants}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', listStyle: 'none' }}
      tabIndex={0}
    >
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
    </motion.li>
  );
}