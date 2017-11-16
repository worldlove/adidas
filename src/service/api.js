import myFetch from "./myFetch";
export const SERVER = "http://localhost:3000";

// 配置选项 数组长度如果等于3， 那么第三个参数只要不是"none", 则都返回一个带参数的函数对象，否则返回不带参数的函数对象；

const apiConfig = {
  // 数组第一个参数为路径， 第二个为方法， 第三个为数据类型
  login: ["/login", "POST", "json"],
  logout: ["/logout"],
  signup: ["/signup", "POST", "json"],
  captcha: ["/captcha"],

  addCap: ["/manage/category", "POST", "json"],
  modifyCap: ["/manage/category", "PUT", "json"],
  delCap: ["/manage/category", "DELETE", "path"],
  getCaps: ["/manage/category", "GET", "path"],

  addTag: ["/manage/tag", "POST", "json"],
  getTags: ["/manage/tag"],
  modifyTag: ["/manage/tag", "PUT", "json"],
  delTag: ["/manage/tag", "DELETE", "path"],

  addProduct: ["/manage/product", "POST", "json"],
  getProducts: ["/manage/product", "GET", "query"],
  getProduct: ["/manage/product", "GET", "path"],

  addCart: ["/shoppingcart", "POST", "json"],
  getCart: ["/shoppingcart"],
  delCart: ["/shoppingcart", "DELETE", "path"],
}

const takeConfigToFunc = (config) => {
  const api = {};
  for (let key in config) {
	const value = config[key];
	if (value.length === 3 && value[2] !== "none") {
	  api[key] = (payload) => (myFetch(...value, payload));
	} else {
	  api[key] = ()=>(myFetch(...value));
	}
  }
  return api
}

export default takeConfigToFunc(apiConfig);

// const api = {
// 	login: (form) => (myFetch("/login", "POST", "json", form)),
// 	logout: () => (myFetch("/logout")),
// 	addCap: (form) => {myFetch("/manage/category", "POST", "json", form)),
// }

// export const login = (form) => {
// 	return fetch(SERVER+"/login", {
// 		credentials: "include",
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(form)
// 	}).then((res) => {
// 		return res.json();
// 	})
// }
// export const signup = (form) => {
// 	return fetch(SERVER+"/signup", {
// 		credentials: "include",
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(form)
// 	}).then((res) => {
// 		return res.json()
// 	})
// }
// export const addCap = (form) => {
// 	return fetch(SERVER+"/manage/category", {
// 		credentials: "include",
// 		"method": "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(form)
// 	}).then((res) => {
// 		return res.json();
// 	})
// }
// export const modifyCap = (form) => {
// 	return fetch(SERVER+"/manage/category", {
// 		credentials: "include",
// 		"method": "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(form)
// 	}).then((res) => {
// 		return res.json();
// 	})
// }

// export const delCap = (id) => {
// 	return fetch(SERVER+"/manage/category/" + (id || ""), {
// 		credentials: "include",
// 		method: "DELETE"
// 	}).then((res) => {
// 		return res.json()
// 	});
// }


// export const logout = () => {
// 	return fetch(SERVER+"/logout", {
// 		credentials: "include",
// 	}).then((res) => {
// 		return res.json();
// 	})
// }

// export const captcha = () => {
//   return fetch(SERVER+"/captcha", {
//     credentials: "include"
//   }).then((res) => {
//     return res.json() 
//   })
// }



// export const getCaps = (level) => {
// 	return fetch(SERVER+"/manage/category/" + (level || ""), {
// 		credentials: "include",
// 	}).then((res) => {
// 		return res.json()
// 	});
// }

