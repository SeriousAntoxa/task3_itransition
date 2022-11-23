import React from "react";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/Auth.Context";
import "materialize-css";

function App() {
  const { token, login, logout, userId, blocked } = useAuth();
  const isAuthenticated = !!token && !blocked
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, blocked
    }}>
        <div className="container">{routes}</div>
    </AuthContext.Provider>
  );
}

export default App;
