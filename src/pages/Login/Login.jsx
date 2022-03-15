import { createContext, useState, useEffect, useContext } from "react";
import { useLoginPage } from "../../services/Hooks/LoginPageHook";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";


import "./Login.styles.css";

import google from "../../assets/google-logo.png";
import facebook from "../../assets/facebook-logo.png";
import login from "../../services/user/login";
import { toast } from "react-toastify";

function Login() {

  // const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarSenha, setLembrarSenha] = useState(false);

  // const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  
  async function handleSubmit() {
    

    try {

      let isOk = await login(email, senha)
      isOk == 'ok' ? navigate("/presper/") : toast.error("Login incorreto!")

    }
    catch (error) {

      toast.error(error)
      console.error(error);

    }
  }


  useEffect(() => {
    setShowAlert(false);
  }, []);

  const {
    email,
    setEmail,
    setPassword,
    isRememberPassword,
    rememberPassword,
    showAlert,
    setShowAlert,
    facebookLogin,
    googleLogin,
    login,
  } = useLoginPage();

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
              // handleSubmit();
              login();
            }}
          >
            <br />
            {/* <button
              className="btn btn-lg"
              id="social-login"
              onClick={(e) => {
                e.preventDefault();
                googleLogin();
              }}
            >
              <Image src={google} alt="google-log" className="logo" /> Continuar
              com Google
            </button>
            <button
              className="btn btn-lg"
              id="social-login"
              onClick={(e) => {
                e.preventDefault();
                facebookLogin();
              }}
            >
              <Image src={facebook} alt="google-log" className="logo" />{" "}
              Continuar com Facebook
            </button> */}
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

            <Button type="submit" id="btn-login">
              Acessar
            </Button>

            <Link to="/presper" style={{ color: "#14B8A6" }}>
              Esqueceu a senha?
            </Link>
            <Link to="/presper/signup" style={{ color: "#14B8A6" }}>
              Não possui uma conta? Registre-se
            </Link>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
