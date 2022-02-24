import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMovie, selectMovie, createLike } from "../store/movies";

export default function Movie() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movie = useSelector(selectMovie);

  useEffect(() => {
    dispatch(getMovie(id));
  }, [id]);

  function handleSubmit(number) {
    dispatch(
      createLike({
        movie_id: movie.id,
        like: { like: number },
        onSuccess: () => {
          dispatch(getMovie(id));
        },
      })
    );
  }

  if (!movie) {
    return null;
  }
  return (
    <div className="container">
      <div className="d-flex bd-highlight">
        <div className="col-5">
          <img width="100%" src={movie.image_url} alt="pic-any" />
          <h1>{movie.title}</h1>
          <h3>{movie.genre}</h3>
          <p>{movie.description}</p>
          <h3>Number of like {movie.likes}</h3>
          <h3>Number of dislike {movie.dislikes}</h3>
          <h3>Number of visit {movie.number_visit}</h3>
          <button disabled={movie.is_liked} onClick={() => handleSubmit(1)}>
            Like
          </button>
          <button disabled={movie.is_liked} onClick={() => handleSubmit(-1)}>
            Dislike
          </button>
        </div>
      </div>
    </div>
  );
}
