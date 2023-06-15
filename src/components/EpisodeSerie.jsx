import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { AiFillPlayCircle, AiFillStar } from "react-icons/ai"
import { BsArrowLeft } from "react-icons/bs"
import { MdCloudDownload } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { MoonLoader } from "react-spinners"
import vlcLogo from '../assets/VLC_icon.webp'
import imageNotFound from '../assets/imageNotFound.png'
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
    const { id, season, episode } = useParams()
    const category = 'tv'
    const backPage = () => {
        navigate(-1)
    }
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
                            <div className='flex w-full flex-wrap min-[600px]:flex-nowrap px-1'>
                                {poster ? <img className='w-24 h-36 object-cover min-[600px]:static min-[600px]:w-[calc(27.65%-0.125rem)] min-[600px]:h-auto absolute left-3 top-[35rem] min-[482px]:w-[120px] min-[482px]:h-44 min-[482px]:left-5 min-[482px]:top-[33rem]' src={`https://image.tmdb.org/t/p/w500${poster}`} alt={detailsEpisode.name} /> : <img src={imageNotFound} alt='img not found' />}
                                <div className='min-[600px]:w-[calc(72.35%-0.125rem)] min-[600px]:ml-2 min-[600px]:h-auto w-[640px] h-[340px]'>
                                    {images && images[0] ? < img className='min-[600px]:ml-2' src={`https://image.tmdb.org/t/p/w1280${images[1].file_path}`} alt={detailsEpisode.name} /> : <img className='min-[600px]:ml-2' src={imageNotFound} alt='img not found' />}
                                </div>
                            </div>
                            <div className='pl-[calc(95px+1rem)] min-[600px]:pl-0 min-[482px]:pl-[calc(120px+1rem)] my-2'>
                                <section className='mx-2'>
                                    <p className='text-sm text-ellipsis min-[482px]:text-base'>{detailsEpisode.overview}</p>
                                </section>
                            </div>
                        </div>


                        {links && <section className='flex items-center flex-col gap-2 min-[482px]:mx-5 px-2' key={links.id} id={links.id}>
                            <div className='flex gap-2 justify-center flex-col items-center mb-2'>
                                <p className='flex gap-2 justify-center items-center text-xl max-[404px]:text-base py-1'><MdCloudDownload /> Descargar {season + "x" + episode}</p>
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
                        <div className='flex justify-center py-7'>
                            <button className='flex gap-1 items-center hover:border-b-2' onClick={backPage}><BsArrowLeft />Back</button>
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