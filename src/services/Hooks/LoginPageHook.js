import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../UserService";

export const useLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, isRememberPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    if (email && password) {
      const body = {
        email: email,
        password: password,
      };
      const response = await UserService.authenticateUser(body);
      if (response.status === 200) {
        const token = response.data.token;
        const user = {
          fullName: response.data.fullName,
          email: response.data.email,
          id: response.data.id,
          role: response.data.role,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("@presper-daher:token", token);

        navigate("/");
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 6000);
      }
      console.log(response);
    }
  };

  const googleLogin = async () => {
    console.log("Google Login function!");
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
