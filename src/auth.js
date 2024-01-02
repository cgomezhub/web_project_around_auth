import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../src/components/Login";
import Register from "../src/components/Register";

function Auth({ isLoggedIn }) {
  return (
    <Switch>
      <Route path="/signin">
        {isLoggedIn ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/signup">
        {isLoggedIn ? <Redirect to="/" /> : <Register />}
      </Route>
    </Switch>
  );
}

export default Auth;
