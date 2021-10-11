const { default: axiosClient } = require("./clientAxios");

const userApi = {
    getMessage: (senderId, receiverId, accesToken) => {
        const url =`/api/get-message/${senderId}/${receiverId}`;
        return axiosClient.get(url, {
            headers: {
                'Authorization':`Bearer ${accesToken}` 
            } 
        });
    },
    postMessage: (data, accesToken) => {
        const url = `/api/create-message`;
        return axiosClient.post(url, JSON.stringify(data) , {
            headers: {
                'Authorization':`Bearer ${accesToken}` 
            } 
        });
    },
    getIdAdmin: () => {
        const url = `/api/get-id-admin`;
        return axiosClient.get(url);
    }
}

export default userApi;