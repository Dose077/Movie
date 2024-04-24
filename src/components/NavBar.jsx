import { Link } from "react-router-dom"
import Search from "./Search"

const NavBar = () => {
  return (
    <div className="flex flex-col w-full ">
        <Link to='/'>
            <div className=" text-white text-2xl font-bold  pt-2 ml-4">
                 Movies
            </div >
        </Link>
      <Search/>   
    </div>
  )
}

export default NavBar