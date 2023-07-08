import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { ListOfAnimes } from "../components/ListOfAnimes";
import { getAnimeList } from "../services/getAnimeList";

const Anime = () => {
    const [animeList, setAnimeList] = useState([]);


    useEffect(() => {
        getAnimeList().then(data => {
            setAnimeList(data)
        })
    }, [])
    return (
        <>
            <div className='bg-black text-white'>
                <div className='w-full max-w-[1200px] mx-auto'>
                    {animeList && <ListOfAnimes animeList={animeList} />}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Anime;