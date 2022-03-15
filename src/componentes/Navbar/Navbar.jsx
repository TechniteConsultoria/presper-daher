
import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Form, FormControl } from "react-bootstrap";
import { BsFillCartFill } from "react-icons/bs";
import { useCart } from "../../contexts/CartContext";
import { CartContext } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
// useEffect(
  //   () => {
    //     setIsLogged(token)
    
  //     getCategories()

  //   },[]
  // )
import "../Navbar/Navbar.style.css";

import logo from "../../assets/project-logo.png";
import loadCategorias from "../../services/categoria/loadCategorias";
import { token, role } from "../../services/api";
import ComboBox from "./comboBox.jsx";


import cursoLoad from "../../services/curso/cursoLoad";

function NavbarComponent() {
  const { cart } = useCart();
  const [cartLoaded, setCartLoaded] = useState([]);
  const { user, logout } = useAuth();
  
  const [ isLogged, setIsLogged ] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [coursesList2, setCoursesList2] = useState([]);
  
  async function getCategories(){
    try {
      await loadCategorias(setCategorias);
    }
    
    catch (error) {
      console.log(error);
    }
  }

  async function handleLoadCart(){
    let loadedCart = await cart
    setCartLoaded(loadedCart)
  }

  async function getCourses() {

    let cursos = await cursoLoad()
    // console.log(cursos)
    setCoursesList2(cursos)
  }

  // useEffect(() => {
  //   console.log(role);
  // }, [user, logout, role]);
    useEffect(
    () => {
      // setIsLogged(token)

      getCategories()

      handleLoadCart()
      getCourses()
    },[]
  )

  return (
    <>
      <div>
        <Navbar expand="lg" id="navbar">
          <Container fluid="md" id="container-nav">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            {/* <Navbar.Brand href="/" id="nav-brand">
              <img src={logo} alt="logo" id="navbar-logo" />
            </Navbar.Brand> */}

            {
            role == 'admin' ? (
              <Navbar.Brand href="/admin" id="nav-brand">
              <img src={logo} alt="logo" id="navbar-logo" />
            </Navbar.Brand>
            ) : (
              <Navbar.Brand href="/" id="nav-brand">
              <img src={logo} alt="logo" id="navbar-logo" />
            </Navbar.Brand>
            )
            }

            <Navbar.Collapse id="basic-navbar-nav">
              <div className="navbar-items ">
                <Nav className="me-auto" id="teste">
                  <NavDropdown title="Categorias" id="basic-nav-dropdown">
                    {categorias.map((item) => {
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
                    {/* <FormControl
                      type="search"
                      placeholder="Pesquisar cursos"
                      className="me-2"
                      aria-label="Search"
                      id="search-bar"
                      onKeyPress={() => console.log("Searching...")}
                      autoComplete='true'
                    /> */}
                    
                    
                    <ComboBox placeholder="Pesquisar cursos" data={coursesList2}/>
                   
                  </Form>

                  <Nav.Link
                    href="/shopping-cart"
                    style={{ justifyContent: "center" }}
                    id="cart-link"
                  >
                    <BsFillCartFill style={{ fontSize: "24px" }} />
                    <span id="cart-count">
                      {cartLoaded?.length === null ? 0 : cartLoaded?.length}
                    </span>
                  </Nav.Link>

                  {
                  token ? (
                    <>
                      <NavDropdown title="Minha Conta" id="basic-nav-dropdown">
                        <NavDropdown.Item
                          href={`/perfil`}
                          id="minhaconta-items"
                        >
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
                        <NavDropdown.Item
                          id="minhaconta-items"
                          onClick={() => logout()}
                        >
                          Sair
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
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
                  )}
                  {
                  role === "admin" && (
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                      <NavDropdown.Item href={`/admin`} id="minhaconta-items">
                        Certificados
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        id="minhaconta-items"
                        onClick={() => logout()}
                      >
                        Sair
                      </NavDropdown.Item>
                    </NavDropdown>
                  )
                  }
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