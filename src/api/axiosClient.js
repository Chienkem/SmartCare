import axios from 'axios';
// import queryString from 'query-string';


const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
     headers:{
            "x-access-token":localStorage.getItem("token")
        },
        timeout: 3000
    // paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
})

axiosClient.interceptors.response.use((response) => {
    // console.log(response);
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;