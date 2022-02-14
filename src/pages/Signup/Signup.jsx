import React from "react";
import { useSignupPage } from "../../services/Hooks/SignupPageHook";
import Alert from "react-bootstrap/Alert";

import "./Signup.styles.css";

function Signup() {
  const {
    signUp,
    setName,
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
  } = useSignupPage();

  return (
    <>
      <div className="container-signup">
        <section>
          <div className="card p-5">
            <h2 className="title-card">Sign up</h2>
            {submited && password !== confirmPassword && (
              <Alert variant="danger">As senhas são inválidas!</Alert>
            )}
            {showAlert && (
              <Alert variant="danger">
                Ops! Parece que você já está cadastrado em nossa plataforma.
                Faça o login para acessar sua conta.
              </Alert>
            )}
            <form className="row g-3 d-flex flex-column">
              <input
                type="text"
                className="form"
                placeholder="Nome"
                required
                name="nome"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
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
              <input
                type="password"
                className="form"
                placeholder="Confirmar senha"
                required
                name="confirmar-senha"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={() => isSubscribed(!subscribed)}
                  style={{
                    border: "1px solid #14B8A6",
                    backgroundColor: `${subscribed ? "#14B8A6" : ""}`,
                  }}
                ></input>

                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Aceito receber emails com descontos e recomendações de
                  produtos
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ background: "#14B8A6", border: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.persist();
                  isSubmited(true);
                  signUp();
                }}
              >
                Cadastrar
              </button>

              <a href="/login" style={{ color: "#14B8A6" }}>
                Já tem uma conta? Faça o Login
              </a>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default Signup;
