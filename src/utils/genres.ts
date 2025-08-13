export const GENRES = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
}

// Random description for each genre
export const GENRE_DESCRIPTIONS = {
    28: 'Action movies are thrilling and exciting, featuring intense physical and emotional challenges.',
    12: 'Adventure movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    16: 'Animation movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    35: 'Comedy movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    80: 'Crime movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    99: 'Documentary movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    18: 'Drama movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    10751: 'Family movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    14: 'Fantasy movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    36: 'History movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    27: 'Horror movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    10402: 'Music movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    9648: 'Mystery movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    10749: 'Romance movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    878: 'Science Fiction movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    10770: 'TV Movie movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    53: 'Thriller movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    10752: 'War movies are exciting and thrilling, featuring intense physical and emotional challenges.',
    37: 'Western movies are exciting and thrilling, featuring intense physical and emotional challenges.',
}

export const getGenreName = (genreId: number) => {
    return GENRES[genreId as keyof typeof GENRES] || 'Unknown';
}

export const getMovieAllGenres = (genre_ids: number[]) => {
    return genre_ids.map((id) => getGenreName(id));
}

export const getGenreIdFromName = (genreName: string) => {
    // Make sure the genreName and GENRES are the same case
    const formattedGenreName = genreName.toLowerCase()
    const genreId = Object.keys(GENRES).find((key) => GENRES[key as keyof typeof GENRES].toLowerCase() === formattedGenreName) as unknown as number;
    return genreId;
}