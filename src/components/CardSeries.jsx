import { useEffect, useState } from "react";
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import imageNotFound from '../assets/imageNotFound.png';
import { getInfoMovie } from "../services/getInfoMovie";

export function CardSeries({ id, category }) {
    const [info, setInfo] = useState(null)
    useEffect(() => {
        getInfoMovie(id, category).then(data => {
            setInfo(data)
        })
    }, [id])

    if (!info) {
        return null;
    }

    const { id: movieId, poster_path, name, first_air_date, vote_average } = info;
    const nameSerie = name.split(' ').join('-').toLowerCase();

    return (
        <Link to={`/series/${id}/${nameSerie}`} className='cursor-pointer h-auto bg-[#1a1a1a] w-full rounded-b mb-2  hover:scale-105 duration-300' id={movieId}>
            {poster_path ? <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`poster de ${name}`} /> : <img src={imageNotFound} alt='img not found' />}
            <div className='m-1 flex items-center gap-1'>
                <AiFillStar className='text-yellow-500 w-4' />
                <p>{vote_average.toFixed(1)}</p>
            </div>
            <div className='h-10 p-2 leading-4 text-ellipsis overflow-hidden block '>
                <span className=' whitespace-nowrap text-inherit'>{name}</span>
            </div>
            <div className='my-5'>
                <p className='p-2'>{first_air_date.split('-')[0]}</p>
            </div>
        </Link>
    )
}