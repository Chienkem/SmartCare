import axiosClient from "./axiosClient";

const ApiServiceRequest = {
    get: (page="") => {
        const url = `/request/?page=${page}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/request/edit/${id}`;
        return axiosClient.put(url, data);
    },

    post: (param="",data) => {
        const url = `/request/${param}`;
        return axiosClient.post(url, data);
    },

}

export default ApiServiceRequest;