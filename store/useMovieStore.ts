import { create } from 'zustand';
import { Movie, TmdbApiResponse } from '@/types';

interface MovieStoreState {
  searchQuery: string;
  searchResults: Movie[];
  currentPage: number;
  totalPages: number;
  setSearchQuery: (query: string) => void;
  fetchSearchResults: (query: string, loadMore?: boolean) => Promise<void>;
  resetSearch: () => void;
}

export const useMovieStore = create<MovieStoreState>((set, get) => ({
  searchQuery: '',
  searchResults: [],
  currentPage: 1,
  totalPages: 1,
    
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  fetchSearchResults: async (query, loadMore = false) => {
    if (!query) {
      set({ searchResults: [], currentPage: 1, totalPages: 1 });
      return;
    }

    const { currentPage } = get();
    const pageToFetch = loadMore ? currentPage + 1 : 1;

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(query)}&page=${pageToFetch}`;

    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Falha ao buscar resultados da busca');
      }
      
      const data: TmdbApiResponse = await res.json();
      
      set((state) => ({
        searchResults: loadMore
          ? [...state.searchResults, ...data.results] 
          : data.results,
        currentPage: data.page,
        totalPages: data.total_pages,
      }));

    } catch (error) {
      console.error("ERRO NO FETCH:", error);
      set({ searchResults: [], currentPage: 1, totalPages: 1 });
    }
  },

  resetSearch: () => {
    set({
      searchQuery: '',
      searchResults: [],
      currentPage: 1,
      totalPages: 1,
    });
  },
}));