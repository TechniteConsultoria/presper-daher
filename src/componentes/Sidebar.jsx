// import React from "react";
// import { SidebarData } from "../componentes/SidebarData";
// import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";

// export default class SidebarComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showPage: props.showPage,
//     };
//   }

//   render() {
//     return (
//       <>
//         <div className="drawer-component">
//           <Navbar
//             expand={false}
//             style={{ backgroundColor: "#f0e9f1", color: "#f0e9f1" }}
//           >
//             <Container fluid style={{ backgroundColor: "#f0e9f1" }}>
//               <Navbar.Toggle aria-controls="offcanvasNavbar" />

//               <Navbar.Offcanvas
//                 id="offcanvasNavbar"
//                 aria-labelledby="offcanvasNavbarLabel"
//               >
//                 <Offcanvas.Header closeButton>
//                   <Offcanvas.Title id="offcanvasNavbarLabel">
//                     Admin
//                   </Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                   <Nav className="justify-content-end flex-grow-1 pe-3">
//                     {SidebarData.map((val, index) => {
//                       return (
//                         <Nav.Link
//                           // href={val.link}
//                           className="nav-link-sidebar"
//                         >
//                           <div id="icon">{val.icon}</div>
//                           <div id="title">{val.title}</div>
//                         </Nav.Link>
//                       );
//                     })}
//                   </Nav>
//                 </Offcanvas.Body>
//               </Navbar.Offcanvas>
//             </Container>
//           </Navbar>
//         </div>
//       </>
//     );
//   }
// }
