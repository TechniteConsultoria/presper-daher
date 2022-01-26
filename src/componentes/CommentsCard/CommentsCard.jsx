import React from "react";
import { Col, Card } from "react-bootstrap";

export default class CommentsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      img: props.img,
      author: props.author,
      text: props.text,
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
              }}
            />
            <Card.Body>
              <Card.Title>{this.state.author}</Card.Title>
              <Card.Text>{this.state.text}</Card.Text>
            </Card.Body>
          </Card>
          <hr />
        </Col>
      </>
    );
  }
}
