import { Movie, TmdbApiResponse } from "@/types";
import { MovieCard } from '@/components/MovieCard';

async function getPopularMovies(): Promise<Movie[]> {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

  // LOG 1: Vamos ter certeza que a função está rodando
  console.log("--- INICIANDO BUSCA DE FILMES ---");
  console.log("Usando URL:", url.replace(apiKey || '', 'CHAVE_REMOVIDA')); // Remove a chave do log

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      console.error('Erro da API (res.ok = false):', res.status, res.statusText);
      throw new Error(`Falha ao buscar os dados: ${res.status} ${res.statusText}`);
    }

    // LOG 2: Vamos tentar logar a resposta ANTES de dar o erro
    const textData = await res.text(); // Em vez de .json(), pegamos como texto
    console.log("DADOS RECEBIDOS (como texto):", textData.substring(0, 100) + "..."); // Logamos os primeiros 100 caracteres

    // Agora tentamos converter o texto para JSON
    const data: TmdbApiResponse = JSON.parse(textData);

    return data.results;

  } catch (error) {
    console.error("!!! ERRO DENTRO DO CATCH BLOCK !!!");
    console.error("O erro específico é:", error);
    return [];
  }
}

export default async function Home() {

  // 6. Chamamos nossa função e esperamos pelos filmes
  const popularMovies = await getPopularMovies();

  return (
    <main className="container mx-auto py-8 px-4">
      <section className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          FilmFinder
        </h1>
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Buscar por um filme (ex: Vingadores)..."
            className="w-full p-4 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </section>

      {/* SEÇÃO DA LISTA DE FILMES (Grid) */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Populares no Momento</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {popularMovies.length > 0 ? (
            // Usamos .map() para transformar cada 'movie' em um <MovieCard>
            popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="col-span-full text-center text-zinc-400">
              Não foi possível carregar os filmes no momento.
            </p>
          )}

        </div>
      </section>
    </main>
  );
}