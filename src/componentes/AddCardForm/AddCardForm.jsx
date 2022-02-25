import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import MaskedInput from "react-maskedinput";

import { useCreditCardPage } from "../../services/Hooks/CreditCardPageHook";

import { useCreditCard } from "../../contexts/CreditCardContext/CreditCardContext";

function AddCardForm() {
  const {
    cardNumber,
    setCardNumber,
    cardName,
    setCardName,
    cardExpiry,
    setCardExpiry,
    cardCvc,
    setCardCvc,
  } = useCreditCardPage();

  const { addCreditCard } = useCreditCard();

  async function handleSubmit() {
    const data = {
      name: cardName,
      number: cardNumber,
      expiry: cardExpiry,
      cvc: cardCvc,
    };
    addCreditCard(data);
  }

  useEffect(() => {
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvc("");
  }, []);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <div>
            <Form.Group className="form-group">
              <Form.Label> Nome no Cartão</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome no cartão"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="form-group">
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

            <Form.Group className="form-group">
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

            <Form.Group className="form-group">
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
          </div>
        </div>

        <div>
          <Button
            style={{
              backgroundColor: "#14B8A6",
              border: "none",
              boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
              display: "inline-block",
              margin: "2em",
            }}
            type="submit"
          >
            Adicionar
          </Button>
        </div>
      </Form>
    </>
  );
}

export default AddCardForm;
