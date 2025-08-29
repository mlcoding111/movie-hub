"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Star, Play, Heart, Share2, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getImageUrl } from "@/utils/images"
import { toast } from "sonner"
import RelatedMovies from "./RelatedMovies"
import Reviews from "./Reviews"


type ProductionCompany = {
  id: number
  name: string
  logo_path: string
  origin_country: string
}

export default function MovieDetailsPage({ movie }: { movie: any }) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = localStorage.getItem("favorites")
    if (favorites) {
      setIsFavorite(favorites.includes(movie.id.toString()))
    }
  }, [movie.id])

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
              <Button variant="outline" size="sm" onClick={() => {
                setIsFavorite(!isFavorite)
                toast.success(isFavorite ? "Movie removed from favorites" : "Movie added to favorites")
              }}>
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                toast.error("Share not available")
              }}>
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
          <Image src={getImageUrl(movie.backdrop_path) || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-48 z-10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                <Image
                  src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1 md:text-white">
                <div className="mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                  <div className="flex items-center space-x-4 text-lg">
                    <span>{movie.release_date.split("-")[0]}</span>
                    <span>•</span>
                    <Badge variant="secondary">{movie.genres.map((genre: any) => genre.name).join(", ")}</Badge>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {movie.runtime} min
                    </div>
                  </div>
                </div>

                {/* <div className="flex items-center space-x-4 text-lg">
                  <span>{movie.tagline}</span>
                  <span>•</span>
                  <span>{movie.original_title}</span>
                </div> */}

                <div className="flex items-center space-x-6 mb-14">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-xl font-semibold">{Math.round(movie.vote_average * 10) / 10}</span>
                    <span className="text-sm ml-1 opacity-80">/10</span>
                  </div>
                  <div className="text-sm">
                    <div>IMDb: {Math.round(movie.vote_average * 10) / 10}/10</div>
                    <div>Rotten Tomatoes: {Math.round(movie.vote_count)}%</div>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-lg mb-6 leading-relaxed max-w-2xl text-slate-700">{movie.overview}</p>
                </div>

                <div className="flex space-x-4 mb-6">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={() => {
                    toast.error("Trailer not available")
                  }}>
                    <Play className="h-5 w-5 mr-2" />
                    Watch Trailer
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => {
                      toast.error("Watchlist not available")
                    }}
                  >
                    Add to Watchlist
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {/* {movie.genres.map((genre: any) => (
                    <Badge key={genre.id} variant="secondary">{genre.name}</Badge>
                  ))}
                  {movie.genres.map((genre: any) => (
                    <Badge key={genre.id} variant="secondary">{genre.name}</Badge>
                  ))} */}
                  {/* <div>
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
                  </div> */}
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
              <TabsTrigger value="cast">Production Companies</TabsTrigger>
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
                        <span>{movie.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Language:</span>
                        {movie.spoken_languages.map((language: any) => (
                          <span key={language.iso_639_1}>{language.english_name}</span>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Country:</span>
                        {movie.production_countries.map((country: any) => (
                          <span key={country.iso_3166_1}>{country.name}</span>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <span className="text-right">{movie.status}</span>
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
                          <span>{movie.vote_average}/10</span>
                        </div>
                        <Progress value={movie.vote_average * 10} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Rotten Tomatoes</span>
                          <span>{movie.vote_count}%</span>
                        </div>
                        <Progress value={movie.vote_count} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Popularity</span>
                          <span>{movie.popularity}</span>
                        </div>
                        <Progress value={Math.min((movie.popularity / 500) * 100, 100)} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cast" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {movie.production_companies.map((company: ProductionCompany) => (
                  <Card key={company.id}>
                    <CardContent className="p-4 text-center">
                      <Image src={getImageUrl(company.logo_path) || "/placeholder.svg"} alt={company.name} width={150} height={150} className="rounded-full mx-auto mb-3" />
                      <h4 className="font-semibold">{company.name}</h4>
                      <p className="text-sm text-muted-foreground">{company.origin_country}</p>
                    </CardContent>
                  </Card>
                ))}
                {/* {movie.stars.map((star, index) => (
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
                ))} */}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Reviews />
            </TabsContent>

            <TabsContent value="related" className="mt-8">
                <RelatedMovies />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
