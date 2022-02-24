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
      // state.selectedMovie.movie_comments.push(action.payload);
      // action.payload.results = [...state.comments.results, action.payload];
      // state.comments.results = action.payload.results;
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
    },
    setDislikes(state, action) {
      state.selectedMovie.dislikes = state.selectedMovie.dislikes + 1;
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
} = moviesSlice.actions;
