const { default: axiosClient } = require("./clientAxios");

const cartsApi = {
    getCarts: (accessToken) => {
        const url =  `/api/carts`;
        return axiosClient.get(url, {
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            } 
        });
    },
    addCarts: (objectData) => {
        const url =  `/api/carts/add-item`;
        return axiosClient.post(url, JSON.stringify(objectData.data) , {
            headers: {
                'Authorization':`Bearer ${objectData.accessToken}` 
            } 
        });
    },
    plusCount: (accessToken, idCart) => {
        const url =  `/api/carts/plus/${idCart}`;
        return axiosClient.get(url, {
                headers: {
                    'Authorization':`Bearer ${accessToken}` 
                } 
            });
    },
    minusCount: (accessToken, idCart) => {
        const url =  `/api/carts/minus/${idCart}`;
        return axiosClient.get(url ,{
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            } 
        });
    },
    removeItemCarts: (accessToken, idCart) => {
        const url =  `/api/carts/remove/${idCart}`;
        return axiosClient.get(url ,{
            headers: {
                'Authorization':`Bearer ${accessToken}` 
            } 
        });
    },
}

export default cartsApi;