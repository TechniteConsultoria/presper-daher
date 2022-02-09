import "./ProductCard.styles.css";

import { BsCartX } from "react-icons/bs";

function ProductCard(props) {
  return (
    <>
      <div className="prod-card">
        <div>
          <div className="prod-title">{props.title}</div>
          <div className="prod-autor">{props.author}</div>
          <div className="prod-category">{props.category}</div>
          <div className="prod-price">R$ {props.price}</div>
        </div>
        <div className="container-btn" onClick={props.onClick}>
          <BsCartX className="cart-remove-icon" />
        </div>
      </div>
    </>
  );
}

export default ProductCard;
