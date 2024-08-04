import { useEffect, useRef, useState } from "react";
import { Movie } from "../types/movies";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKeyPress } from "../hooks/useKeyPress";

interface MovieDetailsProps {
  selectedId: string;
  handleCloseMovie: () => void;
  handleAddWatched: (value: Movie) => void;
  watched: Movie[];
}

interface SelectedMovieDetails {
  Title: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

const API_KEY = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const MovieDetails: React.FC<MovieDetailsProps> = ({
  selectedId,
  handleCloseMovie,
  handleAddWatched,
  watched,
}) => {
  const [movieDetail, setMovieDetail] = useState<SelectedMovieDetails>();
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetail || {};

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watcedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(`${apiUrl}/?apikey=${API_KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovieDetail(data);
      setIsLoading(false);
    };

    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useKeyPress("Escape", handleCloseMovie);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: title,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movieDetail} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watcedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
