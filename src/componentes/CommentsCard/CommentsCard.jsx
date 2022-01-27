import React from "react";
import { Col, Card } from "react-bootstrap";

import "./CommentsCard.styles.css";

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
        <Card id="card">
          <div id="img">
            {" "}
            <Card.Img id="card-img" variant="top" src={this.state.img} />
          </div>
          <div>
            <Card.Body>
              <Card.Title>{this.state.author}</Card.Title>
              <Card.Text>{this.state.text}</Card.Text>
            </Card.Body>
          </div>
        </Card>
        <hr />
      </>
    );
  }
}
