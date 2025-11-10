"use client";

import { useMovieStore } from "@/store/useMovieStore";
import Link from 'next/link';

export const Logo = () => {
    const resetSearch = useMovieStore((state) => state.resetSearch);

    return (
        <Link
            href="/"
            onClick={resetSearch}
            className="block"
        >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center transition-opacity hover:opacity-80">
                FilmFinder
            </h1>
        </Link>
    )
}