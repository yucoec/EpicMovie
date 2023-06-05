import { MOVIEDB_API_KEY } from "./apiKey";

export function getInfoMovie(id, category) {
    return fetch(`https://api.themoviedb.org/3/${category}/${id}?api_key=${MOVIEDB_API_KEY}&language=es-MX`)
        .then(res => res.json())
        .then(res => {
            return res
        })
}