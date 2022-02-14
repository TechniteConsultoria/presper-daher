import React, { useState, useEffect, useContext } from "react";
import { useLoginPage } from "../../services/Hooks/LoginPageHook";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import "./Login.styles.css";

import google from "../../assets/google-logo.png";
import facebook from "../../assets/facebook-logo.png";

const axios = require("axios").default;

function Login() {
  const {
    setEmail,
    setPassword,
    isRememberPassword,
    rememberPassword,
    showAlert,
    facebookLogin,
    googleLogin,
    login,
  } = useLoginPage();

  // async function handleSubmit() {
  //   const body = {
  //     email,
  //     password,
  //     // lembrarSenha,
  //   };

  //   const url = "http://localhost:3333/auth/authenticate";
  //   await axios
  //     .post(url, body)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         // TODO - setar usuário no localstorage com token de autenticação
  //         navigate("/");
  //       }
  //     })
  //     .catch((error) => {
  //       setShowAlert(true);
  //       setTimeout(() => {
  //         setShowAlert(false);
  //       }, 6000);
  //       console.log(error);
  //     });
  // }

  return (
    <div className="container-login">
      <section>
        <div className="card p-5">
          <h2 className="title-card">Login</h2>

          <div>
            {showAlert && (
              <Alert variant="danger">
                Ops! Não foi possível encontrar o usuário. Cheque suas
                informações e tente novamente.
              </Alert>
            )}
          </div>

          <form
            className="row g-3 d-flex flex-column"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <br />
            <button
              className="btn btn-lg"
              id="social-login"
              onClick={googleLogin}
            >
              <Image src={google} alt="google-log" className="logo" /> Continuar
              com Google
            </button>
            <button
              className="btn btn-lg"
              id="social-login"
              onClick={facebookLogin}
            >
              <Image src={facebook} alt="google-log" className="logo" />{" "}
              Continuar com Facebook
            </button>
            <br />
            <input
              type="email"
              className="form"
              placeholder="Email"
              required
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form"
              placeholder="Senha"
              required
              name="senha"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={() => isRememberPassword(!rememberPassword)}
              ></input>

              <label className="form-check-label" htmlFor="flexCheckDefault">
                Lembrar minha senha
              </label>
            </div>

            <Button
              type="submit"
              id="btn-login"
              // style={{ background: "#14b8a6", border: "none" }}
            >
              Acessar
            </Button>

            <a href="/" style={{ color: "#14B8A6" }}>
              Esqueceu a senha?
            </a>
            <a href="/signup" style={{ color: "#14B8A6" }}>
              Não possui uma conta? Registre-se
            </a>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
