"use client"

import { Button } from "@/components/ui/button"
import MoviesList from "../../common/MoviesList"
import Spinner from "../../common/Spinner"
import { useState, useCallback, useEffect } from "react"
import { debounce } from "lodash"
import { useInView } from "react-intersection-observer"
import { getMovies } from "@/api/movie"
import { toSnakeCase } from "@/utils/string"

const MOVIES_PER_PAGE = 20;

export default function MoviesSection({ movies, categories }: { movies: any, categories: any }) {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedType, setSelectedType] = useState("Popular")
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const { ref, inView } = useInView({
        threshold: 0.5,
    })
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const [moviesList, setMoviesList] = useState(movies.results || []);

    const fetchMovies = useCallback(async (category: string, type: string, append: boolean = false, page: number = 1) => {
        setIsLoading(true)
        try {
            const response = await getMovies(buildUrl(category, type, page));
            if (response.total_pages <= page) {
                setHasMore(false)
            }
            if (append) {
                setMoviesList((prev: any[]) => [...prev, ...response.results])
            } else {
                setMoviesList(response.results || [])
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setIsLoading(false)
        }
    }, []); // No moviesList in dependencies

    // Create debounced version of fetchMovies
    const debouncedFetchMovies = useCallback(
        debounce(fetchMovies, 300),
        [fetchMovies]
    );

    useEffect(() => {
        debouncedFetchMovies(selectedCategory, selectedType, false, page);
    }, [selectedType, selectedCategory, debouncedFetchMovies]);

    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            const nextPage = page + 1
            setPage(nextPage)
            debouncedFetchMovies(selectedCategory, selectedType, true, nextPage);
        }
    }, [inView, hasMore, debouncedFetchMovies]);

    function buildUrl(category: string, type: string, page: number = 1) {
        const formattedType = toSnakeCase(type)
        const formattedCategory = toSnakeCase(category)
        return `${formattedType}?with_genres=${formattedCategory}&page=${page}`;
    }

    // Filter movies based on category and search
    const filteredMovies = moviesList.filter((movie: any) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))

    // Reset to page 1 when filters change
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1)
        setPage(1)
    }

    const handleTypeChange = (type: string) => {
        setSelectedType(type)
        setCurrentPage(1)
        setPage(1)
    }

    const handleSearchChange = (query: string) => {
        setSearchQuery(query)
        setCurrentPage(1)
        setPage(1)
    }

    function TypeButtons() {
        return (
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                    {["Popular", "Upcoming", "Now Playing", "Top Rated"].map((type) => (
                        <Button key={type} variant={selectedType === type ? "default" : "outline"} size="sm" onClick={() => handleTypeChange(type)}>
                            {type}
                        </Button>
                    ))}
                </div>
            </div>
        )
    }   

    return (
        <section className = "py-12 bg-muted/30" >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">
                            {selectedCategory === "All" ? "All Movies" : `${selectedCategory} Movies`}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Showing {MOVIES_PER_PAGE * page} of {movies.total_results} movies
                        </p>
                    </div>
                    <TypeButtons />
                </div>

                {/* Movies Grid */}
                <MoviesList movies={filteredMovies} />
                {hasMore && (
                    <div ref={ref} className="py-4 text-center text-gray-500">
                        <Spinner />
                    </div>
                )}
                {!hasMore && (
                    <div className="py-4 text-center text-green-500">No more items</div>
                )}
            </div>
     </section >
    )
}