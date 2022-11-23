import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "../context/Auth.Context";
import {useNavigate} from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const UsersPage = () => {
  const [usersList, setUsersList] = useState([])
  const auth = useContext(AuthContext);
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchLinks = useCallback( async () => {
    try {
        const fetched = await request('/api/users', 'GET', null, {})

        setUsersList(fetched)
    } catch (e) {}
  }, [request])

  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      auth.logout();
      navigate("/")
    } catch (e) {}
  };

  return (
    <div>
      <h1>Users Page s</h1>
      <button className="" onClick={logoutHandler}>
        Выйти
      </button>
    </div>
  );
};
