"use client";

import Link from "next/link";
import MovieCard from "./MovieCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "./Spinner";
import { getMovies } from "@/api/movie";
import { toSnakeCase } from "@/utils/string";
import { debounce } from "lodash";

export default function MoviesList({ movies }: { movies: any }) {
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'popular';
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search');

    const [hasMore, setHasMore] = useState(true);
    const [moviesList, setMoviesList] = useState(movies?.results || []);
    const [page, setPage] = useState(1);

    const { ref, inView } = useInView({
        threshold: 0.5,
    })

    async function buildUrl(category: string, type: string, page: number = 1) {
        const formattedType = toSnakeCase(type)
        const formattedCategory = toSnakeCase(category)
        const url = `${formattedType}?with_genres=${formattedCategory}&page=${page}`;
        return url;
    }


    async function loadMoreMovies() {
        const newMovies = await getMovies(await buildUrl(category, type, page + 1))
        setPage(page + 1);
        setMoviesList(moviesList.concat(newMovies?.results || []));
        setHasMore(newMovies?.total_pages > page);
    }

    const debouncedLoadMore = debounce(loadMoreMovies, 500);

    useEffect(() => {
        if (inView && hasMore) {
            debouncedLoadMore();
        }
        return () => {
            debouncedLoadMore.cancel();
        }
    }, [inView])

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
            {moviesList?.map((movie: any) => (
                <Link key={movie.id} href={`/movie/${movie.id}?search=${search}`}>
                    <MovieCard movie={movie} />
                </Link>
            ))}
            {hasMore && (
                <div ref={ref} className="py-4 col-span-full text-center text-gray-500">
                    <Spinner />
                </div>
            )}
            {!hasMore && (
                <div className="py-4 text-center text-green-500">No more items</div>
            )}
        </div>
    )
}