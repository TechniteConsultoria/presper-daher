import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Alert, ModalTitle, ModalBody } from "react-bootstrap";
import MaskedInput from "react-maskedinput";
import { ModalFooter } from "reactstrap";




function AddNewCardModal(props){
  
  const [cardnumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");    
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");
  const { result } = props;


    
  async function SubmitCard() {
    const data = {
      number: cardnumber,
      name: name,
      expiry: expiry,
      cvc: cvc,
    
    };

    setCardNumber("");
    setName("");
    setExpiry("");
    setCvc("");
    // props.onHide();
  }

  useEffect(() => {
    setCardNumber("");
    setName("");
    setExpiry("");
    setCvc("");

  }, []);


   
return(
    <> 
    <Form
    onSubmit={(e) => {
      e.preventDefault();
      SubmitCard();
    }}>
        <div>
            <div>
                <Form.Group className="form-group">
                <Form.Label> Nome no Cartão</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome no cartão"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(_) => setFocus("name")}
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
                  value={cardnumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  onFocus={(_) => setFocus("number")}
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
                  value={expiry}
                  onChange={(e) => {
                    setExpiry(e.target.value);
                  }}
                  onFocus={(_) => setFocus("expiry")}
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
                  value={cvc}
                  onChange={(e) => {
                    setCvc(e.target.value);
                  }}
                  onFocus={(_) => setFocus("cvc")}
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
)


}

export default AddNewCardModal;