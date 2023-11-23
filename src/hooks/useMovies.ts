import { useState, useEffect } from "react";

type Movie = {
  title: string;
};

export const useMovies = (): {
  movies: Movie[];
  isLoading: boolean;
  error: any;
} => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesError, setMoviesError] = useState<string | null>(null);

  // const service = (): Promise<{ movies: Movie[] }> =>
  //   new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({ movies: [{ title: "Star Wars" }] });
  //     }, 1000);
  //   });

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data.results);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMoviesError(error.message);
      } else if (typeof error === "string") {
        setMoviesError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, isLoading, error: moviesError };
};
