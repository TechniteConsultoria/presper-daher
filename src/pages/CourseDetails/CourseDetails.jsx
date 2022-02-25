import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import RatingCard from "../../componentes/RatingCard/RatingCard";
import { Button, Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import { BsFillAwardFill, BsFillCameraVideoFill } from "react-icons/bs";

import { useCart } from "../../contexts/CartContext/CartContext";
import { useCourse } from "../../contexts/CourseContext/CourseContext";

import "./CourseDetails.styles.css";

const axios = require("axios").default;

function CourseDetails() {
  const { id } = useParams();

  const { addItemToCart } = useCart();
  const { getCourseById } = useCourse();

  const [course, setCourse] = useState();

  async function getCourse() {
    const result = await getCourseById(id);
    setCourse({
      title: result.title,
      category: result.category.name,
      author: result.author,
      price: result.price,
      description: result.description,
    });
  }

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <div className="head-container">
        <Container id="course-info">
          <div className="info-container">
            <h2>{course?.title}</h2>
            <h5>{course?.category}</h5>
            <h6>{course?.author}</h6>
            <h6>
              <div className="certificate-container">
                <BsFillAwardFill size="1em" style={{ color: "#CFB53B" }} />{" "}
                Certificado
              </div>
            </h6>
            <ReactStars value={course?.rating} edit={false} size={18} />
            <h6>999 vendidos</h6>

            <h6 style={{ fontSize: "24px", color: "#6CB1CF" }}>
              R$ {course?.price}
            </h6>
          </div>
          <div className="img-btn-container">
            <Image src={course?.img} id="course-img" />
            <Button id="btn-add-cart" onClick={() => addItemToCart(course)}>
              Adicionar ao carrinho
            </Button>
          </div>
        </Container>
      </div>
      <Container id="content-container">
        <div className="content-item">
          <Col>
            <h2>Descrição</h2>
            <p>{course?.description}</p>
          </Col>
        </div>
        <div className="content-item">
          <Col id="videos-col">
            <h2>Conteúdo</h2>
            <p>Confira todo o conteúdo disponível nesse curso</p>

            <ListGroup
              className="videos-list"
              as="ol"
              numbered
              style={{ maxWidth: "540px" }}
            >
              {course?.videos?.map((item, id) => {
                return (
                  <ListGroup.Item id="list-item" as="li" key={id}>
                    {item} <BsFillCameraVideoFill />
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </div>
        <div className="content-item">
          <Col>
            <h2>Avaliações</h2>
            <p>Veja o que estão falando sobre esse curso</p>

            {course?.ratingComents?.map((item) => (
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
        </div>
      </Container>
    </>
  );
}

export default CourseDetails;
