import { MOVIEDB_API_KEY } from "./apiKey";

function getEpisodeDetails(id, season, episode) {
    return fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=${MOVIEDB_API_KEY}&language=es-MX`)
        .then(res => res.json())
        .then(res => {
            const data = res
            return data
        })
}

export default getEpisodeDetails