import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth, shallowEqual);

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated && !auth.loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
