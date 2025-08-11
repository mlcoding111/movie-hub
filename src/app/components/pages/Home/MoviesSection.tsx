
import MoviesList from "../../common/MoviesList"
import TypeChangeButtons from "./TypeChangeButtons"
import { getMovies } from "@/api/movie";
import { buildMovieUrl } from "@/utils/query";
import { toTitleCase } from "@/utils/string";

const MOVIES_PER_PAGE = 20;

export default async function MoviesSection({ params }: { params: any }) {
    const { type = 'popular', page = 1 } = params
    const movies = await getMovies(await buildMovieUrl({ type, page: parseInt(page as string) || 1 }))
    return (
        <section className="py-12 bg-muted/30" key={params.type + params.category}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">
                            {toTitleCase(type)} Movies
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
        </section>
    )
}