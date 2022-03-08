import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import CourseDetails from "./pages/CourseDetails/CourseDetails.jsx";
// import Navbar from "./componentes/Navbar/Navbar.jsx";
import Header from "./componentes/Header/Header.jsx";
import Footer from "./componentes/Footer/Footer.jsx";
import Admin from "./pages/Admin/Admin.jsx";

// import Courses from "./componentes/Courses/Courses.jsx";
// import AdminNavbar from "./componentes/AdminNavbar/AdminNavbar.jsx";

import Perfil from "./pages/Perfil/Perfil.jsx";
import MyCourses from "./pages/MyCourses/MyCourses.jsx";
import MyCertificates from "./pages/MyCertificates/MyCertificates.jsx";
import MyPaymentInfo from "./pages/MyPaymentInfo/MyPaymentInfo.jsx";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart.jsx";
import CartCheckOut from "./pages/CheckOut/CheckOut.jsx";
import WatchCourse from "./pages/WatchCourse/WatchCourse.jsx";

import AuthProvider from "./contexts/AuthContext";
import CourseProvider from "./contexts/CourseContext";
import CreditCardProvider from "./contexts/CreditCardContext.js";

function App() {
  const location = useLocation();

  return (
    <div>
      <AuthProvider>
        <CourseProvider>
          <CreditCardProvider>
            <div>
              {location.pathname === "/login" ||
              location.pathname === "/signup" ||
              location.pathname === "/admin" ? null : (
                <Header />
              )}
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/course-details/:id" element={<CourseDetails />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/my-courses" element={<MyCourses />} />
              <Route path="/my-certificates" element={<MyCertificates />} />
              <Route path="/my-payment-info" element={<MyPaymentInfo />} />
              <Route path="/check-out" element={<CartCheckOut />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/watch-course/:id" element={<WatchCourse />} />
            </Routes>

            <div>
              {location.pathname === "/login" ||
              location.pathname === "/signup" ||
              location.pathname === "/admin" ? null : (
                <Footer />
              )}
            </div>

            <div></div>
          </CreditCardProvider>
        </CourseProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
