import React, {Component} from "react";
import {Switch, Route, Link} from "react-router-dom";
import "../css/user.css";
import {Row, Col} from "antd";

class User extends Component {
	render() {
		return(
			<div className="user">
				<Row>
				<Col span={6} className="nav">
				<h1>这里是用户中心</h1>
				<div className="private"> 
				<h2>个人选项</h2>
				<Link to="/user/userinfo">用户信息</Link>
				<Link to="/user/userarticle">用户日志</Link>
				</div>
				</Col>
				<Col span={18}>
					<Switch>
						<Route path="/user/userinfo" render={() => {
							return (
								<div>
									查看用户信息
								</div>
							)
						}}/>
						<Route path="/user/userarticle" render={() => {
							return (
								<div>
									查看用户日志
								</div>
							)
						}}/>
				</Switch>
				</Col>
				</Row>
			</div>
		)
	}
}

export default User;
