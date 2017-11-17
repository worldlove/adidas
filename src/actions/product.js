import { cartValid } from "./shoppingCart";

export const addCart = (num)=> {
	return (dispatch, getState) => {
		dispatch(cartValid(num))
	}
}