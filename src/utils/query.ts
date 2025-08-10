import { getGenreIdFromName } from "./genres";
import { toSnakeCase } from "./string";

export async function buildMovieUrl({ category = '', type = 'popular', page = 1, search = '' }: { category?: string, type?: string, page?: number, search?: string }) {
    const formattedType = toSnakeCase(type)
    const formattedCategory = toSnakeCase(category)
    const formattedSearch = toSnakeCase(search)

    let finalUrl = `${formattedType}?page=${page}`

    if (formattedCategory) {
        const genreId = getGenreIdFromName(formattedCategory)
        console.log('genreId', genreId)
        finalUrl += `&with_genres=${genreId}`
    }

    if (formattedSearch) {
        finalUrl += `&search=${formattedSearch}`
    }
    
    return finalUrl;
}
