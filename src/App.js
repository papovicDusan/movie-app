import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { useEffect } from "react";

import NavBar from "./components/NavBar";
import GuestRoute from "./components/shared/GuestRoute";
import PrivateRoute from "./components/shared/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppMovies from "./pages/AppMovies";
import Movie from "./pages/Movie";
import CreateMovie from "./pages/CreateMovie";
import Watchlist from "./pages/Watchlist";

import {
  getActiveUser,
  selectIsAuthenticated,
  selectActiveUser,
} from "./store/auth";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  useEffect(() => {
    dispatch(getActiveUser());
  }, []);

  if (activeUser) {
    console.log("active user", activeUser);
  }
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <GuestRoute exact path="/login">
            <Login />
          </GuestRoute>
          <GuestRoute exact path="/register">
            <Register />
          </GuestRoute>
          <PrivateRoute exact path="/movies">
            <AppMovies />
          </PrivateRoute>
          <PrivateRoute exact path="/movies/create">
            <CreateMovie />
          </PrivateRoute>
          <PrivateRoute exact path="/movies/:id">
            <Movie />
          </PrivateRoute>
          <PrivateRoute exact path="/watchlist">
            <Watchlist />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
