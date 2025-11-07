import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaImage } from "react-icons/fa";

// Componente
type MovieCardProps = {
  movie: Movie;
};

// A URL base para os posters do TMDB.
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const MovieCard = ({ movie }: MovieCardProps) => {

  const posterUrl = movie.poster_path
  ? `${IMAGE_BASE_URL}${movie.poster_path}`
  : null;

  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden h-full 
                      transition-transform duration-300 group-hover:scale-[1.03]">
        
        {/* Imagem */}
        <div className="relative w-full h-64 md:h-80">
          
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={`Poster do filme: ${movie.title}`}
              fill 
              style={{ objectFit: 'cover' }}
              className="transition-opacity duration-300 group-hover:opacity-80"
            />
          ) : (
            <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
              <FaImage className="text-zinc-500" size={50} />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg truncate" title={movie.title}>
            {movie.title}
          </h3>
          <p className="text-sm text-zinc-400">
            Lançamento: {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
};