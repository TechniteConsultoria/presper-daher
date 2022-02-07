import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

import CourseInfoComponent from "../../componentes/CourseInfo/CourseInfo";

const axios = require("axios").default;

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState({});

  async function getCourse() {
    const url = "https://fake-api-json-server-presper.herokuapp.com/cursos";
    axios.get(`${url}/${id}`).then((res) => {
      if (res.status === 200) setCourse(res.data);
    });
  }

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <Container
        fluid="md"
        className="courses-description"
        style={{ marginTop: "0px", paddingTop: "0px" }}
      >
        <CourseInfoComponent
          title={course.title}
          category={course.category}
          author={course.author}
          // count={course.count}
          rating={course.rating}
          price={course.price}
          img={course.img}
          description={course.description}
          videos={course.videos}
          ratingComents={course.ratingComents}
        />
      </Container>
    </>
  );
}

export default CourseDetails;
