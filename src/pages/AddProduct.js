import React, {Component} from "react";
import {Form, Button, Input, Select, Transfer, Switch, message} from "antd";
import UploadImg from "./components/UploadImg";
import api from "../service/api";

const FormItem = Form.Item;
const Option = Select.Option;

class NormalProduct extends Component {
  state = {
    imgList: [],
    getImgList: [],
    allCat2: [],
    allTags: [],
    targetTags: []
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
        values.images = this.state.imgList;
        console.log("values", values);
        api.addProduct(values).then((res) => {
          if (res.OK) {
            message.success("增加商品成功")
          } else {
            message.error(res.message);
          }
        })
      }
    })

  }
  getTags() {
    api.getTags()
      .then((res) => {
        console.log("res", res);
        if (res.OK) {
          this.setState({
            allTags: res.docs.map((cat, index) => ({
              key: cat.name,
              name: cat.name,
            }))
          })
        }
      })
  }
  getCat2() {
    api.getCaps("2")
      .then((res) => {
        console.log("res", res);
        if (res.OK) {
          this.setState({
            allCat2: res.docs
          })
        }
      })
  }
  filterOption(inputValue, option) {
    console.log(option)
    return option.name.indexOf(inputValue) > -1;
  }
  handleChange(targetTags) {
    this.setState({ targetTags });
  }
  componentDidMount() {
    this.getCat2();
    this.getTags();
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
      label="商品价格"
      hasFeedback
      >
      {getFieldDecorator('price', {
        rules: [{
          required: true, message: '输入商品价格',
        }],
        validateTrigger: "onBlur"
      })(
        <Input type="number"/>
      )}
      </FormItem>
      <FormItem
      {...formItemLayout}
      label="商品单位"
      hasFeedback
      >
      {getFieldDecorator('unit', {
        rules: [{
          required: true, message: '输入商品单位',
        }],
        validateTrigger: "onBlur"
      })(
        <Input />
      )}
      </FormItem>
      <FormItem
      {...formItemLayout}
      label="商品库存"
      hasFeedback
      >
      {getFieldDecorator('storage', {
        rules: [{
          required: true, message: '输入商品库存',
        }],
        validateTrigger: "onBlur"
      })(
        <Input type="number"/>
      )}
      </FormItem>
      <FormItem
      {...formItemLayout}
      label="商品分类"
      hasFeedback
      >
      {getFieldDecorator('category', {
        rules: [{
          required: true, message: '选择商品分类',
        }],
        validateTrigger: "onBlur"
      })(
        <Select>
        {
          this.state.allCat2.map((cat, i) => (
          <Option key={i} value={cat.name}>{cat.name}</Option>
          ))
        }
        </Select>
        )
      }
      </FormItem>
        <FormItem
        {...formItemLayout}
        label={<span>选择标签</span>}
        >
        {
          getFieldDecorator('tag', {
          })(
            <Transfer
            titles={["未选择标签","已选择标签"]}
            dataSource={this.state.allTags}
            showSearch
            listStyle={{
              width: "45%",
              height: 300,
              textAlign: "left"
            }}
            filterOption={this.filterOption}
            targetKeys={this.state.targetTags}
            onChange={this.handleChange.bind(this)}
            render={item => item.name}
            />
          )
        }
        </FormItem>
      <FormItem
      {...formItemLayout}
      label={"商品状态"}
      >
      {getFieldDecorator('status', {
        initialvalue: true,
      })(
        <Switch defaultChecked={true}/>
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
      <FormItem
      {...formItemLayout}
      label="商品详情"
      >
      {getFieldDecorator('info', {
        rules: [{
          required: true, message: '输入商品详情',
        }],
        validateTrigger: "onBlur",
      })(
        <Input />
      )}
      </FormItem>
      <Button htmlType="submit">提 交</Button>
      </Form>
      </div>
    )
  }
}

export default Form.create()(NormalProduct);
