import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button} from "antd";

class AddButton extends Component {
	static PropTypes = {
		onChange: PropTypes.func.isRequired,
		defaultValue: PropTypes.number.isRequired
	}
	state = {
		value: this.props.defaultValue
	}
	handleChange(e) {
		const value = parseInt(e.target.value, 10);	
		this.setState({value});
		this.props.onChange(value);
	}
	handleMinus() {
		const currentValue = parseInt(this.state.value, 10) - 1;
		const value = currentValue < 1 ? 1 : currentValue;
		this.setState({
			value:value
		});
		this.props.onChange(value);
	}
	handlePlus() {
		const value = parseInt(this.state.value, 10) + 1;
		this.setState({
			value:value
		});
		this.props.onChange(value);
	}
	render() {
		return (
			<div className="addButton">
			<Button onClick={this.handleMinus.bind(this)}>-</Button>
			<input value={this.state.value} type="number"
				onChange={this.handleChange.bind(this)}
			/>
			<Button onClick={this.handlePlus.bind(this)}>+</Button>
			</div>
		)
	}
}
export default AddButton;