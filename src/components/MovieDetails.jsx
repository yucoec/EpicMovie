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
import winrarLogo from '../assets/winrar.webp'
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
                        <div className='flex w-full flex-wrap min-[600px]:flex-nowrap px-1 relative'>
                            {details.poster_path ? <img className='w-24 min-[600px]:static min-[600px]:w-[calc(27.65%-0.125rem)] absolute top-[350px] min-[482px]:w-[120px]' src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} /> : <img src={imageNotFound} alt='img not found' />}
                            <div className='min-[600px]:w-[calc(72.35%-0.125rem)] min-[600px]:ml-2 min-[600px]:h-auto w-[640px] h-[340px]'>
                                {loading
                                    ? (
                                        <div className='flex justify-center items-center h-full'>
                                            <MoonLoader color='#fff' loading={loading} size={120} speedMultiplier={2} />
                                        </div>
                                    )
                                    : video && video !== 'No se encontraron videos para esta pelicula' ? <Youtube opts={opts} videoId={video} style={{ width: '100%', height: '100%' }} /> : <img className='min-[600px]:ml-2 h-full object-cover' src={videoNotFound} alt='img not found' />}
                            </div>
                        </div>
                        <div className='pl-[calc(95px+1rem)] min-[600px]:pl-0 min-[482px]:pl-[calc(120px+1rem)] my-2'>
                            <section className='mx-2'>
                                <div className='flex gap-1 flex-wrap mb-2'>
                                    {details.genres.map(({ id, name }) => (
                                        <span className='rounded-2xl border-[rgba(255,255,255,.7)] p-1 border-[1px] text-sm' key={id}>{name}</span>
                                    ))}
                                </div>
                                <p className='text-sm text-ellipsis min-[482px]:text-base overflow-auto max-h-28'>{details.overview}</p>
                            </section>
                        </div>
                    </div>

                    {movieLinks?.map(({ id, descarga, online, password }) => {
                        return (
                            <section className='flex items-center flex-col gap-2 min-[482px]:mx-5 px-2' key={id}>
                                <div className='flex gap-2 justify-center flex-col items-center mb-2'>
                                    {descarga.map(({ quality }, index) => (
                                        <div key={index}>
                                            {quality.map(({ qualityName, link, btn, peso }, qualityIndex) => {
                                                return (
                                                    <div key={qualityIndex} className='flex flex-col justify-center items-center'>
                                                        <p className='flex gap-2 justify-center items-center text-xl max-[404px]:text-base py-1'><MdCloudDownload /> {`Descarga ${qualityName}`}</p>
                                                        {peso && <p className='text-cyan-500'>Peso {peso}</p>}
                                                        <a href={link} target='_blank' rel='noreferrer'>
                                                            <img className='w-96 hover:scale-105 duration-300' src={btn} alt="imagen del boton" />
                                                        </a>
                                                    </div>)
                                            })}
                                        </div>
                                    ))}
                                    {password && <><p className='flex gap-2 justify-center text-xl py-3'>Copiar  contraseña</p><div className='flex justify-center  items-center mb-2'>
                                        <input className='text-black px-3 py-1 focus-visible:outline-none rounded-l-md' id="copyInput" ref={inputRef} value={inputValue} readOnly onClick={() => inputRef.current.select()} />
                                        <button className='bg-cyan-500 px-3 py-1 rounded-r-md' onClick={handleCopyClick}>Copiar</button>
                                    </div>
                                        <a href="https://www.winrar.es/descargas" target="_blank" rel="noopener noreferrer" className='flex gap-2 justify-center items-center mb-2 bg-cyan-500 rounded-md w-full p-1'>
                                            <img className='w-11 p-1' src={winrarLogo} alt="Logo de winrar" />
                                            <p>Descarga RAR para que puedas descomprimir el archivo</p>
                                        </a></>}
                                </div>
                                <div className='flex gap-2 justify-center items-center mb-2 bg-cyan-500 rounded-md w-1/2 p-1 max-lg:w-2/3 max-[670px]:w-full'>
                                    <img className='w-11 p-1' src={vlcLogo} alt="Logo de vlc reproductor" />
                                    <p>Te recomendamos usar el reproductor VLC Player para que no tengas problemas al reproducir La Peliculas en tu PC o celular.</p>

                                </div>
                                <div className='flex gap-2 justify-center flex-col items-center mb-2'>
                                    <p className=' w-full text-xl py-4 text-center'>Link para ver la pelicula Online:</p>
                                    <a href={online} target='_blank' rel='noreferrer'><p className='flex gap-2 items-center bg-cyan-500 p-3 rounded-xl text-3xl hover:scale-105 duration-300'><AiFillPlayCircle />Ver Online</p></a>
                                </div>
                                <p className=' w-full text-xl py-4 text-center'>Tutorial de descarga en pc</p>
                                <iframe src='https://drive.google.com/file/d/1eAfAlz6fexwL6B_I1AUP7pt0eeSH1B1f/preview' className='w-[720px] h-[480px] max-lg:w-[820px] max-lg:h-[500px] max-[870px]:w-full max-[670px]:h-[350px]' />
                                <p className=' w-full text-xl py-4 text-center'>Tutorial de descarga en celular</p>
                                <iframe src='https://drive.google.com/file/d/19zOkFYUcf6m7Wd7hEN1FQP0zLzUMhSp5/preview' className='w-[720px] h-[480px] max-lg:w-[820px] max-lg:h-[500px] max-[870px]:w-full max-[670px]:h-[350px]' />
                            </section>
                        )
                    })}


                    <div className='flex justify-center py-7'>
                        <button className='flex gap-1 items-center hover:border-b-2' onClick={backPage}><BsArrowLeft />Back</button>
                    </div>
                </div >
            </section >
        </>
    )
}

export default MovieDetails