import { getMovieById } from "@/api/movie";
import MovieDetailsPage from "@/app/components/pages/MovieDetails";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const movieId = Number.parseInt((await params).id as string) || 1;
    const movie = await getMovieById(movieId);
    return(
      <Suspense fallback={<div>Loading...</div>}>
        <MovieDetailsPage movie={movie} />
      </Suspense>
    )
}