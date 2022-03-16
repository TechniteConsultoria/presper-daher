import React, { useState, createContext, useEffect, useContext } from "react";
// import { useCookies } from "react-cookie";

export const userFromLocalStorage = JSON.parse(
  localStorage.getItem("user") || null
);
const tokenFromLocalStorage =
  localStorage.getItem("@presper-daher:token") || null;
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(userFromLocalStorage);
  const [token, setToken] = useState(tokenFromLocalStorage);
  const [loged, setLoged] = useState(false);
  const [role, setRole] = useState("USER");

  // const [user, setUser] = useState(null);
  //   const [, setCookie] = useCookies(["@target:user", "@target:token"]);

  //   useEffect(() => {
  //     const getStoragedData = () => {
  //       const storagedToken = localStorage.getItem("@taget:token");
  //       const user = localStorage.getItem("user");

  //       if (storagedToken) {
  //         setToken(storagedToken);
  //       }
  //       if (user) {
  //         setUser(JSON.parse(user));
  //       }
  //     };
  //     getStoragedData();
  //   }, []);

  function signIn(myToken, myUser) {
    setToken(myToken);
    setUser(myUser);
    setLoged(true);

    // setRole(myRole);
    // setCookie("@target:user", myUser, {
    //   path: "/",
    //   maxAge: 60 * 60 * 24, //expira em 24horas
    //   sameSite: true,
    // });

    // setCookie("@target:token", myToken, {
    //   path: "/",
    //   maxAge: 60 * 60 * 24, //expira em 24horas
    //   sameSite: true,
    // });

    localStorage.setItem("user", myUser);
    localStorage.setItem("@presper-daher:token", myToken);
  }

  function logout() {
    // setToken(null);
    // setUser(null);
    // setLoged(false);
    // setRole("USER");
    // localStorage.removeItem("@presper-daher:token");
    // localStorage.removeItem("user");
    localStorage.clear()
    window.location.reload();
  }

  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem("user") || null));
    setUser(localStorage.getItem("user") || null);
  }, []);

  // useEffect(() => {
  //   console.log("User:", user);
  //   console.log("Token:", token);
  //   console.log("Role:", role);
  // }, [user, token, role]);

  return (
    <AuthContext.Provider
      value={{
        signed: token,
        token,
        signIn,
        logout,
        setToken,
        loged,
        // ------->
        user,
        setUser,
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  const { user, setUser, logout, signIn, setToken, role, setRole } = context;

  return { user, setUser, logout, signIn, setToken, role, setRole };
}
