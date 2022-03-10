import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import RatingCard from "../../componentes/RatingCard/RatingCard";
import { Button, Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import { BsFillAwardFill, BsFillCameraVideoFill } from "react-icons/bs";

import { useCart } from "../../contexts/CartContext";
import { useCourse } from "../../contexts/CourseContext";

import "./CourseDetails.styles.css";
import { formatPrice } from "../../utils/format";

const axios = require("axios").default;

function CourseDetails() {
  const { id } = useParams();

  console.log(id)

  const { addItemToCart } = useCart();
  const { getCourseByIdWithRelations } = useCourse();

  const [course, setCourse] = useState();

  async function getCourse() {
    const result = await getCourseByIdWithRelations(id);
    console.log(result)

    setCourse({
      id:          result.produto.id,
      titulo:      result.produto.nome,
      categoria:   result.produto.id,
      autor:       result.produto.autor,
      preco:       result.produto.preco,
      description: result.produto.descricao,
      imagemUrl:   result.produto.imagemUrl
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
            <h2>{course?.titulo}</h2>
            <h5>{course?.id}</h5>
            <h6>{course?.autor}</h6>
            <h6>
              <div className="certificate-container">
                <BsFillAwardFill size="1em" style={{ color: "#CFB53B" }} />{" "}
                Certificado
              </div>
            </h6>
            <ReactStars value={course?.rating} edit={false} size={18} />
            <h6>999 vendidos</h6>

            <h6 style={{ fontSize: "24px", color: "#6CB1CF" }}>
              { formatPrice(Number( course?.preco )) }
            </h6>
          </div>
          <div className="img-btn-container">
            <Image src={course?.imagemUrl} id="course-img" />
            <Button id="btn-add-cart" onClick={() => addItemToCart(  course )}>
              Adicionar ao carrinho
            </Button>
          </div>
        </Container>
      </div>
      <Container id="content-container">
        <div className="content-item">
          <Col>
            <h2>Descrição</h2>
            <p>{course?.descricao}</p>
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
                    img={item.imagemUrl}
                    author={item.autor}
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
