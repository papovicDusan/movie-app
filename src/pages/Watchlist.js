import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveUser,
  selectIsAuthenticated,
  getActiveUser,
} from "../store/auth";
import { useEffect } from "react";
import {
  getWatchlist,
  selectWatchlist,
  updateWatchlist,
  deleteMovieWatchlist,
} from "../store/movies";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);
  const watchlist = useSelector(selectWatchlist);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (activeUser) {
      dispatch(getWatchlist(activeUser.id));
    }
  }, [activeUser]);

  const checkViewed = (id) => {
    dispatch(
      updateWatchlist({
        watchlist_id: id,
        user_id: activeUser.id,
        is_watched: { is_watched: true },
      })
    );
  };

  const removeMovieWatchlist = (id) => {
    dispatch(
      deleteMovieWatchlist({
        watchlist_id: id,
        user_id: activeUser.id,
      })
    );
  };

  return (
    <div className="container">
      <ul>
        {watchlist?.map((movie) => (
          <li key={movie.id}>
            <div
              className="card card-image"
              style={{
                backgroundImage: `url(${movie.movie.image_url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4">
                <div>
                  <h3 className="card-title pt-2">
                    <strong>{movie.movie.title}</strong>
                  </h3>
                  <p>{movie.movie.description.substring(0, 100)}</p>
                  <Link
                    className="btn btn-light"
                    to={`/movies/${movie.movie.id}`}
                  >
                    Movie detail
                  </Link>

                  {movie.is_watched === true ? (
                    <h3 className="text-danger">You've watched this!</h3>
                  ) : (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={movie.is_watched}
                        id="defaultCheck1"
                        onChange={() => checkViewed(movie.id)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="defaultCheck1"
                      >
                        Check if you watched the movie
                      </label>
                    </div>
                  )}
                  <button
                    className="btn btn-warning"
                    onClick={() => removeMovieWatchlist(movie.id)}
                  >
                    Delete from Watchlist
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
