import { useContext, useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
import { BsFillCartFill } from "react-icons/bs";

import "../Navbar/Navbar.style.css";

import { CartContext } from "../../contexts/CartContext/CartContext";
import { token } from "../../services/api";
import loadCategorias from "../../services/categoria/loadCategorias";

function NavbarComponent() {
  const { cart } = useContext(CartContext);
  const [ isLogged, setIsLogged ] = useState("");
  const [categorias, setCategorias] = useState([]);

  async function getCategories(){
    try {
      await loadCategorias(setCategorias);
    }
    
    catch (error) {
      console.log(error);
    }
  }

  useEffect(
    () => {
      setIsLogged(token)

      getCategories()

    },[]
  )

  return (
    <>
      <div>
        <Navbar expand="lg" id="navbar">
          <Container fluid="md" id="container-nav">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Brand href="/" id="nav-brand">
              Presper Daher gay
            </Navbar.Brand>

            <Navbar.Collapse id="basic-navbar-nav">
              <div className="navbar-items ">
                <Nav className="me-auto" id="teste">
                  <NavDropdown title="Categorias" id="basic-nav-dropdown">
                    {categorias.map((item) => {
                      console.log(item)
                      return (
                        <li key={item.id}>
                          <NavDropdown.Item href={`/`} id="categories-items">
                            {item.nome}
                          </NavDropdown.Item>
                        </li>
                      );
                    })}
                  </NavDropdown>
                  <Form>
                    <FormControl
                      type="search"
                      placeholder="Pesquisar cursos"
                      className="me-2"
                      aria-label="Search"
                      id="search-bar"
                      onKeyPress={() => console.log("Searching...")}
                    />
                  </Form>

                  <Nav.Link
                    href="/shopping-cart"
                    style={{ justifyContent: "center" }}
                    id="cart-link"
                  >
                    <BsFillCartFill style={{ fontSize: "24px" }} />
                    <span id="cart-count">
                      {cart.length === null ? 0 : cart.length}
                    </span>
                  </Nav.Link>

                  {!isLogged ? (
                    <>
                      <Nav.Link
                        href="/signup"
                        className="nav-link"
                        id="signup-link"
                      >
                        Cadastre-se
                      </Nav.Link>
                      <Nav.Link
                        href="/login"
                        className="nav-link"
                        id="login-link"
                      >
                        Fazer Login
                      </Nav.Link>
                    </>
                  ) : (
                    <NavDropdown title="Minha Conta" id="basic-nav-dropdown">
                      <NavDropdown.Item href={`/perfil`} id="minhaconta-items">
                        Perfil
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href={`/my-courses`}
                        id="minhaconta-items"
                      >
                        Meus Cursos
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href={`/my-certificates`}
                        id="minhaconta-items"
                      >
                        Certificados
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href={`/my-payment-info`}
                        id="minhaconta-items"
                      >
                        Formas de Pagamento
                      </NavDropdown.Item>
                      <NavDropdown.Item href={`/`} id="minhaconta-items">
                        Sair
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default NavbarComponent;
