import React, {Component} from "react";
import PropTypes from "prop-types";
import {Modal, Form, Input, Switch} from "antd";
const FormItem = Form.Item;

class ContactModal extends Component {
	static defaultProps = {
		defaultValues: {}
	}
	static propTypes = {
		defaultValues: PropTypes.object.isRequired,
		visible: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
		handleOk: PropTypes.func.isRequired,
		handleCancel: PropTypes.func.isRequired,
	}
	onOk() {
		this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.props.defaultValues._id) {
        	values.id = this.props.defaultValues._id;
        }
        this.props.handleOk(values);
      }
    });
	}
	render() {
		const {visible, defaultValues, title, handleCancel} = this.props;
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
    };
		return (
			<Modal
			title={title}
			visible={visible}
			onOk={() => this.onOk()}
			onCancel={handleCancel}
			>
			<Form>
			<FormItem
      {...formItemLayout}
      label="联系人名称"
      hasFeedback
      >
      {
        getFieldDecorator('contact', {
          rules: [{ required: true, message: '联系人不能为空', whitespace: true },
          ],
          initialValue:defaultValues.contact
        })(
          <Input />
        )
      }
      </FormItem>
			<FormItem
      {...formItemLayout}
      label="联系人电话"
      hasFeedback
      >
      {
        getFieldDecorator('phone', {
          rules: [{ required: true, message: '联系人电话不能为空', whitespace: true },
          ],
          initialValue:defaultValues.phone
        })(
          <Input />
        )
      }
      </FormItem>
			<FormItem
      {...formItemLayout}
      label="联系人地址"
      hasFeedback
      >
      {
        getFieldDecorator('address', {
          rules: [{ required: true, message: '联系人地址不能为空', whitespace: true },
          ],
          initialValue: defaultValues.address
        })(
          <Input />
        )
      }
      </FormItem>
			<FormItem
      {...formItemLayout}
      label="设置为默认地址"
      >
      {
        getFieldDecorator('default', {
          initialValue: !!defaultValues.default
        })(
          <Switch 
          defaultChecked={!!defaultValues.default}
          checkedChildren="是" unCheckedChildren="否"
          />
        )
      }
      </FormItem>
			</Form>
			</Modal>

		)
	}
}

export default Form.create()(ContactModal)

