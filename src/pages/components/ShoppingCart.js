import React, {Component} from "react";
import {Button, Icon, Spin, Badge} from "antd";
import CartItem from "./CartItem";
import "../../css/shoppingCart.css";
import PropTypes from "prop-types";

class ShoppingCart extends Component {
	static propTypes = {
		isFetching: PropTypes.bool.isRequired,
		cartList: PropTypes.array.isRequired,
		count: PropTypes.number.isRequired,
		valid: PropTypes.bool.isRequired,
		getCart: PropTypes.func.isRequired,
		delCart: PropTypes.func.isRequired
	}
	state = {
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
		});
		if (this.props.valid) {
			this.props.getCart();
		}
	}	
	render() {
		const {isFetching, cartList, delCart, count} = this.props;
		const {showList} = this.state;
		let countn=0; let sum=0; 
		return (
			<div className="shoppingCart"
				 onMouseLeave={this.handleMouseOut.bind(this)}
			>
				<Button size="large"
				onMouseOver={this.hanldeMouseOver.bind(this)}>
				<Badge count={count} showZero>	
				 购 物 车 &nbsp;
				 <Icon type={"shopping-cart"}/>&nbsp;
				 </Badge>
				 </Button>
				{
					showList ?
					<div className="cart">
						{
							isFetching ? 
							<Spin className="spin"/>	
							:
							<div className="cartList">
							<h3>最近添加的商品</h3>
							{
								cartList.length > 0 ?
								cartList.map((cart, i) => {
									countn += cart.num;
									sum += cart.num * cart.product.price;
									return (
										<CartItem product={cart.product}
										num={cart.num} key={i}
										delCart={() => delCart(cart._id)}
										/>
									)
								})
								: <p className="emputy">购物车空空如也</p>
							}
							<div className="cartFooter">
								<p>共{countn}件商品，共计￥{sum.toFixed(2)}</p>
								<Button type="primary">去购物车</Button>
							</div>
							</div>
						}
					</div>
					:null
				}
			</div>	
		)
	}
}

export default ShoppingCart;
