import React, {Component} from "react";
import {Button, Icon} from "antd";


class ShoppingCart extends Component {
	state = {
		showList: false
	}
	handleMouseOut() {
		this.setState({
			showList: false
		})
	}
	hanldeMouseOver() {
		this.setState({
			showList: true
		})
	}	
	render() {
		return (
			<div className="shoppingCart">
				<Button onMouseOver={this.hanldeMouseOver.bind(this)}
				 onMouseOut={this.handleMouseOut.bind(this)}>
				 <Icon type={"shopping-cart"}/>购物车</Button>
				{
					this.state.showList ?
					<div>
						商品列表
					</div>
					:null
				}
			</div>	
		)
	}
}

export default ShoppingCart;
