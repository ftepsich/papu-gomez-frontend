import React from "react";
import { Redirect, Route } from "react-router-dom";
import useUser from "../hooks/useUser";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useUser();
  console.log(isLogged);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogged) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
