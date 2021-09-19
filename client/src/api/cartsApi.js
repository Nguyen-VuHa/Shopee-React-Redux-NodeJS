const { default: axiosClient } = require("./clientAxios");

const cartsApi = {
    getCarts: (accesToken) => {
        const url =  `/api/carts`;
        return axiosClient.get(url,{
            headers: {
                'Authorization':`Baeber ${accesToken}` 
            } 
        });
    },
    plusCount: (accesToken, idCart) => {
        const url =  `/api/carts/plus/${idCart}`;
        return axiosClient.get(url, {
            headers: {
                'Authorization':`Baeber ${accesToken}` 
            } 
        });
    },
    minusCount: (accesToken, idCart) => {
        const url =  `/api/carts/minus/${idCart}`;
        return axiosClient.get(url ,{
            headers: {
                'Authorization':`Baeber ${accesToken}` 
            } 
        });
    },
    removeItemCarts: (accesToken, idCart) => {
        const url =  `/api/carts/remove/${idCart}`;
        return axiosClient.get(url ,{
            headers: {
                'Authorization':`Baeber ${accesToken}` 
            } 
        });
    },
}

export default cartsApi;