import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
const Search = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const keyword = e.target.input.value.trim()
        navigate(`/search/${keyword}`)
        e.target.input.value = ''
    }
    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
                <input className="text-sm text-black h-8 text-ellipsis w-3/4 rounded-md p-1 border-none outline-none" name="input" placeholder="La Ballena, Creed, John Wick..." />
                <button className="relative right-6" aria-label="search">
                    <AiOutlineSearch className=" w-5 h-5 text-slate-500" />
                </button>
            </div>
        </form>
    )
}

export default Search