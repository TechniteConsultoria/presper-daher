import "./SendQuestion.styles.css";
import React, { useState } from "react";

import { id } from "../../services/api"


import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import comentarioCreate from "../../services/comentario/comentarioCreate";

function SendQuestion(props) {
  const [message, setMessage] = useState("");

  async function handleSubmit() {

    const data = {
      // cir: props.courseId,
      comentario: message,
      produtoId:  props.courseId,
      userId:     id,
    };

    console.log(data)
    await comentarioCreate(data)

    setMessage("");
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
          <span className="testimonial-header">
            Mande sua dúvida para o instrutor
          </span>
          <Form.Group
            className="mb-3 mt-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Mande sua dúvida..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
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

export default SendQuestion;
