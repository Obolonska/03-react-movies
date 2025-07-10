import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import { Toaster, toast } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const closeModal = () => {
    setSelectedMovie(null);
  };

  const onSubmit = async (query: string) => {
    setIsLoading(true);
    setError(false);
    setMovies([]);
    try {
      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      <Toaster />
    </>
  );
}
