import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import CourseDetails from "./pages/CourseDetails/CourseDetails.jsx";
import Category from "./pages/CourseCategory/CourseCategory.jsx";
// import Navbar from "./componentes/Navbar/Navbar.jsx";
import Header from "./componentes/Header/Header.jsx";
import Footer from "./componentes/Footer/Footer.jsx";
import Admin from "./pages/Admin/Admin.jsx";

// import Courses from "./componentes/Courses/Courses.jsx";

import Perfil from "./pages/Perfil/Perfil.jsx";
import MyCourses from "./pages/MyCourses/MyCourses.jsx";
import MyCertificates from "./pages/MyCertificates/MyCertificates.jsx";
import MyPaymentInfo from "./pages/MyPaymentInfo/MyPaymentInfo.jsx";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartCheckOut from "./pages/CheckOut/CheckOut.jsx";
import WatchCourse from "./pages/WatchCourse/WatchCourse.jsx";

import AuthProvider from "./contexts/AuthContext";
import CourseProvider from "./contexts/CourseContext";
import CreditCardProvider from "./contexts/CreditCardContext.js";
import CategoryProvider from "./contexts/CategoryContext.js";
import CommentProvider from "./contexts/CommentsContex.js";
import BannerProvider from "./contexts/BannerContext.js";
import MyCertificate from "./pages/MyCertificate/MyCertificate.jsx";

function App() {
  const location = useLocation();

  return (
    <div>
      <AuthProvider>
        <CourseProvider>
          <CategoryProvider>
            <CommentProvider>
              <BannerProvider>
                <CreditCardProvider>
                  <div>
                    {location.pathname === "/login"  ||
                     location.pathname === "/signup" ||
                     location.pathname === "/admin"  ?
                      null : (
                      <Header />
                    )}
                  </div>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />  
                  <Routes>
                    <Route exact path="/"                    element={<Home />}          />
                    <Route exact path="/login"               element={<Login />}         />
                    <Route exact path="/signup"              element={<Signup />}        />
                    <Route exact path="/course-details/:id"  element={<CourseDetails />} />
                    <Route exact path="/course-category"     element={<Category />} /> 
                    <Route exact path="/shopping-cart"       element={<ShoppingCart />}  />
                    <Route exact path="/perfil"              element={<Perfil />}        />
                    <Route exact path="/my-courses"          element={<MyCourses />}     />
                    <Route exact path="/my-certificate/:id"     element={<MyCertificate />}/>
                    <Route exact path="/my-certificates"     element={<MyCertificates />}/>
                    <Route exact path="/my-payment-info"     element={<MyPaymentInfo />} />
                    <Route exact path="/check-out"           element={<CartCheckOut />}  />
                    <Route exact path="/admin"               element={<Admin />}         />
                    <Route exact path="/watch-course/:id"    element={<WatchCourse />}   />
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
              </BannerProvider>
            </CommentProvider>
          </CategoryProvider>
        </CourseProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
