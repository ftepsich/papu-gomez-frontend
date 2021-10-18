import React, { useState, useEffect } from "react";
import "../Formulario/Formulario.scss";
import { Link, useHistory } from "react-router-dom";
import "../Formulario/Formulario.scss";
import Input from "../Formulario/Input";
import useUser from "../../hooks/useUser";

const LoginHooks = () => {
  const [username, setUsername] = useState("");
  const [password, setPasswrord] = useState("");
  const { login, isLogged } = useUser();
  const history = useHistory();

  useEffect(() => {
    if (isLogged) history.push("/turnos");
  }, [isLogged, history]);

  const handleLogin = (event) => {
    event.preventDefault();
    login({ username, password });
  };

  return (
    <div className="formulario">
      <div className="form-header">Iniciar sesión</div>
      <div className="form-body">
        <Input
          id="username"
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          placeholder="Usuario *"
        />
        <Input
          id="password"
          name="password"
          onChange={({ target }) => setPasswrord(target.value)}
          value={password}
          placeholder="Contraseña *"
          type="password"
        />
        <button className="btn" onClick={handleLogin}>
          Ingresar
        </button>
      </div>

      <p>
        <input type="checkbox" /> Recordarme
      </p>
      <Link to="/login/recuperarcontrasenia">¿Olvidaste tu contraseña? </Link>
    </div>
  );
};

export default LoginHooks;
