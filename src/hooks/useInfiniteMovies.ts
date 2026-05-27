import { useInfiniteQuery } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdbClient';
import { QUERY_KEYS } from '../constants/queryKeys';

export function useInfiniteMovies(query = '') {
  const isSearch = query.trim().length > 0;

  return useInfiniteQuery({
    // Używamy unikalnego klucza dla nieskończonego przewijania [cite: 412]
    queryKey: ['movies', 'infinite', query],
    queryFn: async ({ pageParam = 1 }) => {
      const endpoint = isSearch ? '/search/movie' : '/movie/popular';
      const params: Record<string, string | number> = { page: pageParam };
      if (isSearch) params.query = query;

      const { data } = await tmdbClient.get(endpoint, { params });
      return data;
    },
    initialPageParam: 1, // Startujemy od 1 strony [cite: 419]
    // Logika sprawdzająca, czy jest kolejna strona do pobrania [cite: 420-422]
    getNextPageParam: (lastPage: any) => 
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !isSearch || query.trim().length >= 2,
  });
}