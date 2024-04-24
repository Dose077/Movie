import NavBar from "../components/NavBar";
import loading_spinner from "../assets/Loading.gif";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Button } from "antd";
// eslint-disable-next-line no-unused-vars
async function getMovies(_pageNo) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${"e4fc8b48c1647990faa243517293570e"}&page=${_pageNo}`
  );
  console.log(res.data.results);
  return res.data.results;
}

function HomePage() {
  const [movies, setMovies] = useState("Loading");
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    getMovies(pageNo)
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, [pageNo]);
  if (movies === "Loading" || !movies || movies.length === 0)
    return (
      <div className="flex items-center justify-center  h-screen bg-gray-900">
        {" "}
        <img src={loading_spinner} alt="loading" height="200px" width="200px" />
      </div>
    );
  else
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center h-full">
        <NavBar />
        <div className="flex flex-wrap justify-evenly">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="w-[250px] mt-5 pb-10 font-bold">
          <Button
          type="primary"
            onClick={() => {
              if (pageNo > 1) setMovies("Loading");
              setPageNo(pageNo - 1);
            }}
          >
            Previous
          </Button>
          {pageNo}
          <Button 
            onClick={() => {
              if (pageNo < 20) setMovies("Loading");
              setPageNo(pageNo + 1);
            }}
          >
            {" "}
            Next
          </Button>
        </div>
      </div>
    );
}

export default HomePage;
