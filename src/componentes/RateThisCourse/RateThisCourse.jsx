import "./RateThisCourse.styles.css";
import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import ReactStars from "react-rating-stars-component";

function RateThisCourse(props) {
  const [rateValue, setRateValue] = useState(0);
  const [testimonial, setTestimonial] = useState("");

  function handleSubmit() {
    const data = {
      courseId: props.courseId,
      rateValue: rateValue,
      testimonial: testimonial,
    };

    console.log(data);

    setRateValue(0);
    setTestimonial("");
  }

  return (
    <>
      <Container>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <span className="rate-header">Como você avalia esse curso?</span>
          <ReactStars
            value={0}
            size={36}
            onChange={(value) => setRateValue(value)}
          />
          <span className="testimonial-header">
            Deixe um depoimento para sabermos o que está achando deste curso
          </span>
          <Form.Group
            className="mb-3 mt-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Depoimento"
              onChange={(e) => setTestimonial(e.target.value)}
              value={testimonial}
              required
            />
          </Form.Group>
          <Button
            style={{
              backgroundColor: "#14B8A6",
              border: "none",
              boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
            }}
            type="submit"
          >
            Enviar
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default RateThisCourse;
