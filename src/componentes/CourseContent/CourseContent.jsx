import "./CourseContent.styles.css";
import React from "react";

import { ListGroup } from "react-bootstrap";

import { BsPlayCircle } from "react-icons/bs";

function CourseContent(props) {
  return (
    <>
      <ListGroup variant="flush">
        {props?.videos.map((item, id) => {
          // console.log("item")
          // console.log(item)
          return (
            <ListGroup.Item key={id}>
              <div className="video-title-container">
                <span id="icon-play" onClick={() => props.onClick(item)}>
                  <BsPlayCircle />
                </span>
                <span>{item.titulo || "Título"}</span>
              </div>
              {/* <div>{item.time || "Duração"} min</div> */}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}

export default CourseContent;
