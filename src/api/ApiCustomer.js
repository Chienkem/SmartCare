import axiosClient from "./axiosClient";

const ApiCustomer = {
    get: (page="") => {
        const url = `/customer/?page=${page}`;
        return axiosClient.get(url,{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }}
        );
    },

    put: (id, data) => {
        const url = `/customer/edit/${id}`;
        return axiosClient.put(url, data,{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }});
    },

    post: (param="",data) => {
        const url = `/customer/${param}`;
        return axiosClient.post(url, data,{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }});
    },

    delete: (id) => {
        const url = `/customer/delete/${id}`;
        return axiosClient.delete(url,{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }});
    }

}

export default ApiCustomer;