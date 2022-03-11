import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import CourseInfoComponent from "../../componentes/CourseInfo/CourseInfo";
import ReactStars from "react-rating-stars-component";
import RatingCard from "../../componentes/RatingCard/RatingCard";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { BsFillAwardFill, BsFillCameraVideoFill } from "react-icons/bs";

import { CartContext } from "../../contexts/CartContext";

const axios = require("axios").default;

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState({});

  const { addItemToCart } = useContext(CartContext);

  async function getCourse() {
    const url = "https://fake-api-json-server-presper.herokuapp.com/cursos";
    axios.get(`${url}/${id}`).then((res) => {
      if (res.status === 200) setCourse(res.data);
    });
  }

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <Container
        fluid="md"
        className="courses-description"
        style={{ marginTop: "0px", paddingTop: "0px" }}
      >
        <Container>
          <div className="course-info-row">
            <Col id="course-info">
              <h2>{course.title}</h2>
              <h5>{course.category}</h5>
              <h6>{course.author}</h6>
              <h6>
                <div className="certificate-container">
                  <BsFillAwardFill size="1em" style={{ color: "#CFB53B" }} />{" "}
                  Certificado
                </div>
              </h6>
              <ReactStars value={course.rating} edit={false} size={18} />
              <h6>999 vendidos</h6>

              <h6 style={{ fontSize: "24px", color: "#6CB1CF" }}>
                R$ {course.price}
              </h6>
              <Button id="btn-add-cart" onClick={() => addItemToCart(course)}>
                Adicionar ao carrinho
              </Button>
            </Col>
          </div>

          <hr />
          <Row className="course-info-row">
            <Container fluid="md">
              <Row>
                <Col>
                  <h2>Descrição</h2>
                  <p>{course.description}</p>
                </Col>
              </Row>
            </Container>
          </Row>
          <hr />
          <Row className="course-info-row">
            <Container fluid="md">
              <Col>
                <h2>Conteúdo</h2>
                <p>Confira todo o conteúdo disponível nesse curso</p>

                <ListGroup as="ol" numbered style={{ maxWidth: "540px" }}>
                  {course.videos?.map((item, id) => {
                    return (
                      <ListGroup.Item id="list-item" as="li" key={id}>
                        {item} <BsFillCameraVideoFill />
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
            </Container>
          </Row>
          <hr />
          <Row className="course-info-row">
            <Container fluid="md">
              <Row>
                <Col>
                  <h2>Avaliações</h2>
                  <p>Veja o que estão falando sobre esse curso</p>

                  {course.ratingComents?.map((item) => (
                    <Row>
                      <Col key={item.id}>
                        <RatingCard
                          img={item.img}
                          author={item.author}
                          text={item.text}
                          rating={item.rating}
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default CourseDetails;
