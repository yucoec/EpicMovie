import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CardMovie } from '../components/CardMovie';
import { CardSeries } from '../components/CardSeries';
import { getMovieSearch } from '../services/getMovieSearch';

const Search = () => {
    const [searchResults, setSearchResults] = useState(null);
    const { keyword } = useParams()
    useEffect(() => {
        getMovieSearch(keyword)
            .then((results) => setSearchResults(results))
    }, [keyword]);
    return (
        <div className='bg-black text-white h-full max-w-[1200px] mx-auto'>
            {searchResults && (<div className='grid gap-4 grid-cols-16 mx-[5px] justify-items-center justify-center pt-2'>
                {searchResults.length !== 0 ? (searchResults.map(({ category, id, calidad, name }) => {
                    return category === 'movie' ? (<CardMovie key={id} id={id} calidad={calidad} category={category} name={name} />) : (<CardSeries key={id} id={id} category={category} />)
                })) : (<div className='text-center h-screen'><b><p>No hay resultados de "{keyword}"</p></b></div>)}
            </div>)}
        </div>
    );
};

export default Search