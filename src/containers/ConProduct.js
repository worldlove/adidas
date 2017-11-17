import Product from "../pages/Product";
import { addCart } from "../actions/product";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
const mapStateToProps = (state) => ({
	state: ""
})

const mapDispatchToProps = (dispatch) => ({
	addCart: bindActionCreators(addCart, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)