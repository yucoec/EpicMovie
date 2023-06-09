import { Helmet } from "react-helmet-async";
import { CardMovie } from "./CardMovie";

export const ListOfMovies = ({ movieList }) => {
    return (
        <>
            <Helmet>
                <title>Epic Movie - Peliculas</title>
                <meta property="og:title" content="Epic Movie - Peliculas" />
            </Helmet>
            <div className='grid gap-4 grid-cols-16 mx-[5px] max-[482px]:grid-cols-17 justify-items-center justify-center pt-2'>
                {movieList.map(({ id, category, calidad, name }) => (
                    <CardMovie key={id} id={id} calidad={calidad} category={category} name={name} />
                ))}
            </div>
        </>
    )
}