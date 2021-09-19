import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import categoryApi from "api/categoryApi";

export const getAllProduct = createAsyncThunk('shopAll/getAllProduct', async () => {
    const message = await productApi.getAllProduct();
    return message;
})

export const getAllCategory = createAsyncThunk('shopAll/getAllCategory', async () => {
    const message = await categoryApi.getAllCategory();
    return message;
})

export const getCategoryById = createAsyncThunk('shopAll/getCategoryById', async (thunkApi) => {
    const message = await categoryApi.getCategoryById(thunkApi);
    return message;
})

const productApis = createSlice({
    name: 'getallproduct',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
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
            state.statusMesage = action.payload;
        },
    }
},{
    name: 'getallcategory',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getAllCategory.pending]: (state) => {
            state.loading = true;
        },
        [getAllCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getAllCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
},{
    name: 'getCategoryById',
    initialState: {
        statusMesage: '',
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getCategoryById.pending]: (state) => {
            state.loading = true;
        },
        [getCategoryById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getCategoryById.fulfilled]: (state, action) => {
            state.loading = false;
            state.statusMesage = action.payload;
        },
    }
})


const  { reducer } = productApis;
export default reducer;