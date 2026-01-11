import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:"http://loclahost:4500"
})

export default axiosInstance;