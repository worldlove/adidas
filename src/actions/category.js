import {addCategory} from "../service/category";

export const addCat = (form) => {
  return (dispatch, getState) => {
    dispatch(addState());
    addCategory(form)
      .then((resJson) => {
        message.success("添加分类成功")
      })
  }
}
