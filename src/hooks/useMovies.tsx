import { useEffect, useState } from "react";
import { Movie } from "../types/movies";

const API_KEY = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export const useMovies = (query: string, callback: () => void) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    callback?.();

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${apiUrl}/?apikey=${API_KEY}&s=${query}`, {
          signal: controller.signal,
        });

        if (!res.ok)
          throw new Error("Something went wrong with fecthing movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie Not Found");

        setMovies(data.Search);
        setError("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query, callback]);

  return { movies, isLoading, error };
};
