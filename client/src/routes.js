import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { UsersPage } from "./pages/UsersPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<UsersPage />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
};
