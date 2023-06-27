import { useEffect, useState } from 'react';
import { getAnimeList } from '../services/getAnimeList';

export function useChangeEpisodesAnime({ id, season, episode }) {
    const [episodes, setEpisodes] = useState([]);
    const [totalEpisodes, setTotalEpisodes] = useState(0);
    useEffect(() => {
        // Verificar si hay episodios para cambiar 
        getAnimeList().then((data) => {
            const matchingSerie = data.find((serieObj) => {
                return (serieObj.id) === Number(id)
            });
            if (matchingSerie) {
                const matchingSeason = matchingSerie.seasons.find(
                    (seasonObj) => seasonObj.season_number === Number(season)
                );
                setEpisodes(matchingSeason.episodes);
                setTotalEpisodes(matchingSeason.episodes.length);
            }
        });
    }, [id, season]);

    const currentIndex = episodes.findIndex(episodeN => {
        return episodeN.episode_number === Number(episode)
    });

    let prevEpisode = null;
    let nextEpisode = null;

    if (currentIndex !== -1) {
        const prevIndex = currentIndex - 1;
        const nextIndex = currentIndex + 1;

        prevEpisode = prevIndex >= 0 ? episodes[prevIndex] : null;
        nextEpisode = nextIndex < episodes.length ? episodes[nextIndex] : null;
    }
    console.log(prevEpisode, nextEpisode, totalEpisodes);
    return { prevEpisode, nextEpisode, totalEpisodes }
}
