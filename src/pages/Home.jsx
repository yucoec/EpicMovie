import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import movieicon from '../assets/movie.svg';
import tvicon from '../assets/tv.svg';
import { ListOfMovies } from "../components/ListOfMovies";
import { getMovieList } from "../services/getMovieList";

export function Home() {
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
                <div className='flex justify-around py-2 h-10'>
                    <Link to="/" aria-checked='true' className='flex gap-1 items-center  hover:border-b-slate-50 hover:border-b-2'><img src={movieicon} className='w-4' alt="movie Icon" /> Peliculas</Link>
                    <Link to={`/series`} className='flex gap-1 items-center hover:border-b-2'><img src={tvicon} className='w-5' alt="tv Icon" /> Series</Link>
                </div>
                <div className='w-full max-w-[1400px] mx-auto'>
                    {currentProducts && <ListOfMovies movieList={currentProducts} />}
                    <div className='flex justify-around h-12 items-center'>
                        {currentProducts && <button className='h-6 hover:border-b-slate-50 hover:border-b-2' onClick={() => handlePageChange(1)}>Siguiente</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

