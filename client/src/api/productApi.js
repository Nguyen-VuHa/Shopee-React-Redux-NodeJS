const { default: axiosClient } = require("./clientAxios");

const productApi = {
    getAllProduct: () => {
        const url =`/api/product`;
        return axiosClient.get(url);
    },
    // getListProduct: () => {
    //     const url =`/api/list-product`;
    //     return axiosClient.get(url);
    // },
    postProduct: (data) => {
        const url = `/api/product/new-product`;
        return axiosClient.post(url, JSON.stringify(data));
    },
}

export default productApi;