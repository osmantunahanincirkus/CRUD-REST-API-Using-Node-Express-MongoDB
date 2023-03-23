import axios from 'axios';
import { apiBaseUrl } from "./apiconfig";

const todoApi = {
    getData : async () => {
        const response = await axios
            .get(`${apiBaseUrl}/api/todo`)
            .then((res) => {
                return res.data;
            }).catch((err) => {
                return err.response;
            });
        return response;
    },

    

};

export default todoApi;