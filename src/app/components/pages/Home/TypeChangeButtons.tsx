"use client"
import { Button } from "@/components/ui/button";
import { toSnakeCase } from "@/utils/string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TypeChangeButtons() {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleTypeChange = (type: string) => {
        updateSearchParam('type', type);
    }

    const params = {
        type: searchParams.get('type') || 'popular',
        category: searchParams.get('category') || 'all',
        search: searchParams.get('search') || '',
    }

    function updateSearchParam(key: string, value: string) {
        const params = new URLSearchParams(searchParams);

        params.set(key, value); // Replace or add the key-value pair
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    function compareType(type: string) {
        return toSnakeCase(params?.type) === toSnakeCase(type)
    }

    return (
        <div className="flex items-center space-x-2">
            {["Popular", "Upcoming", "Now Playing", "Top Rated"].map((type) => (
                <Button key={type} variant={compareType(type) ? "default" : "outline"} size="sm" onClick={() => handleTypeChange(type)}>
                    {type}
                </Button>
            ))}
        </div>
    )
}