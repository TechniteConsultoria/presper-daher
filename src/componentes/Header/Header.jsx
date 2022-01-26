import React from "react";
import Navbar from "../Navbar/Navbar";

import "../../App.css";

function Header(props) {
  return (
    <>
      {/* <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <a className="navbar-brand" href="/">
                <img src={core} alt="" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <button type="button" class="btn btn-outline-primary">
                      Recuperar acesso
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <footer>
          <p class="texte"></p>
          <p className="my-0 mx-4 py-0">
            Ensino EAD © 2022 All Rights Reserved
          </p>{" "}
          <br />
          <span>Feito pela Technite</span>
        </footer> */}
      <header className="header">
        <Navbar />
      </header>
    </>
  );
}

export default Header;
