import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import ManageTracks from "./components/profile-forms/ManageTracks";
import AddExperience from "./components/profile-forms/AddExperience";
import ManageImages from "./components/profile-forms/ManageImages";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import MusicalPost from "./components/post/MusicalPost";
import PrivateRoute from "./components/routing/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //empty brackets mean that this hook only runs once (like componentDidMount)

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          <div id="main-background">
            <div className="minh-4"></div>
            <Route exact path="/" component={Landing} />
            <div className="root-overlay">
              <div className="container">
                <Alert />
                <Switch>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/profiles" component={Profiles} />
                  <PrivateRoute exact path="/profile/user/:id" component={Profile} />
                  <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                  <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                  <PrivateRoute exact path="/add-experience" component={AddExperience} />
                  <PrivateRoute exact path="/manage-images" component={ManageImages} />
                  <PrivateRoute exact path="/manage-tracks" component={ManageTracks} />
                  <PrivateRoute exact path="/posts" component={Posts} />
                  <PrivateRoute exact path="/posts/:id" component={Post} />
                  <PrivateRoute exact path="/posts/musical/:id" component={MusicalPost} />
                </Switch>
              </div>
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
