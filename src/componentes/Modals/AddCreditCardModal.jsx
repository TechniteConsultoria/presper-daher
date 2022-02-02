import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Alert } from "react-bootstrap";
import ResultCreateCourseModal from "./ResultCreateCourseModal";

import MaskedInput from "react-maskedinput";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const axios = require("axios").default;

function AddCreditCardModal(props) {
  const [resultAddCreditCard, setResultAddCreditCard] = useState(false);
  const [submited, isSubmited] = useState(false);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const { result, ...rest } = props;

  async function handleSubmit() {
    const data = {
      number: number,
      name: name,
      expiry: expiry,
      cvc: cvc,
    };

    axios.post("http://localhost:8000/cartoes", data).then((res) => {
      // isSubmited(true);
      result(res.status);
      // if (res.status === 201) {
      //   setResultAddCreditCard(true);
      // }
    });

    // setTimeout(() => {
    //   setNumber("");
    //   setName("");
    //   setExpiry("");
    //   setCvc("");
    //   isSubmited(false);
    //   props.onHide();
    // }, 1000);

    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    isSubmited(false);
    props.onHide();
  }

  useEffect(() => {
    setNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    isSubmited(false);
  }, []);

  return (
    <>
      <Modal {...rest} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar cartão</Modal.Title>
        </Modal.Header>
        <Form
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
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
                <MaskedInput
                  className="masked-input"
                  type="tel"
                  name="cardNumber"
                  mask="1111111111111111"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  onFocus={(_) => setFocus("number")}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(_) => setFocus("name")}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label column sm="2">
                  Validade
                </Form.Label>
                <MaskedInput
                  className="masked-input"
                  type="tel"
                  name="cardExpiry"
                  mask="11/11"
                  value={expiry}
                  onChange={(e) => {
                    setExpiry(e.target.value);
                  }}
                  onFocus={(_) => setFocus("expiry")}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label column sm="2">
                  CVC
                </Form.Label>
                <MaskedInput
                  className="masked-input"
                  type="tel"
                  name="cardCvc"
                  mask="111"
                  value={cvc}
                  onChange={(e) => {
                    setCvc(e.target.value);
                  }}
                  onFocus={(_) => setFocus("cvc")}
                  required
                />
              </Form.Group>

              {/* {submited && (
                <Alert variant={resultAddCreditCard ? "success" : "danger"}>
                  {resultAddCreditCard
                    ? "Seu cartão foi registrado com sucesso!"
                    : "Ops! Ocorreu um erro ao resgistrar seu cartão. Tente novamente."}
                </Alert>
              )} */}
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
