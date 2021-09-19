const { default: axiosClient } = require("./clientAxios");

const adminApi = {
    getProduct: () => {
        const url =`/api/product`;
        return axiosClient.get(url);
    },
    getProductById: (params) => {
        const url =`/api/product/${params.idProduct}`;
        return axiosClient.get(url);
    },
    UpdateProduct: (data) => {
        const url =`/api/product/update/${data.idProduct}`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    searchProduct: (params) => {
        const url=`/api/search-product?query_search=${params.query_search}`;
        return axiosClient.get(url);
    },
    newCategory: (data) => {
        const url =  `/api/category/new-category`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    getCategory: () => {
        const url =  `/api/category`;
        return axiosClient.get(url);
    },
    removeCategory: (idCategory) => {
        const url =  `/api/category/delete/${idCategory}`;
        return axiosClient.post(url);
    },
    getCategoryById: (idCategory) => {
        const url =  `/api/category/${idCategory}`;
        return axiosClient.get(url);
    },
    updateCategory: (data) => {
        const url =  `/api/category/update-category`;
        return axiosClient.post(url, JSON.stringify(data));
    }
}

export default adminApi;