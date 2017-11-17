import React, {Component} from "react";
import api from "../service/api";
import ProductCard from "./components/ProductCard";
import AddButton from "./components/AddButton";
import {Row, Col, Spin, message, Button} from "antd";
import PropTypes from "prop-types";

class Product extends Component {
  static propTypes = {
    addCart: PropTypes.func.isRequired
  }
  state= {
    product: {},
    count: 1,
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
  handleCount(value) {
    console.log("count", value);
    this.setState({
      count: value
    });
  }
  handleAddCart() {
    const postData = [{
      pid: this.state.product._id,
      num: this.state.count
    }];
    console.log("addCart", postData);
    api.addCart(postData).then((res) => {
      if (res.OK) {
        this.props.addCart(res.count)
      }
      console.log("res", res);
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
      <AddButton onChange={this.handleCount.bind(this)}
        defaultValue={this.state.count}
      />

      <Button onClick={this.handleAddCart.bind(this)}>加入购物车</Button>
      <hr/>
      </Col>
      </Row>
      </div>
    )
  }
}


export default Product;
