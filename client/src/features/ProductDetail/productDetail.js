import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";

var initialState = {
    products: [],
    statusMesage: '',
    loading: false,
    error: '',
}
export const getAllProduct = createAsyncThunk('GET_ALL_PRODUCT_DETAIL', async () => {
    const message = await productApi.getListProduct();
    return message;
})

const productDetailApis = createSlice({
    name: 'productDetail',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getAllProduct.pending]: (state) => {
            state.loading = true;
        },
        [getAllProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.statusMesage = 'OK';
        },
    }
})


const  { reducer } = productDetailApis;
export default reducer;
