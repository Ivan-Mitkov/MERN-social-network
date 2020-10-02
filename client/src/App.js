import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alerts from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile_form/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import EditProfile from "./components/profile_form/EditProfile";
import AddEducation from "./components/profile_form/AddEducation";
import AddExperience from "./components/profile_form/AddExperience";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";

function App() {
  React.useEffect(() => {
    // check for token in LS
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    store.dispatch(loadUser());
    console.log("App use effect");
  }, [loadUser]);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alerts />
          <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/profiles" component={Profiles}></Route>
            <Route exact path="/profile/:id" component={Profile}></Route>
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/create_profile"
              component={CreateProfile}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/edit_profile"
              component={EditProfile}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/add_experience"
              component={AddExperience}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/add_education"
              component={AddEducation}
            ></PrivateRoute>
            <PrivateRoute exact path="/posts" component={Posts}></PrivateRoute>
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
