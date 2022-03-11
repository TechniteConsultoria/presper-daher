import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../UserService";

export const useSignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subscribed, isSubscribed] = useState(false);
  const [submited, isSubmited] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const signUp = async () => {
    if (submited && password === confirmPassword) {
      const body = {
        fullName: name,
        email: email,
        password: password,
        subscribed: subscribed,
        role: "USER",
      };

      const response = await UserService.createUser(body);

      if (response.status === 201) {
        const res = await UserService.authenticateUser(body);
        const token = res.data.token;
        const user = {
          fullName: res.data.fullName,
          email: res.data.email,
          id: res.data.id,
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
      isSubmited(false);
    }
  };

  useEffect(() => {
    setShowAlert(false);
  }, []);

  return {
    signUp,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    subscribed,
    isSubscribed,
    submited,
    isSubmited,
    showAlert,
    setShowAlert,
    navigate,
  };
};
