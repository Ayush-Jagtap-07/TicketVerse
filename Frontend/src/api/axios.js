import axios from "axios";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";

// Creating a common Axios instance
const axiosInstance = axios.create({
    baseURL: "https://ticket-verse-backend.vercel.app/api",            
    withCredentials: true,    
});

// Request interceptor to include Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("token"); // Retrieve the token from cookies
        // console.log(`Interceptor error : ${token}`);
        if (token) {
            config.headers.authorization = `Bearer ${token}`; // Add Authorization header
        }
        // console.log("Request Config Headers:", config.headers);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common responses or errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // Return response data as is
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh the access token
                const res = await axios.get('http://localhost:8080/refresh-token', {}, { withCredentials: true });
                const newAccessToken = res.data.accessToken;

                // Update the original request with the new access token
                originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (error) {
                // If refresh token fails, log the user out
                console.error("Token refresh failed", error);
                Cookies.remove('accessToken', { path: '/' });
                Cookies.remove('refreshToken', { path: '/' });
                // setUser({ isLoggedIn: false });
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

