import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate, Link } from "react-router-dom";

import "./Signup.styles.css";
import { toast } from "react-toastify";
import cadastro from "../../services/user/cadastro";
import LoadingGif from "../../componentes/LoadingGif";


import { loadReCaptcha } from 'react-recaptcha-google'

import { ReCaptcha } from 'react-recaptcha-google'

import MaskedInput from "react-maskedinput";

function Signup() {
  useEffect(
    () => {
      loadReCaptcha()
      console.log(loadReCaptcha())
    },[]
  )
  /*
  'presper teste' has been registered.
  site key 
    6LfO6PoeAAAAAAujWa_8zELc0haxuEMjx2GrxxqX
  secret key
   6LfO6PoeAAAAAOwDuXzuUtONm-k8-BQ2qSyzTEHT
  */

   let siteKey = '6LfO6PoeAAAAAAujWa_8zELc0haxuEMjx2GrxxqX'

  const [nome, setNome] = useState("");
  const [cpf , setCpf ] = useState("");
  const [email, setEmail] = useState("");
  const [confirmaEmail, setConfirmaEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [inscricao, setInscricao] = useState(false);
  
  const [isVerify, setIsVerify] = useState("");
  const [submit, isSubmit] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [loading,   setLoading  ] = useState(false);

  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  console.log(isVerify)

  async function handleSubmit() {
    isSubmit(true);
    setLoading(true)

    if (senha === confirmaSenha && email === confirmaEmail && isVerify) {
      try {
        let isOk = await cadastro(nome, email, senha, phone, cpf, "1");
        if (isOk == "ok") {
          toast.success("OK!");
          navigate("/");
        } else console.log("erro?");
      } catch (error) {
        console.error(error);
      }
      isSubmit(false);
    }
    else{
      toast.error("Cheque seus dados")
    }
      
    setLoading(false)
  }

  useEffect(() => {
    setShowAlert(false);
  }, []);

  return (
    <>
      <div className="container-signup">
        <section>
          <div className="card p-5">
            <h2 className="title-card">Cadastro</h2>

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
              <MaskedInput
                    className="form"
                    type="text"
                    name="phoneNumber"
                    mask="(11) 11111-1111"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    
              />
              <MaskedInput
                    className="form"
                    type="text"
                    name="phoneNumber"
                    mask="111.111.111-11"
                    value={phone}
                    onChange={(e) => setCpf(e.target.value)}
                    
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
                type="email"
                className="form"
                placeholder="Confirmar Email"
                required
                name="email"
                onChange={(e) => {
                  setConfirmaEmail(e.target.value);
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

          <ReCaptcha
            // ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            data-theme="dark"            
            render="explicit"
            sitekey={siteKey}
            onloadCallback={e => console.log(e)}
            verifyCallback={e => setIsVerify(e)}
          />

              {/* <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onChange={() => setInscricao(!inscricao)}
                  style={{
                    border: "1px solid #14B8A6",
                    backgroundColor: `${inscricao ? "#14B8A6" : ""}`,
                  }}
                ></input>

                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Aceito receber emails com descontos e recomendações de
                  produtos
                </label>
              </div> */}

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ background: "#14B8A6", border: "none" }}
              >
                {
                loading == false ? ('Acessar') : <LoadingGif/>
                }

              </button>

            </form>
              <Link to="/login" style={{ color: "#14B8A6" }}>
                Já tem uma conta? Faça o Login
              </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Signup;
