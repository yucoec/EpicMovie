import { useEffect, useState } from "react";
import { AiFillFire, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ListOfMovies } from "../components/ListOfMovies";
import { getMovieList } from "../services/getMovieList";

export function Home() {
    const [movieList, setMovieList] = useState([]);


    useEffect(() => {
        getMovieList().then(data => {
            setMovieList(data)
        })
    }, [])

    return (
        <>
            <div className='bg-black text-white'>
                <div className='flex justify-around py-2 h-10'>
                    <Link to="/" aria-checked='true' className='flex gap-1 items-center  hover:border-b-slate-50 hover:border-b-2'><AiFillFire className='text-sm' /> Peliculas</Link>
                    <Link to={`/series`} className='flex gap-1 items-center hover:border-b-2'><AiFillStar /> Series</Link>
                </div>
                <div className='w-full max-w-[1400px] mx-auto'>
                    {movieList && <ListOfMovies movieList={movieList} />}
                    <div className='flex justify-around h-12 items-center'>
                        {movieList && <button className='h-6 hover:border-b-slate-50 hover:border-b-2'>Descubre más</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

