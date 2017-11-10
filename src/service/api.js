export const SERVER = "http://localhost:3000";

export const login = (form) => {
	return fetch(SERVER+"/login", {
		credentials: "include",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(form)
	}).then((res) => {
		return res.json();
	})
}

export const logout = () => {
	return fetch(SERVER+"/logout", {
		credentials: "include",
	}).then((res) => {
		return res.json();
	})
}