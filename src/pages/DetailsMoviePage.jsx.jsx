import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import MovieDetails from '../components/MovieDetails'
import getMovieDetails from '../services/getMovieDetails'
import { getMovieList } from '../services/getMovieList'

const DetailsMoviePage = () => {
    const [details, setDetails] = useState(null)
    const [movieLinks, setMovieLinks] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const category = 'movie'
    const backPage = () => {
        navigate(-1)
    }

    useEffect(() => {
        getMovieDetails(id, category).then(setDetails)
        getMovieList().then(data => {
            const movieData = data.filter(movie => movie.id === Number(id))
            setMovieLinks(movieData)
        })
    }, [id])

    return (
        <>
            {details &&
                <Helmet>
                    <title>Epic Movie | {details.title}</title>
                    <meta name='description' content={`Details of ${details.title}`} />
                </Helmet>}
            {details && <MovieDetails details={details} backPage={backPage} category={category} movieLinks={movieLinks} />}
        </>
    )
}

export default DetailsMoviePage