import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMovies } from "../store/movies";

export default function MoviesFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const typeMovies = [
    "historical",
    "horror",
    "comedy",
    "crime",
    "western",
    "fantasy",
    "action",
    "drama",
    "romance",
    "thriller",
    "adventure",
    "mystery",
    "political",
  ];

  useEffect(() => {
    dispatch(getMovies({ genre: searchTerm, page: 1 }));
  }, [searchTerm]);

  return (
    <div>
      <h3>Filter</h3>
      <form>
        <select onChange={({ target }) => setSearchTerm(target.value)}>
          {typeMovies.map((movie) => (
            <option key={movie} value={movie}>
              {movie}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
