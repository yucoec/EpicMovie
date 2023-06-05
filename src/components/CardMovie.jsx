import { useEffect, useState } from "react";
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import imageNotFound from '../assets/imageNotFound.png';
import { getInfoMovie } from "../services/getInfoMovie";

export function CardMovie({ id, category, calidad }) {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        getInfoMovie(id, category).then(data => {
            setInfo(data)
        })
    }, [id])

    if (!info) {
        return null;
    }

    const { id: movieId, poster_path, title, release_date, vote_average } = info;

    return (
        <Link to={`/details/${id}`} className='cursor-pointer h-auto bg-[#1a1a1a] w-full rounded-b mb-2 hover:scale-105 duration-300 relative' id={movieId}>
            {poster_path ? <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`poster de ${title}`} /> : <img src={imageNotFound} alt='img not found' />}
            <div className='m-1 flex items-center gap-1'>
                <AiFillStar className='text-yellow-500 w-4' />
                <p>{vote_average.toFixed(1)}</p>
            </div>
            <div className='h-10 p-2 leading-4 text-ellipsis overflow-hidden block '>
                <span className=' whitespace-nowrap text-inherit'>{title}</span>
            </div>
            <div className='my-5'>
                <p className='p-2'>{release_date.split('-')[0]}</p>
            </div>

            <div className="absolute right-1 bottom-[155px]">
                <p className="bg-cyan-500 w-fit p-1 rounded-xl text-sm">{calidad}</p>
            </div>

        </Link>
    )
}