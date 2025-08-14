"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/utils/images";
import { getMovieAllGenres } from "@/utils/genres";

export default function MovieCard({ movie }: { movie: any }) {
    const allGenres = getMovieAllGenres(movie.genre_ids);
    const maxVisibleGenres = 2; // Show only first 2 genres
    const visibleGenres = allGenres.slice(0, maxVisibleGenres);
    const hiddenGenresCount = allGenres.length - maxVisibleGenres;

    return (
        <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                        src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
                        alt={movie.title}
                        width={300}
                        height={400}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-black/70 text-white">
                            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                            {Math.round(movie.vote_average * 10) / 10}
                        </Badge>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{movie.title}</h3>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between">
                            <span>{movie.release_date.split('-')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                            {visibleGenres.map((genre) => (
                                <Badge variant="outline" className="text-xs" key={genre}>
                                    {genre}
                                </Badge>
                            ))}
                            {hiddenGenresCount > 0 && (
                                <Badge variant="outline" className="text-xs bg-muted/50">
                                    +{hiddenGenresCount} more
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}