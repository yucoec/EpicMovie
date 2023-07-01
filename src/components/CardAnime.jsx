import { useEffect, useState } from "react";
import { AiFillStar } from 'react-icons/ai';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import imageNotFound from '../assets/imageNotFound.png';
import { getInfoMovie } from "../services/getInfoMovie";

export function CardAnime({ id, category, statusTv }) {
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
        <Link to={`/anime/${id}/${nameSerie}`} className='cursor-pointer h-auto bg-[#1a1a1a] w-full rounded-b mb-2  hover:scale-105 duration-300 relative' id={movieId}>
            {poster_path ? <LazyLoadImage className="w-[220px] h-[330px] max-[482px]:h-[240px] object-cover" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`poster de ${name}`} /> : <img src={imageNotFound} alt='img not found' />}
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
            {statusTv && <div className="absolute right-1 bottom-[155px]">
                <p className="bg-cyan-500 w-fit py-1 px-3 rounded-xl text-sm">{statusTv}</p>
            </div>}
        </Link>
    )
}