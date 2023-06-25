import { useEffect, useState } from "react";
import { ListOfAnimes } from "../components/ListOfAnimes";
import { getAnimeList } from "../services/getAnimeList";

export function Anime() {
    const [movieList, setMovieList] = useState([]);


    useEffect(() => {
        getAnimeList().then(data => {
            setMovieList(data)
        })
    }, [])
    return (
        <>
            <div className='bg-black text-white'>
                <div className='w-full max-w-[1200px] mx-auto'>
                    {movieList && <ListOfAnimes movieList={movieList} />}
                    <div className='flex justify-around h-12 items-center'>
                        {movieList && <button className='h-6 hover:border-b-slate-50 hover:border-b-2'>Siguiente</button>}
                    </div>
                </div>
            </div>
        </>
    )
}