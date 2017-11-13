import {login} from "../service/api";
import {navUsername} from "./nav";
import {message} from "antd";
import history from "../service/history";

export const LOGIN_SUBMIT_START = "LOGIN_SUBMIT_START";

export const LOGIN_SUBMIT_ERROR = "LOGIN_SUBMIT_ERROR";

export const loginStart = () => ({
  type: LOGIN_SUBMIT_START
})

export const loginError = (err) => ({
  type: LOGIN_SUBMIT_ERROR,
  payload: err
})

export const loginChunk = (form) => {
  return (dispatch, getState) => {
	dispatch(loginStart());
	login(form).then((resJson) => {
	  if (resJson.OK) {
		message.success("登录成功")
		dispatch(navUsername(resJson.user.username));
		return history.push("/");
	  } else {
		message.error(resJson.message);
		return dispatch(loginError(resJson.message));
	  }
	}).catch((err) => {
	  message.error("登录失败" + err.toString());
	  return dispatch(loginError(err.toString()));
	})
  }	
}
