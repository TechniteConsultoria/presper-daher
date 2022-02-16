import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../UserService";

import { useAuth } from "../../contexts/AuthContext";

export const useLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, isRememberPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { setUser, setToken, signIn, setRole } = useAuth();

  const navigate = useNavigate();

  const login = async () => {
    if (email && password) {
      const body = {
        email: email,
        password: password,
      };
      const response = await UserService.authenticateUser(body);
      //* console.log(response);
      if (response.status === 200) {
        const token = response.data.token;
        const role = response.data.role;

        const user = {
          fullName: response.data.fullName,
          email: response.data.email,
          id: response.data.id,
          role: response.data.role,
        };
        setUser(user);
        setToken(token);
        setRole(role);
        signIn(token, user);

        // localStorage.setItem("user", JSON.stringify(user));
        // localStorage.setItem("@presper-daher:token", token);

        if (response.data.role === "ADMIN") navigate("/admin");
        else navigate("/");
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      }
      //* console.log(response);
    }
  };

  const googleLogin = async () => {
    console.log("Google Login function!");
    const response = await UserService.authenticateGoogleUser();
    console.log(response);
  };

  const facebookLogin = async () => {
    console.log("Facebook Login function!");
  };

  useEffect(() => {
    setShowAlert(false);
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberPassword,
    isRememberPassword,
    showAlert,
    setShowAlert,
    login,
    googleLogin,
    facebookLogin,
  };
};
