import axiosClient from "./axiosClient";

const ApiServiceAirConditioner= {
    get: (page="") => {
        const url = `/request/?page=${page}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/request/edit/${id}`;
        return axiosClient.put(url, data);
    },

    post: (param="",page,data) => {
        const url = `/services/dieu-hoa/${param}`;
        return axiosClient.post(url, data);
    },

}

export default ApiServiceAirConditioner;