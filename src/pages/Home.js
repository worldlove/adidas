import React, {Component} from "react";
import {Carousel, Row, Col} from "antd";
import api from "../service/api";
import ProductCard from "./components/ProductCard";
import ConCart from "../containers/ConCart";
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
    <div style={{position: "absolute", "right": 300, top: 100}}>
    <ConCart />
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
