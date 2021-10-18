import { useContext, useCallback } from "react";
import Context from "../context/authContext";
import { authenticate } from "../services/login";

const useUser = () => {
  const { token, setToken } = useContext(Context);

  //login user
  const login = useCallback(
    ({ username, password }) => {
      authenticate({ username, password }).then((token) => {
        window.sessionStorage.setItem("token", token);
        setToken(token);
        console.log(token);
      });
    },
    [setToken]
  );

  //login user
  const logout = useCallback(() => {
    window.sessionStorage.removeItem("token");
    setToken(null);
  }, [setToken]);

  return {
    isLogged: Boolean(token),
    login,
    logout,
  };
};

export default useUser;
