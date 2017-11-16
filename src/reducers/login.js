import { LOGIN_SUBMIT_START, LOGIN_SUBMIT_ERROR } from "../actions/login";

const defaultState = {
	isFetching: false,
};

const login = (state=defaultState, action) => {
	switch(action.type) {
		case LOGIN_SUBMIT_START:
			return {isFetching: true}
		case LOGIN_SUBMIT_ERROR:
			return {isFetching: false, error: true}
		default:
			return state;
	}
}

export default login