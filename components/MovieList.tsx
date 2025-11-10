"use client"; 

import { useMovieStore } from "@/store/useMovieStore";
import { Movie } from "@/types";
import { MovieCard } from "./MovieCard";

type MovieListProps = {
  initialMovies: Movie[];
};

export const MovieList = ({ initialMovies }: MovieListProps) => {
  
  const searchQuery = useMovieStore((state) => state.searchQuery);
  const searchResults = useMovieStore((state) => state.searchResults);
  const currentPage = useMovieStore((state) => state.currentPage);
  const totalPages = useMovieStore((state) => state.totalPages);
  const fetchSearchResults = useMovieStore((state) => state.fetchSearchResults);

  // Lógica de exibição
  const isSearching = searchQuery.length > 0;
  const moviesToDisplay = isSearching ? searchResults : initialMovies;
  const hasNoResults = isSearching && searchResults.length === 0;
  const title = isSearching ? "Resultados da Busca" : "Populares no Momento";

  const showLoadMoreButton = isSearching && currentPage < totalPages;

  const handleLoadMore = () => {
    fetchSearchResults(searchQuery, true);
  };

return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      {/* Grid de Filmes */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {hasNoResults ? (
          <p className="col-span-full text-center text-zinc-400">
            Nenhum filme encontrado para "{searchQuery}".
          </p>
        ) : 
        moviesToDisplay.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Botão "Carregar Mais" */}
      {showLoadMoreButton && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Carregar Mais Resultados
          </button>
        </div>
      )}
    </section>
  );
};