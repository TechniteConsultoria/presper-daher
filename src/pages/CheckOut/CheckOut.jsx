import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext, useCart } from "../../contexts/CartContext";
import "react-credit-cards/es/styles-compiled.css";
import "./CheckOut.style.css";

import AddCardForm from "../../componentes/AddCardForm/AddCardForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useCreditCard } from "../../contexts/CreditCardContext";
import { formatPrice } from "../../utils/format";
import { api, id } from "../../services/api";
import { toast } from "react-toastify";
import createPedidoWithFatura from "../../services/pedido/createPedidoWithFatura";
import clienteProdutoCertificado from "../../services/clienteProdutoCertificado/clienteProdutoCertificado";

function CartCheckOut() {
  // TODO - buscar lista de cartoes do context
  const { getCreditCards, creditCardList } = useCreditCard();
  const { removeItemFromCart, getTotalAmount,  getCart, deleteAllCart } = useCart();
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [card  ,  setCard   ] = useState({});
  const [cards ,  setCards  ] = useState([]);
  const [amount,  setAmount ] = useState([]);

  const [result, setResult] = useState({
    operation: "",
    status: "",
  });

  async function handleLoadCards(){
    let userCards  = await getCreditCards();


    setCards(userCards)
  }

  useEffect(() => {
    handleLoadCards()
  }, []);

  const getAddCards = (result) => {
    return setResult({
      operation: "add",
      status: result.toString(),
    });
  };

  async function handleGetCart(){
    let loadedCart = await getCart()
    console.log("loadedCart")
    console.log(loadedCart)
    setProds(loadedCart)

    let totalAmount = await getTotalAmount()
    setAmount(totalAmount)
  }

  const [prods, setProds] = useState([]);

  useEffect(() => {
  handleGetCart() 
  }, []);



  
  // deletarCarrinho()

  async function handleGeneratePedidos(cart){
    if(!card.cvv) return toast.error("Selecione um cartão!")

    let formatedProd = {
      produtos: [],
     }

    cart.map(

      (cartProp) =>  {
        cartProp.produto.quantidade = cartProp.quantidade
        formatedProd.produtos.push(cartProp.produto)
        } 
    )
    formatedProd.card = card

    console.log(formatedProd.card)

    let pedidoGenerated = await createPedidoWithFatura(formatedProd)
    
    if (!pedidoGenerated){
      toast.error("Erro ao gerar o pedido...")
      return
    }

    console.log("pedidoGenerated.id")
    console.log( pedidoGenerated.id )

    let deletedAllCart =  await deleteAllCart()


    
    // create a array to make a map in backend 
    let createdAcess = await clienteProdutoCertificado.create(formatedProd)
    if(!createdAcess) toast.error("Erro na criação da fatura... :(")

    if(createdAcess && pedidoGenerated && deletedAllCart) toast.success("Pedido Gerado, carrinho apagado, acesso autorizado e fatura autorizada! :)")
  }

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
        <div className="page-content">
          <div className="payment-card">
            <div className="payment-form">
              <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend">Cartão de Crédito</Form.Label>
                <Col sm={10}>

                  {
                  cards.map(
                  (card) => (
                  <div
                  onClick={(_) => {
                    setCard(card)
                  }}
                  >    
                    <Form.Check
                      type="radio"
                      label={card.numero}
                      name="formHorizontalRadios"
                      id={card.id}
                    />
                  </div>
                    )
                  )
                  }


                  

                  <Form.Check
                    type="radio"
                    label="Novo Cartão"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    onClick={() => {
                      setShowAddCardForm(!showAddCardForm);
                    }}
                  />
                </Col>
              </Form.Group>
            </div>

            <div className="form-container">
              {showAddCardForm && <AddCardForm />}
            </div>
            <div>
              {creditCardList?.map((card) => {
                return (
                  <div key={card.id}>
                    <p> {card.name} </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-details">
            <h4> Detalhes do Pedido </h4>
            <div className="card-title">Produtos</div>
            {prods?.map((prod, idx) => {
              return (
                <div className="card-prod-list" key={idx}>
                  <div id="prod-author"> Autor(a):  { prod.produto.autor  } </div>
                  <div id="prod-title">  Curso:     { prod.produto.nome   } </div>
                  <div id="prod-price">  Valor: R$  { prod.produto.preco  } </div>
                </div>
              );
            })}
            <hr />
            <div className="card-total-container">
              <div id="total-title">Total</div>
              <div id="total-amount">{
                formatPrice(amount)
              }</div>
            </div>
            
            <Button
            onClick={
              () => handleGeneratePedidos(prods)
            }
            id="btn-checkout"> Finalizar Compra </Button>

            {/* <Link to="/">
              <Button id="btn-checkout"> Finalizar Compra </Button>
            </Link> */}
          </div>
        </div>
      </Container>
    </>
  );
}

export default CartCheckOut;
