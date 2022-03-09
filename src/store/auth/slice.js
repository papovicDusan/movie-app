import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  register() {},
  login() {},
  logout() {},
  getActiveUser() {},
  addMovieWatchlist() {},
  getWatchlist() {},
  updateWatchlist() {},
  deleteMovieWatchlist() {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    activeUser: null,
  },
  reducers: {
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setWatchlist(state, action) {
      state.watchlist = action.payload;
    },
    setMovieInWatchlist(state, action) {
      state.activeUser.user_watchlist.push(action.payload);
    },
    setMovieIsWatched(state, action) {
      state.activeUser.user_watchlist = state.activeUser.user_watchlist.map(
        (movie) => {
          if (movie.id === action.payload) {
            movie.is_watched = true;
          }
          return movie;
        }
      );
    },
    removeMovieWatchlist(state, action) {
      state.activeUser.user_watchlist = state.activeUser.user_watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
    ...middlewareActions,
  },
});

export const {
  register,
  login,
  logout,
  getActiveUser,
  setActiveUser,
  setToken,
  addMovieWatchlist,
  getWatchlist,
  setWatchlist,
  updateWatchlist,
  setMovieInWatchlist,
  setMovieIsWatched,
  deleteMovieWatchlist,
  removeMovieWatchlist,
} = authSlice.actions;
export default authSlice.reducer;
