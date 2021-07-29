import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginComponent from "./Components/LoginComponent";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginComponent} />
      </Switch>
    </Router>
  );
}
