"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getMovieReviews } from "@/api/movie"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getImageUrl } from "@/utils/images"

export default function Reviews() {
    // Get the movie id from the url
    const movieId = Number.parseInt(useParams().id as string)

    const [reviews, setReviews] = useState<any[]>([])

    async function getReviews() {
        const reviews = await getMovieReviews(movieId)
        console.log(reviews)
        setReviews(reviews.results)
    }

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <div className="space-y-3">
            {reviews?.map((review: any) => (
                <Link href={review.url} key={review.id} target="_blank" className="rounded-lg p-4">
                    <Card key={review.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={getImageUrl(review.author_details.avatar_path)} />
                                        <AvatarFallback>
                                            {review.author[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold">{review.author}</h4>
                                        <p className="text-sm text-muted-foreground">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {/* Created at */}
                                    <p className="text-sm text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">{review.content}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}