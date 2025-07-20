"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, ArrowLeft, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// Extended movie data for genre pages
const allMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "action",
    poster: "/placeholder.svg?height=400&width=300",
    director: "Christopher Nolan",
    duration: "152 min",
  },
  {
    id: 2,
    title: "Mad Max: Fury Road",
    year: 2015,
    rating: 8.1,
    genre: "action",
    poster: "/placeholder.svg?height=400&width=300",
    director: "George Miller",
    duration: "120 min",
  },
  {
    id: 3,
    title: "John Wick",
    year: 2014,
    rating: 7.4,
    genre: "action",
    poster: "/placeholder.svg?height=400&width=300",
    director: "Chad Stahelski",
    duration: "101 min",
  },
  {
    id: 4,
    title: "Die Hard",
    year: 1988,
    rating: 8.2,
    genre: "action",
    poster: "/placeholder.svg?height=400&width=300",
    director: "John McTiernan",
    duration: "132 min",
  },
  {
    id: 5,
    title: "The Avengers",
    year: 2012,
    rating: 8.0,
    genre: "action",
    poster: "/placeholder.svg?height=400&width=300",
    director: "Joss Whedon",
    duration: "143 min",
  },
  {
    id: 6,
    title: "Terminator 2",
    year: 1991,
    rating: 8.6,
    genre: "action",
    poster: "/placeholder.svg?height=400&width=300",
    director: "James Cameron",
    duration: "137 min",
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genre: "action",
    poster: "/placeholder.svg?height=400&width=300",
    director: "The Wachowskis",
    duration: "136 min",
  },
  {
    id: 8,
    title: "Gladiator",
    year: 2000,
    rating: 8.5,
    genre: "action",
    poster: "/placeholder.svg?height=400&width=300",
    director: "Ridley Scott",
    duration: "155 min",
  },
  // Add more movies for other genres
  {
    id: 9,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: "drama",
    poster: "/placeholder.svg?height=400&width=300",
    director: "Frank Darabont",
    duration: "142 min",
  },
  {
    id: 10,
    title: "Forrest Gump",
    year: 1994,
    rating: 8.8,
    genre: "drama",
    poster: "/placeholder.svg?height=400&width=300",
    director: "Robert Zemeckis",
    duration: "142 min",
  },
]

const genreInfo = {
  action: {
    title: "Action Movies",
    description:
      "High-octane thrills, explosive sequences, and adrenaline-pumping adventures that keep you on the edge of your seat.",
    heroImage: "/placeholder.svg?height=400&width=800",
    totalMovies: 1250,
    topDirectors: ["Christopher Nolan", "James Cameron", "Michael Bay"],
  },
  drama: {
    title: "Drama Movies",
    description: "Compelling stories that explore the human condition with emotional depth and powerful performances.",
    heroImage: "/placeholder.svg?height=400&width=800",
    totalMovies: 890,
    topDirectors: ["Frank Darabont", "Martin Scorsese", "Steven Spielberg"],
  },
  comedy: {
    title: "Comedy Movies",
    description: "Laugh-out-loud entertainment with witty dialogue, hilarious situations, and memorable characters.",
    heroImage: "/placeholder.svg?height=400&width=800",
    totalMovies: 1560,
    topDirectors: ["Judd Apatow", "Edgar Wright", "Jordan Peele"],
  },
  "sci-fi": {
    title: "Sci-Fi Movies",
    description: "Explore the future, space, and technology with mind-bending concepts and spectacular visual effects.",
    heroImage: "/placeholder.svg?height=400&width=800",
    totalMovies: 780,
    topDirectors: ["Denis Villeneuve", "Ridley Scott", "Christopher Nolan"],
  },
}

const MOVIES_PER_PAGE = 12

export default function GenrePage() {
  const params = useParams()
  const genreName = params.name as string
  const genre = genreInfo[genreName as keyof typeof genreInfo] || genreInfo.action

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [yearFilter, setYearFilter] = useState("all")

  // Filter movies by genre and search
  const filteredMovies = allMovies.filter((movie) => {
    const matchesGenre = movie.genre === genreName
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesYear =
      yearFilter === "all" ||
      (yearFilter === "2020s" && movie.year >= 2020) ||
      (yearFilter === "2010s" && movie.year >= 2010 && movie.year < 2020) ||
      (yearFilter === "2000s" && movie.year >= 2000 && movie.year < 2010) ||
      (yearFilter === "1990s" && movie.year >= 1990 && movie.year < 2000)

    return matchesGenre && matchesSearch && matchesYear
  })

  // Sort movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "year":
        return b.year - a.year
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedMovies.length / MOVIES_PER_PAGE)
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE
  const endIndex = startIndex + MOVIES_PER_PAGE
  const currentMovies = sortedMovies.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-80">
        <Image src={genre.heroImage || "/placeholder.svg"} alt={genre.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{genre.title}</h1>
            <p className="text-xl mb-6">{genre.description}</p>
            <div className="flex items-center space-x-6 text-sm">
              <div>
                <span className="font-semibold text-2xl">{genre.totalMovies.toLocaleString()}</span>
                <p>Movies Available</p>
              </div>
              <div>
                <span className="font-semibold">Top Directors:</span>
                <p>{genre.topDirectors.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={`Search ${genre.title.toLowerCase()}...`}
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                />
              </div>
              <Select
                value={yearFilter}
                onValueChange={(value) => {
                  setYearFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2020s">2020s</SelectItem>
                  <SelectItem value="2010s">2010s</SelectItem>
                  <SelectItem value="2000s">2000s</SelectItem>
                  <SelectItem value="1990s">1990s</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">{sortedMovies.length} movies found</div>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : `All ${genre.title}`}
            </h2>
            <p className="text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedMovies.length)} of {sortedMovies.length} movies
            </p>
          </div>

          {currentMovies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
                {currentMovies.map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <Image
                            src={movie.poster || "/placeholder.svg"}
                            alt={movie.title}
                            width={300}
                            height={400}
                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-black/70 text-white">
                              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {movie.rating}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2">{movie.title}</h3>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div className="flex items-center justify-between">
                              <span>{movie.year}</span>
                              <span>{movie.duration}</span>
                            </div>
                            <p className="truncate">{movie.director}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

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
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNumber
                      if (totalPages <= 7) {
                        pageNumber = i + 1
                      } else if (currentPage <= 4) {
                        pageNumber = i + 1
                      } else if (currentPage >= totalPages - 3) {
                        pageNumber = totalPages - 6 + i
                      } else {
                        pageNumber = currentPage - 3 + i
                      }

                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNumber)}
                          className="w-10"
                        >
                          {pageNumber}
                        </Button>
                      )
                    })}
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
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No movies found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setYearFilter("all")
                  setCurrentPage(1)
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
