import React from "react";
import { Col, Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

export default class RatingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      img: props.img,
      author: props.author,
      text: props.text,
      rating: props.rating,
    };
  }

  render() {
    return (
      <>
        <Col>
          <Card
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              border: "none",
            }}
          >
            <Card.Img
              variant="top"
              src={this.state.img}
              style={{
                borderRadius: "50%",
                height: "112px",
                width: "112px",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                objectFit: 'cover'
              }}
            />
            <Card.Body>
              <Card.Title>{this.state.author}</Card.Title>
              <Card.Text>{this.state.text}</Card.Text>
              <ReactStars value={this.state.rating} edit={false} size={18} />
            </Card.Body>
          </Card>
          <hr />
        </Col>
      </>
    );
  }
}
