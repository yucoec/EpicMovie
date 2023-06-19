import { useEffect, useState } from 'react';
import getSeasonList from '../services/getSeasonList';

export function useChangeEpisodes({ id, season, episode }) {
    const [episodes, setEpisodes] = useState([]);
    const [totalEpisodes, setTotalEpisodes] = useState(0);
    useEffect(() => {
        getSeasonList(id, season).then(res => {
            setEpisodes(res.episodes);
            setTotalEpisodes(res.episodes.length);
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
    return { prevEpisode, nextEpisode, totalEpisodes }
}
