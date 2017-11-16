import React, {Component} from "react";
import { Form, Icon, Input, Button, Tooltip, Transfer, Row, Col, message } from 'antd';
import api from "../service/api";

const FormItem = Form.Item;


class NormalTag extends Component {
  state = {
    allCat2: [],
    targetKeys: [],
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        api.addTag(values).then((res) => {
          console.log("res", res)
          if (res.OK) {
            message.success("增加标签成功");
          } else {
            message.error(res.message);
          }
        })
      }
    });
  }
  filterOption(inputValue, option) {
    console.log(option)
    return option.title.indexOf(inputValue) > -1;
  }
  handleChange(targetKeys) {
    this.setState({ targetKeys });
  }
  getCat1() {
    api.getCaps("1")
      .then((res) => {
        console.log("res", res);
        if (res.OK) {
          this.setState({
            allCat2: res.docs.map((cat, index) => ({
              key: cat.name,
              name: cat.name,
            }))
          })
        }
      })
  }
  componentDidMount() {
    this.getCat1();
  }
  render() {
    const {allCat2, targetKeys} = this.state;
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
      <div className="tag">
      <h2>新增产品标签</h2>
      <p>标签与导航条相关，为另外一种形式的分类, 不可设置过多</p>
      <Form onSubmit={this.handleSubmit.bind(this)}>
      <FormItem
      {...formItemLayout}
      label="标签名称"
      hasFeedback
      >
      {
        getFieldDecorator('name', {
          rules: [{ required: true, message: '标签名不能为空', whitespace: true },
          ]
        })(
          <Input />
        )
      }
      </FormItem>
      <FormItem
      {...formItemLayout}
      label={<span>标签优先级<Tooltip title="标签优先级为标签的分类和排序依据">
        <Icon type="question-circle-o"/></Tooltip></span>}
      >
      {
        getFieldDecorator('priority', {
          rules: [{ required: true, message: '标签等级不能为空', whitespace: true },
          ]})(
          <Input />
        )
      }
      </FormItem>
        <FormItem
        {...formItemLayout}
        label={<span>包含分类<Tooltip title="标签所包含的分类"><Icon type="question-circle-o"/></Tooltip></span>}
        >
        {
          getFieldDecorator('children', {
          })(
            <Transfer
            titles={["未选择分类","已选择分类"]}
            dataSource={allCat2}
            showSearch
            listStyle={{
              width: "45%",
              height: 300,
              textAlign: "left"
            }}
            filterOption={this.filterOption}
            targetKeys={targetKeys}
            onChange={this.handleChange.bind(this)}
            render={item => item.name}
            />
          )
        }
        </FormItem>
      <Row>
      <Col span={6}>
      </Col>
      <Col span={12}>
      <Col span={10}>
      <Button htmlType="submit" type="primary" style={{width: "100%"}}
      >提 交</Button>
      </Col>
      <Col offset={4} span={10}>
      <Button htmlType="button" style={{width: "100%"}}
      onClick={() => this.props.history.goBack()}
      >返 回</Button>
      </Col>
      </Col>
      </Row>
      </Form>
      </div>
    )
  }
}

export default Form.create()(NormalTag);
