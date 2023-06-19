import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieicon from '../assets/movie.svg';
import tvicon from '../assets/tv.svg';
import { ListOfSeries } from "../components/ListOfSeries";
import { getSerieList } from "../services/getSerieList";

export function Series() {
    const [movieList, setMovieList] = useState([]);


    useEffect(() => {
        getSerieList().then(data => {
            setMovieList(data)
        })
    }, [])
    return (
        <>
            <div className='bg-black text-white'>
                <div className='flex justify-around py-2 h-10'>
                    <Link to="/" aria-checked='true' className='flex gap-1 items-center  hover:border-b-slate-50 hover:border-b-2'><img src={movieicon} className='w-4' alt="movie Icon" /> Peliculas</Link>
                    <Link to={`/series`} className='flex gap-1 items-center hover:border-b-2'><img src={tvicon} className='w-5' alt="tv Icon" /> Series</Link>
                </div>
                <div className='w-full max-w-[1200px] mx-auto'>
                    {movieList && <ListOfSeries movieList={movieList} />}
                    <div className='flex justify-around h-12 items-center'>
                        {movieList && <button className='h-6 hover:border-b-slate-50 hover:border-b-2'>Siguiente</button>}
                    </div>
                </div>
            </div>
        </>
    )
}