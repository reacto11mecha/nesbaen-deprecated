import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Context/User";

export default function ProtectedNotLoggedIn({
  component: Component,
  ...rest
}) {
  const [userState] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userState.token !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
            }}
          />
        )
      }
    />
  );
}
