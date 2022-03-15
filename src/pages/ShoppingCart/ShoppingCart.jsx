import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { CartContext } from "../../contexts/CartContext/CartContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import ProductCard from "../../componentes/ProductCard/ProductCard";

import emptyCart from "../../assets/empty-cart.svg";

import { useCart } from "../../contexts/CartContext";

import "./ShoppingCart.styles.css";
import loadCart from "../../services/carrinho/loadCart";
import { formatPrice } from "../../utils/format";

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState([]);
  const [prodRemoved, isProdRemoved] = useState(false);
  const [displayedCart, setDisplayedCart] = useState(false);
  const { removeItemFromCart, getTotalAmount } = useCart();

  async function getCart(){
    let loadedCart = await loadCart()
    setCart(loadedCart)

    let totalAmount = await getTotalAmount()
    setAmount(totalAmount)
  }

  useEffect(
    () => {
      getCart()
    }, []
  )

  const navigate = useNavigate();
  
  function handleGeneratePedidos(){
      navigate("/presper/check-out");
    
  }

  function handleRemoveVisually(index){
    let newCart = [...cart]

    newCart.splice(index, 1)

    setCart(newCart)

  }

  async  function  handleRemoveFromCart(id, index){
    console.log(id);
    await removeItemFromCart(id);

    handleRemoveVisually(index)


    isProdRemoved(true);
  }

  return (
    <>
      <Container id="main-container">
        <div>
          <Row className="page-title">
            <Col>
              <h2>Meu carrinho</h2>
              <p>Vizualize os produtos adicionados ao seu carrinho de compra</p>
            </Col>
          </Row>
          {prodRemoved && (
            <Alert variant="success">
              Produto removido do carrinho com sucesso!
            </Alert>
          )}
        </div>
        <hr />
        {cart.length > 0 ? (
          <div className="container-content">
            <div className="container-prods">
              {cart?.map(({produto, quantidade, id}, index) => {
                return (
                  <ProductCard
                    key={index}
                    title={produto.nome}
                    author={produto.autor}
                    // category={produto.id}
                    price={produto.preco}
                    onClick={
                      () => {
                        handleRemoveFromCart(id, index)
                    }}
                  />
                );
              })}
            </div>
            <div className="container-checkout">
              <div className="checkout-card">
                <div className="card-title">Checkout</div>
                {cart?.map(({ produto }, idx) => {
                  return (
                    <div className="card-prod-list" key={idx}>
                      <div id="prod-title">{produto.nome}</div>
                      <div id="prod-price">{ formatPrice(produto.preco) }</div>
                    </div>
                  );
                })}
                <hr />
                <div className="card-total-container">
                  <div id="total-title">Total</div>
                  <div id="total-amount"> {  formatPrice(amount)  }</div>
                </div>

                <button className="buy-btn" onClick={handleGeneratePedidos}>
                  COMPRAR
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container-empty-card">
            <div className="empty-cart-card">
              <Image
                src={emptyCart}
                alt="carrinho vazio"
                id="empty-cart-card-img"
              />
              <div className="card-title">Seu carrinho está vazio!</div>
              <div className="card-text">
                Você não possui nenhum produto adicionado ao seu carrinho.
              </div>
              <Link to="/presper/">
                <Button id="card-button">Comprar agora</Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default ShoppingCart;
