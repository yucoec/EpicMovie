function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getMovieSearch(keyword) {
    return fetch(
        `https://raw.githubusercontent.com/yucoec/epic-moviesJson/main/epic-movie.json`
    )
        .then((res) => res.json())
        .then((res) => {
            const searchingMovies = res.filter((movie) => {
                const movieName = removeAccents(movie.name);
                return movieName.toLowerCase().includes(removeAccents(keyword.toLowerCase()));
            })
            return searchingMovies;
        });
}

export default getMovieSearch;