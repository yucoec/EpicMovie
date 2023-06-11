import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getSeasonList from "../services/getSeasonList";

const SeasonList = ({ id, season_number, name }) => {
    const [season, setSeason] = useState([])
    useEffect(() => {
        getSeasonList(id, season_number).then(res => {
            setSeason(res.episodes)
        })
    }, [id])


    const nameSerie = name.split(' ').join('-').toLowerCase();

    return (
        <>
            <h3 className="text-center py-3">{`${name} Temporada ${season_number}`}</h3>
            <div className="text-white grid grid-cols-4 gap-4 min-[482px]:mx-5 justify-items-center justify-center pt-2">
                {season.map(({ name, id, still_path, episode_number }) => (
                    <Link to={`/episode/${nameSerie + season_number + "x" + episode_number}`}>
                        <a key={id} className="cursor-pointer h-auto bg-transparent w-full rounded mb-2  hover:scale-105 duration-300">
                            <figure className="relative">
                                <span className="absolute hover: bottom-0 left-0 right-[-0.5px] h-14 bg-gradient-to-t from-black/80 via-transparent to-transparent"></span>
                                <img src={`https://image.tmdb.org/t/p/w500${still_path}`} alt={name} />
                            </figure>
                            <h2 className="py-3">{name}</h2>
                        </a>
                    </Link>
                ))}


            </div >
        </>
    )

}

export default SeasonList