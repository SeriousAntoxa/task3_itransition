import React, { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { useHttp } from "../hooks/http.hook";

export const UsersPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();

  const logoutHandler = async () => {
    try {
      auth.logout();
    } catch (e) {}
  };

  return (
    <div>
      <h1>Users Page s</h1>
      <button className="" onClick={logoutHandler} disabled={loading}>
        Выйти
      </button>
    </div>
  );
};
