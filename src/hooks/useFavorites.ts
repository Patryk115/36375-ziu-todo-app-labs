import { useState, useCallback, useEffect } from 'react';
import type { Movie } from './useFetchMovies';

const STORAGE_KEY = 'movie-browser-favorites';

function loadFavorites(): Movie[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>(loadFavorites);

  // Nasłuchiwanie na zmiany - zmusza wszystkie karty do odświeżenia serduszek
  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(loadFavorites());
    };
    
    // Słucha naszego własnego eventu (zmiany w tej samej karcie) 
    // oraz eventu 'storage' (gdyby użytkownik zmienił ulubione w innej zakładce przeglądarki)
    window.addEventListener('favorites-updated', syncFavorites);
    window.addEventListener('storage', syncFavorites);
    
    return () => {
      window.removeEventListener('favorites-updated', syncFavorites);
      window.removeEventListener('storage', syncFavorites);
    };
  }, []);

  const toggleFavorite = useCallback(async (movie: Movie) => {
    // 1. Zawsze pobieramy NAJŚWIEŻSZE dane z localStorage, aby nie nadpisywać innych kart
    const currentFavs = loadFavorites();
    const isFav = currentFavs.some((m) => m.id === movie.id);
    
    const next = isFav 
      ? currentFavs.filter((m) => m.id !== movie.id) 
      : [...currentFavs, movie];
    
    // 2. Zapisujemy połączone dane
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    
    // 3. Informujemy wszystkie inne komponenty w aplikacji, że dane się zmieniły!
    window.dispatchEvent(new Event('favorites-updated'));
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.some((m) => m.id === id),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}