import { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";

import ResultMessageModal from "./ResultMessageModal";

// TODO - formatar data.videos antes de submeter

function MessageModal(props) {
  const [messageAnswer, setMessageAnswer] = useState("");
  const [messageResultStatus, setMessageResultStatus] = useState(false);
  const [messageResultModalShow, setMessageResultModalShow] = useState(false);

  function handleSubmit() {
    //* dados para o post
    const data = {
      msgId: props.message.id,
      msgStatus: "answered",
      msgAnswer: messageAnswer,
    };

    //* ação a partir da resposta
    setMessageResultStatus(true);

    console.log(data);
  }

  useEffect(() => {
    setMessageAnswer("");
  }, []);

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Mensagem</Modal.Title>
        </Modal.Header>
        <Form
          action="submit"
          onSubmit={() => {
            handleSubmit();
            setMessageAnswer("");
            setMessageResultModalShow(true);
            props.onHide();
          }}
        >
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Aluno:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={props.message.author}
                />
              </Col>
              <Form.Label column sm="2">
                Curso:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={props.message.course}
                />
              </Col>
              <Form.Label column sm="2">
                Data:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={props.message.date}
                />
              </Col>

              <Form.Label column sm="2">
                Mensagem:
              </Form.Label>

              <Form.Text id="passwordHelpBlock" muted>
                {props.message.text}
              </Form.Text>
            </Form.Group>
            <hr />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label column sm="2">
                Responder:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                onChange={(e) => setMessageAnswer(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
              variant="danger"
              onClick={() => {
                props.onHide();
                setMessageAnswer("");
                // setVideosErrors([]);
                // setNewVideos();
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              style={{
                backgroundColor: "#14B8A6",
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
            >
              Responder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ResultMessageModal
        show={messageResultModalShow}
        onHide={() => setMessageResultModalShow(false)}
        status={messageResultStatus}
      />
    </>
  );
}

export default MessageModal;
