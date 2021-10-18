import { useState, createContext } from "react";

const Context = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    window.sessionStorage.getItem("token")
  );
  return (
    <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
  );
};

export default Context;
