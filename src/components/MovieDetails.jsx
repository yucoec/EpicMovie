import { useRef, useState } from 'react'
import { AiFillPlayCircle, AiFillStar } from 'react-icons/ai'
import { BsArrowLeft } from 'react-icons/bs'
import { MdCloudDownload } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { MoonLoader } from 'react-spinners'
import Youtube from 'react-youtube'
import vlcLogo from '../assets/VLC_icon.webp'
import imageNotFound from '../assets/imageNotFound.png'
import videoNotFound from '../assets/videoNotFound.png'
import { useMovieDetails } from '../hooks/useMovieDetails'

const MovieDetails = ({ details, backPage, movieLinks }) => {
    const { id } = useParams()
    const [inputValue, setInputValue] = useState('hackstore.ac');
    const inputRef = useRef(null);
    const category = 'movie';
    const { video, loading } = useMovieDetails({ id, category })
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0
        }
    }

    const horas = Math.floor(details.runtime / 60)
    const minutosRestantes = details.runtime % 60

    const handleCopyClick = () => {
        const inputElement = document.getElementById('copyInput');
        inputElement.select();
        navigator.clipboard.writeText(inputElement.value)
            .then(() => {
                setInputValue('Contraseña copiada!');
                setTimeout(() => {
                    setInputValue('hackstore.ac');
                }, 1500);
            })
            .catch((error) => {
                console.error('Error al copiar al portapapeles:', error);
            });
    };

    return (
        <>
            <section className='bg-center bg-no-repeat bg-cover h-[600px]' style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0)), url('https://image.tmdb.org/t/p/w1280${details.backdrop_path}')`
            }}>
                <div className='text-white h-full max-w-[1400px] mx-auto'>
                    <div className='min-[482px]:mx-5 mx-2 py-3'>
                        <h1 className='text-[32px] leading-8'>{details.title}</h1>
                        <h2 className='text-[rgba(255,255,255,.7)] text-sm mt-1'>Título original: {details.original_title}</h2>
                        <p className='text-[rgba(255,255,255,.7)] text-sm mb-2 flex  items-center'>{details.release_date} · {horas + 'h ' + minutosRestantes + ' min'} ·  <AiFillStar className='text-yellow-400 w-4 mx-1' />{details.vote_average.toFixed(1)}</p>
                    </div>
                    <div className='min-[482px]:mx-5'>
                        <div className='flex w-full flex-wrap min-[600px]:flex-nowrap'>
                            {details.poster_path ? <img className='w-24 min-[600px]:static min-[600px]:w-[calc(27.65%-0.125rem)] absolute left-3 top-[35rem] min-[482px]:w-[120px] min-[482px]:left-5 min-[482px]:top-[33rem]' src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} /> : <img src={imageNotFound} alt='img not found' />}
                            <div className='min-[600px]:w-[calc(72.35%-0.125rem)] min-[600px]:ml-2 min-[600px]:h-auto w-[640px] h-[340px]'>
                                {loading
                                    ? (
                                        <div className='flex justify-center items-center h-full'>
                                            <MoonLoader color='#fff' loading={loading} size={120} speedMultiplier={2} />
                                        </div>
                                    )
                                    : video ? <Youtube opts={opts} videoId={video} style={{ width: '100%', height: '100%' }} /> : <img className='min-[600px]:ml-2' src={videoNotFound} alt='img not found' />}
                            </div>
                        </div>
                        <div className='pl-[calc(95px+1rem)] min-[600px]:pl-0 min-[482px]:pl-[calc(120px+1rem)] my-2'>
                            <section className='mx-3'>
                                <div className='flex gap-1 flex-wrap mb-2'>
                                    {details.genres.map(({ id, name }) => (
                                        <span className='rounded-2xl border-[rgba(255,255,255,.7)] p-1 border-[1px] text-sm' key={id}>{name}</span>
                                    ))}
                                </div>
                                <p className='text-sm text-ellipsis min-[482px]:text-base'>{details.overview}</p>
                            </section>
                        </div>
                    </div>

                    {movieLinks?.map(({ id, imagenBoton, descarga, online, password }) => (
                        <section className='flex items-center flex-col gap-2 min-[482px]:mx-5' key={id}>
                            <div className='flex gap-2 justify-center flex-col items-center mb-2'>
                                <p className='flex gap-2 justify-center items-center text-xl py-5'><MdCloudDownload /> Descarga 1080p Latino - Ingles</p>
                                <a href={descarga}>
                                    <img className='w-96 hover:scale-105 duration-300' src={imagenBoton} alt="imagen del boton" />
                                </a>
                                {password && <><p className='flex gap-2 justify-center text-xl py-3'>Copiar  contraseña</p><div className='flex justify-center  items-center mb-2'>
                                    <input className='text-black px-3 py-1 focus-visible:outline-none rounded-l-md' id="copyInput" ref={inputRef} value={inputValue} readOnly onClick={() => inputRef.current.select()} />
                                    <button className='bg-cyan-500 px-3 py-1 rounded-r-md' onClick={handleCopyClick}>Copiar</button>
                                </div></>}
                            </div>
                            <div className='flex gap-2 justify-center items-center mb-2 bg-cyan-500 rounded-md w-1/2 p-1'>
                                <img className='w-11 p-1' src={vlcLogo} alt="Logo de vlc reproductor" />
                                <p>Te recomendamos usar el reproductor VLC Player para que no tengas problemas al reproducir La Peliculas en tu PC o celular.</p>

                            </div>
                            <div className='flex gap-2 justify-center flex-col items-center mb-2'>
                                <p className=' w-full text-xl py-4 text-center'>Link para ver la pelicula Online:</p>
                                <a href={online}><p className='flex gap-2 items-center bg-cyan-500 p-3 rounded-xl text-3xl hover:scale-105 duration-300'><AiFillPlayCircle />Ver Online</p></a>
                            </div>
                        </section>
                    ))}

                    <div className='flex justify-center py-7'>
                        <button className='flex gap-1 items-center hover:border-b-2' onClick={backPage}><BsArrowLeft />Back</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MovieDetails