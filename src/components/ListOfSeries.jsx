import { Helmet } from "react-helmet-async";
import { CardSeries } from "./CardSeries";

export const ListOfSeries = ({ movieList }) => {
    return (
        <>
            <Helmet>
                <title>Epic Movie - Series</title>
            </Helmet>
            <div className='grid gap-4 grid-cols-16 mx-[5px] max-[482px]:grid-cols-17 justify-items-center justify-center pt-2'>
                {movieList.map(({ id, category, statusTv }) => (
                    <CardSeries key={id} id={id} category={category} statusTv={statusTv} />
                ))}
            </div>
        </>
    )
}