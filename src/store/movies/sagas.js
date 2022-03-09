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
  getComments,
  setComments,
  addComments,
  getPopularMovies,
  getGenreMovies,
  setPopularMovies,
  setGenreMovies,
  setLikes,
  setDislikes,
  deleteLike,
  removeLikes,
  removeDislikes,
  addVisit,
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
    yield call(moviesService.createMovie, action.payload.movie);

    if (action.payload.onSuccess) {
      yield call(action.payload.onSuccess);
    }
  } catch (error) {
    console.error(error);
  }
}

function* handleCreateLike(action) {
  try {
    yield call(
      moviesService.createLike,
      action.payload.movie_id,
      action.payload.like
    );
    if (action.payload.like.like === 1) {
      yield put(setLikes());
    }
    if (action.payload.like.like === -1) {
      yield put(setDislikes());
    }
  } catch (error) {
    console.error(error);
  }
}

function* handleDeleteLike(action) {
  try {
    yield call(
      moviesService.deleteLike,
      action.payload.movie_id,
      action.payload.like
    );
    if (action.payload.like.like === 1) {
      yield put(removeLikes());
    }
    if (action.payload.like.like === -1) {
      yield put(removeDislikes());
    }
  } catch (error) {
    console.error(error);
  }
}

function* handleCreateComment(action) {
  try {
    yield call(
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

function* handleAddVisit(action) {
  try {
    yield call(moviesService.addVisit, action.payload);
  } catch (error) {
    console.log(error);
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

export function* watchDeleteLike() {
  yield takeLatest(deleteLike.type, handleDeleteLike);
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

export function* watchAddVisit() {
  yield takeLatest(addVisit.type, handleAddVisit);
}
