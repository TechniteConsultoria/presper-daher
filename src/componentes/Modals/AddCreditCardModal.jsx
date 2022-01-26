import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Alert } from "react-bootstrap";
import ResultCreateCourseModal from "./ResultCreateCourseModal";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

function AddCreditCardModal(props) {
  const [resultCreateCourseModalShow, setResultCreateCourseModalShow] =
    useState(false);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  function handleSubmit() {
    // const data = {
    //   img: image,
    //   title: title,
    //   author: author,
    //   price: price,
    //   category: category,
    //   description: description,
    //   videos: videosList,
    // };
    // setCourse(data);
    // setResultCreateCourseModalShow(true);
    // setVideosErrors([]);
  }

  useEffect(() => {
    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
  }, []);

  return (
    <>
      <Modal {...props} centered animation={false}>
        <Modal.Header
          closeButton
          //   onClick={() => {
          //     setVideosErrors();
          //     setVideosList();
          //   }}
        >
          <Modal.Title>Adicionar cartão</Modal.Title>
        </Modal.Header>
        <Form
          action="submit"
          onSubmit={() => {
            handleSubmit();
            props.onHide();
            // setVideosList();
          }}
        >
          <Modal.Body>
            <div>
              <Cards
                className="credit-card"
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focus}
              />
            </div>
            <div>
              <Form.Group className="mb-3">
                <Form.Label column sm="2">
                  Número
                </Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Número do cartão"
                  onChange={(e) => setNumber(e.target.value)}
                  onFocus={(e) => setFocus(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label column sm="2">
                  Nome
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome no cartão"
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => setFocus(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label column sm="2">
                  Validade
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  onChange={(e) => setExpiry(e.target.value)}
                  onFocus={(e) => setFocus(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label column sm="2">
                  CVC
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="CVC"
                  onChange={(e) => setCvc(e.target.value)}
                  onFocus={(e) => setFocus(e.target.value)}
                  min={1}
                  max={999}
                  required
                />
              </Form.Group>
            </div>
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
                // setVideosErrors([]);
                // setVideosList();
              }}
            >
              Cancelar
            </Button>

            <Button
              style={{
                backgroundColor: "#14B8A6",
                border: "none",
                boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              }}
              type="submit"
            >
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddCreditCardModal;
