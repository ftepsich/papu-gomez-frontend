import React from "react";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

const Header = () => {
  const { isLogged, logout } = useUser();

  const handleClick = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <header>
      <h1>SISTEMA DE GESTIÓN DE TURNOS</h1>
      {isLogged ? (
        <Link to="#" onClick={handleClick}>
          Logout
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
};

export default Header;
