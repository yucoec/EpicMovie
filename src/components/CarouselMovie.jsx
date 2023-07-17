import React, { useEffect, useState } from 'react';
import { getInfoMovie } from '../services/getInfoMovie';
import { getMovieList } from '../services/getMovieList';
import { CardCarousel } from './CardCarousel';

const Carousel = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [movieList, setMovieList] = useState([]);
    let cardsPerPage = 5;

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const fetchMovieList = async () => {
            const movies = await getMovieList();
            const movieInfoPromises = movies.map((movie) =>
                getInfoMovie(movie.id, movie.category)
            );
            const movieInfoList = await Promise.all(movieInfoPromises);

            const moviesWithInfo = movies.map((movie, index) => ({
                ...movie,
                release_date: movieInfoList[index].release_date,
            }));

            setMovieList(moviesWithInfo);
        };

        fetchMovieList();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage(
                (prevPage) => (prevPage + 1) % Math.ceil(movieList.length / cardsPerPage)
            );
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [movieList, cardsPerPage]);

    const sortedMovieList = [...movieList]
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .slice(0, 10); // Limita la lista a las 10 películas más recientes

    if (windowWidth <= 1000) {
        cardsPerPage = 4;
    }
    if (windowWidth <= 840) {
        cardsPerPage = 3;
    }
    if (windowWidth <= 695) {
        cardsPerPage = 2;
    }
    if (windowWidth <= 525) {
        cardsPerPage = 1;
    }

    const handlePrevPage = () => {
        setCurrentPage(
            (prevPage) =>
                (prevPage - 1 + Math.ceil(sortedMovieList.length / cardsPerPage)) %
                Math.ceil(sortedMovieList.length / cardsPerPage)
        );
    };

    const handleNextPage = () => {
        setCurrentPage(
            (prevPage) =>
                (prevPage + 1) % Math.ceil(sortedMovieList.length / cardsPerPage)
        );
    };

    useEffect(() => {
        if (currentPage >= Math.ceil(sortedMovieList.length / cardsPerPage)) {
            setCurrentPage(0);
        }
    }, [currentPage, sortedMovieList.length, cardsPerPage]);

    return (
        <>
            <p className='text-center text-xl font-bold'>Estrenos</p>
            <div className="flex flex-row items-center justify-center w-full max-w-[1400px] mx-auto h-[400px]">
                <button onClick={handlePrevPage} className="mr-2 max-[525px]:px-3 max-[525px]:text-sm px-4 py-2 bg-cyan-500 hover:scale-105 duration-300 rounded-[3rem]">
                    Anterior
                </button>
                <div className="overflow-x-hidden overflow-hidden max-w-[900px] ">
                    <div className="grid grid-responsive gap-3 mx-[5px] max-[1000px]:grid-cols-4  grid-cols-5 justify-center pt-2">
                        {sortedMovieList
                            .slice(
                                currentPage * cardsPerPage,
                                (currentPage + 1) * cardsPerPage
                            )
                            .map(({ id, category, calidad, name, release_date }) => (
                                <CardCarousel
                                    key={id}
                                    id={id}
                                    category={category}
                                    calidad={calidad}
                                    name={name}
                                    release_date={release_date}
                                />
                            ))}
                    </div>
                </div>
                <button onClick={handleNextPage} className="ml-2 px-4 py-2 max-[525px]:px-3 max-[525px]:text-sm bg-cyan-500 hover:scale-105 duration-300 rounded-[3rem]">
                    Siguiente
                </button>
            </div>
        </>

    );
};

export default Carousel;
