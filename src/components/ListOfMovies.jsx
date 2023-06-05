import { Helmet } from "react-helmet";
import { CardMovie } from "./CardMovie";

export const ListOfMovies = ({ movieList }) => {
    return (
        <>
            <Helmet>
                <title>Epic Movie - Peliculas</title>
            </Helmet>
            <div className='grid gap-4 grid-cols-16 mx-[5px] justify-items-center justify-center pt-2'>
                {movieList.map(({ id, category, calidad }) => (
                    <CardMovie key={id} id={id} calidad={calidad} category={category} />
                ))}
            </div>
        </>
    )
}