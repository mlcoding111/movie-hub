"use client";

import { Button } from "@/components/ui/button";
import { Play, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MoviesList from "../common/MoviesList";
import { getMovies } from "@/api/movie";
import { toSnakeCase } from "@/utils/string";

const MOVIES_PER_PAGE = 12

export default function Home({ movies, categories }: { movies: any[], categories: any[] }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedType, setSelectedType] = useState("Popular")
    const [searchQuery, setSearchQuery] = useState("")

    const [moviesList, setMoviesList] = useState(movies.results || []);

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getMovies(toSnakeCase(selectedType));
            setMoviesList(movies.results || []);
        }
        if (selectedType) {
            fetchMovies();
        }
    }, [selectedType]);

    // Filter movies based on category and search
    const filteredMovies = moviesList.filter((movie) => {
        const matchesCategory = selectedCategory === "All" || movie.genre === selectedCategory
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    // Calculate pagination
    const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE)
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE
    const endIndex = startIndex + MOVIES_PER_PAGE
    const currentMovies = filteredMovies.slice(startIndex, endIndex)

    // Reset to page 1 when filters change
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    const handleTypeChange = (type: string) => {
        setSelectedType(type)
        setCurrentPage(1)
    }

    const handleSearchChange = (query: string) => {
        setSearchQuery(query)
        setCurrentPage(1)
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link key={category.name} href={`/genre/${category.name.toLowerCase()}`}>
                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            <Image
                                                src={category.image || "/placeholder.svg"}
                                                alt={category.name}
                                                width={300}
                                                height={200}
                                                className="w-full h-32 object-cover rounded-t-lg"
                                            />
                                            <div className="absolute inset-0 bg-black/40 rounded-t-lg" />
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h3 className="font-semibold text-lg">{category.name}</h3>
                                                <p className="text-sm opacity-90">{category.count} movies</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
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
                                Showing {startIndex + 1}-{Math.min(endIndex, filteredMovies.length)} of {filteredMovies.length} movies
                            </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                                {["Popular", "Upcoming", "Now Playing", "Top Rated"].map((type) => (
                                    <Button
                                        key={type}
                                        variant={selectedType === type ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleTypeChange(type)}
                                    >
                                        {type}
                                    </Button>
                                ))}
                            </div>
                            <div className="flex items-center space-x-2">
                                {/* <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange("All")}
                >
                All
              </Button>
              {["Action", "Drama", "Sci-Fi", "Comedy"].map((genre) => (
                <Button
                key={genre}
                variant={selectedCategory === genre ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(genre)}
                >
                  {genre}
                </Button>
              ))} */}
                            </div>
                        </div>
                    </div>

                    {/* Movies Grid */}
                    <MoviesList movies={currentMovies} />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>

                            <div className="flex space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(page)}
                                        className="w-10"
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
