import { create } from 'zustand';
import { Movie, TmdbApiResponse } from '@/types';

interface MovieStoreState {
  searchQuery: string;
  searchResults: Movie[];
  setSearchQuery: (query: string) => void;
  fetchSearchResults: () => Promise<void>;
}

export const useMovieStore = create<MovieStoreState>((set, get) => ({
  searchQuery: '',
  searchResults: [],
    
  /** Ação para atualizar o texto da busca */
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  /** Ação para buscar filmes na API (baseado no searchQuery) */
  fetchSearchResults: async () => {
    // 'get()' é como o Zustand lê o estado atual
    const { searchQuery } = get();

    // Se a busca estiver vazia, limpe os resultados e saia
    if (!searchQuery) {
      set({ searchResults: [] });
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    // Usamos o endpoint de 'search' em vez de 'popular'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(searchQuery)}`;

    try {
      // 'no-store' é importante para busca, para NUNCA usar cache
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Falha ao buscar resultados da busca');
      }
      
      const data: TmdbApiResponse = await res.json();
      // Atualizamos o estado com os resultados
      set({ searchResults: data.results });

    } catch (error) {
      console.error(error);
      set({ searchResults: [] }); // Limpa em caso de erro
    }
  },
}));