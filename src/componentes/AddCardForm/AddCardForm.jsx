import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import MaskedInput from "react-maskedinput";

import { useCreditCardPage } from "../../services/Hooks/CreditCardPageHook";

import { useCreditCard } from "../../contexts/CreditCardContext";

function AddCardForm(props) {
  const {
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    cardExpiry,
    setCardExpiry,
    cardCvc,
    setCardCvc,
    nickname,
    setNickname
  } = useCreditCardPage();

  const { addCreditCard } = useCreditCard();

  async function handleSubmit() {
    const data = {
      apelido:     nickname,
      numero:      cardNumber,
      nomeTitular: cardName,
      validade:    cardExpiry,
      cvv:         cardCvc,
    };
    await addCreditCard(data);
    props.onHide()
  }

  useEffect(() => {
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvc("");
    setNickname("")
  }, []);

  return (
    <>
      <Form
        onSubmit={
          async (e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >


        <Form.Group className="mb-3">
          <Form.Label> Apelido do Cartão</Form.Label>
          <Form.Control
            style={{ width: "200px" }}
            type="text"
            placeholder="Nome no cartão"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label> Nome no Cartão</Form.Label>
          <Form.Control
            style={{ width: "200px" }}
            type="text"
            placeholder="Nome no cartão"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Número do Cartão </Form.Label>
          <MaskedInput
            className="masked-input"
            type="tel"
            name="cardNumber"
            mask="1111111111111111"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Validade </Form.Label>
          <MaskedInput
            className="masked-input"
            type="tel"
            name="cardExpiry"
            mask="11/11"
            value={cardExpiry}
            onChange={(e) => {
              setCardExpiry(e.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Código de Segurança </Form.Label>
          <MaskedInput
            className="masked-input"
            type="tel"
            name="cardCvc"
            mask="111"
            value={cardCvc}
            onChange={(e) => {
              setCardCvc(e.target.value);
            }}
            required
          />
        </Form.Group>
        <Button
          style={{
            backgroundColor: "#14B8A6",
            border: "none",
            boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
            display: "inline-block",
            margin: "0px",
          }}
          type="submit"
        >
          Adicionar
        </Button>
      </Form>
    </>
  );
}

export default AddCardForm;
