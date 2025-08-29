import { getSimilarMovies } from "@/api/movie"
import { useParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import MovieCard from "../common/MovieCard"
import Link from "next/link"

export default function RelatedMovies() {
    // Get the movie id from the url
    const movieId = Number.parseInt(useParams().id as string)

    const [relatedMovies, setRelatedMovies] = useState<any[]>([])

    const getRelatedMovies = useCallback(async () => {
        const relatedMovies = await getSimilarMovies(movieId)
        setRelatedMovies(relatedMovies.results)
    }, [movieId])

    useEffect(() => {
        getRelatedMovies()
    }, [getRelatedMovies])

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
            {relatedMovies?.map((movie: any) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <MovieCard movie={movie} />
                </Link>
            ))}
        </div>
    )
}