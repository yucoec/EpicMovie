
const jsonUrl = 'https://raw.githubusercontent.com/yucoec/epic-moviesJson/main/epic-serie.json';

export function getSerieList() {
    return fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            return data
        }
        );

}
