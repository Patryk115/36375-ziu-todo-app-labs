export const ENDPOINTS = {
  POPULAR_MOVIES: '/movie/popular',
  SEARCH_MOVIES: '/search/movie',
  MOVIE_DETAILS: (id: number) => `/movie/${id}`,
} as const;