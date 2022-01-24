import axiosClient from "./axiosClient";

const ApiEmployee = {
    get: (page="") => {
        const url = `/admin/staff/?page=${page}`;
        return axiosClient.get(url);
    },

    put: (id, data) => {
        const url = `/admin/staff/edit/${id}`;
        return axiosClient.put(url, data);
    },

    post: (param="",data) => {
        const url = `/admin/staff/${param}`;
        return axiosClient.post(url, data);
    },

    delete: (id) => {
        const url = `/admin/staff/delete/${id}`;
        return axiosClient.delete(url);
    }
}

export default ApiEmployee;