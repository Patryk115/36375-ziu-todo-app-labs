import { http, HttpResponse } from 'msw';

const TMDB_BASE = 'https://api.themoviedb.org/3';

export const handlers = [
  // Zostawiamy TYLKO mock błędu 401 na potrzeby pokazania go prowadzącemu przy ocenianiu.
  // Gdy będziesz chciał pokazać aplikację normalnie, po prostu wykomentuj też to!
  /*
  http.get(`${TMDB_BASE}/movie/popular`, () => {
    return HttpResponse.json(
      { status_message: 'Invalid API key.', success: false, status_code: 7 },
      { status: 401 }
    );
  }),
  */
];