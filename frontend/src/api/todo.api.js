import {apiAxios} from "./apiconfig";

export const TodoApi = {
    gets: async () => {
        return apiAxios
            .get(`/todo`)
            .then((res) => {
                return {data: res.data, error: null};
            }).catch((err) => {
                return {data: [], error: err.message};
            });
    },
    create: async (payload) => {
        return apiAxios
            .post(`/todo`, payload)
            .then((res) => {
                return {data: res.data, error: null};
            }).catch((err) => {
                return {data: {}, error: err.message};
            });
    },
    update: async (id, payload) => {
        return apiAxios
            .put(`/todo/${id}`, payload)
            .then((res) => {
                return {data: res.data, error: null};
            }).catch((err) => {
                return {data: {}, error: err.message};
            });
    },
    delete: async (id) => {
        return apiAxios
            .delete(`/todo/${id}`)
            .then((res) => {
                return {data: res.data, error: null};
            }).catch((err) => {
                return {data: {}, error: err.message};
            });
    }
};