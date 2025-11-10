"use client";

import { useMovieStore } from "@/store/useMovieStore";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, fetchSearchResults } = useMovieStore();
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    fetchSearchResults(debouncedSearchQuery, false);
  },  [debouncedSearchQuery, fetchSearchResults]);
  

  return (
    <div className="max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Buscar por um filme (ex: Vingadores)..."
        className="w-full p-4 rounded-lg bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
    </div>
  );
};