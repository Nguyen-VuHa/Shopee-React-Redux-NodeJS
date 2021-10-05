const { default: axiosClient } = require("./clientAxios");

const authApi = {
    createAccount: (data) => {
        const url = `/auth/register`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    login: (data) => {
        const url = `/auth/login`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    refreshToken: (data) => {
        const url = `/auth/refresh-token`;
        return axiosClient.post(url, JSON.stringify(data));
    },
}

export default authApi;