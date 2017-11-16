import React, {Component} from "react";
import api from "../service/api";
import ProductCard from "./components/ProductCard";
import {Row, Col, Spin, message} from "antd";

class Product extends Component {
  state= {
    product: {}
  }
  componentWillMount() {
    console.log(this.props);
    const id = this.props.match.params.id;
    console.log("ID", id);
    api.getProduct(id).then((res) => {
      if (res.OK) {
        this.setState({product: res.doc})
      } else {
        message.error(res.message)
      }
    })
  }
  render() {
    const {product} = this.state;
    if (!product.images) {
      return <Spin/>
    }
    return (
      <div className="product">
      <Row>
      <Col span={8}>
      <ProductCard product={product} />
      </Col>
      <Col span={16}>
      <h1>商品详情</h1>
      </Col>
      </Row>
      </div>
    )
  }
}


export default Product;
