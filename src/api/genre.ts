import { apiFetch } from "@/lib/api";

export async function getGenres() {
    const result = await apiFetch('genre/movie/list', {
        next: {
            tags: ['genres']
        }
    });
    return result.genres;
}