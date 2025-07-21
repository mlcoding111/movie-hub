const BASE_URL = 'https://api.themoviedb.org/3';

// TODO: Add: language=en-US, page=1, sort_by=popularity.desc, by default. Also handle the with_genres parameter.

/**
 * Extends fetch to include a default error handler
 * @param url - The URL to fetch
 * @param options - The options to pass to fetch
 * @returns The response from the API
 */
export const apiFetch = async (url: string, options: RequestInit = {}): Promise<any> => {
    const fullUrl = `${BASE_URL}/${url}`;
    
    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
    }

    console.log('The full url is', fullUrl)

    const mergedOptions = { ...defaultOptions, ...options }

    try {
        const response = await fetch(fullUrl, mergedOptions)
        if (!response.ok) {
            console.error('API Error:', response)
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}