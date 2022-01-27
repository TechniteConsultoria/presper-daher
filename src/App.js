import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Course from "./pages/Course.jsx";
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

function App() {
  const location = useLocation();
  return (
    <div className="bg-login">
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
        <Route path="/course/:id" element={<Course />} />
        <Route path="/perfil" element={<Perfil />}></Route>
        <Route path="/my-courses" element={<MyCourses />}></Route>
        <Route path="/my-certificates" element={<MyCertificates />} />
        <Route path="/my-payment-info" element={<MyPaymentInfo />} />
        <Route path="/admin" element={<Admin />} />
        {/* 8 */}
      </Routes>

      <div>
        {location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/admin" ? null : (
          <Footer />
        )}
      </div>

      <div></div>
    </div>
  );
}

export default App;
