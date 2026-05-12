import { useEffect, useRef } from 'react';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import { MovieCard } from './MovieCard';
import { SkeletonCard } from './SkeletonCard';

interface Props {
  query: string;
  onMovieClick: (id: number) => void;
}

export function InfiniteMovieList({ query, onMovieClick }: Props) {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError 
  } = useInfiniteMovies(query);

  // Ref do elementu na samym dole listy [cite: 431]
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tworzymy obserwator, który wyzwoli pobieranie, gdy "strażnik" pojawi się na ekranie [cite: 433-435]
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // Pobierz kolejną stronę [cite: 436]
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    
    return () => observer.disconnect(); // Sprzątanie [cite: 440]
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Łączymy wszystkie strony wyników w jedną płaską tablicę [cite: 442]
  const movies = data?.pages.flatMap((p) => p.results) ?? [];

  if (isLoading) {
    return (
      <div className="movie-grid">
        {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => onMovieClick(movie.id)} style={{ cursor: 'pointer' }}>
            <MovieCard movie={movie} />
          </div>
        ))}
        
        {/* Wyświetlamy dodatkowe skeletony podczas dociągania danych [cite: 447-448] */}
        {isFetchingNextPage && Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={`next-skel-${i}`} />
        ))}
      </div>

      {/* "Strażnik" - niewidzialny element, który śledzi Intersection Observer [cite: 450-451] */}
      <div ref={sentinelRef} style={{ height: '20px', margin: '20px 0' }} />
      
      {!hasNextPage && movies.length > 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          To już wszystkie filmy dla tej frazy.
        </p>
      )}
    </>
  );
}