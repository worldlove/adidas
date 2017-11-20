import React, {Component} from "react";
import {Radio, Button} from "antd";
const RadioButton = Radio.Button;

class ContactItem extends Component {
	render() {
		const {contact, phone, address, _id} = this.props.contact;
		const {delContact, updateContact, setDefault} = this.props;
		return (
			<div className="radioButton">
				<RadioButton value={_id}>
				{contact}
				</RadioButton>
				<div className="info">
					<div className="name">{contact}</div>
					<div className="address">{address}</div>
					<div className="phone">{phone}</div>
					{ this.props.contact.default ?
						<div className="default">默认地址</div>
						: null
					}
				</div>
				<div className="op">
					{ this.props.contact.default ? null
					:<Button size="small"
						onClick={() => setDefault(_id)}
					>设为默认</Button>
					}
					<Button size="small"
						onClick={() => updateContact(this.props.contact)}
					>编辑</Button>
					<Button size="small"
						onClick={() => delContact(_id)}
					>删除</Button>
				</div>
			</div>
		)
	}
}

export default ContactItem;