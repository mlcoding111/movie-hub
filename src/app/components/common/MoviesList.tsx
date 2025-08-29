"use client";

import Link from "next/link";
import MovieCard from "./MovieCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "./Spinner";
import { getMovies, getMoviesByGenre } from "@/api/movie";
import { toSnakeCase } from "@/utils/string";
import { debounce } from "lodash";
import { getGenreIdFromName } from "@/utils/genres";

export default function MoviesList({ movies, genreId = 0 }: { movies: any, genreId?: number }) {
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'popular';
    const search = searchParams.get('search');

    const [hasMore, setHasMore] = useState(true);
    const [moviesList, setMoviesList] = useState(movies?.results || []);
    const [page, setPage] = useState(1);

    const { ref, inView } = useInView({
        threshold: 0.5,
    })

    async function buildUrl(type: string, page: number = 1) {
        const formattedType = toSnakeCase(type)
        const url = `${formattedType}?page=${page}`;
        return url;
    }

    const loadMoreMovies = useCallback(async () => {
        let newMovies: any = [];
        if (genreId === 0) {
            newMovies = await getMovies(await buildUrl(type, page + 1))
        } else {
            // For genre-specific movies, we need to get the genre ID and use getMoviesByGenre
            newMovies = await getMoviesByGenre(genreId, page + 1)
        }
        setPage((prevPage: number) => prevPage + 1);
        setMoviesList((prevList: any[]) => prevList.concat(newMovies?.results || []));
        setHasMore(newMovies?.total_pages > page);
    }, [genreId, type, page]);


    useEffect(() => {
        if (genreId === 0) {
            setMoviesList(movies?.results || []);
        } else {
            setMoviesList(movies?.results || []);
        }
    }, [movies, genreId]);

    const debouncedLoadMore = useMemo(
        () => debounce(loadMoreMovies, 500),
        [loadMoreMovies]
    );

    useEffect(() => {
        if (inView && hasMore) {
            debouncedLoadMore();
        }
        return () => {
            debouncedLoadMore.cancel();
        }
    }, [inView, debouncedLoadMore, hasMore])

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
            {moviesList?.map((movie: any) => (
                <Link key={movie.id} href={`/movie/${movie.id} ${search ? `?search=${search}` : ''}`}>
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