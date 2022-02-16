import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import { AdminNavbarData } from "../../componentes/AdminNavbar/AdminNavbarData";
import Courses from "../../componentes/AdminCourses/AdminCourses";
import Comunication from "../../componentes/AdminComunication/AdminComunication";

import { BsFillArrowRightSquareFill } from "react-icons/bs";

import { useAuth } from "../../contexts/AuthContext";

import "./Admin.style.css";

function Admin() {
  const navigate = useNavigate();

  const [showPage, setShowPage] = useState(2);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user === null || user.role !== "ADMIN") navigate("/");
  }, [showPage, user]);

  return (
    <>
      <div className="drawer-component">
        <Navbar expand={false}>
          <Container fluid>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Brand href="#">Presper Daher</Navbar.Brand>
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Admin
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {AdminNavbarData.map((val, key) => {
                    return (
                      <Nav.Link
                        key={key}
                        onClick={() => {
                          setShowPage(val.cod);
                        }}
                      >
                        <div id="link">
                          <span>{val.icon}</span> <span>{val.title}</span>
                        </div>
                      </Nav.Link>
                    );
                  })}

                  <Nav.Link
                    onClick={() => {
                      logout();
                    }}
                  >
                    <div id="link">
                      <span>
                        <BsFillArrowRightSquareFill />
                      </span>{" "}
                      <span>Sair</span>
                    </div>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <Container>
          {showPage === 2 && <Courses />}
          {showPage === 3 && <Comunication />}
        </Container>
      </div>
    </>
  );
}

export default Admin;
