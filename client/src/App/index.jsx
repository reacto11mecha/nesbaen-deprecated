import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const LoginComponent = loadable(() => import("./Components/LoginComponent"));

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginComponent} />
      </Switch>
    </Router>
  );
}
