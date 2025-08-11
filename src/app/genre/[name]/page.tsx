
import { getGenreIdFromName } from "@/utils/genres"
import { getMoviesByGenre } from "@/api/movie"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import MoviesList from "@/app/components/common/MoviesList"
import GenreFilters from "@/app/components/pages/Genre/GenreFilters"

// https://api.themoviedb.org/3/discover/movie?with_genres=28&page=1&sort_by=popularity.desc&language=en-US

export default async function GenrePage({ params }: { params: any }) {
  const { name } = await params
  const genreId = getGenreIdFromName(name)
  const response = await getMoviesByGenre(genreId)
  const totalMovies = response.total_results
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
            <Badge variant="secondary">{name} {genreId}</Badge>
          </Link>
        </div>
      </header>

      <section className="relative h-80">
        {/* <Image src={"/placeholder.svg"} alt={name} fill className="object-cover" /> */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">{name}</h1>
            <p className="text-xl mb-6">{name}</p>
            <div className="flex items-center space-x-6 text-sm">
              <div>
                <span className="font-semibold text-2xl">{totalMovies}</span>
                <p>Movies Available</p>
              </div>
              <div>
                <span className="font-semibold">Top Directors:</span>
                <p>{name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : `All ${genre.title}`}
            </h2>
            <p className="text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedMovies.length)} of {sortedMovies.length} movies
            </p>
          </div>
        </div>
      </section> */}
      <GenreFilters />
      <MoviesList movies={response} genreId={genreId} />
    </div>
  )
}
