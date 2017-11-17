import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Icon} from "antd";

class CartItem extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    num: PropTypes.number.isRequired,
    delCart: PropTypes.func.isRequired,
  }
  render() {
    const {
      product, num, delCart
    } = this.props;
    return (
      <div className="cartItem">
      <img src={product.images[0]} />
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <span>￥{product.price.toFixed(2)} * {num}</span>
      <button onClick={delCart}>删除</button>
      </div>
    )
  }
}


export default CartItem;
