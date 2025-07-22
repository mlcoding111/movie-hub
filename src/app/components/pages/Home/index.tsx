
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import MoviesSection from "./MoviesSection";
import Header from "./Header";
import { getGenres } from "@/api/genre";
import { getMovies } from "@/api/movie";
import CategoriesSection from "./CategoriesSection";
import { Suspense, use } from "react";
import { toSnakeCase } from "@/utils/string";

// SearchParams will contain: type, category, search
// type: popular, top_rated, upcoming, now_playing
// category: all, action, adventure, animation, comedy, crime, documentary, drama, family, fantasy, history, horror, music, mystery, romance, science_fiction, tv_movie, thriller, war, western
// search: search query

interface HomeProps {
    searchParams: {
        type: string;
        category: string;
        search: string;
    }
}

export default async function Home({ searchParams }: HomeProps) {
    const params = await searchParams;
    console.log(params);

    const [movies, categories] = await Promise.all([
        getMovies(toSnakeCase(params?.type || 'popular')),
        getGenres()
      ]);
    
    return (
        <div className="min-h-screen bg-background">
            <Header />

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

            {/* <CategoriesSection /> */}
            {/* <MoviesSection movies={movies} categories={categories} /> */}

            {/* Categories Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Browse by Genre</h2>
                    <div className="flex flex-wrap gap-2">
                        <Suspense fallback={<div>Loading...</div>}>
                        {categories.map((category) => (
                            <Link key={category.name} href={`/genre/${category.name.toLowerCase()}`}>
                                <Badge variant="secondary">{category.name}</Badge>
                            </Link>
                        ))}
                        </Suspense>
                    </div>
                </div>
            </section>


            <MoviesSection params movies={movies} categories={categories} />
        </div>
    );
}
