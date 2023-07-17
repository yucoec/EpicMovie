import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardMovie } from '../components/CardMovie';
import { CardSeries } from '../components/CardSeries';
import { Footer } from '../components/Footer';
import { getMovieSearch } from '../services/getMovieSearch';

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const { keyword } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        getMovieSearch(keyword)
            .then((results) => setSearchResults(results))
    }, [keyword]);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20; // Cantidad de productos por página

    // Lógica para obtener los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = searchResults.slice(indexOfFirstProduct, indexOfLastProduct);
    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/search/${keyword}/${pageNumber + 1}`);
    };

    return (
        <div className='bg-black text-white h-full max-w-[1200px] mx-auto'>
            {currentProducts.length !== 0 ? (
                <div className='grid gap-4 grid-cols-16 mx-[5px] max-[482px]:grid-cols-17 justify-items-center justify-center pt-2'>
                    {currentProducts.map(({ category, id, calidad, name }) => {
                        return category === 'movie' ? (
                            <CardMovie key={id} id={id} calidad={calidad} category={category} name={name} />
                        ) : (
                            <CardSeries key={id} id={id} category={category} />
                        );
                    })}
                </div>
            ) : <div className='text-center font-bold text-xl'>No se encontraron resultados de {keyword}</div>}

            <div className='flex justify-around h-12 items-center'>
                {currentProducts.length !== 0 && searchResults.length > indexOfLastProduct && (
                    <button className='h-6 hover:border-b-slate-50 hover:border-b-2' onClick={() => handlePageChange(1)}>
                        Siguiente
                    </button>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Search