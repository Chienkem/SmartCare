import axiosClient from "./axiosClient";

const ApiCustormer = {
    get: (pram) => {
        const url = `/customer`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/customer/edit/:${id}`;
        return axiosClient.put(url, data);
    },

    post: (data) => {
        const url = `/customer/insert`;
        return axiosClient.post(url, data);
    },

    delete: (id) => {
        const url = `/customer/delete/:${id}`;
        return axiosClient.delete(url);
    }

}

export default ApiCustormer;