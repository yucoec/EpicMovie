
const jsonUrl = 'https://raw.githubusercontent.com/yucoec/epic-moviesJson/main/epic-movie.json';

export function getMovieList() {
    return fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            return data
        }
        );

}
