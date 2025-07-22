import { getGenres } from "@/api/genre";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Suspense } from "react";

export default async function CategoriesSection() {
    const categories = await getGenres();

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Browse by Genre</h2>
                <div className="flex flex-wrap gap-2">
                    <Suspense fallback={<div>Loading.. ddd.</div>}>
                        {categories.map((category: any) => (
                            <Link key={category.name} href={`/genre/${category.name.toLowerCase()}`}>
                                <Badge variant="secondary">{category.name}</Badge>
                            </Link>
                        ))}
                    </Suspense>
                </div>
            </div>
        </section>
    )
}