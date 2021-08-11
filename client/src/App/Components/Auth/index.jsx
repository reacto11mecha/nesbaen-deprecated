import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useRouteMatch,
} from "react-router-dom";
import loadable from "@loadable/component";

const LoginComponent = loadable(() => import("./LoginComponent"));

export default function Auth() {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Redirect
          to={{
            pathname: `${path}/login`,
          }}
        />
      </Route>
      <Route path={`${path}/login`} component={LoginComponent} />
    </Switch>
  );
}
