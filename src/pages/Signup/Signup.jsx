import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

import "./Signup.styles.css";
import { toast } from "react-toastify";
import cadastro from "../../services/user/cadastro";

const axios = require("axios").default;

function Signup() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [inscricao, setInscricao] = useState(false);
  const [submit, isSubmit] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit() {
    if (submit && senha === confirmaSenha) {

      try {

        let isOk = await cadastro(nome, email, senha, '1')
        isOk == 'ok'? window.location.pathname = '' : console.log("erro?")

      }
      catch (error) {
        console.error(error);
      }
      isSubmit(false);
    }
  }

  useEffect(() => {
    setShowAlert(false);
  }, []);

  return (
    <>
      <div className="container-signup">
        <section>
          <div className="card p-5">
            <h2 className="title-card">Sign up</h2>
            {/* <p className="subtitle">Dados para realizar o cadastro:</p> */}
            {submit && senha !== confirmaSenha && (
              <Alert variant="danger">As senhas são inválidas!</Alert>
            )}
            {showAlert && (
              <Alert variant="danger">
                Ops! Parece que vc já está cadastrado em nossa plataforma. Faça
                o login para acessar sua conta.
              </Alert>
            )}
            <form
              // action="submit"
              className="row g-3 d-flex flex-column"
              onSubmit={(e) => {
                e.preventDefault();
                isSubmit(true);
                handleSubmit();
              }}
            >
              <input
                type="text"
                className="form"
                placeholder="Nome"
                required
                name="nome"
                onChange={(e) => {
                  setNome(e.target.value);
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
                  setSenha(e.target.value);
                }}
              />
              <input
                type="password"
                className="form"
                placeholder="Confirmar senha"
                required
                name="confirmar-senha"
                onChange={(e) => {
                  setConfirmaSenha(e.target.value);
                }}
              />

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={() => setInscricao(!inscricao)}
                  style={{
                    border: "1px solid #14B8A6",
                    // backgroundColor: "#14B8A6",
                    backgroundColor: `${inscricao ? "#14B8A6" : ""}`,
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
              >
                Acessar
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
