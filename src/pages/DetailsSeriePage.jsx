import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import SerieDetails from '../components/SerieDetails'
import getMovieDetails from '../services/getMovieDetails'

const DetailsSeriePage = () => {
    const [details, setDetails] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const category = 'tv'
    const backPage = () => {
        navigate(-1)
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
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4332686282875056"
                        crossorigin="anonymous"></script>
                </Helmet>}
            {details && <SerieDetails details={details} backPage={backPage} category={category} />}
        </>
    )
}

export default DetailsSeriePage