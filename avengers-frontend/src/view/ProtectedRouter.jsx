import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isVerifiedUser } from "../services/userAuthService";

const ProtectedRoute = ({ path, component: Component, render }) => {
  return (
    <div>
      <Route
        path={path}
        render={(props) => {
          if (!isVerifiedUser())
            return (
              // redirect to login page if authentication expires
              // and store the location where user want to go before
              <Redirect
                to={{
                  pathname: "/to-anonymous-users",
                  state: { from: props.location }
                }}
              />
            );
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    </div>
  );
};

export default ProtectedRoute;
