"use client";

import { Button } from "@/components/ui/button";
import { Play, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MoviesList from "../common/MoviesList";

const MOVIES_PER_PAGE = 12

export default function Home({ movies, categories }: { movies: any[], categories: any[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("Popular")
  const [searchQuery, setSearchQuery] = useState("")

  const moviesList = movies.results || [];

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

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Play className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">MovieHub</span>
              </div>
              <p className="text-muted-foreground">
                Your ultimate destination for discovering and exploring movies from around the world.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Movies</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Popular
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Top Rated
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Upcoming
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Now Playing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Genres</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Action
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Comedy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Drama
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Sci-Fi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MovieHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
  // return (
  //   <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
  //     <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
  //       <Image
  //         className="dark:invert"
  //         src="/next.svg"
  //         alt="Next.js logo"
  //         width={180}
  //         height={38}
  //         priority
  //       />
  //       <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
  //         <li className="mb-2 tracking-[-.01em]">
  //           Get started by editing{" "}
  //           <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
  //             src/app/page.tsx
  //           </code>
  //           .
  //         </li>
  //         <li className="tracking-[-.01em]">
  //           Save and see your changes instantly.
  //         </li>
  //       </ol>

  //       <div className="flex gap-4 items-center flex-col sm:flex-row">
  //         <a
  //           className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
  //           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <Image
  //             className="dark:invert"
  //             src="/vercel.svg"
  //             alt="Vercel logomark"
  //             width={20}
  //             height={20}
  //           />
  //           Deploy now
  //         </a>
  //         <a
  //           className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
  //           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Read our docs
  //         </a>
  //       </div>
  //     </main>
  //     <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
  //       <a
  //         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
  //         href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <Image
  //           aria-hidden
  //           src="/file.svg"
  //           alt="File icon"
  //           width={16}
  //           height={16}
  //         />
  //         Learn
  //       </a>
  //       <a
  //         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
  //         href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <Image
  //           aria-hidden
  //           src="/window.svg"
  //           alt="Window icon"
  //           width={16}
  //           height={16}
  //         />
  //         Examples
  //       </a>
  //       <a
  //         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
  //         href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <Image
  //           aria-hidden
  //           src="/globe.svg"
  //           alt="Globe icon"
  //           width={16}
  //           height={16}
  //         />
  //         Go to nextjs.org →
  //       </a>
  //     </footer>
  //   </div>
  // );
}
