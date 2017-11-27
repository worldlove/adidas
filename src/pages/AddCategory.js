import React, {Component} from "react";
import { Form, Icon, Input, Button, Select, Tooltip, Transfer, Row, Col } from 'antd';
import api from "../service/api";

const FormItem = Form.Item;
const Option = Select.Option;

class NormalCategory extends Component {
  state = {
    allCat2: [],
    targetKeys: [],
    level: "2",
  }
  handleSubmit(e) {
    e.preventDefault();
	this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        api.addCap(values).then((res) => {
          console.log("res", res)
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
  getCat2() {
    api.getCaps("2")
      .then((res) => {
        console.log("res", res);
        if (res.OK) {
          this.setState({
            allCat2: res.docs.map((cat, index) => ({
              key: cat.name,
              title: cat.name,
            }))
          })
        }
      })
  }
  componentDidMount() {
    this.getCat2();
  }
  render() {
    const {level, allCat2, targetKeys} = this.state;
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
	  <div className="category">
	  <h2>新增产品分类</h2>
	  <Form onSubmit={this.handleSubmit.bind(this)}>
	  <FormItem
      {...formItemLayout}
      label="分类名称"
      hasFeedback
      >
      {
        getFieldDecorator('name', {
          rules: [{ required: true, message: '分类名不能为空', whitespace: true },
          ]
        })(
          <Input />
        )
      }
      </FormItem>
      <FormItem
      {...formItemLayout}
      label={<span>分类等级<Tooltip title="两级分类，一表示大类，二表示小类"><Icon type="question-circle-o"/></Tooltip></span>}
      >
	  {
        getFieldDecorator('level', {
		  initialValue: level,
	    })(
		  <Select onChange={(level) => this.setState({level})}>
		  <Option value="1">一级</Option>
		  <Option value="2">二级</Option>
		  </Select>
	    )
      }
      </FormItem>
      {
        level !== "2" ?
        <FormItem
        {...formItemLayout}
        label={<span>分类等级<Tooltip title="两级分类，一表示大类，二表示小类"><Icon type="question-circle-o"/></Tooltip></span>}
        >
        {
          getFieldDecorator('children', {
            initialValue: '2',
          })(
            <Transfer
            titles={["未选择二级分类","已选择二级分类"]}
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
            render={item => item.title}
            />
          )
        }
        </FormItem>
        : null
      }
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

export default Form.create()(NormalCategory);
