import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { AiFillPlayCircle, AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { MdCloudDownload } from "react-icons/md"
import { TfiMenuAlt } from "react-icons/tfi"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MoonLoader } from "react-spinners"
import vlcLogo from '../assets/VLC_icon.webp'
import imageNotFound from '../assets/imageNotFound.png'
import { useChangeEpisodes } from "../hooks/useChangeEpisodes"
import getEpisodeDetails from "../services/getEpisodeDetails"
import getEpisodeImages from "../services/getEpisodeImages"
import getSerieDetails from "../services/getSerieDetails"
import { getSerieList } from "../services/getSerieList"



const EpisodeSerie = () => {
    const [detailsEpisode, setDetailsEpisode] = useState(null)
    const [links, setLinks] = useState([])
    const [images, setImages] = useState([])
    const [poster, setPoster] = useState(null)
    const navigate = useNavigate()
    const { id, season, episode, title } = useParams()
    const category = 'tv'
    const { prevEpisode, nextEpisode, totalEpisodes } = useChangeEpisodes({ id, season, episode })

    console.log(nextEpisode);

    useEffect(() => {
        getSerieList().then(data => {
            data.forEach(({ seasons }) => {
                const matchingSeason = seasons.find(
                    (seasonObj) => {
                        return seasonObj.season_number === Number(season)
                    }
                );

                if (matchingSeason) {
                    const matchingEpisode = matchingSeason.episodes.find(
                        (episodeObj) => {
                            return episodeObj.episode_number === Number(episode)
                        }
                    );

                    if (matchingEpisode) {
                        setLinks(matchingEpisode);
                    }
                }
            });

        });
        getSerieDetails(id, category).then(res => {
            setPoster(res.poster_path)
        })
        getEpisodeDetails(id, season, episode).then(res => {
            setDetailsEpisode(res)
        })
        getEpisodeImages(id, season, episode).then(res => {
            setImages(res.stills)
        })
    }, [id, season, episode])


    return (
        <>

            {detailsEpisode ?
                <section className='bg-center bg-no-repeat bg-cover h-[600px]' style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0)), url('https://image.tmdb.org/t/p/w1280${detailsEpisode.still_path}')`
                }}>
                    <Helmet>
                        <title>Epic Movie | {detailsEpisode.name}</title>
                    </Helmet>
                    <div className='text-white h-full max-w-[1400px] mx-auto'>
                        <div className='min-[482px]:mx-5 mx-2 py-3'>
                            <h1 className='text-[32px] leading-8'>{detailsEpisode.name}</h1>
                            <p className='text-[rgba(255,255,255,.7)] text-sm mb-2 flex  items-center'>{detailsEpisode.air_date} · {detailsEpisode.runtime + ' min'} ·  <AiFillStar className='text-yellow-400 w-4 mx-1' />{detailsEpisode.vote_average.toFixed(1)}</p>
                        </div>
                        <div className='min-[482px]:mx-5'>
                            <div className='flex w-full flex-wrap min-[600px]:flex-nowrap px-1 relative'>
                                {poster ? <img className='w-24 h-36 object-cover min-[600px]:static min-[600px]:w-[calc(27.65%-0.125rem)] min-[600px]:h-auto absolute top-[350px] min-[482px]:w-[120px]' src={`https://image.tmdb.org/t/p/w500${poster}`} alt={detailsEpisode.name} /> : <img src={imageNotFound} alt='img not found' />}
                                <div className='min-[600px]:w-[calc(72.35%-0.125rem)] min-[600px]:ml-2 min-[600px]:h-auto w-[640px] h-[340px]'>
                                    {images && images[0] ? < img className='min-[600px]:ml-2 h-full object-cover' src={`https://image.tmdb.org/t/p/w1280${images[0].file_path}`} alt={detailsEpisode.name} /> : <img className='min-[600px]:ml-2 h-full object-cover' src={imageNotFound} alt='img not found' />}
                                </div>
                            </div>
                            <div className='pl-[calc(95px+1rem)] min-[600px]:pl-0 min-[482px]:pl-[calc(120px+1rem)] my-2'>
                                <section className='mx-2 overflow-auto max-h-36'>
                                    <p className='text-sm text-ellipsis min-[482px]:text-base'>{detailsEpisode.overview}</p>
                                </section>
                            </div>
                        </div>


                        {links && <section className='flex items-center flex-col gap-2 min-[482px]:mx-5 px-2' key={links.id} id={links.id}>
                            <div className='flex gap-2 justify-center flex-col items-center mb-2'>
                                <p className='flex gap-2 justify-center items-center text-2xl py-1'><MdCloudDownload /> Descargar {season + "x" + episode}</p>
                                <a href={links.descarga} target='_blank' rel='noreferrer'>
                                    <img className='w-96 hover:scale-105 duration-300' src={links.btn} alt="imagen del boton" />
                                </a>
                            </div>
                            <div className='flex gap-2 justify-center items-center mb-2 bg-cyan-500 rounded-md w-1/2 p-1 max-lg:w-2/3 max-[670px]:w-full'>
                                <img className='w-11 p-1' src={vlcLogo} alt="Logo de vlc reproductor" />
                                <p>Te recomendamos usar el reproductor VLC Player para que no tengas problemas al reproducir La Peliculas en tu PC o celular.</p>

                            </div>
                            <div className='flex gap-2 justify-center flex-col items-center mb-2 w-full'>
                                <p className=' w-full text-xl py-4 text-center'>Ver la pelicula Online:</p>
                                <a href={links.online} target='_blank' rel='noreferrer'><p className='flex gap-2 items-center bg-cyan-500 p-3 rounded-xl text-3xl hover:scale-105 duration-300'><AiFillPlayCircle />Ver Online</p></a>
                            </div>
                        </section>}
                        <div className='flex justify-between py-7 max-w-[1400px] mx-5'>
                            {prevEpisode ? (
                                <Link to={`/${id}/${title}/${season}/${prevEpisode.episode_number}`} className="text-white py-2 px-2 bg-cyan-500 hover:scale-105 duration-300 rounded-[3rem] flex gap-2 items-center max-[467px]:rounded-full max-[467px]:px-3">
                                    <AiOutlineArrowLeft className="max-[467px]:text-2xl" /> <p className="max-[467px]:hidden">Anterior Capítulo</p>
                                </Link>
                            ) : <div className="text-white py-2 px-2 bg-cyan-500 hover:scale-105 duration-300 rounded-[3rem] flex gap-2 items-center opacity-0">
                                <AiOutlineArrowLeft className="max-[467px] text-2xl" />
                                <p className="max-[467px]:hidden">Anterior Capítulo</p>
                            </div>}

                            <Link to={`/series/${id}/${title}`} className="text-white bg-cyan-500 hover:scale-105 shadow-cyan-500 duration-300 rounded-full p-4"><TfiMenuAlt /></Link>

                            {nextEpisode ? (
                                <Link to={`/${id}/${title}/${season}/${nextEpisode.episode_number}`} className={`text-white py-2 px-2 bg-cyan-500 hover:scale-105 duration-300 rounded-[3rem] flex gap-2 items-center ${nextEpisode.episode_number === totalEpisodes ? 'invisible' : 'visible'} max-[467px]:rounded-full max-[467px]:px-3`}>
                                    <p className="max-[467px]:hidden">Siguiente Capítulo</p> <AiOutlineArrowRight className="max-[467px]:text-2xl" />
                                </Link>

                            ) : <div className="text-white py-2 px-2 bg-cyan-500 hover:scale-105 duration-300 rounded-[3rem] flex gap-2 items-center ">
                                <p className="max-[467px]:hidden">Siguiente Capítulo</p> <AiOutlineArrowRight className="max-[467px]:text-2xl" />
                            </div>}
                        </div>
                    </div>
                </section> : (
                    <div className='flex justify-center items-center h-full'>
                        <MoonLoader color='#fff' size={120} speedMultiplier={2} />
                    </div>
                )}
        </>
    )
}

export default EpisodeSerie