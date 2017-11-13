import React, {Component} from "react";
import {Form, Button, Input} from "antd";
import UploadImg from "./components/UploadImg";
const FormItem = Form.Item;

class NormalProduct extends Component {
	state = {
		imgList: [],
	}
	getImgList(imgList) {
		this.setState({
			imgList:imgList 
		})	
	}
	handleSubmit(e) {
		e.preventDefault(e);
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("values", values);
				values.imgs = this.state.imgList;
				console.log("values", values);
			}
		})

	}
	render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
		const {getFieldDecorator} = this.props.form
		return (
			<div className="product">
				<h1>新增商品</h1>
				<Form onSubmit={this.handleSubmit.bind(this)}>
				<FormItem
          {...formItemLayout}
          label={(
            <span>
              商品名称
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '商品名称名不能为空', whitespace: true },
            ],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="商品描述"
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [{
              required: true, message: '输入商品描述',
            }],
            validateTrigger: "onBlur"
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图片列表"
        >
        	<UploadImg max={8} 
        		action="http://localhost:3000/upload"
        		getImgList={this.getImgList.bind(this)}
        	/>
        </FormItem>
        <Button htmlType="submit">提 交</Button>
				</Form>
			</div>
		)
	}
}

export default Form.create()(NormalProduct);