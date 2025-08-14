import { apiFetch } from "@/lib/api";

export async function getMovies(query: string, options: any = {}) {
    const result = await apiFetch(`movie/${query}`, {
        next: {
            tags: ['movies']
        },
        ...options
    });
    return result;
}

export async function getMoviesByGenre(genreId: number, page: number = 1, sort_by: string = 'popularity') {
    const result = await apiFetch(`discover/movie?with_genres=${genreId}&page=${page}&sort_by=${sort_by}.desc&language=en-US`, {
        next: {
            tags: ['movies', genreId.toString()]
        }
    });
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

export async function getMovieReviews(movieId: number) {
    const result = await apiFetch(`movie/${movieId}/reviews`, {
        next: {
            tags: ['reviews', movieId.toString()]
        }
    });
    return result;
}