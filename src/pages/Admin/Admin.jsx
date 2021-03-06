import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import { AdminNavbarData } from "../../componentes/AdminNavbar/AdminNavbarData";
import Courses from "../../componentes/AdminCourses/AdminCourses";
import Comunication from "../../componentes/AdminComunication/AdminComunication";
import Banners from "../../componentes/AdminBanners/AdminBanners";
import Category from "../../componentes/AdminCategory/AdminCategory";

import { BsFillArrowRightSquareFill, BsFillHouseFill } from "react-icons/bs";


import { useAuth } from "../../contexts/AuthContext";

import logo from "../../assets/project-logo.png"; 

import "./Admin.style.css";
import { role } from "../../services/api";

function Admin() {
  const navigate = useNavigate();

  useEffect(
    () => {
      if(role !== 'admin') navigate('/login')
    },[]
  )

  const [showPage, setShowPage] = useState(2);
  const { user, logout } = useAuth();


  return (
    <>
      <div className="drawer-component">
        <Navbar expand={false}>
          <Container fluid>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Link to="/">
              <img src={logo} alt="logo" id="navbar-logo" />
            </Link>
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

                  <Nav.Link
                      href="/"
                      >
                            <div id="link">
                              <Navbar.Toggle>
                                <span><BsFillHouseFill /></span> <span>Home</span>
                              </Navbar.Toggle>
                            </div>
                  </Nav.Link>


                  {AdminNavbarData.map((val, key) => {
                    return (
                      <Nav.Link
                        key={key}
                        onClick={() => {
                          setShowPage(val.cod);
                        }}
                      >
                        <div id="link">
                          <Navbar.Toggle>
                            <span>{val.icon}</span> <span>{val.title}</span>
                          </Navbar.Toggle>
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
                      <Navbar.Toggle>
                        <span>
                          <BsFillArrowRightSquareFill />
                        </span>{" "}
                        <span>Sair</span>
                      </Navbar.Toggle>
                    </div>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <Container>
          { showPage === 2 && <Courses      /> }
          { showPage === 3 && <Category     /> }
          { showPage === 4 && <Comunication /> }
          { showPage === 5 && <Banners      /> }
        </Container>
      </div>
    </>
  );
}

export default Admin;
