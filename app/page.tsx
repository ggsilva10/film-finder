import { Movie, TmdbApiResponse } from "@/types";
import { SearchBar } from '@/components/SearchBar';
import { MovieList } from '@/components/MovieList';
import { Logo } from '@/components/Logo';

async function getPopularMovies(): Promise<Movie[]> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`Falha ao buscar os dados: ${res.status} ${res.statusText}`);
    }

    const data: TmdbApiResponse = await res.json();
    return data.results;

  } catch (error) {
    return [];
  }
}


export default async function Home() {

  const popularMovies = await getPopularMovies();

  return (
    <main className="container mx-auto py-8 px-4">
      <section className="mb-8">
        <Logo />        
        <p className="text-xl text-zinc-400 text-center mb-6">
          Explore milhões de filmes ao seu alcance.
        </p>

        <SearchBar />
      </section>

      <MovieList initialMovies={popularMovies} />
    </main>
  );
}