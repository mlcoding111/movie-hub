"use client"

import { Play, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearchChange = (query: string) => {
        setSearchQuery(query)
    }

    return (
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
                        <Button onClick={() => {
                            toast.error("Sign in not available")
                        }}>Sign In</Button>
                    </div>
                </div>
            </div>
        </header>

    )
}