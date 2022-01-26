import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Carousel, Col, Nav } from "react-bootstrap";
import CardComponent from "../../componentes/Card/Card";
import CommentsCard from "../../componentes/CommentsCard/CommentsCard";

import "./Home.style.css";

function Home() {
  const cursosPopulares = [
    {
      id: 1,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas",
      author: "Julio Almeida",
      rating: 4,
      price: 199.99,
    },
    {
      id: 2,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas",
      author: "Julio Almeida",
      rating: 4,
      price: 199.99,
    },
    {
      id: 3,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas",
      author: "Julio Almeida",
      rating: 4,
      price: 199.99,
    },
    {
      id: 4,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas",
      author: "Julio Almeida",
      rating: 4,
      price: 199.99,
    },
    {
      id: 5,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas",
      author: "Julio Almeida",
      rating: 4,
      price: 199.99,
    },
    {
      id: 6,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas",
      author: "Julio Almeida",
      rating: 4,
      price: 199.99,
    },
    {
      id: 7,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas",
      author: "Julio Almeida",
      rating: 4,
      price: 199.99,
    },
    {
      id: 8,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas",
      author: "Julio Almeida",
      rating: 4,
      price: 199.99,
    },
  ];
  const cursosNovos = [
    {
      id: 4,
      img: "https://cdn.pixabay.com/photo/2015/02/26/15/40/doctor-650534__340.jpg",
      title: "Bases Patológicas II",
      author: "Julio Almeida II",
      rating: 3,
      price: 299.99,
    },
    {
      id: 5,
      img: "https://cdn.pixabay.com/photo/2015/02/26/15/40/doctor-650534__340.jpg",
      title: "Bases Patológicas II",
      author: "Julio Almeida II",
      rating: 3,
      price: 299.99,
    },
    {
      id: 6,
      img: "https://cdn.pixabay.com/photo/2015/02/26/15/40/doctor-650534__340.jpg",
      title: "Bases Patológicas II",
      author: "Julio Almeida II",
      rating: 3,
      price: 299.99,
    },
  ];
  const cursosBemAvaliados = [
    {
      id: 7,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas III",
      author: "Julio Almeida III",
      rating: 4,
      price: 399.99,
    },
    {
      id: 8,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas III",
      author: "Julio Almeida III",
      rating: 4,
      price: 399.99,
    },
    {
      id: 9,
      img: "https://cdn.pixabay.com/photo/2015/07/10/20/54/stethoscope-840125__340.jpg",
      title: "Bases Patológicas III",
      author: "Julio Almeida III",
      rating: 4,
      price: 399.99,
    },
  ];
  const comments = [
    {
      id: 12,
      img: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg",
      author: "Cristina Alves",
      text: "Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.Quem manda na minha terra sou euzis!Sapien in monti palavris qui num significa nadis i pareci latim.",
    },
    {
      id: 13,
      img: "https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.jpg",
      author: "Julia Ramos",
      text: "Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.Quem manda na minha terra sou euzis!Sapien in monti palavris qui num significa nadis i pareci latim.",
    },
    {
      id: 14,
      img: "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg",
      author: "Marcos Araújo",
      text: "Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.Quem manda na minha terra sou euzis!Sapien in monti palavris qui num significa nadis i pareci latim.",
    },
  ];

  const [coursesList, setCoursesList] = useState([]);

  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/course/${id}`);
  }

  useEffect(() => {
    setCoursesList(cursosPopulares);
  }, []);

  return (
    <>
      <div className="home-container">
        <Container fluid className="carousel-container">
          <Row>
            <Carousel fade className="carousel">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2018/07/15/10/44/dna-3539309_1280.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2016/11/10/02/47/blood-1813410_1280.jpg"
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.pixabay.com/photo/2016/11/30/12/17/cells-1872666_1280.jpg"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Row>
        </Container>
        <Container fluid="md" className="courses-container">
          <Container fluid="md">
            <Row>
              <Col>
                <h2>Cursos de Medicina</h2>
                <p>Os melhores cursos para você estudar quando e onde quiser</p>
              </Col>
            </Row>
          </Container>
          <Container fluid="md">
            <Row>
              <Nav variant="tabs" defaultActiveKey="link-1">
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    onClick={() => setCoursesList(cursosPopulares)}
                    className="nav-link-courses"
                  >
                    Populares
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-2"
                    onClick={() => setCoursesList(cursosNovos)}
                    className="nav-link-courses"
                  >
                    Novos
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-3"
                    onClick={() => setCoursesList(cursosBemAvaliados)}
                    className="nav-link-courses"
                  >
                    Bem avaliados
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Row>
          </Container>
          <Container fluid style={{ width: "100%" }}>
            <Row
            // style={{
            //   width: "280px",
            //   height: "auto",
            //   display: "flex",
            //   flexDirection: "row",
            // }}
            >
              {coursesList?.map((item) => (
                <Col sm={3} key={item.id}>
                  <CardComponent
                    img={item.img}
                    title={item.title}
                    author={item.author}
                    rating={item.rating}
                    price={item.price}
                    onClick={() => handleClick(item.id)}
                  />
                </Col>
              ))}
            </Row>
          </Container>

          <Container fluid="md" style={{ marginTop: "100px" }}>
            <Row>
              <Col>
                <h2>Depoimentos</h2>
                <p>Veja o que estão falando sobre nós</p>
                <hr></hr>
              </Col>
            </Row>
          </Container>
          <Container fluid="md">
            {comments?.map((item) => (
              <Row>
                <Col key={item.id}>
                  <CommentsCard
                    img={item.img}
                    author={item.author}
                    text={item.text}
                    onClick={() =>
                      console.log("Clicou no card de ID:", item.id)
                    }
                  />
                </Col>
              </Row>
            ))}
          </Container>
        </Container>
      </div>
    </>
  );
}

export default Home;
