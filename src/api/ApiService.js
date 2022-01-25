import axiosClient from "./axiosClient";

const ApiService = {
    get: (page="") => {
        const url = `/request/?page=${page}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/request/edit/${id}`;
        return axiosClient.put(url, data);
    },

    post: (page="",data) => {
        const url = `/request/services/?page=${page}`;
        return axiosClient.post(url, data);
    },

}

export default ApiService;