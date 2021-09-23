const { default: axiosClient } = require("./clientAxios");

const categoryApi = {
    getAllCategory: () => {
        const url =  `/api/category`;
        return axiosClient.get(url);
    },
    getCategoryById: (idCategory) => {
        const url =  `/api/category-product/${idCategory}`;
        return axiosClient.get(url);
    },
    createCategory: (data) => {
        const url =  `/api/category/new-category`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    updateCategory: (data) => {
        const url =  `/api/category/update-category`;
        return axiosClient.post(url, JSON.stringify(data));
    },
    deleteCategory: (idCategory) => {
        const url =  `/api/category/delete/${idCategory}`;
        return axiosClient.post(url);
    },
}

export default categoryApi;