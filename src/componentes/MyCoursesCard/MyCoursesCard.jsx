import React from "react";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

function MyCoursesCardComponent(props) {
  return (
    <>
      <Card
        style={{
          width: "14rem",
          margin: "16px",
          height: "auto",
          borderRadius: "4px 4px 4px 4px",
          boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
          marginTop: "16px",
          cursor: "pointer",
        }}
        // onClick={this.state.onClick}
      >
        <Card.Img
          variant="top"
          src={props.img}
          style={{ borderRadius: "4px 4px 0px 0px", height: "120px", objectFit: "cover",}}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: "14px" }}>{props.title}</Card.Title>
          <Card.Text style={{ fontSize: "12px" }}>{props.author}</Card.Text>

          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ReactStars value={props.rating} edit={false} size={16} />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default MyCoursesCardComponent;
