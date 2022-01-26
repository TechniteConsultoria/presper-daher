import React from "react";

import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";

// import { SidebarData } from "./SidebarData";
import { AdminNavbarData } from "./AdminNavbarData";

function AdminNavbar() {
  return (
    <>
      <div className="drawer-component">
        <Navbar
          expand={false}
          style={{ backgroundColor: "#f0e9f1", color: "#f0e9f1" }}
        >
          <Container fluid style={{ backgroundColor: "#f0e9f1" }}>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />

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
                <Nav
                  className="justify-content-end flex-grow-1 pe-3"
                  activeKey={window.location.pathname}
                >
                  {AdminNavbarData.map((val, key) => {
                    return (
                      <Nav.Link
                        // as={NavLink}
                        exact
                        href={val.link}
                        key={key}
                        className="nav-link-sidebar"
                        style={{
                          fontSize: "24px",
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "10px",
                          color: "black",
                          textDecoration: "none",
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
        {/* <Container>{showPage === 2 && <Cursos />}</Container> */}
      </div>
    </>
  );
}

export default AdminNavbar;
