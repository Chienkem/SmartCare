import axiosClient from "./axiosClient";

const ApiService = {
    get: (pram) => {
        const url = `/service`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/service/${id}`;
        return axiosClient.put(url, data);
    },

    post: (data) => {
        const url = `/service`;
        return axiosClient.post(url, data);
    },

    delete: (id) => {
        const url = `/service/${id}`;
        return axiosClient.delete(url);
    }

}

export default ApiService;