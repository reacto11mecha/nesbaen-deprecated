import React, { useContext, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../Context/User";

export default function ProtectedNotLoggedIn({
  component: Component,
  ...rest
}) {
  const [userState] = useContext(UserContext);
  const state = useMemo(
    () => userState.token !== null || userState.token !== undefined,
    [userState.token]
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        state ? (
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
