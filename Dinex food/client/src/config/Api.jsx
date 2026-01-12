import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:"http://localhost:4500"
})

export default axiosInstance;