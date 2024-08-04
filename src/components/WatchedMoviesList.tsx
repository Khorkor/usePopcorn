import React from "react";
import { Movie } from "../types/movies";

interface WatchedMoviesListProps {
  watched: Movie[];
  handleDeleteWatched: (value: string) => void;
  handleSelectMovie: (value: string) => void;
}

const average = <T extends number>(arr: T[]): number => {
  return arr.length === 0
    ? 0
    : arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
};

const WatchedMoviesList: React.FC<WatchedMoviesListProps> = ({
  watched,
  handleDeleteWatched,
  handleSelectMovie,
}) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating || 0));
  const avgUserRating = average(watched.map((movie) => movie.userRating || 0));
  const avgRuntime = average(watched.map((movie) => movie.runtime || 0));

  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(1)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(1)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime.toFixed(0)} min</span>
          </p>
        </div>
      </div>

      <ul className="list list-movies">
        {watched.map((movie) => (
          <li
            key={movie.imdbID}
            onClick={() => handleSelectMovie(movie.imdbID)}
          >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.runtime ? movie.runtime : "some"} min</span>
              </p>
            </div>
            <button
              className="btn-delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteWatched(movie.imdbID);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default WatchedMoviesList;
