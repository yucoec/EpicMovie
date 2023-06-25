import { useEffect, useState } from "react";
import { getAnimeList } from "../services/getAnimeList";
import getEpisodeDetails from "../services/getEpisodeDetails";
import getEpisodeImages from "../services/getEpisodeImages";
import getSerieDetails from "../services/getSerieDetails";

const useEpisodeAnimeDetails = (id, season, episode) => {
    const [detailsEpisode, setDetailsEpisode] = useState(null);
    const [links, setLinks] = useState([]);
    const [images, setImages] = useState([]);
    const [poster, setPoster] = useState(null);


    useEffect(() => {
        getAnimeList().then((data) => {
            const matchingSerie = data.find((serieObj) => {
                return (serieObj.id) === Number(id)
            });
            if (matchingSerie) {
                const matchingSeason = matchingSerie.seasons.find(
                    (seasonObj) => seasonObj.season_number === Number(season)
                );
                if (matchingSeason) {
                    const matchingEpisode = matchingSeason.episodes.find(
                        (episodeObj) => episodeObj.episode_number === Number(episode)
                    );
                    if (matchingEpisode) {
                        setLinks(matchingEpisode);
                    }
                }
            }
        });

        getSerieDetails(id, "tv").then((res) => {
            const currentSerie = res.seasons.find((currentSeason) => currentSeason.season_number === Number(season));
            setPoster(currentSerie.poster_path);
        });

        getEpisodeDetails(id, season, episode).then((res) => {
            setDetailsEpisode(res);
        });

        getEpisodeImages(id, season, episode).then((res) => {
            setImages(res.stills);
        });
    }, [id, season, episode]);


    return { detailsEpisode, links, images, poster };
};

export default useEpisodeAnimeDetails;
