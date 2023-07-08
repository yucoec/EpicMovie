import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { ListOfSeries } from "../components/ListOfSeries";
import { getSerieList } from "../services/getSerieList";

const Series = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        getSerieList().then(data => {
            setMovieList(data)
        })
    }, [])
    return (
        <>
            <div className='bg-black text-white'>
                <div className='w-full max-w-[1200px] mx-auto'>
                    {movieList && <ListOfSeries movieList={movieList} />}
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Series;