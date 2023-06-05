import { MOVIEDB_API_KEY } from './apiKey';

export function getMovieVideo(id, category) {
    const url = `https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${MOVIEDB_API_KEY}&language=es-MX`
    return fetch(url)
        .then((res) => res.json())
        .then((res) => {
            let foundKey;
            if (res.results.length > 0) {
                for (let i = 0; i < res.results.length; i++) {
                    if (res.results[i].key) {
                        foundKey = res.results[i].key;
                        break;
                    }
                }
            }
            if (!foundKey) {
                return fetch(`${url}&language=en-US`)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.results.length > 0) {
                            for (let i = 0; i < res.results.length; i++) {
                                if (res.results[i].key) {
                                    foundKey = res.results[i].key;
                                    break;
                                }
                            }
                        }
                        if (!foundKey) {
                            throw new Error('No se encontraron videos para esta pelicula');
                        } else {
                            return foundKey;
                        }
                    });
            } else {
                return foundKey;
            }
        })
        .catch((err) => {
            console.log(err);
            return ('No se pudo conectar al servidor o No se encontraron videos para esta pelicula');
        });

}