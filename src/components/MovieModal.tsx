import { useMovieDetails } from '../hooks/useMovieDetails';

interface Props {
  movieId: number | null;
  onClose: () => void;
}

export function MovieModal({ movieId, onClose }: Props) {
  const { data: movie, isLoading, isError } = useMovieDetails(movieId);

  if (!movieId) return null;

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-modal-btn' onClick={onClose} aria-label="Zamknij">×</button>
        
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '40px' }} className='shimmer'>
            <p>Ładowanie szczegółów...</p>
          </div>
        )}
        
        {isError && (
          <p style={{ color: 'var(--error-color)', textAlign: 'center' }}>
            Nie udało się pobrać szczegółów filmu.
          </p>
        )}
        
        {movie && (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>{movie.title}</h2>
            <div className='card-meta' style={{ fontSize: '1rem', marginBottom: '20px' }}>
              <strong>Premiera:</strong> {movie.release_date}
              {' • '}
              <span className='rating' style={{ fontSize: '1.1rem' }}>★ {movie.vote_average.toFixed(1)}</span>
            </div>
            
            <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              Opis fabuły
            </h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              {movie.overview || 'Brak opisu dla tego filmu.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}