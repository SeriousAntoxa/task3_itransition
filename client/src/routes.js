import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { UsersPage } from "./pages/UsersPage";

export const useRoutes = (isAuthenticated) => {

  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/users" exact>
          <UsersPage />
        </Route>
        <Redirect to="/users" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact>
          <AuthPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
};
