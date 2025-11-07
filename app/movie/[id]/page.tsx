import { MovieDetails } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaImage, FaStar } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`Falha na API: ${res.status} ${res.statusText} para URL: ${url}`);
      throw new Error(`Falha ao buscar detalhes: ${res.status}`);
    }
    const data: MovieDetails = await res.json();
    return data;
  } catch (error) {
    console.error("Erro na função getMovieDetails:", error);
    return null;
  }
}

type MovieDetailPageProps = {
  params: {
    id: string;
  };
};

export default async function MovieDetailPage(props: MovieDetailPageProps) {
  
  const params = await props.params;

  const movie = await getMovieDetails(params.id);

  if (!movie) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold text-red-500">Filme não encontrado</h1>
        <Link href="/" className="text-emerald-400 hover:underline mt-4 inline-block">
          Voltar para a Home
        </Link>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const rating = movie.vote_average.toFixed(1);

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Link href="/" className="text-emerald-400 hover:underline">
          &larr; Voltar para a busca
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={`Poster do filme: ${movie.title}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                <FaImage className="text-zinc-500" size={50} />
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
          <p className="text-lg text-zinc-400 italic mb-4">{movie.tagline}</p>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" size={24} />
              <span className="text-2xl font-bold">{rating}</span>
              <span className="text-zinc-400">/ 10</span>
            </div>
            <span className="text-xl text-zinc-300">{movie.runtime} minutos</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre: {id: number; name: string}) => (
              <span key={genre.id} className="bg-zinc-700 text-zinc-200 py-1 px-3 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-2">Sinopse</h2>
          <p className="text-zinc-300 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}