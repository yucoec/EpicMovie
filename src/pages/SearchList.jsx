import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { CardMovie } from '../components/CardMovie';
import { CardSeries } from '../components/CardSeries';
import { Footer } from '../components/Footer';
import { getMovieSearch } from '../services/getMovieSearch';

const SearchList = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(2);
    const { keyword, page } = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        getMovieSearch(keyword)
            .then((results) => setSearchResults(results))
    }, [keyword]);

    const productsPerPage = 20; // Cantidad de productos por página

    // Lógica para obtener los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const moviePage = searchResults.slice(indexOfFirstProduct, indexOfLastProduct);
    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
        navigate(`/search/${keyword}/${Number(page) + 1}`);
        setCurrentPage(pageNumber);
    };

    // Función para retroceder una página
    const handlePreviousPage = () => {
        if (currentPage === 2) {
            navigate(`/search/${keyword}`);
            setCurrentPage(1);
        } else {
            const prevPage = currentPage - 1;
            navigate(`/search/${keyword}/${prevPage}`);
            setCurrentPage(prevPage);
        }
    };

    return (
        <>
            <div className='bg-black text-white'>
                <div className='w-full max-w-[1200px] mx-auto'>
                    {moviePage?.length > 0 ? (
                        <div className='grid gap-4 grid-cols-16 mx-[5px] max-[482px]:grid-cols-17 justify-items-center justify-center pt-2'>
                            {moviePage.map(({ category, id, calidad, name }) => {
                                return category === 'movie' ? (
                                    <CardMovie key={id} id={id} calidad={calidad} category={category} name={name} />
                                ) : (
                                    <CardSeries key={id} id={id} category={category} />
                                );
                            })}
                        </div>
                    ) : (
                        <MoonLoader color='#fff' size={120} speedMultiplier={2} />
                    )}
                    <div className='flex justify-center gap-5 m-10'>
                        {page > 1 && (
                            <button className='h-6 hover:border-b-slate-50 hover:border-b-2' onClick={handlePreviousPage}>
                                Anterior
                            </button>
                        )}
                        <p>{page}</p>
                        {searchResults.length >= indexOfLastProduct && (
                            <button className='h-6 hover:border-b-slate-50 hover:border-b-2' onClick={() => handlePageChange(currentPage + 1)}>
                                Siguiente
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SearchList;
