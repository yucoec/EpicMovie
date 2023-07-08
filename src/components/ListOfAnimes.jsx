import { Helmet } from "react-helmet-async";
import { CardAnime } from "./CardAnime";

export const ListOfAnimes = ({ animeList }) => {
    return (
        <>
            <Helmet>
                <title>Epic Movie - Anime</title>
            </Helmet>
            <div className='grid gap-4 grid-cols-16 mx-[5px] max-[482px]:grid-cols-17 justify-items-center justify-center pt-2'>
                {animeList.map(({ id, category, statusTv }) => (
                    <CardAnime key={id} id={id} category={category} statusTv={statusTv} />
                ))}
            </div>
        </>
    )
}