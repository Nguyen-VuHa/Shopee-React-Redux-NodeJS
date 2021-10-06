const { default: axiosClient } = require("./clientAxios");

const productApi = {
    getAllProduct: () => {
        const url =`/api/product`;
        return axiosClient.get(url);
    },
    getProductView: () => {
        const url =`/api/product-view`;
        return axiosClient.get(url);
    },
    searchProduct: (params) => {
        const url=`/api/search-product?query_search=${params}`;
        return axiosClient.get(url);
    },
    getListProduct: () => {
        const url=`/api/list-product`;
        return axiosClient.get(url);
    },
    getProductDetail: () => {
        const url=`/api/product-detail`;
        return axiosClient.get(url);
    }
}

export default productApi;