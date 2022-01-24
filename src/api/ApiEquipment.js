import axiosClient from "./axiosClient";

const ApiEquipment = {
    get: (page="") => {
        const url = `/device/?page=${page}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/device/edit/${id}`;
        return axiosClient.put(url, data);
    },

    post: (param="",data) => {
        const url = `/device/${param}`;
        return axiosClient.post(url, data);
    },

    delete: (id) => {
        const url = `/device/delete/${id}`;
        return axiosClient.delete(url);
    }

}

export default ApiEquipment;