import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;
interface MoviesResponse {
  results: Movie[];
}
export default async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );

  return response.data.results;
}
