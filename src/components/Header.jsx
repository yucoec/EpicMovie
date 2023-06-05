import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import Search from "./Search"

const Header = () => {
    return (
        <div className="bg-neutral-900 sticky top-0 w-full">
            <div className="max-w-[1400px] mx-auto px-2 flex items-center" >
                <Link to="/">
                    <img className="w-16" src={logo} alt="logo de epic movie" />
                </Link>
                <Search />
            </div>
        </div>
    )
}

export default Header