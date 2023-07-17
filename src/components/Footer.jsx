import { AiOutlineInstagram } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { Link } from "react-router-dom";

export function Footer() {
    return <footer className="footer footer-center p-10  text-white rounded">
        <div className="flex justify-center gap-6 items-center mb-2">
            <Link to="/" className='hover:border-b-slate-50 hover:border-b-2 border-b-2 border-transparent'> Peliculas</Link>
            <Link to='/series' className='hover:border-b-slate-50 hover:border-b-2 border-b-2 border-transparent'> Series</Link>
            <Link to='/anime' className='hover:border-b-slate-50 hover:border-b-2 border-b-2 border-transparent'> Anime</Link>
        </div>
        <div>
            <div className="flex justify-center gap-4 items-center mb-2">
                <Link to='https://www.instagram.com/epicxmovie/' target="_blank" className="w-fit "><AiOutlineInstagram className="text-3xl" /></Link>
                <Link to='https://www.youtube.com/@EpicMoviee' target="_blank" className="w-fit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></Link>
                <Link to='https://www.facebook.com/profile.php?id=100093623056225' target="_blank" className="w-fit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></Link>
                <Link to='https://t.me/EpicMoviee' target="_blank" className="w-fit"><BsTelegram className='text-2xl' /></Link>
            </div>
        </div>
        <div className="text-center my-1 ">
            <Link to='https://docs.google.com/forms/d/e/1FAIpQLSfcbms4UypSnvQYmV7r-wIpxrKcDvTUO3yNaRawPmQnJSOYHQ/viewform' className='hover:border-b-slate-50 hover:border-b-2 border-b-2 border-transparent mr-2' target="_blank"> Pedidos</Link>
            <Link to='https://docs.google.com/forms/d/e/1FAIpQLScTy8WV-tl0ZAiKcN2KQ4_jObJWzF6pHVNno47GzMQENs0OhQ/viewform' className='hover:border-b-slate-50 hover:border-b-2 border-b-2 border-transparent' target="_blank"> Reportar link</Link>
        </div>
        <div className="text-center">
            <p>Copyright © 2023 - Epic Movie Todos los derechos reservados</p>
        </div>
    </footer>
}