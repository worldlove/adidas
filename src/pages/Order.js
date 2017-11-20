import React, {Component} from "react";
import Contact from "./components/Contact";
import "../css/order.css";

class Order extends Component {
	getContactId(contactId){
		this.setState({contactId});
	}
	render() {
		return (
			<div className="order">
				<h1>订单页</h1>
				<Contact getContactId={this.getContactId.bind(this)}/>
			</div>
			)
	}
}

export default Order;