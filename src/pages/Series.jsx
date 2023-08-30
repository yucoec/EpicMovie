import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { ListOfSeries } from "../components/ListOfSeries";
import { getSerieList } from "../services/getSerieList";

const Series = () => {
    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSerieList().then(data => {
            setMovieList(data)
        })
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20; // Cantidad de productos por página

    // Lógica para obtener los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = movieList.slice(indexOfFirstProduct, indexOfLastProduct);
    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/series/list/${pageNumber + 1}`);
    };


    return (
        <>
            <div className='bg-black text-white'>
                <div className='w-full max-w-[1200px] mx-auto'>
                    {movieList && <ListOfSeries movieList={currentProducts} />}
                    <div className='flex justify-around h-12 items-center'>
                        {currentProducts && <button className='h-6 hover:border-b-slate-50 hover:border-b-2' onClick={() => handlePageChange(1)}>Siguiente</button>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Series;