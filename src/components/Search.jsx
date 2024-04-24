import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Search() {
    const [searchText,setSearchText] =useState('')
    const [data,setData] =useState([])
    const handleSearch =(e)=>{
        setSearchText(e.target.value);
    }
        useEffect(() =>{
               axios.get('https://api.themoviedb.org/3/search/movie',{
                params: {
                  api_key: 'e4fc8b48c1647990faa243517293570e',
                  query:searchText
                },
              })
              .then((response)=> {
                if(response.status !== 200)  throw new Error('Could not fetch')
                console.log(response.data.results);
                return setData(response.data.results)
            })
              .catch( (error)=> {
                console.log(error.message);
              }) 
        },[searchText])
  return (
  <>
    <div className="flex gap-2">
          <div className="flex items-center gap-2">
          <input type="search" 
            placeholder="searach movie..."
            className="text-white text-normal text-lg rounded-lg border bg-inherit mt-[80px] ml-[20px] px-3 py-2"
            onChange={handleSearch}
            value={searchText}
            />
          </div>

    </div>
    <Link to='/movies' className="grid grid-cols-4 gap-5 mt-5">
      {data?.map((movie)=> (
        <div className="w-[21rem] max-w-[100%] bg-gary-700 rounded-xl text-white border-2 border-blue-400 p-3 m-5 flex flex-col cursor-pointer text-xl hover:scale-110" key={movie.id}>
          <img
        className="w-full self-center rounded-lg h-[476px]"
        // eslint-disable-next-line react/prop-types
        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
        alt=""
        />
          <h3 className="my-1">{movie.title}</h3>
      <h3 className="my-1">⭐{movie.vote_average}/10</h3>
          </div>
      ))}
      </Link>
  </>
  )
}


export default Search