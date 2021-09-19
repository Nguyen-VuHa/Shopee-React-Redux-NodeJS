const { default: axiosClient } = require("./clientAxios");

const categoryApi = {
    getAllCategory: () => {
        const url =  `/api/category/shop-all`;
        return axiosClient.get(url);
    },
    getCategoryById: (idCategory) => {
        const url =  `/api/category-product/${idCategory}`;
        return axiosClient.get(url);
    },
    newCategory: (data) => {
        const url =  `/api/category/new-category`;
        return axiosClient.post(url, JSON.stringify(data));
    },
}

export default categoryApi;