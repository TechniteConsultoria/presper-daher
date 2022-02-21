import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext/CartContext";
import "react-credit-cards/es/styles-compiled.css";
import "./CheckOut.style.css";

import AddNewCardModal from "../../componentes/Modals/CardFormModal";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const axios = require("axios").default;

function CartCheckOut() {
  const [addNewCardModal, setAddNewCardModal] = useState(false);
  const [cardsList, setCardsList] = useState([]);

  const [result, setResult] = useState({
    operation: "",
    status: "",
  });

  async function getCreditCards() {
    const url = "https://fake-api-json-server-presper.herokuapp.com/cartoes";
    axios.get(url).then((res) => {
      if (res.status === 200) {
        setCardsList(res.data);
      }
    });
  }
  useEffect(() => {
    getCreditCards();
    console.log(cardsList);
  }, []);

  const getAddCards = (result) => {
    return setResult({
      operation: "add",
      status: result.toString(),
    });
  };

  const { cart, getTotalAmount } = useContext(CartContext);

  const [prods, setProds] = useState(cart);
  useEffect(() => {
    setProds(cart);
  }, [cart]);

  return (
    <>
      <Container id="main-container">
        <div className="container-item">
          <Row className="page-title">
            <Col className="page-title">
              <h2>Finalizar Compra</h2>
              <p>Selecione a forma de pagamento antes de finalizar a compra</p>
            </Col>
          </Row>
        </div>
        <hr />
        <div className="payment-card">
          <Col className="payment-btn">
            <h4>Cartão de Crédito</h4>
          </Col>
          <div className="payment-form"></div>
          {/* Adicionar os cartões já cadastrados e selecionar as opcões de compra*/}
          <div>
            <Button
              id="btn-add-new-card"
              onClick={() => {
                setAddNewCardModal(!addNewCardModal);
              }}
            >
              {" "}
              Adicione um Novo Cartão
            </Button>
          </div>

          <div>{addNewCardModal && <AddNewCardModal />}</div>
          <div>
            {cardsList?.map((card) => {
              <p>{card.name}</p>;
            })}
          </div>
        </div>

        <div className="card-details">
          <h4> Detalhes do Pedido </h4>
          <div className="card-title">Produtos</div>
          {prods?.map((prod, idx) => {
            return (
              <div className="card-prod-list" key={idx}>
                <div id="prod-author"> Autor(a): {prod.author} </div>
                <div id="prod-title"> Curso: {prod.title} </div>
                <div id="prod-price"> Valor: R$ {prod.price}</div>
              </div>
            );
          })}
          <hr />
          <div className="card-total-container">
            <div id="total-title">Total</div>
            <div id="total-amount">R$ {getTotalAmount()}</div>
          </div>
          <Link to="/">
            <Button id="btn-checkout"> Finalizar Compra </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default CartCheckOut;
