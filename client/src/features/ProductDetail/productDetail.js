import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";

export const getListProduct = createAsyncThunk('GET_ALL_PRODUCT_DETAIL', async () => {
    const message = await productApi.getProductDetail();
    var arrayImage = [];
    var arrayData = [];
    message.forEach(item => {

        item.HINHANH_SANPHAMs.forEach(i => {
            arrayImage.push(i);
        });

        arrayData.push({
            idProduct: item.idProduct,
            nameProduct: item.nameProduct,
            descProduct: item.descProduct,
            price:  item.price,
        });
    });
    
    return {arrayImage, arrayData};
})

const productDetailAdapter = createEntityAdapter({
    selectId: (product) => product.idProduct,
});

const productImgDetailAdapter = createEntityAdapter({
    selectId: (product) => product.id,
});

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: productDetailAdapter.getInitialState({
        loading: false,
        error: '',
        listImage: productImgDetailAdapter.getInitialState(),
    }),
    reducers: {},
    extraReducers: {
        [getListProduct.pending]: (state) => {
            state.loading = true;
        },
        [getListProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getListProduct.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = 'OK';
            productDetailAdapter.setAll(state, payload.arrayData);
            productImgDetailAdapter.setAll(state.listImage, payload.arrayImage)
        },
    }
})
export const productDetailSelectors = productDetailAdapter.getSelectors((state) => state.listProductDetail);
export const productImgDetailSelectors = productImgDetailAdapter.getSelectors((state) => state.listProductDetail.listImage);

const { reducer } = productDetailSlice;
export default reducer;
