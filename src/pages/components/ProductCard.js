import React, {Component} from "react";
import PropTypes from "prop-types";
import {Card} from "antd";
import {Link} from "react-router-dom";

class ProductCard extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  }
  render() {
    const {
      name, description, price, images, _id
    } = this.props.product;
    return (
      <Card bodyStyle={{ padding: 2, cursor: "pointer" }}>
      <Link to={"/product/"+_id}>
        <div className="custom-image">
          <img alt="example" width="100%" src={images[0]}/>
        </div>
        <div className="custom-card">
          <h3>{name}</h3>
          <p>{description}</p>
          <p className="price">￥ ： {price}</p>
        </div>
      </Link>
      </Card>
    )
  }
}


export default ProductCard;
