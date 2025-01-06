import axios from "axios"

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const axiosInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});
const axiosMultipartInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "multipart/form-data",
	},
	withCredentials: true,
});

export { axiosInstance,axiosMultipartInstance }
