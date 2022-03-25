import React, { useState, useEffect } from "react";

import "./MyPaymentInfo.styles.css";
import "react-credit-cards/es/styles-compiled.css";

import AddCreditCardModal from "../../componentes/Modals/AddCreditCardModal";
import DeleteCreditCardModal from "../../componentes/Modals/DeleteCreditCardModal";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Cards from "react-credit-cards";
import cartaoLoadFilter from "../../services/cartao/cartaoLoadFilter";
import { id } from "../../services/api";
import { useCreditCard } from "../../contexts/CreditCardContext";


function MyPaymentInfo() {

  const { getCreditCards, creditCardList, addCreditCard, deleteCreditCart } = useCreditCard();

  const [addCreditCardModalShow, setAddCreditCardModalShow] = useState(false);
  const [deleteCreditCardModalShow, setDeleteCreditCardModalShow] =
    useState(false);

  const [showCvc, setShowCvc] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [creditCardsList, setCerditCardsList] = useState([]);
  const [cardId, setCardId] = useState("");

  const [result, setResult] = useState({
    operation: "",
    status: "",
  });

  async function getCards() {
      let userCartoes = await creditCardList

      console.log(creditCardList)
      setCerditCardsList(userCartoes);
    };
  

  // const getDeleteResult = (result) => {
  //   return setResult({
  //     operation: "del",
  //     status: result.toString(),
  //   });
  // };

  const getAddResult = (result) => {
    return setResult({
      operation: "add",
      status: result.toString(),
    });
  };

  // getCreditCards();


  useEffect(() => {
    getCards()
  }, [creditCardList]);

  
  // useEffect(() => {
  //   setTimeout(() => {
  //     setResult({
  //       operation: "",
  //       status: "",
  //     });
  //   }, 6000);
  // }, [result]);

  return (
    <>
      <Container style={{ height: "auto" }}>
        <div className="container-item">
          <Row className="row-novo-curso">
            <Col>
              <h2>Minhas Formas de Pagamento</h2>
              <p>Vizualize suas formas de pagamento cadastradas</p>
            </Col>
            <Col>
              <Button
                id="btn-add"
                onClick={() => {
                  setAddCreditCardModalShow(true);
                }}
              >
                ADICIONAR CARTÃO
              </Button>
            </Col>
          </Row>
        </div>
        <hr></hr>
        <div className="container-item" id="cartoes-cadastrados">
          <Row className="row-novo-curso">
            <Col>
              <h2>Cartões Cadastrados</h2>
              <p>Gerencie seus cartões de crédito cadastrados</p>
            </Col>
          </Row>
        </div>
        {result.operation && (
          <div className="container-item">
            {result.operation === "add" && (
              <Alert variant={result.status === "201" ? "success" : "danger"}>
                {result.status === "201"
                  ? "Seu cartão foi registrado com sucesso!"
                  : "Ops! Ocorreu um erro ao resgistrar seu cartão. Tente novamente."}
              </Alert>
            )}

            {result.operation === "del" && (
              <Alert variant={result.status === "200" ? "success" : "danger"}>
                {result.status === "200"
                  ? "Seu cartão foi removido com sucesso!"
                  : "Ops! Ocorreu um erro ao remover seu cartão. Tente novamente."}
              </Alert>
            )}
          </div>
        )}
        <div className="credit-card-container">
          <div>
            {
            creditCardsList ==  creditCardList ? (

            creditCardsList?.map((c, id) => {
              return (
                <div key={id} className="card-box">
                  <div
                    onClick={() => {
                      setShowCvc(!showCvc);
                      setCardNumber(c.number);
                    }}
                  >
                    <Cards
                      id="credit-card"
                      number={c.numero}
                      name={c.nomeTitular}
                      expiry={c.validade}
                      cvc={c.cvv}
                      focused={
                        showCvc && cardNumber === c.number ? "cvc" : null
                      }
                    />
                  </div>

                  <div>
                    <button
                      className="btn-del"
                      onClick={() => {
                        setCardId(c.id);
                        setDeleteCreditCardModalShow(true);
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )
            })  
            ):(
              

              creditCardsList?.map((c, id) => {
                return (
                  <div key={id} className="card-box">
                    <div
                      onClick={() => {
                        setShowCvc(!showCvc);
                        setCardNumber(c.number);
                      }}
                    >
                      <Cards
                        id="credit-card"
                        number={c.numero}
                        name={c.nomeTitular}
                        expiry={c.validade}
                        cvc={c.cvv}
                        focused={
                          showCvc && cardNumber === c.number ? "cvc" : null
                        }
                      />
                    </div>
  
                    <div>
                      <button
                        className="btn-del"
                        onClick={() => {
                          setCardId(c.id);
                          setDeleteCreditCardModalShow(true);
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                )
              }) 

            )
          }
          </div>
        </div>
      </Container>

      <AddCreditCardModal
        show={addCreditCardModalShow}
        onHide={() => setAddCreditCardModalShow(false)}
        result={getAddResult}
      />
      <DeleteCreditCardModal
        show={deleteCreditCardModalShow}
        onHide={() => setDeleteCreditCardModalShow(false)}
        // result={getDeleteResult}
        id={cardId}
      />
    </>
  );
}

export default MyPaymentInfo;
