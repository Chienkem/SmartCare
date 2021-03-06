import axiosClient from "./axiosClient";

const ApiService= {
    get: (page="") => {
        const url = `/request/?page=${page}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/request/edit/${id}`;
        return axiosClient.put(url, data);
    },

    post: (param="",data) => {
        const url = `/services/dich-vu/${param}`;
        return axiosClient.post(url, data);
    },

}

export default ApiService;