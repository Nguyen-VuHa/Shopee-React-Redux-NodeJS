const { default: axiosClient } = require("./clientAxios");

const notifyApi = {
    getNotify: (accesToken) => {
        const url = `/api/notify`;

        return axiosClient.get(url,{
            headers: {
                'Authorization':`Baeber ${accesToken}` 
            } 
        });
    },
    getCount: (accesToken) => {
        const url = `/api/count-notify`;

        return axiosClient.get(url, {
            headers: {
                'Authorization':`Baeber ${accesToken}` 
            } 
        });
    },
    postUpdate : (accesToken) => {
        const url = `/api/update`;

        return axiosClient.post(url, {} ,{
            headers: {
                'Authorization':`Baeber ${accesToken}` 
            } 
        });
    },
}

export default notifyApi;