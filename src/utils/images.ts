const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";

export function getImageUrl(image: string, size: string = "original") {
    if (!image) return "/placeholder.svg";
    return `${BASE_IMAGE_URL}${size}/${image}`;
}