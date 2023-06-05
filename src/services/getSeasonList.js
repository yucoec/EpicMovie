import { MOVIEDB_API_KEY } from "./apiKey";

function getSeasonList(id, season_number) {
    return fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${MOVIEDB_API_KEY}&language=es-MX`)
        .then(res => res.json())
        .then(res => {
            const data = res
            return data
        })
}

export default getSeasonList