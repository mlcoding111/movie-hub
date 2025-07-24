import { getSimilarMovies } from "@/api/movie"
import { useParams } from "next/navigation"

export default function RelatedMovies() {
    // Get the movie id from the url
    const movieId = Number.parseInt(useParams().id as string)

    async function getRelatedMovies() {
        const relatedMovies = await getSimilarMovies(movieId)
        return relatedMovies
    }

    const relatedMovies = getRelatedMovies()

    console.log(relatedMovies)
    return (
        <div>
            <h1>Related Movies</h1>
        </div>
    )
}