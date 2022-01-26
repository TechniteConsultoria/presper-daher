import React, { useState, useEffect } from "react";

import AddCreditCardModal from "../../componentes/Modals/AddCreditCardModal";
import DeleteCreditCardModal from "../../componentes/Modals/DeleteCreditCardModal";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Cards from "react-credit-cards";

import PaymentInfoCard from "../../componentes/PaymentInfoCard/PaymentInfoCard";

import "./MyPaymentInfo.styles.css";
import "react-credit-cards/es/styles-compiled.css";

import cartoes from "../../data/cartoes";

function MyPaymentInfo() {
  const [addCreditCardModalShow, setAddCreditCardModalShow] = useState(false);
  const [deleteCreditCardModalShow, setDeleteCreditCardModalShow] =
    useState(false);

  return (
    <>
      <Container>
        <Container fluid className="container-my-certificates">
          <div className="container-item">
            <Row className="row-novo-curso">
              <Col>
                <h2>Minhas Formas de Pagamento</h2>
                <p>Vizualize suas formas de pagamento cadastradas</p>
              </Col>
              <Col>
                <Button
                  style={{
                    backgroundColor: "#14B8A6",
                    border: "none",
                    boxShadow: "0px 3px 14px -8px rgba(98,63,101,0.53)",
                    color: "white",
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    // showCreateCourseModal(true);
                    setAddCreditCardModalShow(true);
                  }}
                >
                  ADICIONAR CARTÃO
                </Button>
              </Col>
            </Row>
          </div>
          <hr></hr>
        </Container>
        <div className="container-item">
          <Row className="row-novo-curso">
            <Col>
              <h2>Cartões Cadastrados</h2>
              <p>Gerencie seus cartões de crédito cadastrados</p>
            </Col>
          </Row>
        </div>
        <div className="credit-cards-container">
          <div>
            {cartoes?.map((c, id) => {
              return (
                <div key={id} className="card-box">
                  <div>
                    <Cards
                      className="credit-card"
                      number={c.number}
                      name={c.name}
                      expiry={c.expiry}
                      cvc={c.cvc}
                    />
                  </div>
                  <div>
                    <button
                      className="btn-del"
                      onClick={() => setDeleteCreditCardModalShow(true)}
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

      <AddCreditCardModal
        show={addCreditCardModalShow}
        onHide={() => setAddCreditCardModalShow(false)}
      />
      <DeleteCreditCardModal
        show={deleteCreditCardModalShow}
        onHide={() => setDeleteCreditCardModalShow(false)}
      />
    </>
  );
}

export default MyPaymentInfo;
