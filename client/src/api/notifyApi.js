const { default: axiosClient } = require("./clientAxios");

const notifyApi = {
    getNotify: (accesToken) => {
        const url = `/api/notify`;

        return axiosClient.get(url, {
            headers: {
                'Authorization':`Bearer ${accesToken}` 
            } 
        });
    },
    getCount: (accesToken) => {
        const url = `/api/count-notify`;

        return axiosClient.get(url, {
            headers: {
                'Authorization':`Bearer ${accesToken}` 
            } 
        });
    },
    postUpdate : (accesToken) => {
        const url = `/api/update`;

        return axiosClient.post(url, {} ,{
            headers: {
                'Authorization':`Bearer ${accesToken}` 
            } 
        });
    },
}

export default notifyApi;