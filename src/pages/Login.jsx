import { useState } from "react";
import "../css/login.css";

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

  return (
    <div className="container-signup">
      <section>
        <div className="card p-5">
          <h2 className="title-card">Realizar Login</h2>
          <p className="subtitle">Dados para realizar o login:</p>
          <form
            action="submit"
            className="row g-3 d-flex flex-column"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
