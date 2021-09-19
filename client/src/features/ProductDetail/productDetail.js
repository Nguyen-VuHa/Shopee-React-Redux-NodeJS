import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";

export const getListProduct = createAsyncThunk('shopAll/getListProduct', async () => {
    const message = await productApi.getListProduct();
    return message;
})

const productDetailApis = createSlice({
    name: 'getlistproduct',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getListProduct.pending]: (state) => {
            state.loading = true;
        },
        [getListProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getListProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
})


const  { reducer } = productDetailApis;
export default reducer;
