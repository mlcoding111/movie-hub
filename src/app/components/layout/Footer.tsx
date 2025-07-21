import Link from "next/link";
import { Play } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background border-t py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Play className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">MovieHub</span>
                        </div>
                        <p className="text-muted-foreground">
                            Your ultimate destination for discovering and exploring movies from around the world.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Movies</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Popular
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Top Rated
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Upcoming
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Now Playing
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Genres</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Action
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Comedy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Drama
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Sci-Fi
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} MovieHub. All rights reserved.</p>
                </div>
            </div>
        </footer >
    )
}