import { AiFillStar } from 'react-icons/ai'
import { BsArrowLeft } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import imageNotFound from '../assets/imageNotFound.png'
import SeasonList from './SeasonList'

const SerieDetails = ({ details, backPage }) => {
    const { id } = useParams()

    return (
        <>
            <section className='bg-center bg-no-repeat bg-cover h-[600px]' style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0)), url('https://image.tmdb.org/t/p/w1280${details.backdrop_path}')`
            }}>
                <div className='text-white h-full max-w-[1400px] mx-auto'>
                    <div className='min-[482px]:mx-5 mx-2 py-3'>
                        <h1 className='text-[32px] leading-8'>{details.original_name}</h1>
                        <h2 className='text-[rgba(255,255,255,.7)] text-sm mt-1'>Título original: {details.original_name}</h2>
                        <p className='text-[rgba(255,255,255,.7)] text-sm mb-2 flex  items-center'>{details.first_air_date} <AiFillStar className='text-yellow-400 w-4 mx-1' />{details.vote_average.toFixed(1)}</p>
                    </div>
                    <div className='flex min-[482px]:mx-5 mx-2 py-3'>
                        <div className=''>
                            {details.poster_path ? <img className='rounded-sm' src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} alt={details.title} /> : <img src={imageNotFound} alt='img not found' />}
                        </div>
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
            </section>

            <section className='text-white h-full max-w-[1400px] mx-auto'>
                <SeasonList id={id} season_number="1" name={details.original_name} />
            </section>

            <div className='flex justify-center my-7 text-white'>
                <button className='flex gap-1 items-center hover:border-b-2' onClick={backPage}><BsArrowLeft />Back</button>
            </div>
        </>

    )
}

export default SerieDetails