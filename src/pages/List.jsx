import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListOfMovies } from '../components/ListOfMovies';
import { getMovieList } from '../services/getMovieList';

const List = () => {
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(2);
    const navigate = useNavigate();
    const { page } = useParams();
    const productsPerPage = 20;

    useEffect(() => {
        getMovieList().then((data) => {
            setMovieList(data);
        });
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const moviePage = movieList.slice(indexOfFirstProduct, indexOfLastProduct);
    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
        navigate(`/list/${Number(page) + 1}`);
        setCurrentPage(pageNumber);
    };

    // Función para retroceder una página
    const handlePreviousPage = () => {
        if (currentPage === 2) {
            navigate('/');
            setCurrentPage(1);
        } else {
            navigate(`/list/${Number(page) - 1}`);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <>
            <div className='bg-black text-white'>
                <div className='w-full max-w-[1200px] mx-auto'>
                    {moviePage?.length > 0 ? (
                        <>
                            <ListOfMovies movieList={moviePage} />
                            <div className='flex justify-center gap-5 m-10'>
                                {page > 1 && (
                                    <button className='h-6 hover:border-b-slate-50 hover:border-b-2' onClick={handlePreviousPage}>
                                        Anterior
                                    </button>
                                )}
                                <p>{page}</p>
                                {movieList.length > indexOfLastProduct && (
                                    <button className='h-6 hover:border-b-slate-50 hover:border-b-2' onClick={() => handlePageChange(currentPage + 1)}>
                                        Siguiente
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>Cargando películas...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default List;
