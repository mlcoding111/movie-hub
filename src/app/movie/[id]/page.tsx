"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star, Play, Heart, Share2, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// Extended movie data with full details
const movieDetails = {
  1: {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action",
    duration: "152 min",
    director: "Christopher Nolan",
    writers: ["Jonathan Nolan", "Christopher Nolan"],
    stars: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    poster: "/placeholder.svg?height=600&width=400",
    backdrop: "/placeholder.svg?height=400&width=800",
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    budget: "$185 million",
    boxOffice: "$1.005 billion",
    language: "English",
    country: "USA",
    awards: "Won 2 Oscars, 159 wins & 163 nominations total",
    metascore: 84,
    imdbRating: 9.0,
    rottenTomatoes: 94,
    trailer: "https://example.com/trailer",
  },
  // Add more movie details as needed
}

const relatedMovies = [
  {
    id: 2,
    title: "Batman Begins",
    year: 2005,
    rating: 8.2,
    poster: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 3,
    title: "The Dark Knight Rises",
    year: 2012,
    rating: 8.4,
    poster: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 4,
    title: "Joker",
    year: 2019,
    rating: 8.4,
    poster: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 5,
    title: "Batman v Superman",
    year: 2016,
    rating: 6.4,
    poster: "/placeholder.svg?height=300&width=200",
  },
]

const reviews = [
  {
    id: 1,
    author: "John Smith",
    rating: 5,
    date: "2024-01-15",
    content:
      "An absolute masterpiece. Heath Ledger's performance as the Joker is unforgettable, and Christopher Nolan's direction is flawless.",
  },
  {
    id: 2,
    author: "Sarah Johnson",
    rating: 5,
    date: "2024-01-10",
    content: "The Dark Knight redefined what a superhero movie could be. Dark, complex, and incredibly well-crafted.",
  },
  {
    id: 3,
    author: "Mike Wilson",
    rating: 4,
    date: "2024-01-05",
    content: "Great movie with excellent cinematography and a compelling storyline. A must-watch for any Batman fan.",
  },
]

export default function MovieDetailsPage() {
  const params = useParams()
  const movieId = Number.parseInt(params.id as string)
  const movie = movieDetails[movieId as keyof typeof movieDetails] || movieDetails[1]
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Movies</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-96 overflow-hidden">
          <Image src={movie.backdrop || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-48 z-10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                <Image
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1 text-white">
                <div className="mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                  <div className="flex items-center space-x-4 text-lg">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <Badge variant="secondary">{movie.genre}</Badge>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {movie.duration}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-xl font-semibold">{movie.rating}</span>
                    <span className="text-sm ml-1 opacity-80">/10</span>
                  </div>
                  <div className="text-sm">
                    <div>IMDb: {movie.imdbRating}/10</div>
                    <div>Rotten Tomatoes: {movie.rottenTomatoes}%</div>
                  </div>
                </div>

                <p className="text-lg mb-6 leading-relaxed max-w-2xl">{movie.plot}</p>

                <div className="flex space-x-4 mb-6">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    <Play className="h-5 w-5 mr-2" />
                    Watch Trailer
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Add to Watchlist
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Director:</span>
                    <p>{movie.director}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Writers:</span>
                    <p>{movie.writers.join(", ")}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Stars:</span>
                    <p>{movie.stars.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="related">Related Movies</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Movie Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Budget:</span>
                        <span>{movie.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Box Office:</span>
                        <span>{movie.boxOffice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Language:</span>
                        <span>{movie.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Country:</span>
                        <span>{movie.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Awards:</span>
                        <span className="text-right">{movie.awards}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Ratings</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>IMDb</span>
                          <span>{movie.imdbRating}/10</span>
                        </div>
                        <Progress value={movie.imdbRating * 10} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Rotten Tomatoes</span>
                          <span>{movie.rottenTomatoes}%</span>
                        </div>
                        <Progress value={movie.rottenTomatoes} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Metacritic</span>
                          <span>{movie.metascore}/100</span>
                        </div>
                        <Progress value={movie.metascore} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cast" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {movie.stars.map((star, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 text-center">
                      <Image
                        src={`/placeholder.svg?height=150&width=150&query=${star}`}
                        alt={star}
                        width={150}
                        height={150}
                        className="rounded-full mx-auto mb-3"
                      />
                      <h4 className="font-semibold">{star}</h4>
                      <p className="text-sm text-muted-foreground">Actor</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {review.author[0]}
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="related" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedMovies.map((relatedMovie) => (
                  <Link key={relatedMovie.id} href={`/movie/${relatedMovie.id}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Image
                          src={relatedMovie.poster || "/placeholder.svg"}
                          alt={relatedMovie.title}
                          width={200}
                          height={300}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold mb-1">{relatedMovie.title}</h4>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{relatedMovie.year}</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                              {relatedMovie.rating}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
