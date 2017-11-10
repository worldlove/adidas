import { combineReducers } from "redux";
import login from "./login";
import nav from "./nav";

const rootReducer = combineReducers({
	login: login,
	username: nav
});

export default rootReducer;