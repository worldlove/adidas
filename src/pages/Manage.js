import React, {Component} from "react";
import Category from "./Category";
import UploadImg from "./components/UploadImg";
import Product from "./Product";
import {Switch, Route, Link} from "react-router-dom";
import {Row, Col, Menu} from "antd";
import "../css/manage.css";

class Manage extends Component {
  render() {
	return(
	  <div className="manage">
	  <Row>
	  <Col md={4} xs={8} sm={6} className="nav">
	  <h1>这里是管理中心</h1>
	  <hr style={{margin: 10}}/>
	  <div className="manage">
	  <h2>管理菜单</h2>
	  <Menu>
	  <Menu.Item>
	  <Link to="/manage/category">增加分类</Link>
	  </Menu.Item>
	  <Menu.Item>
	  <Link to="/manage/product">增加产品</Link>
	  </Menu.Item>
	  <Menu.Item>
	  <Link to="/manage/upload">上传图片</Link>
	  </Menu.Item>
	  </Menu>
	  </div>
	  </Col>
	  <Col md={20} xs={16} sm={6}>
	  <Switch>
	  <Route path="/manage/product" component={Product}/>
	  <Route path="/manage/category" component={Category}/>
	  <Route path="/manage/upload" render={() => (
        <UploadImg max={3} 
        action="http://localhost:3000/upload"
        getImgList={()=>{}}
        />)}/>
	  </Switch>
	  </Col>
	  </Row>
	  </div>
	)
  }
}

export default Manage;
