import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth.Context";
import { useHttp } from "../hooks/http.hook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [form, setForm] = useState({ userName: "", email: "", password: "" });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId, data.block);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder=""
                  id="userName"
                  type="text"
                  name="userName"
                  className="input__yellow"
                  onChange={changeHandler}
                />
                <label htmlFor="userName">Имя пользователя</label>
              </div>

              <div className="input-field">
                <input
                  placeholder=""
                  id="email"
                  type="text"
                  name="email"
                  className="input__yellow"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder=""
                  id="password"
                  type="text"
                  name="password"
                  className="input__yellow"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow-darken-4 card_btn__login"
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
