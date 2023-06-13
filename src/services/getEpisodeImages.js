import { MOVIEDB_API_KEY } from "./apiKey";

function getEpisodeImages(idSerie, season, episode) {
    return fetch(`https://api.themoviedb.org/3/tv/${idSerie}/season/${season}/episode/${episode}/images?api_key=${MOVIEDB_API_KEY}&language=es-MX`)
        .then(res => res.json())
        .then(res => {
            const data = res
            return data
        })
}

export default getEpisodeImages