import React from "react";
import UserProvider from "./Context/User";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const LoginComponent = loadable(() => import("./Components/LoginComponent"));

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route exact path="/" component={LoginComponent} />
        </Switch>
      </UserProvider>
    </Router>
  );
}
