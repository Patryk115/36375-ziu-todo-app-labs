import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInfiniteMovies } from '../hooks/useInfiniteMovies';
import { MovieCard } from './MovieCard';
import { SkeletonCard } from './SkeletonCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.08 } 
  },
};

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
    isLoading 
  } = useInfiniteMovies(query);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
      {/* Etap C: animacja wejścia z staggerChildren */}
      <motion.ul 
        className="movie-grid" 
        variants={containerVariants} 
        initial='hidden' 
        animate='visible'
        style={{ listStyleType: 'none', padding: 0, margin: 0 }}
      >
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={() => onMovieClick(movie.id)} 
          />
        ))}
        
        {isFetchingNextPage && Array.from({ length: 4 }).map((_, i) => (
          <div key={`next-skel-${i}`}>
            <SkeletonCard />
          </div>
        ))}
      </motion.ul>

      <div ref={sentinelRef} style={{ height: '20px', margin: '20px 0' }} />
      
      {!hasNextPage && movies.length > 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          To już wszystkie filmy dla tej frazy.
        </p>
      )}
    </>
  );
}