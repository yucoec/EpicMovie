import { Link, useLocation } from "react-router-dom";
import animeicon from '../assets/anime.svg';
import logo from "../assets/logo.png";
import movieicon from '../assets/movie.svg';
import tvicon from '../assets/tv.svg';
import FormSearch from "./FormSearch";

const Header = () => {
    const location = useLocation()

    return (
        <>
            <div className="bg-neutral-900 sticky top-0 w-full z-10">
                <div className="max-w-[1400px] mx-auto px-2 flex items-center" >
                    <Link to="/">
                        <img className="w-16" src={logo} alt="logo de epic movie" />
                    </Link>
                    <FormSearch />
                </div>
                <div className='bg-transparent'>
                    <div className="max-w-[1400px] mx-auto flex justify-around py-2 h-13 px-2 text-white flex-wrap">
                        <Link to="/" className={`flex gap-1 items-center hover:border-b-slate-50 hover:border-b-2 border-b-2 border-transparent ${location.pathname === '/' ? 'border-b-slate-50' : ''}`}><img src={movieicon} className='w-4' alt="movie Icon" /> Peliculas</Link>
                        <Link to={`/series`} className={`flex gap-1 items-center hover:border-b-2 hover:border-b-slate-50 border-b-2 border-transparent ${location.pathname === '/series' ? 'border-b-slate-50' : ''}`}><img src={tvicon} className='w-5' alt="tv Icon" /> Series</Link>
                        <Link to={`/anime`} className={`flex gap-1 items-center hover:border-b-2 hover:border-b-slate-50 border-b-2 border-transparent ${location.pathname === '/anime' ? 'border-b-slate-50' : ''} ml-2`}><img src={animeicon} className='w-5' alt="tv Icon" /> Anime</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header