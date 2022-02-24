import { takeLatest, call, put } from "redux-saga/effects";
import moviesService from "../../services/MoviesService";
import {
  getMovies,
  setMovies,
  getMovie,
  setMovie,
  createMovie,
  createLike,
  createComment,
  addComment,
  getComments,
  setComments,
  addComments,
  getPopularMovies,
  getGenreMovies,
  setPopularMovies,
  setGenreMovies,
  setLikes,
  setDislikes,
} from "./slice";

function* handleGetMovies(action) {
  try {
    const movies = yield call(
      moviesService.getMovies,
      action.payload.genre,
      action.payload.search,
      action.payload.page
    );
    yield put(setMovies(movies));
  } catch (error) {
    console.error(error);
  }
}

function* handleGetMovie(action) {
  try {
    const movie = yield call(moviesService.getMovie, action.payload);
    yield put(setMovie(movie));
  } catch (error) {
    console.log(error);
  }
}

function* handleCreateMovie(action) {
  try {
    const movie = yield call(moviesService.createMovie, action.payload.movie);

    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.error(error);
  }
}

function* handleCreateLike(action) {
  try {
    const movie = yield call(
      moviesService.createLike,
      action.payload.movie_id,
      action.payload.like
    );
    if (movie.like == 1) {
      yield put(setLikes());
    }
    if (movie.like == -1) {
      yield put(setDislikes());
    }
  } catch (error) {
    console.error(error);
  }
}

function* handleCreateComment(action) {
  try {
    const comment = yield call(
      moviesService.createComment,
      action.payload.movie_id,
      action.payload.comment
    );
    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
    // yield put(addComment(comment));
  } catch (error) {
    console.error(error);
  }
}

function* handleGetComments(action) {
  try {
    const comments = yield call(
      moviesService.getComments,
      action.payload.movie_id,
      action.payload.page
    );
    if (action.payload?.page > 1) {
      yield put(addComments(comments));
    } else {
      yield put(setComments(comments));
    }
  } catch (error) {
    console.error(error);
  }
}

function* handleGetPopularMovies(action) {
  try {
    const movies = yield call(moviesService.getPopularMovies);
    yield put(setPopularMovies(movies));
  } catch (error) {
    console.error(error);
  }
}

function* handleGetGenreMovies(action) {
  try {
    const movies = yield call(moviesService.getGenreMovies, action.payload);
    yield put(setGenreMovies(movies));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGetMovies() {
  yield takeLatest(getMovies.type, handleGetMovies);
}

export function* watchGetMovie() {
  yield takeLatest(getMovie.type, handleGetMovie);
}

export function* watchCreateMovie() {
  yield takeLatest(createMovie.type, handleCreateMovie);
}

export function* watchCreateLike() {
  yield takeLatest(createLike.type, handleCreateLike);
}

export function* watchCreateComment() {
  yield takeLatest(createComment.type, handleCreateComment);
}

export function* watchGetComments() {
  yield takeLatest(getComments.type, handleGetComments);
}

export function* watchGetPopularMovies() {
  yield takeLatest(getPopularMovies.type, handleGetPopularMovies);
}

export function* watchGetGenreMovies() {
  yield takeLatest(getGenreMovies.type, handleGetGenreMovies);
}
