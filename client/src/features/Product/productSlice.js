import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "api/categoryApi";
import productApi from 'api/productApi';

var initialState = {
        products: [],
        categories: [],
        statusMesage: '',
        loading: false,
        error: '',
    }

export const getAllProduct = createAsyncThunk('GET_ALL_PRODUCT', async () => {
    const stateReponse = await productApi.getAllProduct();
    return stateReponse;
})

export const getAllCategory = createAsyncThunk('GET_ALL_CATEGORY', async () => {
    const stateReponse = await categoryApi.getAllCategory();
    return stateReponse;
})

export const getCategoryById = createAsyncThunk('FILTER_FOR_CATEGORY', async (thunkApi) => {
    const stateReponse = await categoryApi.getCategoryById(thunkApi);
    return stateReponse;
})

const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        // GET ALL PRODUCTS
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
            state.statusMesage = 'OKE';
        },
        // GET ALL CATEGORY
        [getAllCategory.pending]: (state) => {
            state.loading = true;
        },
        [getAllCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload.objData;
            state.statusMesage = 'OKE';
        },
        // FILTER FOR CATEGORY
        [getCategoryById.pending]: (state) => {
            state.loading = true;
        },
        [getCategoryById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getCategoryById.fulfilled]: (state, action) => {
            console.log(action);
            state.loading = false;
            state.products = action.payload;
            state.statusMesage = 'OKE';
        },
    }
})

const  { reducer } = productSlice;
export default reducer;