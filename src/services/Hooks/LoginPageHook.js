import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../UserService";

import { toast } from "react-toastify";

import { useAuth } from "../../contexts/AuthContext";

import { default as loginUser} from "../user/login";

export const useLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, isRememberPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { setUser, setToken, signIn, setRole } = useAuth();

  const navigate = useNavigate();

  // const login = async () => {
  //   if (email && password) {
  //     const body = {
  //       email: email,
  //       password: password,
  //     };
  //     const response = await UserService.authenticateUser(body);
  //     //* console.log(response);
  //     if (response.status === 200) {
  //       const token = response.data.token;
  //       console.log(token);
  //       const role = response.data.role;

  //       const user = {
  //         fullName: response.data.fullName,
  //         email: response.data.email,
  //         id: response.data.id,
  //         role: response.data.role,
  //       };
  //       setUser(user);
  //       setToken(token);
  //       setRole(role);
  //       signIn(token, user);

  //       if (response.data.role === "ADMIN") navigate("/admin");
  //       else navigate("/");
  //     } else {
  //       setShowAlert(true);
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 6000);
  //     }
  //     //* console.log(response);
  //   }
  // };

  const login = async () => {
    try {

      let isOk = await loginUser(email, password)
      isOk == 'ok' ? window.location.pathname = '' : toast.error("Login incorreto!")

    }
    catch (error) {

      toast.error(error)
      console.error(error);

    }
  }

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
