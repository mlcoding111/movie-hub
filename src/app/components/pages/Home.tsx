"use client";

import { Button } from "@/components/ui/button";
import { Play, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import MoviesList from "../common/MoviesList";
import { getMovies } from "@/api/movie";
import { toSnakeCase } from "@/utils/string";
import { useInView } from "react-intersection-observer";
import Spinner from "../common/Spinner";
import { debounce } from "lodash";

const MOVIES_PER_PAGE = 20

export default function Home({ movies, categories }: { movies: any, categories: any[] }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedType, setSelectedType] = useState("Popular")
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")

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
                const mergedMovies = [...moviesList, ...response.results]
                console.log('The merged movies are', mergedMovies)
                setMoviesList(mergedMovies)
            } else {
                setMoviesList(response.results || [])
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setIsLoading(false)
        }
    }, [moviesList]);

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
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center space-x-2">
                                <Play className="h-8 w-8 text-primary" />
                                <span className="text-2xl font-bold">MovieHub</span>
                            </Link>
                            <nav className="hidden md:flex space-x-6">
                                <Link href="#" className="text-sm font-medium hover:text-primary">
                                    Home
                                </Link>
                                <Link href="#" className="text-sm font-medium hover:text-primary">
                                    Movies
                                </Link>
                                <Link href="#" className="text-sm font-medium hover:text-primary">
                                    TV Shows
                                </Link>
                                <Link href="#" className="text-sm font-medium hover:text-primary">
                                    Genres
                                </Link>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Search movies..."
                                    className="pl-10 w-64"
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                />
                            </div>
                            <Button>Sign In</Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-96 bg-gradient-to-r from-purple-900 to-blue-900 flex items-center">
                <div className="absolute inset-0 bg-black/50" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">Discover Amazing Movies</h1>
                        <p className="text-xl mb-6">Explore thousands of movies across all genres. Find your next favorite film.</p>
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                            Start Exploring
                        </Button>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Browse by Genre</h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Link key={category.name} href={`/genre/${category.name.toLowerCase()}`}>
                                <Badge variant="secondary">{category.name}</Badge>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Movies Section */}
            <section className="py-12 bg-muted/30">
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
            </section>
        </div>
    );
}
