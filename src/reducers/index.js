import { combineReducers } from "redux";
import login from "./login";
import nav from "./nav";
import signup from "./signup";

const rootReducer = combineReducers({
	login: login,
	username: nav,
	signup: signup,
});

export default rootReducer;