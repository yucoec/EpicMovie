function getMovieSearch(keyword) {
    return fetch(
        `https://raw.githubusercontent.com/yucoec/epic-moviesJson/main/epic-movie.json`
    )
        .then((res) => res.json())
        .then((res) => {
            const searchingMovies = res.filter((movie) => {
                return movie.name.toLowerCase().includes(keyword.toLowerCase());
            })
            return searchingMovies;
        });
}

export default getMovieSearch;