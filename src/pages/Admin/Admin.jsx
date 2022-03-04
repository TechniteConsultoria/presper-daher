import { useState, useEffect } from "react";
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import { AdminNavbarData } from "../../componentes/AdminNavbar/AdminNavbarData";
import Courses from "../../componentes/AdminCourses/AdminCourses";
import Comunication from "../../componentes/AdminComunication/AdminComunication";
import Banners from "../../componentes/AdminBanners/AdminBanners";

import "./Admin.style.css";

function Admin() {
  const [showPage, setShowPage] = useState(2);

  useEffect(() => {
    console.log(showPage);
  }, [showPage]);

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
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <Container>
          {showPage === 2 && <Courses />}
          {showPage === 3 && <Comunication />}
          {showPage === 4 && <Banners />}
        </Container>
      </div>
    </>
  );
}

export default Admin;
