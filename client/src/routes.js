import React from "react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { UsersPage } from "./pages/UsersPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <BrowserRouter>
          <Route path="/users" exact>
            <UsersPage />
          </Route>
          <Redirect to="/users" />
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
          <Route path="/" exact>
            <AuthPage />
          </Route>
          <Redirect to="/" />
      </BrowserRouter>
    );
  }
};
