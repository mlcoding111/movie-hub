"use client";
import Link from "next/link";
import MovieCard from "./MovieCard";

export default function MoviesList({ movies }: { movies: any[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
            {movies.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <MovieCard movie={movie} />
                </Link>
            ))}
        </div>
    )
}