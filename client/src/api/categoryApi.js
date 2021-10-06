const { default: axiosClient } = require("./clientAxios");

const categoryApi = {
    getSlideHomePage: () => {
        const url =  `/api/category/slide`;
        return axiosClient.get(url);
    },
    getNameCategory: () => {
        const url =  `/api/category/list-name`;
        return axiosClient.get(url);
    },
    getCategoryById: (idCategory) => {
        const url =  `/api/category/${idCategory}`;
        return axiosClient.get(url);
    }
}

export default categoryApi;