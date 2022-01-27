import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Carousel,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import CardComponent from "../../componentes/Card/Card";
import CommentsCard from "../../componentes/CommentsCard/CommentsCard";

import "./Home.style.css";

import cursos from "../../data/cursos";

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [msgSent, isMsgSent] = useState(false);
  const [msgResult, isMsgResult] = useState(false);

  const [coursesList, setCoursesList] = useState([]);

  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/course/${id}`);
  }

  function handleSubmit() {
    const data = {
      name: name,
      email: email,
      message: message,
    };

    isMsgSent(true);
    isMsgResult(true);
  }

  useEffect(() => {
    setCoursesList(cursosPopulares);
    setName("");
    setEmail("");
    setMessage("");
    isMsgSent(false);
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
        <br />
        <Container>
          <div className="container-item">
            <Row>
              <Col>
                <h2>Cursos populares</h2>
                <p>Os melhores cursos para você estudar quando e onde quiser</p>
              </Col>
            </Row>
          </div>
          <hr />

          <div className="container-item">
            <div className="courses-container">
              {cursos?.map((item, id) => (
                <CardComponent
                  key={item.id}
                  img={item.img}
                  title={item.title}
                  author={item.author}
                  rating={item.rating}
                  price={item.price}
                  sold={item.sold}
                  // onClick={() => {
                  //   setCourse(item);
                  //   showEditCourseModal(true);
                  // }}
                />
              ))}
            </div>
          </div>

          <div className="container-item">
            <Row>
              <Col>
                <h2>Depoimentos</h2>
                <p>Veja o que estão falando sobre nós</p>
              </Col>
            </Row>
          </div>
          <hr />
          <div className="container-item">
            <div>
              {comments?.map((item) => (
                <Row key={item.id}>
                  <Col>
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
            </div>
          </div>
          <div className="container-item" id="contact-us">
            <Row>
              <Col>
                <h2>Fale Conosco</h2>
                <p>Entre em contato e nos deixe saber o que está achando</p>
              </Col>
            </Row>
          </div>
          <div className="contact-us-container">
            <div id="form">
              <Form
                // action="submit"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();

                  // setVideosList();
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label column sm="2">
                    Nome
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label column sm="2">
                    Mensagem
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Mensagem"
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  style={{
                    backgroundColor: "#14B8A6",
                    border: "none",
                    boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                  }}
                  type="submit"
                >
                  Enviar
                </Button>
              </Form>
              <br />
              {msgSent && (
                <Alert variant={msgResult ? "success" : "danger"}>
                  {msgResult
                    ? "Sua mensagem foi enviada com sucesso!"
                    : "Ops! Ocorreu um erro ao enviar sua mensagem. Tente novamente."}
                </Alert>
              )}
            </div>
          </div>
        </Container>

        <div className="container-item"></div>
      </div>
    </>
  );
}

export default Home;
