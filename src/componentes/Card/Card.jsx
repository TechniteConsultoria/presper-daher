import React from "react";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { formatPrice } from "../../utils/format";

export default class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      img: props.img,
      title: props.title,
      author: props.author,
      rating: props.rating,
      price: props.price,
      sold: props.sold,
      onClick: props.onClick,
    };
  }

  render() {
    return (
      <>
        <Card
          id="card"  
          onClick={this.state.onClick}
        >
          <Card.Img
            id="card-img"
            variant="top"
            src={this.state.img}
          />
          <Card.Body>
            <Card.Title class="card-title-size">
              {this.state.title}
            </Card.Title>
            <Card.Text class="card-font-size">
              {this.state.author}
            </Card.Text>
            <Card.Text class="card-font-size">
              {this.state.sold} vendidos
            </Card.Text>

            <div 
            id="card-div"

            >
              <ReactStars value={this.state.rating} edit={false} size={18} />
              <Card.Text
              id="card-text"
              >
                {formatPrice(this.state.price)}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}
