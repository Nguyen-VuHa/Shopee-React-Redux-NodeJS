const { default: axiosClient } = require("./clientAxios");

const userApi = {
    getMessage: (senderId, receiverId) => {
        const url =`/api/get-message/${senderId}/${receiverId}`;
        return axiosClient.get(url);
    },
    postMessage: (data) => {
        const url = `/api/create-message`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    getIdAdmin: () => {
        const url = `/api/get-id-admin`;
        return axiosClient.get(url);
    }
}

export default userApi;