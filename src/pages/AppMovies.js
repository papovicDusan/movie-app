import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovies,
  selectMovies,
  getPopularMovies,
  selectPopularMovies,
} from "../store/movies";
import { Link } from "react-router-dom";
import MoviesSearch from "../components/MoviesSearch";
import MoviesFilter from "../components/MoviesFilter";

export default function AppMovies() {
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();
  const popularMovies = useSelector(selectPopularMovies);

  useEffect(() => {
    dispatch(getMovies({ genre: "", search: "", page: 1 }));
    dispatch(getPopularMovies());
  }, []);

  const add = (pageNew) => {
    dispatch(getMovies({ page: pageNew }));
  };

  return (
    <div className="container">
      <div className="d-flex">
        <div className="col-9">
          <h1>App movies</h1>
          <MoviesSearch />
          <MoviesFilter />
          <ul>
            {movies.results.map((movie) => (
              <li key={movie.id}>
                <div
                  className="card card-image"
                  style={{
                    backgroundImage: `url(${movie.image_url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                    <div>
                      <h3 className="card-title pt-2">
                        <strong>{movie.title}</strong>
                      </h3>
                      <p>{movie.description.substring(0, 100)}</p>
                      <Link
                        className="btn btn-light"
                        to={`/movies/${movie.id}`}
                      >
                        Movie detail
                      </Link>
                      <p>Number of like {movie.likes}</p>
                      <p>Number of dislike {movie.dislikes}</p>
                      <p>Number of visit {movie.visits}</p>
                      {movie.user_watched === true && (
                        <p>You've watched this!</p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {movies.previous !== null && (
            <button
              className="btn-primary"
              onClick={() => add(movies.previous.split("page=")[1])}
            >
              Previous
            </button>
          )}
          {movies.next !== null && (
            <button
              className="btn-primary"
              onClick={() => add(movies.next.split("page=")[1])}
            >
              Next
            </button>
          )}
        </div>
        <nav id="sidebar">
          <div className="p-4 pt-5">
            <h3>Popular movies</h3>
            <ul className="list-unstyled components mb-5">
              {popularMovies?.map((movie) => (
                <li key={movie.id}>
                  <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
