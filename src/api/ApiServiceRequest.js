import axiosClient from "./axiosClient";

const ApiServiceRequest = {
    get: () => {
        const url = `/service_request`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/service_request/${id}`;
        return axiosClient.put(url, data);
    },

    post: (data) => {
        const url = `/service_request`;
        return axiosClient.post(url, data);
    },

}

export default ApiServiceRequest;