import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import "./Login.styles.css";

import google from "../../assets/google-logo.png";
import facebook from "../../assets/facebook-logo.png";
import login from "../../services/user/login";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarSenha, setLembrarSenha] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  async function handleSubmit() {
    try {

      let isOk = await login(email, senha)
      isOk == 'ok' ? window.location.pathname = '' : toast.error("Login incorreto!")
      // isOk == 'ok' ? console.log("bnjnbdfnbjndfjbndfnbdfjbdfjn"): toast.error("Login incorreto!")

    }
    catch (error) {

      toast.error(error)
      console.error(error);

    }
  }

  async function googleLogin() {
    console.log("Google Login function!");
  }

  async function facebookLogin() {
    console.log("Facebook Login function!");
  }

  useEffect(() => {
    setShowAlert(false);
  }, []);

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
            // action="submit"
            className="row g-3 d-flex flex-column"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
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
                setSenha(e.target.value);
              }}
            />

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={() => setLembrarSenha(!lembrarSenha)}
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
