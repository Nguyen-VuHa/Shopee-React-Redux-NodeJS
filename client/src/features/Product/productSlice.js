import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import categoryApi from "api/categoryApi";
import productApi from 'api/productApi';


export const getProductView = createAsyncThunk('GET_ALL_PRODUCT', async () => {
    const stateReponse = await productApi.getProductView();
    return stateReponse;
})

export const getNameCategory = createAsyncThunk('GET_LIST_NAME_CATEGORY', async () => {
    const stateReponse = await categoryApi.getNameCategory();
    return stateReponse;
})

export const getCategoryById = createAsyncThunk('FILTER_FOR_CATEGORY', async (idCategory) => {
    const stateReponse = await categoryApi.getCategoryById(idCategory);
    return stateReponse;
})

const productViewAdapter = createEntityAdapter({
    selectId: (product) => product.idProduct,
});

const listNameCategoryAdapter = createEntityAdapter({
    selectId: (categories) => categories.idCategory,
});

const productViewSlice = createSlice({
    name: 'product',
    initialState: productViewAdapter.getInitialState({
        loading: false,
        error: '',
        listname: listNameCategoryAdapter.getInitialState(),
    }),
    reducers: {},
    extraReducers: {
        // GET ALL PRODUCTS VIEW
        [getProductView.pending]: (state) => {
            state.loading = true;
        },
        [getProductView.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getProductView.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            productViewAdapter.setAll(state, action.payload);
        },
        // GET LIST NAME CATEGORY
        [getNameCategory.pending]: (state) => {
            state.loading = true;
        },
        [getNameCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getNameCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = '';
            listNameCategoryAdapter.setAll(state.listname, action.payload);
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
            state.loading = false;
            state.error = '';
            productViewAdapter.removeAll(state, {});
            productViewAdapter.setAll(state, action.payload);
        },
    }
})

export const productViewSelectors = productViewAdapter.getSelectors((state) => state.productView);
export const listNameSelectors = productViewAdapter.getSelectors((state) => state.productView.listname);

const  { reducer } = productViewSlice;
export default reducer;