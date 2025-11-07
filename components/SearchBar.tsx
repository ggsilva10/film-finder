"use client";

import { useMovieStore } from "@/store/useMovieStore";
import { useDebouncedCallback } from "use-debounce";

export const SearchBar = () => {
  // 2. Ações do (Zustand)
  const { setSearchQuery, fetchSearchResults } = useMovieStore();

  // 3. Função de "debounce"
  //    Ela só vai chamar a 'fetchSearchResults' 500ms *depois*
  //    que o usuário parar de digitar.
  const debouncedFetch = useDebouncedCallback(() => {
    fetchSearchResults();
  }, 500);

  // 4. A função que roda a cada letra digitada
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    // Ação 1: Atualiza o estado da query *imediatamente*
    setSearchQuery(query);
    // Ação 2: Dispara a busca na API (com o atraso)
    debouncedFetch();
  };

  return (
    <div className="max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Buscar por um filme (ex: Vingadores)..."
        className="w-full p-4 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onChange={handleSearchChange} // 5. Conectamos tudo ao 'onChange'
      />
    </div>
  );
};