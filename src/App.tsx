import React, { useCallback, useState } from "react";

import ListBox from "./components/ListBox.tsx";
import MovieList from "./components/MovieList.tsx";
import WatchedMoviesList from "./components/WatchedMoviesList.tsx";
import Navbar from "./components/Navbar.tsx";
import { Movie } from "./types/movies";
import Loader from "./components/Loader.tsx";
import ErrorMsg from "./components/ErrorMsg.tsx";
import MovieDetails from "./components/MovieDetails.tsx";
import { useMovies } from "./hooks/useMovies.tsx";
import { useLocalStorageState } from "./hooks/useLocalStorageState.tsx";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>();

  const [watched, setWatched] = useLocalStorageState<Movie[]>([], "watched");

  const handleCloseMovie = useCallback(() => {
    setSelectedId("");
  }, []);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const handleSelectMovie = (id: string) => {
    setSelectedId((selectedId) => (id === selectedId ? "" : id));
  };

  const handleAddWatched = (movie: Movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id: string) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <main className="main">
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMsg message={error} />}
        </ListBox>
        <div className="second-box">
          <ListBox>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                handleCloseMovie={handleCloseMovie}
                handleAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <WatchedMoviesList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
                handleSelectMovie={handleSelectMovie}
              />
            )}
          </ListBox>
        </div>
      </main>
    </>
  );
};

export default App;
