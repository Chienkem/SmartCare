import axiosClient from "./axiosClient";

const ApiCustomer = {
    get: (page="") => {
        const url = `/customer/?page=${page}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/customer/edit/${id}`;
        return axiosClient.put(url, data);
    },

    post: (param="",data) => {
        const url = `/customer/${param}`;
        return axiosClient.post(url, data);
    },

    delete: (id) => {
        const url = `/customer/delete/${id}`;
        return axiosClient.delete(url);
    }

}

export default ApiCustomer;