
const jsonUrl = 'https://raw.githubusercontent.com/yucoec/epic-moviesJson/main/epic-anime.json';

export function getAnimeList() {
    return fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            return data
        }
        );

}
