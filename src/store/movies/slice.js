import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getMovies() {},
  getMovie() {},
  createMovie() {},
  createLike() {},
  createComment() {},
  getComments() {},
  getPopularMovies() {},
  getGenreMovies() {},
  deleteLike() {},
  addVisit() {},
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    page: {
      count: 0,
      next: "",
      previous: "",
      results: [],
    },
    selectedMovie: null,
    comments: {
      count: 0,
      next: "",
      previous: "",
      results: [],
    },
    popularMovies: [],
    genreMovies: [],
  },
  reducers: {
    setMovies(state, action) {
      state.page = action.payload;
    },
    setMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    addComment(state, action) {
      state.comments.results.push(action.payload);
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
    addComments(state, action) {
      action.payload.results = [
        ...state.comments.results,
        ...action.payload.results,
      ];
      state.comments = action.payload;
    },
    setPopularMovies(state, action) {
      state.popularMovies = action.payload;
    },
    setGenreMovies(state, action) {
      state.genreMovies = action.payload;
    },
    setLikes(state, action) {
      state.selectedMovie.likes = state.selectedMovie.likes + 1;
      if (state.selectedMovie.liked_or_disliked_user === -1) {
        state.selectedMovie.dislikes = state.selectedMovie.dislikes - 1;
      }
      state.selectedMovie.liked_or_disliked_user = 1;
    },
    setDislikes(state, action) {
      state.selectedMovie.dislikes = state.selectedMovie.dislikes + 1;
      if (state.selectedMovie.liked_or_disliked_user === 1) {
        state.selectedMovie.likes = state.selectedMovie.likes - 1;
      }
      state.selectedMovie.liked_or_disliked_user = -1;
    },
    removeLikes(state, action) {
      state.selectedMovie.likes = state.selectedMovie.likes - 1;
      state.selectedMovie.liked_or_disliked_user = 0;
    },
    removeDislikes(state, action) {
      state.selectedMovie.dislikes = state.selectedMovie.dislikes - 1;
      state.selectedMovie.liked_or_disliked_user = 0;
    },
    ...middlewareActions,
  },
});

export default moviesSlice.reducer;

export const {
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
  setPopularMovies,
  setGenreMovies,
  getPopularMovies,
  getGenreMovies,
  setLikes,
  setDislikes,
  deleteLike,
  removeLikes,
  removeDislikes,
  setVisit,
  addVisit,
} = moviesSlice.actions;
