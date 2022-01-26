import axiosClient from "./axiosClient";

const ApiServiceElectricHeater= {
    get: (page="") => {
        const url = `/request/?page=${page}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/request/edit/${id}`;
        return axiosClient.put(url, data);
    },

    post: (param="",data) => {
        const url = `/services/binh-nong-lanh/${param}`;
        return axiosClient.post(url, data);
    },
    clear: () => {
        const url = `/services/binh-nong-lanh`;
        return axiosClient.post(url);
    },
}

export default ApiServiceElectricHeater;