import React, {Component} from "react";
import {Carousel, Row, Col, message} from "antd";
import api from "../service/api";
import ProductCard from "./components/ProductCard";
import ShoppingCart from "./components/ShoppingCart";
import "../css/home.css";

const imgs = [
  {
	img: "imgs/1.png",
	content: "第一张图片"
  },
  {
	img: "imgs/2.png",
	content: "年终大促销"
  },
  {
	img: "imgs/3.png",
	content: "健康助手"
  },
  {
	img: "imgs/4.png",
	content: "最新科技"
  }
];

class Home extends Component {
  state = {
    allProducts: []
  }
  getProducts() {
    api.getProducts().then((res) => {
      if (res.OK) {
        this.setState({allProducts: res.docs});
      } else {
        message.error("获取商品列表失败: " + res.message, 0);
      }
    })
  }
  componentWillMount() {
    this.getProducts();
  }
  render() {
    console.log("Props", this.props);
	return (
	  <div className="home">
      <div style={{position: "absolute", right: 200, top: 150}}>
      <ShoppingCart/>
      </div>
	  <Carousel autoplay>
	  {
		imgs.map((img, i) => {
		  return (
			<div key={i}>
			<img style={{margin: "auto"}} src={img.img} alt={img.img}/>
			<h3>{img.content}</h3>
			</div>
		  )
		})
	  }
	  </Carousel>
      <div className="product">
      <Row gutter={10}>
      {
        this.state.allProducts.map((product, i) => (
          <Col span={12} key={i}>
          <ProductCard key={i} product={product}/>
          </Col>
        ))
      }
      </Row>
      </div>
	  </div>
	);
  }
}

export default Home;
