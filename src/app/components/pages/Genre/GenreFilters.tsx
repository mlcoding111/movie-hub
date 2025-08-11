"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function GenreFilters() {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rating');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        updateSearchParam('search', e.target.value);
    }

    const handleFilterChange = (filterName: string, value: string) => {
        updateSearchParam(filterName, value);
    }

    function updateSearchParam(key: string, value: string) {
        const params = new URLSearchParams(searchParams);

        params.set(key, value);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        // Filters and Search
        <section className="py-8 border-b">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder={`Search...`}
                                className="pl-10 w-64"
                                value={searchQuery}
                                onChange={handleSearch}
                            />

                        </div>
                        {/* <Select
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
              </Select> */}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4" />
                            <span className="text-sm">Sort by:</span>
                            <Select value={sortBy} onValueChange={(value) => {
                                setSortBy(value);
                                handleFilterChange('sort_by', value);
                            }}>
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
                        {/* <div className="text-sm text-muted-foreground">{sortedMovies.length} movies found</div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

