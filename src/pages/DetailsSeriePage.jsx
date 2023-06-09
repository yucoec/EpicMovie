import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { Footer } from '../components/Footer'
import SerieDetails from '../components/SerieDetails'
import getMovieDetails from '../services/getMovieDetails'

const DetailsSeriePage = () => {
    const [details, setDetails] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const category = 'tv'
    const backPage = () => {
        navigate('/series')
    }

    useEffect(() => {
        getMovieDetails(id, category).then(setDetails)
    }, [id])

    return (
        <>
            {details &&
                <Helmet>
                    <title>{`Epic Movie | ${details.name}`}</title>
                    <meta name='description' content={`Details of ${details.name}`} />
                </Helmet>}
            {details && <SerieDetails details={details} backPage={backPage} category={category} />}
            <Footer />
        </>
    )
}

export default DetailsSeriePage