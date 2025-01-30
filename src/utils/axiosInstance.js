import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../constants/apiConstants";

// Create an Axios instance with base URL
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to refresh token if access token expires
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                try {
                    const tokenResponse = await axios.post(`${API_BASE_URL}/auth/login/refresh/`, {
                        refresh: refreshToken,
                    });

                    const newAccessToken = tokenResponse.data.access;

                    // Update access token in local storage
                    localStorage.setItem(ACCESS_TOKEN_NAME, newAccessToken);

                    // Update header with the new token and retry the failed request
                    error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axios(error.config);
                } catch (refreshError) {
                    console.error("Token refresh failed. Logging out...");
                    localStorage.clear(); // Optionally clear tokens
                    window.location.href = "/auth/login"; // Redirect to login
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
