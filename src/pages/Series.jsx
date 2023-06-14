import { useEffect, useState } from "react";
import { AiFillFire, AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ListOfSeries } from "../components/ListOfSeries";
import { getSerieList } from "../services/getSerieList";

export function Series() {
    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        getSerieList().then(data => {
            setMovieList(data)
        })
    }, [])
    return (
        <>
            <div className='bg-black text-white'>
                <div className='flex justify-around py-2 h-10'>
                    <button aria-checked='true' className='flex gap-1 items-center  hover:border-b-slate-50 hover:border-b-2' onClick={() => navigate('/')}><AiFillFire className='text-sm' /> Peliculas</button>
                    <button className='flex gap-1 items-center hover:border-b-2' onClick={() => navigate('/series')}><AiFillStar /> Series</button>
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