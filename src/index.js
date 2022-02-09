import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "./App.css";
// import "./css/login.css";
// import "./css/signup.css";
import { CartProvider } from "./contexts/CartContext/CartContext";
// import "./css/navbar.css";

function tik() {
  ReactDOM.render(
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
}

setInterval(tik, 1000);

reportWebVitals();
