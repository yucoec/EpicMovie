import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getSeasonList from "../services/getSeasonList";

const SeasonListAnime = ({ id, season_number, name, episodes }) => {
    const [season, setSeason] = useState([])
    useEffect(() => {
        getSeasonList(id, season_number).then(res => {
            setSeason(res.episodes)
        })
    }, [id])

    const filteredEpisodes = season.filter(episode => {
        return episodes && episodes.some(
            themoviedbEpisode => themoviedbEpisode.episode_number === episode.episode_number
        );
    });


    const nameSerie = name.split(' ').join('-')

    return (
        <>
            <h3 className="text-center py-3 text-xl">{`${name} Temporada ${season_number}`}</h3>
            <div key={id} className="text-white max-[572px]:px-2 grid grid-cols-[repeat(auto-fit,250px)] min-[1000px]:grid-cols-4 max-[572px]:grid-cols-none gap-4 min-[482px]:mx-5 justify-items-center justify-center pt-2">
                {filteredEpisodes.map(({ name, id: idEpisodes, still_path, episode_number, season_number }) => {
                    return (
                        <Link key={idEpisodes} id={idEpisodes} to={`/anime/${id}/${nameSerie}/${season_number}/${episode_number}`} className="cursor-pointer h-auto bg-transparent w-full rounded mb-2  hover:scale-105 duration-300">
                            <figure className="relative">
                                <span className="absolute hover: bottom-0 left-0 right-[-0.5px] h-14 bg-gradient-to-t from-black/80 via-transparent to-transparent"></span>
                                <img src={`https://image.tmdb.org/t/p/w500${still_path}`} alt={name} />
                            </figure>
                            <h2 className="py-3">{episode_number}.- {name}</h2>
                        </Link>
                    )
                })}


            </div >
        </>
    )

}

export default SeasonListAnime