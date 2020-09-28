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

function App() {
  React.useEffect(() => {
    // check for token in LS

    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
    }
    store.dispatch(loadUser());
  }, []);

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
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
