import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { ListOfMovies } from '../components/ListOfMovies'
import getMovieSearch from '../services/getMovieSearch'

const SearchedMovies = () => {
    const [movieList, setMovieList] = useState([])
    const { keyword } = useParams()
    useEffect(() => {
        getMovieSearch(keyword).then((data) => {
            setMovieList(data)
        })
    }, [keyword])

    return (
        <>
            <Helmet>
                <title>Search of {keyword}</title>
                <meta name='description' content={`Search of ${keyword}`} />
            </Helmet>
            {movieList &&
                <div className='bg-black text-white h-full max-w-[1200px] mx-auto'>
                    {movieList.length !== 0 ? <ListOfMovies movieList={movieList} /> : <div className='text-center h-screen'><b><p>No hay resultados de "{keyword}"</p></b></div>}
                </div>}
        </>
    )
}

export default SearchedMovies