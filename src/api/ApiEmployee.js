import axiosClient from "./axiosClient";

const ApiEmployee = {
    get: (pram) => {
        const url = `/admin/staff/`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/admin/staff/edit/:${id}`;
        return axiosClient.put(url, data);
    },

    post: (data) => {
        const url = `/admin/staff/insert`;
        return axiosClient.post(url, data);
    },

    delete: (id) => {
        const url = `/admin/staff/delete/:${id}`;
        return axiosClient.delete(url);
    }

}

export default ApiEmployee;