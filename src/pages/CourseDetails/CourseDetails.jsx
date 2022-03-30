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
import comentarioCreate from "../../services/comentario/comentarioCreate";
import comentarioLoadFiler from "../../services/comentario/comentarioLoadFiler";
import { tenantId } from "../../services/api";
import { toast } from "react-toastify";

const axios = require("axios").default;

function CourseDetails() {
  const { id } = useParams();

  const { addItemToCart } = useCart();
  const { getCourseByIdWithRelations } = useCourse();

  const [course,   setCourse  ] = useState();
  const [estrelas,   setEstrelas  ] = useState(0);
  const [comments, setComments] = useState();
  



  async function getCourse() {
    const result = await getCourseByIdWithRelations(id);
    console.log("result")
    console.log(result)

    setCourse({
      id:          result.produto.id,
      titulo:      result.produto.nome,
      categoria:   result.produto.id,
      autor:       result.produto.autor,
      preco:       result.produto.preco,
      description: result.produto.descricao,
      categoriaNome: result.produto.categoriaNome,
      descricao:   result.produto.descricao,
      imagemUrl:   result.produto.imagemUrl,
      videos:      result.produtoModulo,
      estrelas: result.produto.somatoriaAvaliacoes / result.produto.quantidadeAvaliacoes,
    });
    setEstrelas(result.produto.somatoriaAvaliacoes / result.produto.quantidadeAvaliacoes)
  }

  async function getComment(){
    let prodComments = await comentarioLoadFiler(id)

    setComments(prodComments)
    console.log(prodComments)
  }

  useEffect(() => {
    getCourse();
    getComment();
  }, [id]);

  async function handleAddCart(course){
    if(!tenantId) return toast.error("Faça login ou cadastro para poder utilizar a plataforma")
    await addItemToCart(course) 
  }

  // console.log(course?.estrelas)
  // console.log(estrelas)

  return (
    <>
      <div className="head-container">
        <Container id="course-info">
          <div className="info-container">
            <h2>{course?.titulo}</h2>
            <h5>{course?.categoriaNome}</h5>
            <h6>{course?.autor}</h6>
            <h6>
              <div className="certificate-container">
                <BsFillAwardFill size="1em" style={{ color: "#CFB53B" }} />{" "}
                Certificado
              </div>
            </h6>
            
            {
            course?.estrelas && <ReactStars
            value={
              course?.estrelas
            }
            edit={false}
            size={18} />
            }

            <h6>{course?.volumeVendas != null ? course?.volumeVendas : 0} vendidos</h6>

            <h6 style={{ fontSize: "24px", color: "#6CB1CF" }}>
              { formatPrice(Number( course?.preco )) }
            </h6>
          </div>
          <div className="img-btn-container">
            <Image src={course?.imagemUrl} id="course-img" />
            <Button id="btn-add-cart" onClick={
              () => {
                handleAddCart(course)
            }}>
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
                    Aula { id + 1 } <BsFillCameraVideoFill />
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

            {comments?.map((item) => (
              <Row>
                <Col key={item.id}>
                  <RatingCard
                    img={item.user.imagemUrl}
                    author={item.user.name}
                    text={item.comentario}
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
