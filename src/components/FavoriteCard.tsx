import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../context/ToastContext';
import type { Movie } from '../hooks/useFetchMovies';

interface Props {
  movie: Movie;
}

export function FavoriteCard({ movie }: Props) {
  const { toggleFavorite } = useFavorites();
  const { addToast } = useToast();

  const handleRemove = async () => {
    try {
      await toggleFavorite(movie);
      addToast(`Usunięto "${movie.title}" z ulubionych`);
    } catch {
      addToast('Wystąpił błąd podczas usuwania');
    }
  };

  return (
    <div className="favorite-list-item">
      {/* Uchwyt do przeciągania */}
      <div className="drag-handle" aria-label="Chwyć, aby przenieść">
        ☰
      </div>
      
      <div className="favorite-info">
        <span className="favorite-title">{movie.title}</span>
        <span className="favorite-year">
          {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''}
        </span>
      </div>
      
      <button className="remove-btn" onClick={handleRemove}>
        Usuń
      </button>
    </div>
  );
}