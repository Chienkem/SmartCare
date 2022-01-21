import axiosClient from "./axiosClient";

const ApiEquipment = {
    get: (pram) => {
        const url = `/device`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/Device/edit/:${id}`;
        return axiosClient.put(url, data);
    },

    post: (data) => {
        const url = `/device/insert`;
        return axiosClient.post(url, data);
    },

    delete: (id) => {
        const url = `/device/delete/:${id}`;
        return axiosClient.delete(url);
    }

}

export default ApiEquipment;