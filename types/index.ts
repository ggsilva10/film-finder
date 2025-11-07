export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

export interface TmdbApiResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface MovieDetails extends Movie {
    overview: string;
    genres: {
        id: number;
        name: string;
    }[];
    runtime: number;
    tagline: string;
}