"use client"; 

import { useMovieStore } from "@/store/useMovieStore";
import { Movie } from "@/types";
import { MovieCard } from "./MovieCard";


// 3. Define as propriedades
type MovieListProps = {
  initialMovies: Movie[];
};

// 4. O componente
export const MovieList = ({ initialMovies }: MovieListProps) => {
  
  const searchQuery = useMovieStore((state) => state.searchQuery);
  const searchResults = useMovieStore((state) => state.searchResults);

  // 6. Lógica de exibição
  const isSearching = searchQuery.length > 0;
  const moviesToDisplay = isSearching ? searchResults : initialMovies;
  const hasNoResults = isSearching && searchResults.length === 0;
  const title = isSearching ? "Resultados da Busca" : "Populares no Momento";

  // 7. A renderização (JSX)
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

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
    </section>
  );
};