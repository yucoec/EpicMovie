import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { ListOfAnimes } from "../components/ListOfAnimes";
import { getAnimeList } from "../services/getAnimeList";

const Anime = () => {
    const [animeList, setAnimeList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAnimeList().then(data => {
            setAnimeList(data)
        })
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20; // Cantidad de productos por página

    // Lógica para obtener los productos a mostrar en la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = animeList.slice(indexOfFirstProduct, indexOfLastProduct);
    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/anime/list/${pageNumber + 1}`);
    };

    return (
        <>
            <div className='bg-black text-white'>
                <div className='w-full max-w-[1200px] mx-auto'>
                    {animeList && <ListOfAnimes animeList={currentProducts} />}
                    <div className='flex justify-around h-12 items-center'>
                        {currentProducts && <button className='h-6 hover:border-b-slate-50 hover:border-b-2' onClick={() => handlePageChange(1)}>Siguiente</button>}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Anime;