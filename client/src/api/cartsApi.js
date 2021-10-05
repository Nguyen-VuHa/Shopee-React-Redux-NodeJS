const { default: axiosClient } = require("./clientAxios");

const cartsApi = {
    getCarts: (accessToken) => {
        const url =  `/api/carts`;
        return axiosClient.get(url,{
            headers: {
                'Authorization':`Baeber ${accessToken}` 
            } 
        });
    },
    addCarts: (objectData) => {
        const url =  `/api/carts/add-item`;
        return axiosClient.post(url, JSON.stringify(objectData.data) , {
            headers: {
                'Authorization':`Baeber ${objectData.accessToken}` 
            } 
        });
    },
    plusCount: (accessToken, idCart) => {
        const url =  `/api/carts/plus/${idCart}`;
        return axiosClient.get(url, {
            headers: {
                'Authorization':`Baeber ${accessToken}` 
            } 
        });
    },
    minusCount: (accessToken, idCart) => {
        const url =  `/api/carts/minus/${idCart}`;
        return axiosClient.get(url ,{
            headers: {
                'Authorization':`Baeber ${accessToken}` 
            } 
        });
    },
    removeItemCarts: (accessToken, idCart) => {
        const url =  `/api/carts/remove/${idCart}`;
        return axiosClient.get(url ,{
            headers: {
                'Authorization':`Baeber ${accessToken}` 
            } 
        });
    },
}

export default cartsApi;