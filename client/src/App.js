import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";

import "./App.css";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Routes from "./components/routing/Routes";

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
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
