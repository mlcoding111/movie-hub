const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";

export function getImageUrl(image: string, size: string = "original") {
    if (!image) return "https://placehold.co/600x400?text=No+Image.svg";
    return `${BASE_IMAGE_URL}${size}/${image}`;
}