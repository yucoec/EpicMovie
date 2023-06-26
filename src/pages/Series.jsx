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
                    <div className='flex justify-around h-12 items-center'>
                        {movieList && <button className='h-6 hover:border-b-slate-50 hover:border-b-2'>Siguiente</button>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Series;