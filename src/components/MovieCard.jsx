/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function MovieCard({ movie }) {
  return (
    <Link to= {`/movie/${movie.id}`}>
    <div className="w-[21rem] max-w-[100%] bg-gary-700 rounded-xl text-white border-2 border-blue-400 p-3 m-5 flex flex-col cursor-pointer text-xl hover:scale-110">
      <img
        className="w-full self-center rounded-lg h-[476px]"
        // eslint-disable-next-line react/prop-types
        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
        alt=""
        />
      <h3 className="my-1">{movie.title}</h3>
      <h3 className="my-1">⭐{movie.vote_average}/10</h3>
    </div>
        </Link>
  );
}

export default MovieCard;
