import { useState } from "react";
import Image from "react-bootstrap/Image";
import "../css/login.css";

import google from "../assets/google-logo.png";
import facebook from "../assets/facebook-logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarSenha, setLembrarSenha] = useState(false);
  async function handleSubmit() {
    const data = {
      email,
      senha,
      lembrarSenha,
    };
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function googleLogin() {
    console.log("Google Login function!");
  }

  async function facebookLogin() {
    console.log("Facebook Login function!");
  }

  return (
    <div className="container-signup">
      <section>
        <div className="card p-5">
          <h2 className="title-card">Login</h2>

          <form
            action="submit"
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

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ background: "#14B8A6", border: "none" }}
            >
              Acessar
            </button>

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
