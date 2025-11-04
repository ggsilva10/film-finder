import { Movie } from "@/types"; // Importamos nosso tipo
import Image from "next/image"; // Usamos o componente <Image> do Next.js
import Link from "next/link";

// Definimos que o componente receberá um 'movie' do tipo 'Movie'
type MovieCardProps = {
  movie: Movie;
};

// A URL base para os posters do TMDB. Isso é uma "mágica" deles.
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    // Linkamos o card inteiro para uma futura página de detalhes
    // Ex: /movie/12345
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden h-full 
                      transition-transform duration-300 group-hover:scale-[1.03]">
        
        {/* Imagem */}
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={`Poster do filme: ${movie.title}`}
            fill // Ocupa todo o espaço do 'div' pai (h-64/h-80)
            style={{ objectFit: 'cover' }} // Garante que a imagem cubra o espaço
            className="transition-opacity duration-300 group-hover:opacity-80"
          />
        </div>

        {/* Conteúdo de Texto */}
        <div className="p-4">
          <h3 className="font-bold text-lg truncate" title={movie.title}>
            {movie.title}
          </h3>
          <p className="text-sm text-zinc-400">
            {/* Formatamos a data (ex: 2025) */}
            Lançamento: {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
};