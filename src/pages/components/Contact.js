import React, {Component} from "react";
import ContactModal from "./ContactModal";
import ContactItem from "./ContactItem";
import api from "../../service/api";
import {Radio} from "antd";
import {Button, message} from "antd";

const RadioGroup = Radio.Group;

class Contact extends Component {
	state = {
		moreBtn: false,
		defaultValues: {},
		showModal: false,
		action: "new",
		allContacts: [],
	}
	componentWillMount() {
		this.getContact();
	}
	cancelModal() {
		this.setState({showModal: false});
	}
	getContact() {
		api.getContact().then((res) => {
			this.setState({allContacts: res.docs});
		})
	}
	addContact(form) {
		this.setState({showModal: false});
		api.addContact(form).then((res) => {
			if (res.OK) {
				message.success("新增收货人地址 成功");
				this.setState({
					allContacts: res.docs,
				})
			} else {
				message.error("新增收货人地址 失败" + res.message);
			}	
		})
	}
	updateContact(form) {
		this.setState({showModal: false});
		api.updateContact(form).then((res) => {
			if (res.OK) {
				message.success("修改收货人地址 成功");
				this.setState({
					allContacts: res.docs,
				})
			} else {
				message.error("修改收货人地址 失败" + res.message);
			}	
		})
	}
	updateModal(contact) {
		this.setState({
			showModal: true,
			action: "update",
			defaultValues: contact
		});
	}
	changeContact(e){
		const value = e.target.value
		console.log(value);
	}
	delContact(id) {
		api.delContact(id).then((res) => {
			if (res.OK) {
				message.success("删除收货人地址 成功");
				this.setState({
					allContacts: res.docs,
				})

			} else {
				message.error("删除收货人地址 失败" + res.message)	
			}
		})
	}
	defaultContact(id) {
		api.defaultContact(id).then((res) => {
			if (res.OK) {
				message.success("设为默认收货人 成功");
				this.setState({
					allContacts: res.docs,
				})
			} else {
				message.error("设为默认收货人 失败" + res.message)	
			}
		})
	}
	render() {
		const {showModal, action, allContacts, defaultValues,
			moreBtn} = this.state;
		let okModal; let title;
		if (action === "new") {
			title = "新增收货人地址"
			okModal = this.addContact.bind(this)
		} else {
			title = "修改收货人地址"
			okModal = this.updateContact.bind(this)
		}
		return (
			<div className={"contact"}>
				<h3>收货人信息</h3>
				<Button className="new" size="small"
					onClick={()=> this.setState({showModal: true, action: "new", defaultValues: {}})}
				>新增收货人地址</Button>
				{ allContacts.length === 0 ? 
					<h4>没有收货人信息，请新增</h4>
					: 
					<RadioGroup onChange={this.changeContact.bind(this)} defaultValue={allContacts[0]._id} className={moreBtn ? "more" : ""}>
					{
						allContacts.map((contact, i) => (
							<ContactItem
							key={i}
							contact={contact}
							delContact={this.delContact.bind(this)}
							setDefault={this.defaultContact.bind(this)}
							updateContact={this.updateModal.bind(this)}
							/>
						))
					}
					</RadioGroup>
				}
				<div className="zhezhao">
				<Button size="small"
				onClick={()=> this.setState({moreBtn: !this.state.moreBtn})}
				>{moreBtn ? "收起" : "更多"}地址</Button>
				</div>
				{showModal ? 
				<ContactModal visible={showModal}
				title={title}
				handleOk={okModal}
				handleCancel={() => this.cancelModal()}
				defaultValues={defaultValues}
				/>
				: null
				}
			</div>
			)
	}
}

export default Contact;