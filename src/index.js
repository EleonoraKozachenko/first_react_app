import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./containers/App";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Landing from "./containers/Landing";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //route (в нашем случае) - страница, Switch - контейнер всех route

const BasicRouting = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/landing">
          <Landing />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<BasicRouting />, document.getElementById("root"));
