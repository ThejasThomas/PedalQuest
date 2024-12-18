import axios from "axios"

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const axiosInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

export { axiosInstance }
