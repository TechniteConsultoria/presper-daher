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

const axios = require("axios").default;

function MyPaymentInfo() {
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

  async function getCreditCards() {
    const url = "https://fake-api-json-server-presper.herokuapp.com/cartoes";
    axios.get(url).then((res) => {
      if (res.status === 200) {
        setCerditCardsList(res.data);
      }
    });
  }

  const getDeleteResult = (result) => {
    return setResult({
      operation: "del",
      status: result.toString(),
    });
  };

  const getAddResult = (result) => {
    return setResult({
      operation: "add",
      status: result.toString(),
    });
  };

  useEffect(() => {
    getCreditCards();
    setTimeout(() => {
      setResult({
        operation: "",
        status: "",
      });
    }, 6000);
  }, [result]);

  return (
    // <>
    //   <Container style={{ marginTop: "0px" }}>
    //     <div className="container-my-certificates">
    //       <div className="container-item">
    //         <Row className="row-novo-curso">
    //           <Col>
    //             <h2>Minhas Formas de Pagamento</h2>
    //             <p>Vizualize suas formas de pagamento cadastradas</p>
    //           </Col>
    //           <Col>
    //             <Button
    //               id="btn-add"
    //               onClick={() => {
    //                 setAddCreditCardModalShow(true);
    //               }}
    //             >
    //               ADICIONAR CARTÃO
    //             </Button>
    //           </Col>
    //         </Row>
    //       </div>
    //       <hr></hr>
    //     </div>
    //     <div className="container-item">
    //       <Row className="row-novo-curso">
    //         <Col>
    //           <h2>Cartões Cadastrados</h2>
    //           <p>Gerencie seus cartões de crédito cadastrados</p>
    //         </Col>
    //       </Row>
    //     </div>

    //     {result.operation === "add" && (
    //       <Alert variant={result.status === "201" ? "success" : "danger"}>
    //         {result.status === "201"
    //           ? "Seu cartão foi registrado com sucesso!"
    //           : "Ops! Ocorreu um erro ao resgistrar seu cartão. Tente novamente."}
    //       </Alert>
    //     )}

    //     {result.operation === "del" && (
    //       <Alert variant={result.status === "200" ? "success" : "danger"}>
    //         {result.status === "200"
    //           ? "Seu cartão foi removido com sucesso!"
    //           : "Ops! Ocorreu um erro ao remover seu cartão. Tente novamente."}
    //       </Alert>
    //     )}

    //     <div className="credit-cards-container">
    //       <div>
    //         {creditCardsList?.map((c, id) => {
    //           return (
    //             <div key={id} className="card-box">
    //               <div
    //                 onClick={() => {
    //                   setShowCvc(!showCvc);
    //                   setCardNumber(c.number);
    //                 }}
    //               >
    //                 <Cards
    //                   id="credit-card"
    //                   number={c.number}
    //                   name={c.name}
    //                   expiry={c.expiry}
    //                   cvc={c.cvc}
    //                   focused={
    //                     showCvc && cardNumber === c.number ? "cvc" : null
    //                   }
    //                 />
    //               </div>

    //               <div>
    //                 <button
    //                   className="btn-del"
    //                   onClick={() => {
    //                     setCardId(c.id);
    //                     setDeleteCreditCardModalShow(true);
    //                   }}
    //                 >
    //                   Excluir
    //                 </button>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </Container>

    //   <AddCreditCardModal
    //     show={addCreditCardModalShow}
    //     onHide={() => setAddCreditCardModalShow(false)}
    //     result={getAddResult}
    //   />
    //   <DeleteCreditCardModal
    //     show={deleteCreditCardModalShow}
    //     onHide={() => setDeleteCreditCardModalShow(false)}
    //     result={getDeleteResult}
    //     id={cardId}
    //   />
    // </>

    <>
      <Container>
        <Container fluid>
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
          <div className="credit-card-container">
            <div>
              {creditCardsList?.map((c, id) => {
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
                        number={c.number}
                        name={c.name}
                        expiry={c.expiry}
                        cvc={c.cvc}
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
                );
              })}
            </div>
          </div>
        </Container>
      </Container>

      <AddCreditCardModal
        show={addCreditCardModalShow}
        onHide={() => setAddCreditCardModalShow(false)}
        result={getAddResult}
      />
      <DeleteCreditCardModal
        show={deleteCreditCardModalShow}
        onHide={() => setDeleteCreditCardModalShow(false)}
        result={getDeleteResult}
        id={cardId}
      />
    </>
  );
}

export default MyPaymentInfo;
