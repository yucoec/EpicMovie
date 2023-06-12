import { Helmet } from "react-helmet";
import { CardSeries } from "./CardSeries";

export const ListOfSeries = ({ movieList }) => {
    return (
        <>
            <Helmet>
                <title>Epic Movie - Series</title>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4332686282875056"
                    crossorigin="anonymous"></script>
            </Helmet>
            <div className='grid gap-4 grid-cols-16 mx-[5px] justify-items-center justify-center pt-2'>
                {movieList.map(({ id, descarga, online, imagenBoton, calidad, category }) => (
                    <CardSeries key={id} id={id} descarga={descarga} online={online} imagenBoton={imagenBoton} calidad={calidad} category={category} />
                ))}
            </div>
        </>
    )
}