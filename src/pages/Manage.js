import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import {Row, Col, Menu} from "antd";
import UploadImg from "./components/UploadImg";
import Product from "./Product";

const MenuItem = Menu.Item;

class Manage extends Component {
	handleClick(item) {
		console.log("item", item);
		this.props.history.push(item.key)
	}
	render() {
		console.log(this.props);
		return (
			<div className="manage">
				<Row>
					<Col xs={24} sm={8} md={4}
					style={{minHeight: 400, borderRight: "1px solid #aaa"}}
					>
						<h1>管理中心</h1>
						<Menu
						onClick={this.handleClick.bind(this)}>
							<MenuItem key="/manage/category">
								<Link to="/manage/category">
									分类管理
								</Link>
							</MenuItem>
							<MenuItem key="/manage/product">
								<Link to="/manage/product">
								商品管理
								</Link>
							</MenuItem>
							<MenuItem key="/manage/uploadimg">
								上传图片
							</MenuItem>
						</Menu>
					</Col>
					<Col xs={24} sm={16} md={20}>
						<Switch>
							<Route path="/manage/uploadimg" render={(props) => (
								<UploadImg max={3} 
								getImgList={(list)=> console.log(list)}
								action="http://localhost:3000/upload"
								/>
								)
								}/>
							<Route path="/manage/product" component={Product}/>
						</Switch>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Manage;