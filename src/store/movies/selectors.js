export function selectMovies(state) {
  return state.movies.page;
}

export function selectMovie(state) {
  return state.movies.selectedMovie;
}

export function selectComments(state) {
  return state.movies.comments;
}

export function selectPopularMovies(state) {
  return state.movies.popularMovies;
}

export function selectGenreMovies(state) {
  return state.movies.genreMovies;
}

export function selectWatchlist(state) {
  return state.movies.watchlist;
}
