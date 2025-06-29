import axios from "axios";
import { isTokenExpired } from "../utils/functions";

export const instance = axios.create({
	baseURL: 'http://localhost:8080',
	headers: { 'Content-Type': 'application/json' },

});

instance.interceptors.request.use(async (config) => {
	const token = localStorage.getItem('authToken');
	if (token && !isTokenExpired(token)) {
		config.headers.Authorization = `Bearer ${token}`;
	}else{
		console.log("sem token")
		localStorage.removeItem('authToken');
	}
	return config;
});