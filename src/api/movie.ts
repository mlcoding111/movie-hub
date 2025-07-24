import { apiFetch } from "@/lib/api";

export async function getMovies(query: string, options: any = {}) {
    console.log('The query is', query);
    const result = await apiFetch(`movie/${query}`, {
        next: {
            tags: ['movies']
        },
        ...options
    });
    // console.log('The movies are', result);
    return result;
}

export async function getMovieById(movieId: number) {
    const result = await apiFetch(`movie/${movieId}`, {
        next: {
            tags: ['movie', movieId.toString()]
        }
    });
    return result;
}

export async function getSimilarMovies(movieId: number) {
    const result = await apiFetch(`movie/${movieId}/similar`, {
        next: {
            tags: ['similar-movies', movieId.toString()]
        }
    });
    return result;
}