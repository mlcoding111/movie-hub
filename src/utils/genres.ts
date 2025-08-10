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
    console.log('genreId', genreId)
    return genreId;
}