import React from "react";
import ReactStars from "react-rating-stars-component";
import { Button, Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import { BsTrophyFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import RatingCard from "../RatingCard/RatingCard";

export default class CourseInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      img: props.img,
      title: props.title,
      author: props.author,
      category: props.category,
      ratingComents: props.ratingComents,
      price: props.price,
      count: props.count,
      description: props.description,
      videos: props.videos,
      onClick: props.onClick,
    };
  }

  render() {
    return (
      <>
        <Container fluid="md">
          <Row className="course-info-row">
            <Col
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                display: "block",
              }}
            >
              <h2>{this.state.title}</h2>
              <h5>{this.state.category}</h5>
              <h6>{this.state.author}</h6>
              <ReactStars value={this.state.rating} edit={false} size={18} />
              <h7>999 vendidos</h7>
              <h6 style={{ fontSize: "24px", color: "#6CB1CF" }}>
                R$ {this.state.price}
              </h6>
              <Button
                style={{
                  backgroundColor: "#14B8A6",
                  border: "none",
                  width: "60%",
                  boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                }}
              >
                Comprar
              </Button>
            </Col>

            <Col
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Image
                src={this.state.img}
                alt="Course Image"
                style={{
                  background: "blue",
                  width: "80%",
                  height: "100%",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                }}
              />
            </Col>
          </Row>

          <Row className="course-info-row">
            <Container fluid="md">
              <Row>
                <Col>
                  <h2>Descrição</h2>
                  <p>{this.state.description}</p>
                </Col>
              </Row>
            </Container>
          </Row>
          <Row className="course-info-row">
            <Container
              fluid="md"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Col>
                <h2>Conteúdo</h2>
                <p>Confira todo o conteúdo disponível nesse curso</p>

                <ListGroup as="ol" numbered variant="flush">
                  {this.state.videos.map((item) => {
                    return (
                      <ListGroup.Item
                        as="li"
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                          // alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <p>{item}</p> <BsFillCameraVideoFill />
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Col>
              <Col>
                <div style={{ textAlign: "center" }}>
                  <h2>Certificado</h2>

                  <BsTrophyFill size="3em" />
                </div>
              </Col>
            </Container>
          </Row>
          <Row className="course-info-row">
            <Container fluid="md">
              <Row>
                <Col>
                  <h2>Avaliações</h2>
                  <p>Veja o que estão falando sobre esse curso</p>

                  {this.state.ratingComents?.map((item) => (
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
}
