import React, {Component} from "react";
import {Button, Icon, Spin, Badge} from "antd";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import api from "../../service/api";
import "../../css/shoppingCart.css";


class ShoppingCart extends Component {
  state = {
    isFetching: false,
    cartList: [],
	showList: false,
  }
  handleMouseOut() {
	this.setState({
	  showList: false
	})
  }
  hanldeMouseOver() {
	this.setState({
	  showList: true,
      isFetching: true,
	})
    this.getCart();
  }
  getCart() {
    api.getCart().then((res) => {
      this.setState({
        cartList: res.docs,
        isFetching: false,
      })
    })
  }
  delCart(id) {
	this.setState({
	  showList: true,
      isFetching: true,
	})
    api.delCart(id).then((res) => {
      if (res.OK) {
        this.getCart();
      }
    })
  }
  render() {
    let num = 0; let total = 0;
    const {showList, cartList, isFetching} = this.state;
	return (
	  <div className="shoppingCart"
	       onMouseLeave={this.handleMouseOut.bind(this)}
           >
        <Button onMouseOver={this.hanldeMouseOver.bind(this)} size="large">
	      <Badge count={cartList.length || 0} showZero> 购 物 车 <Icon type={"shopping-cart"} size={30}/>&nbsp; </Badge>
        </Button>
        {
          showList ?
	        <div className="cart">
		       <h3>最新加入的商品</h3>
                { isFetching ?
                  <Spin className="spin"/>
                                        :
                    <div className="cartList">
                          {
                            cartList.length > 0 ?
                              cartList.map((cart, i) => {
                                num += cart.num;
                                total += cart.num * cart.product.price;
                                return  <CartItem key={i}
                                delCart={() => this.delCart(cart._id)}
                                num={cart.num} product={cart.product} />
                             })
                            :<p>购物车空空如也</p>
                          }
                  </div>
                }
            <div className="cartFooter">
            <p>共{num}件商品， 总价<span>￥{total}</span><Button type="primary">去结算</Button></p>
            </div>
          </div>
	        :null
        }
	  </div>
	)
  }
}

export default ShoppingCart;
