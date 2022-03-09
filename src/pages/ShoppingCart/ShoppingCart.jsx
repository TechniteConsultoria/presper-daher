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

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [prodRemoved, isProdRemoved] = useState(false);
  const [displayedCart, setDisplayedCart] = useState(false);
  const { removeItemFromCart, getTotalAmount } = useCart();

  async function getCart(){
    let loadedCart = await loadCart()
    setCart(loadedCart)
  }

  useEffect(
    () => {
      getCart()
    }, []
  )

  const navigate = useNavigate();
  const GoToCheckOut = () => {
    // eslint-disable-next-line no-undef
    navigate("/check-out");
  };

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
              {cart?.map((prod, id) => {
                return (
                  <ProductCard
                    key={id}
                    title={prod.title}
                    author={prod.author}
                    category={prod.category}
                    price={prod.price}
                    onClick={() => {
                      removeItemFromCart(prod.id);
                      isProdRemoved(true);
                    }}
                  />
                );
              })}
            </div>
            <div className="container-checkout">
              <div className="checkout-card">
                <div className="card-title">Checkout</div>
                {cart?.map((prod, idx) => {
                  return (
                    <div className="card-prod-list" key={idx}>
                      <div id="prod-title">{prod.title}</div>
                      <div id="prod-price">R$ {prod.price}</div>
                    </div>
                  );
                })}
                <hr />
                <div className="card-total-container">
                  <div id="total-title">Total</div>
                  <div id="total-amount">R$ {async () => await getTotalAmount()}</div>
                </div>

                <button className="buy-btn" onClick={GoToCheckOut}>
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
              <Link to="/">
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
