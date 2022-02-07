import React from "react";

import "./CourseInfo.styles.css";

import ReactStars from "react-rating-stars-component";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { BsFillAwardFill, BsFillCameraVideoFill } from "react-icons/bs";
import RatingCard from "../RatingCard/RatingCard";

function CourseInfoComponent(props) {
  return (
    <>
      <Container>
        <div className="course-info-row">
          <Col id="course-info">
            <h2>{props.title}</h2>
            <h5>{props.category}</h5>
            <h6>{props.author}</h6>
            <h6>
              <div className="certificate-container">
                <BsFillAwardFill size="1em" style={{ color: "#CFB53B" }} />{" "}
                Certificado
              </div>
            </h6>
            <ReactStars value={props.rating} edit={false} size={18} />
            <h6>999 vendidos</h6>

            <h6 style={{ fontSize: "24px", color: "#6CB1CF" }}>
              R$ {props.price}
            </h6>
            <Button id="btn-add-cart">Comprar</Button>
          </Col>
        </div>

        <hr />
        <Row className="course-info-row">
          <Container fluid="md">
            <Row>
              <Col>
                <h2>Descrição</h2>
                <p>{props.description}</p>
              </Col>
            </Row>
          </Container>
        </Row>
        <hr />
        <Row className="course-info-row">
          <Container
            fluid="md"
            // style={{
            //   display: "flex",
            //   justifyContent: "space-between",
            //   flexWrap: "wrap",
            // }}
          >
            <Col>
              <h2>Conteúdo</h2>
              <p>Confira todo o conteúdo disponível nesse curso</p>

              <ListGroup as="ol" numbered style={{ maxWidth: "540px" }}>
                {props.videos?.map((item, id) => {
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

                {props.ratingComents?.map((item) => (
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
    </>
  );
}

export default CourseInfoComponent;
