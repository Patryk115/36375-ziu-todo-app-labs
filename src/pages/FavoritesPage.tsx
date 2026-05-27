import { useState, useEffect } from 'react';
import { motion, Reorder, useReducedMotion } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';
import { FavoriteCard } from '../components/FavoriteCard';
import type { Movie } from '../hooks/useFetchMovies';

const pageVariants = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit:    { opacity: 0, x: 16,  transition: { duration: 0.18, ease: 'easeIn' } },
};

// Dodajemy wariant dla całego kontenera (listy)
const listVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08 } 
  },
};

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const [reorderFavs, setReorderFavs] = useState<Movie[]>(favorites);
  
  // Sprawdzamy, czy użytkownik woli zredukowany ruch (dostępność)
  const shouldReduce = useReducedMotion();

  // Wariant dla pojedynczego elementu listy
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    setReorderFavs(favorites);
  }, [favorites]);

  const handleReorder = (newOrder: Movie[]) => {
    setReorderFavs(newOrder);
    localStorage.setItem('movie-browser-favorites', JSON.stringify(newOrder));
    window.dispatchEvent(new Event('favorites-updated'));
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '10px' }}>Ulubione filmy</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '0.9rem' }}>
          Przeciągnij elementy, aby zmienić kolejność (drag & drop).
        </p>
        
        {reorderFavs.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Brak ulubionych filmów.</p>
        ) : (
          <Reorder.Group 
            axis='y' 
            values={reorderFavs} 
            onReorder={handleReorder} 
            variants={listVariants}     /* Podpinamy animację startową listy */
            initial="hidden"
            animate="visible"
            style={{ 
              listStyleType: 'none', 
              padding: 0, 
              margin: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
            }}
          >
            {reorderFavs.map(movie => (
              <Reorder.Item 
                key={movie.id} 
                value={movie} 
                variants={itemVariants} /* Podpinamy animację pojedynczego kafelka */
                style={{ cursor: 'grab' }}
                whileDrag={{ scale: 1.02, zIndex: 10 }}
              >
                <FavoriteCard movie={movie} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </motion.div>
  );
}