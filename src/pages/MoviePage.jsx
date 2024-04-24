import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loading_spiner from "../assets/Loading.gif";
import play_icon from "../assets/play.svg";
import NavBar from "../components/NavBar";
async function getMovies(movieId) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${"e4fc8b48c1647990faa243517293570e"}`
  );
  return res.data;
}
async function getClips(movieId) {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${"e4fc8b48c1647990faa243517293570e"}`
  );
  return res.data.results;
}

function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovies] = useState("loading");
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.screen.availWidth);
  const [clips, setClips] = useState([]);

  let mt = width > 786 ? (width * 9) / 16 - 250 : 0;

  window.addEventListener("resize", () => {
    setWidth(window.screen.availWidth);
  });

  useEffect(() => {
    getMovies(movieId)
      .then((res) => {
        setMovies(res);
        getClips(movieId).then((res) => {
          setClips(res);
        });
      })
      .catch((err) => {
        alert(err);
        navigate("/", { replace: true });
      });
  }, []);
  if (movie === "loading" || !movie) {
    return (
      <div className="bg-gray-900 h-screen flex items-center justify-center">
        <img src={loading_spiner} alt="loading" />
      </div>
    );
  }
  return (
    <div className="bg-gray-900 text-white text-3xl font-bold">
      {width < 768 ? (
        <NavBar />
      ) : (
        <img
          src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
          alt="backdrop"
          className="w-screen aspect-video absolute top-0"
        />
      )}
      <div
        className="flex items-center justify-start gap-10 md:flex-row md:ml-[50px]"
        style={{
          marginTop: `${mt}px`,
        }}
      >
        <img
          src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
          alt="poster"
          className="rounded-xl border-white border-4 max-w-[min-(400px,90%)] sm:max-w-[50%] md:h-[576px] z-10"
        />
        <h1 className="z-10 text-center ">{movie.title}</h1>
      </div>
      <div className="mt-5 text-xl  mx-2">
        <div className="mt-5  text-lg">
          <div>
            Release Date :
            <span className="font-normal">{movie.release_date}</span>
          </div>
          <div>
            Duration :-
            <span className="font-normal">{parseInt(movie.runtime /60)}:{movie.runtime % 60} hr</span>
          </div>
          <div>
            Rating:-
            <span className="font-normal">{movie.vote_average}/10</span>
          </div>
        </div>
        Clips and Trailer
        <div className="flex overflow-scroll scrollbar-hide snap-x mt-5">
          {clips.map((clip) => (
            <div
              className="ml-5"
              key={movie.id}
              onClick={() => {
                window.open(`https://youtube.com/watch?v=${clip.key}`);
              }}
            >
              <div className="relative flex-shrink-0 h-[180px] md:h-[250px] aspect-video rounded-xl cursor-pointer">
                <img
                  src={`https://img.youtube.com/vi/${clip.key}/hqdefault.jpg`}
                  className="absolute object-cover h-[180px] md:h-[250px] aspect-video rounded-xl"
                />
                <img
                  src={play_icon}
                  alt="play icon"
                  className="absolute inset-0 w-[100px] h-[100px]  m-auto"
                />
              </div>
              <p className="text-lg font-normal mt-5 ">{clip.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 ">Overview</div>
        <div className="mt-5 font-normal text-lg">{movie.overview}</div>
      </div>
    </div>
  );
}

export default MoviePage;
