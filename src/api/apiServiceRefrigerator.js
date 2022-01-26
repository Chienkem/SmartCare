import axiosClient from "./axiosClient";

const apiServiceRefrigerator= {
    get: (page="") => {
        const url = `/request/?page=${page}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/request/edit/${id}`;
        return axiosClient.put(url, data);
    },

    post: (param="",data) => {
        const url = `/services/tu-lanh/${param}`;
        return axiosClient.post(url, data);
    },
    clear: () => {
        const url = `/services/tu-lanh/`;
        return axiosClient.post(url);
    },
}

export default apiServiceRefrigerator;