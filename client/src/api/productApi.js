const { default: axiosClient } = require("./clientAxios");

const productApi = {
    getAllProduct: () => {
        const url =`/api/product`;
        return axiosClient.get(url);
    },
    postProduct: (data) => {
        const url = `/api/product/new-product`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    updateProduct: (data) => {
        const url =`/api/product/update/${data.idProduct}`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    searchProduct: (params) => {
        const url=`/api/search-product?query_search=${params}`;
        return axiosClient.get(url);
    },
}

export default productApi;