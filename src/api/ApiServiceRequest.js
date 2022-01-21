import axiosClient from "./axiosClient";

const ApiServiceRequest = {
    get: () => {
        const url = `/request/`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/request/edit/:${id}`;
        return axiosClient.put(url, data);
    },

    post: (data) => {
        const url = `/request/insert`;
        return axiosClient.post(url, data);
    },

}

export default ApiServiceRequest;