import { apiFetch } from "@/lib/api";

export async function getMovies(query: string, options: any = {}) {
    const result = await apiFetch(`movie/${query}`, {
        next: {
            tags: ['movies']
        },
        ...options
    });
    console.log('The movies are', result);
    return result;
}