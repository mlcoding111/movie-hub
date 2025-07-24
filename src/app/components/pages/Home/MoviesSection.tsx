import { toSnakeCase } from "@/utils/string"
import MoviesList from "../../common/MoviesList"
import TypeChangeButtons from "./TypeChangeButtons"
import { getMovies } from "@/api/movie";

const MOVIES_PER_PAGE = 20;

export default async function MoviesSection({ params }: { params: any }) {
    const { type = 'popular', category = 'all', page = 1 } = params
    const movies = await getMovies(await buildUrl(category, type, parseInt(page as string) || 1))

    // TODO: Move this to a separate file
    async function buildUrl(category: string, type: string, page: number = 1) {
        const formattedType = toSnakeCase(type)
        const formattedCategory = toSnakeCase(category)
        const url = `${formattedType}?with_genres=${formattedCategory}&page=${page}`;
        return url;
    }

    return (
        <section className="py-12 bg-muted/30" key={params.type + params.category}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">
                            {category === "All" ? "All Movies" : `${category} Movies`}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Showing {MOVIES_PER_PAGE * page} of {movies?.total_results} movies
                        </p>
                    </div>
                    <TypeChangeButtons />
                </div>

                {/* Movies Grid */}
                <MoviesList movies={movies} />
            </div>
        </section >
    )
}