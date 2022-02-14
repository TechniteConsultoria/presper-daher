import React, { useState, createContext, useEffect } from "react";
// import { useCookies } from "react-cookie";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loged, setLoged] = useState(false);
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
    setLoged(true);
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

    localStorage.setItem("user", JSON.stringify(myUser));
    localStorage.setItem("@taget:token", myToken);
  }

  function signOut() {
    setToken(null);
    localStorage.removeItem("@taget:token");
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider
      value={{
        signed: token,
        token,
        signIn,
        signOut,
        setToken,
        user,
        setUser,
        loged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
