import React from "react";
import UserProvider from "./Context/User";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ProtectedNotLoggedIn, ProtectedMustLoggedIn } from "./Utils";

const AuthComponent = loadable(() => import("./Components/Auth"));

export default function App() {
  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route exact path="/">
            <p>Nesbaen</p>
          </Route>
          <ProtectedNotLoggedIn path="/auth" component={AuthComponent} />
          <ProtectedMustLoggedIn
            path="/"
            component={() => <p>Halo APP, dah login</p>}
          />
        </Switch>
      </UserProvider>
    </Router>
  );
}
