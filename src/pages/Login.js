import React, {Component} from "react";
import { Link, Prompt } from "react-router-dom";
import { saveUser } from "../service/getUser";
import PropTypes from "prop-types";


import { Form, Icon, Input, Button, Spin, message, notification } from 'antd';
import "../css/login.css";

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    error: PropTypes.bool,
    message: PropTypes.string,
  }
  state = {
    captcha: "",
    formHasChanged: false 
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.username) {
      this.props.history.push("/");
    } 
    console.log(this.props);
    console.log("will")
    // if (nextProps.error) {
    //   console.log("message:", this.props.message)
    //   console.log("message", message);
    //   message.info("错误")
    // }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.actions.loginChunk(values);
      }
    });
  }
  getCaptcha() {
    fetch("http://localhost:3000/captcha", {
      credentials: "include"
    }).then((res) => {
      return res.json() 
    }).then((data) => {
      console.log("cap", data);
      this.setState({
        captcha: data.captcha
      })
    })
  }
  componentDidMount() {
    this.getCaptcha();
  }
  render() {
    if (this.props.isFetching) {
      return(
        <div className="loading">
          <Spin />
        </div>
      )
    }

    const {captcha, formHasChanged} = this.state;
    const { getFieldDecorator } = this.props.form;
    const capImg = (<img style={{height: 28}}
      src={"data: image/jpg; base64," + captcha} alt="验证码"/>)
    return (
    	<div className="login">
      <Prompt when={formHasChanged} message="Are you sure?"/>
      <Form onChange={() => this.setState({formHasChanged: true})} 
      onSubmit={this.handleSubmit} className="login-form">
      	<h1>欢迎登录
        <span>没有账号，<Link to="/signup">请注册 &nbsp;
          <Icon type="right-circle" />
        </Link></span>
      	</h1>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('captcha', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Input addonBefore={<label>验证码</label>} 
            addonAfter={capImg}
            placeholder="点击重新获取" />
          )}
        </FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
          <Link className="login-form-forgot" to="/forgot-password">
            <Icon type="question-circle-o" /> &nbsp;
            忘记密码
          </Link>
      </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);


export default Login;