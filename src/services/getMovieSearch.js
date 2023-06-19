function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function getMovieSearch(keyword) {
    const movieUrl =
        'https://raw.githubusercontent.com/yucoec/epic-moviesJson/main/epic-movie.json';
    const seriesUrl =
        'https://raw.githubusercontent.com/yucoec/epic-moviesJson/main/epic-serie.json';

    const moviePromise = fetch(movieUrl).then((res) => res.json());
    const seriesPromise = fetch(seriesUrl).then((res) => res.json());

    const [movies, series] = await Promise.all([moviePromise, seriesPromise]);
    const searchingMovies = movies.filter((movie) => {
        const movieName = removeAccents(movie.name);
        return movieName.toLowerCase().includes(removeAccents(keyword.toLowerCase()));
    });
    const searchingSeries = series.filter((serie) => {
        const serieName = removeAccents(serie.name);
        return serieName.toLowerCase().includes(removeAccents(keyword.toLowerCase()));
    });
    const combinedResults = [...searchingMovies, ...searchingSeries];
    return combinedResults;
};
