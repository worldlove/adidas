import { combineReducers } from "redux";
import login from "./login";
import nav from "./nav";
import signup from "./signup";
import shoppingCart from "./shoppingCart";

const rootReducer = combineReducers({
	login: login,
	username: nav,
	signup: signup,
	cart: shoppingCart, 
});

export default rootReducer;