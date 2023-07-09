import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselMovie from "../components/CarouselMovie";
import EpiModal from "../components/EpiModal";
import { Footer } from "../components/Footer";
import { ListOfMovies } from "../components/ListOfMovies";
import { getMovieList } from "../services/getMovieList";

const Home = () => {
    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMovieList().then(data => {
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
        navigate(`/list/${pageNumber + 1}`);
    };

    return (
        <>
            <div className='bg-black text-white'>
                <CarouselMovie />
                <div className='w-full max-w-[1400px] mx-auto'>
                    {currentProducts && <ListOfMovies movieList={currentProducts} />}
                    <div className='flex justify-around h-12 items-center'>
                        {currentProducts && <button className='h-6 hover:border-b-slate-50 hover:border-b-2' onClick={() => handlePageChange(1)}>Siguiente</button>}
                    </div>
                </div>
            </div>
            <EpiModal />
            <Footer />
        </>
    )
}

export default Home;