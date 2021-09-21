import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";

var initialState = {
    products: [],
    statusMesage: '',
    loading: false,
    error: '',
};

export const getAllProducts = createAsyncThunk('GET_ALL_PRODUCT' , async () => { 
    const stateReponse = await productApi.getAllProduct();
    return stateReponse;
})

export const createProduct = createAsyncThunk('NEW_PRODUCT', async (thunkApi) => {
    const stateReponse = await productApi.postProduct(thunkApi);
    return stateReponse;
})

export const updateProduct = createAsyncThunk('UPDATE_PRODUCT', async (thunkApi) => {
    const stateReponse = await productApi.updateProduct(thunkApi);
    return stateReponse;
})


const adminProductApis = createSlice({  
    name: 'products',
    initialState: initialState,
    reducers: {}, 
    extraReducers: {
        // GET ALL PRODUCTS
        [getAllProducts.pending]: (state) => {
            state.loading = true;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.statusMesage = 'OK'
        },
        // CREATE A PRODUCT
        [createProduct.pending]: (state) => {
            state.loading = true;
        },
        [createProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload
        },
        // UPDATE A PRODUCT
        [updateProduct.pending]: (state) => {
            state.loading = true;
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload
        },
    }
})
const  { reducer } = adminProductApis;
export default reducer;