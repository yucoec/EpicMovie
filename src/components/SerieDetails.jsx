import { useEffect, useState } from 'react'
import { AiFillCaretDown, AiFillStar } from 'react-icons/ai'
import { BsArrowLeft } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import imageNotFound from '../assets/imageNotFound.png'
import { getSerieList } from '../services/getSerieList'
import SeasonList from './SeasonList'

function obtenerPrimeraTemporada(serie) {
    if (serie.length > 0) {
        return serie[0].season_number;
    }
    return null;
}

const SerieDetails = ({ details, backPage }) => {
    const [serie, setSerie] = useState([]);
    const { id } = useParams()
    const [temporadaSeleccionada, setTemporadaSeleccionada] = useState(null);

    useEffect(() => {
        getSerieList().then(data => {
            const matchingSerie = data.find(item => {
                return item.id === parseInt(id);
            });
            if (matchingSerie) {
                setSerie(matchingSerie.seasons);
                setTemporadaSeleccionada(obtenerPrimeraTemporada(matchingSerie.seasons));
            }
        });
    }, [id]);

    return (
        <>
            <section className='bg-center bg-no-repeat bg-cover' style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0)), url('https://image.tmdb.org/t/p/w1280${details.backdrop_path}')`
            }}>
                <div className='text-white h-full max-w-[1400px] mx-auto'>
                    <div className='min-[482px]:mx-5 mx-2 py-3'>
                        <h1 className='text-[32px] leading-8'>{details.original_name}</h1>
                        <h2 className='text-[rgba(255,255,255,.7)] text-sm mt-1'>Título original: {details.original_name}</h2>
                        <p className='text-[rgba(255,255,255,.7)] text-sm mb-2 flex  items-center'>{details.first_air_date} <AiFillStar className='text-yellow-400 w-4 mx-1' />{details.vote_average.toFixed(1)}</p>
                    </div>
                    <div className='flex min-[482px]:mx-5 mx-2 py-3'>
                        <div>
                            {details.poster_path ? <img className='rounded-sm w-24 min-[482px]:w-[120px] min-[1000px]:max-w-full min-[1000px]:w-auto max-w-fit' src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} /> : <img src={imageNotFound} alt='img not found' />}
                        </div>
                        <section className='mx-3 '>
                            <div className='flex gap-1 flex-wrap mb-2'>
                                {details.genres.map(({ id, name }) => (
                                    <span className='rounded-2xl border-[rgba(255,255,255,.7)] p-1 border-[1px] text-sm' key={id}>{name}</span>
                                ))}
                            </div>
                            <p className='text-sm text-ellipsis min-[482px]:text-base overflow-auto max-h-28'>{details.overview}</p>
                        </section>
                    </div>
                </div>
            </section>

            <section className='text-white h-full max-w-[1400px] mx-auto'>
                <div className='min-[482px]:mx-5 mx-2 py-5 relative w-fit'>
                    <select className='w-auto outline-none appearance-none bg-cyan-500 border-gray-300 rounded-md py-3 px-2 pr-10' onChange={(e) => setTemporadaSeleccionada(Number(e.target.value))}>
                        {serie.map(({ season_number }) => (
                            <option key={season_number} value={season_number}>
                                Temporada {season_number}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <AiFillCaretDown />
                    </div>
                </div>

                {serie.map(({ season_number, id: season_id, episodes }) => {
                    return (
                        temporadaSeleccionada === season_number && (
                            <SeasonList key={season_id} id={id} season_number={season_number} episodes={episodes} name={details.original_name} />
                        )
                    );
                })}
            </section>


            <div className='flex justify-center my-7 text-white'>
                <button className='flex gap-1 items-center hover:border-b-2' onClick={backPage}><BsArrowLeft />Atras</button>
            </div>
        </>

    )
}

export default SerieDetails