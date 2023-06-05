import { useEffect, useState } from 'react';
import { getMovieVideo } from '../services/getMovieVideo';

export function useMovieDetails({ id, category }) {
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)
        getMovieVideo(id, category)
            .then(newVideo => {
                setVideo(newVideo)
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    return { video, loading }
}