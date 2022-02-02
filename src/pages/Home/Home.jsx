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

const axios = require("axios").default;

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [msgSent, isMsgSent] = useState(false);
  const [msgResult, isMsgResult] = useState(false);

  const [coursesList, setCoursesList] = useState([]);
  const [testimonialsList, setTestimonialsList] = useState([]);

  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/course/${id}`);
  }

  async function handleSubmit() {
    const data = {
      name: name,
      email: email,
      message: message,
    };

    axios
      .post("http://localhost:8000/fale-conosco-mensagens", data)
      .then((res) => {
        isMsgSent(true);
        if (res.status === 201) {
          isMsgResult(true);
        } else {
          isMsgResult(false);
        }
      });

    setName("");
    setEmail("");
    setMessage("");
    isMsgSent(false);
  }

  async function getCourses() {
    axios.get("http://localhost:8000/cursos").then((res) => {
      setCoursesList(res.data);
    });
  }

  async function getComments() {
    axios.get("http://localhost:8000/depoimentos").then((res) => {
      setTestimonialsList(res.data);
    });
  }

  useEffect(() => {
    setName("");
    setEmail("");
    setMessage("");
    isMsgSent(false);

    getCourses();
    getComments();
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
              {coursesList?.map((item, id) => (
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
              {testimonialsList?.map((item) => (
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
                    value={name}
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
                    value={email}
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
                    value={message}
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
