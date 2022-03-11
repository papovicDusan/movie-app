import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getMovie,
  selectMovie,
  createLike,
  createComment,
  getComments,
  selectComments,
  getGenreMovies,
  selectGenreMovies,
  deleteLike,
  addVisit,
} from "../store/movies";
import { selectActiveUser, addMovieWatchlist } from "../store/auth";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { serverURL } from "../environment";

export default function Movie() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector(selectMovie);
  const comments = useSelector(selectComments);
  const genreMovies = useSelector(selectGenreMovies);
  const activeUser = useSelector(selectActiveUser);

  let isInWatchlist;
  let isWatched;

  if (movie && activeUser) {
    const watchlistElement = activeUser.user_watchlist.find(
      (watchlist) => watchlist.movie === movie.id
    );
    isInWatchlist = !!watchlistElement;
    isWatched = !!watchlistElement?.is_watched;
  }

  useEffect(() => {
    if (id) {
      dispatch(addVisit(id));
      dispatch(getMovie(id));
      dispatch(getComments({ movie_id: id, page: 1 }));
      dispatch(getGenreMovies(id));
    }
  }, [id]);

  const addLike = (number) => {
    dispatch(
      createLike({
        movie_id: movie.id,
        like: { like: number },
      })
    );
  };

  const removeLike = (number) => {
    dispatch(
      deleteLike({
        movie_id: movie.id,
        like: { like: number },
      })
    );
  };

  const addMovie = () => {
    dispatch(
      addMovieWatchlist({
        movie_id: { movie: movie.id },
      })
    );
  };

  const seeComments = (pageNew) => {
    dispatch(getComments({ movie_id: id, page: pageNew }));
  };

  if (!movie) {
    return null;
  }

  return (
    <div className="container p-1">
      <div className="d-flex bd-highlight">
        <div className="col-9">
          <img
            width="100%"
            src={`${serverURL}${movie.full_size}`}
            alt="pic-any"
          />
          <h1>{movie.title}</h1>
          <h3>{movie.genre}</h3>
          <p>{movie.description}</p>
          <h3>Number of like {movie.likes}</h3>
          <h3>Number of dislike {movie.dislikes}</h3>
          <h3>Number of visit {movie.visits}</h3>
          {movie.liked_or_disliked_user === 1 ? (
            <button
              className="btn btn-warning"
              disabled={movie.liked_or_disliked_user === 0}
              onClick={() => removeLike(1)}
            >
              Remove Like
            </button>
          ) : (
            <button
              className="btn btn-primary"
              disabled={movie.liked_or_disliked_user === 1}
              onClick={() => addLike(1)}
            >
              Like
            </button>
          )}
          {movie.liked_or_disliked_user === -1 ? (
            <button
              className="btn btn-warning"
              disabled={movie.liked_or_disliked_user === 0}
              onClick={() => removeLike(-1)}
            >
              Remove Dislike
            </button>
          ) : (
            <button
              className="btn btn-danger"
              disabled={movie.liked_or_disliked_user === -1}
              onClick={() => addLike(-1)}
            >
              Dislike
            </button>
          )}

          {isWatched && <h3 className="text-danger">You've watched this!</h3>}

          {!isInWatchlist && (
            <button className="btn btn-success" onClick={addMovie}>
              Add Movie on Watchlist
            </button>
          )}

          <h3>Create Comment</h3>
          <Formik
            initialValues={{
              content: "",
            }}
            validationSchema={Yup.object({
              content: Yup.string().required("Required"),
            })}
            onSubmit={(values, { resetForm }) => {
              dispatch(
                createComment({
                  movie_id: id,
                  comment: values,
                  onSuccess: () => {
                    dispatch(getComments({ movie_id: id, page: 1 }));
                    resetForm({ values: "" });
                  },
                })
              );
            }}
          >
            <Form>
              <label htmlFor="content">Create Comment</label>
              <Field name="content" type="text" />
              <ErrorMessage name="content" />

              <button type="submit">Submit</button>
            </Form>
          </Formik>
          <h3>Comments</h3>
          {comments?.results.length ? (
            <ul>
              {comments?.results?.map((comment) => (
                <li key={comment.id}>
                  <div> {comment.content}</div>
                </li>
              ))}
            </ul>
          ) : (
            <h3>No Comments</h3>
          )}
          {comments?.next !== null && (
            <button
              className="btn-primary"
              onClick={() =>
                seeComments(Number(comments.next.split("page=")[1]))
              }
            >
              More
            </button>
          )}
        </div>
        <nav id="sidebar">
          <div className="p-4 pt-5">
            <h3>Related movies</h3>
            <ul className="list-unstyled components mb-5">
              {genreMovies?.map((movie) => (
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
