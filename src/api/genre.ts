import { apiFetch } from "@/lib/api";

export async function getGenres() {
    const result = await apiFetch('genre/movie/list');
    console.log('The genres are xd', result.genres);
    return result.genres;
}